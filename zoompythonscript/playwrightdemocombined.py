import asyncio
from playwright.async_api import async_playwright
import nest_asyncio
import serial
import serial.tools.list_ports
import requests
from requests.structures import CaseInsensitiveDict
import pygetwindow as gw
nest_asyncio.apply()

global currentCommand
currentCommand = "idle"

triggerAPILink = "https://api.linkupss.com/checkfortrigger"

participantID = "22"

username = "Eric Test"

H = CaseInsensitiveDict()
H["accept"] = "application/json"
H["Content-Type"] = "application/json"
d = '{"participant_id":"'+participantID+'"}'

async def launchWithPassword():
    global currentCommand
    while True:
        await asyncio.sleep(1)
        print("Launching browser...")
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False, args=['--start-maximized', '--use-fake-ui-for-media-stream'])
            page = await browser.new_page(no_viewport=True)
            context = await browser.new_context()
            await context.grant_permissions(permissions=['microphone'])
            await context.grant_permissions(permissions=['camera'])
            await page.goto('https://zoom.com/wc/join/'+code)
            await asyncio.sleep(0.1)
            await page.locator('#inputname').fill(username)
            await asyncio.sleep(0.1)
            await page.locator('#joinBtn').click()
            await asyncio.sleep(0.1)
            await page.locator('#inputpasscode').fill(password)
            await asyncio.sleep(0.1)
            await page.locator('#joinBtn').click()
            # windows = gw.getWindowsWithTitle('My Meeting')
            # windows.maximize()
            while True:
                await asyncio.sleep(0.1)
                if currentCommand == "leave":
                    currentCommand = "idle"
                    await browser.close()
                    return
                if currentCommand == "mic":
                    await page.evaluate("()=>{var a=document.querySelector('#wc-footer');a.classList.remove('footer--hidden');}")
                    await page.click('//*[@id="foot-bar"]/div[1]/div[1]/button')
                    currentCommand = "idle"
                if currentCommand == "cam":
                    await page.evaluate("()=>{var a=document.querySelector('#wc-footer');a.classList.remove('footer--hidden');}")
                    await page.click('//*[@id="foot-bar"]/div[1]/div[2]/button')
                    currentCommand = "idle"

async def curl():
    while True:
        await asyncio.sleep(2)
        resp = requests.post(triggerAPILink, headers=H, data=d)
        resp = resp.json().items()
        print("Looking for meeting...")
        for key, value in resp:
            if key == 'meetinginfo':
                if len(value) > 0:
                    print('Meeting found!')
                    global code 
                    code = str(value[0]['code'])
                    global password 
                    password = str(value[0]['password'])
                    arduino.write(bytes("trigger", 'utf-8'))
                    print("Arduino triggered, awaiting input")
                    await asyncio.sleep(6)

async def initializeArduino():
    comPort = None
    counter = 0
    global currentCommand
    while comPort is None:
        ports = list(serial.tools.list_ports.comports())
        for i in ports:
            if ("Arduino" in i.manufacturer):
                comPort = i.device
                print("Arduino found on port "+comPort)
        if counter == 60:
            print("Zoompad not found")
            return
        counter+=1
        await asyncio.sleep(1)
    global arduino
    arduino = serial.Serial(comPort, 9600, timeout=0)
    print("Arduino serial initialized, awaiting trigger")
    while True:
        await asyncio.sleep(0.1)
        arduinoRaw = arduino.readline()
        arduinoRaw2 = arduinoRaw.decode("utf-8")
        arduinoRead = arduinoRaw2.rstrip('\r\n')
        if arduinoRead == "join": #runs launch if meeting needs to be joined
            print("Launch triggered")
            currentCommand = arduinoRead
            asyncio.ensure_future(launchWithPassword())
        if arduinoRead == "leave":
            currentCommand = "leave"
            print("Disconnected from meeting")
        if arduinoRead == "mic":
            currentCommand = arduinoRead
            print("Microphone toggled")
        if arduinoRead == "cam":
            currentCommand = arduinoRead
            print("Camera toggled")

# async def arduinoRead():
#     while True:
#         print("testarduinoread")
#         global currentCommand
#         while True:
#             print("testarduino2")
#             await asyncio.sleep(1)
#             arduinoRaw = arduino.readline()
#             arduinoRaw2 = arduinoRaw.decode("utf-8")
#             arduinoRead = arduinoRaw2.rstrip('\r\n')
#             if arduinoRead == "leave":
#                 currentCommand = arduinoRead
#                 print("Arduino disconnected")
#                 return
#             if arduinoRead == "mic":
#                 currentCommand = arduinoRead
#             if arduinoRead == "cam":
#                 currentCommand = arduinoRead

# async def runLoops():
#     print("test")
#     await asyncio.gather(launchWithPassword(), arduinoRead())

async def main():
    curlLoop = asyncio.get_running_loop()
    arduinoLoop = asyncio.get_running_loop()

    curlLoop.create_task(curl())
    arduinoLoop.create_task(initializeArduino())

    curlLoop.run_forever()
    arduinoLoop.run_forever()

asyncio.run(main())
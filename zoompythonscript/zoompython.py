import asyncio
from playwright.async_api import async_playwright
import time
import serial
import serial.tools.list_ports
import pyautogui as pyg
import nest_asyncio
nest_asyncio.apply()

#ARDUINO VALUES

global currentCommand
global comPort
comPort = "COM0"
currentCommand = "idle"

#ID VALUES

computerID = "123456"

username = "Eric"

#VARIABLES

meetingJoined = False
meetingAvailable = False

#PLAYWRIGHT VAR

meetingCode = "7100320347"

password = "12345"

#ZOOM XPATH

microphoneButton = '//*[@id="foot-bar"]/div[1]/div[1]/button'

cameraButton = '//*[@id="foot-bar"]/div[1]/div[2]/button'

async def launch():
    global currentCommand
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, args=['--start-maximized', '--use-fake-ui-for-media-stream'])
        page = await browser.new_page(no_viewport=True)
        context = await browser.new_context()
        await context.grant_permissions(permissions=['microphone'])
        await context.grant_permissions(permissions=['camera'])
        await page.goto("https://zoom.com/wc/join/"+meetingCode)
        await asyncio.sleep(0.1)
        await page.locator('#inputname').fill(username)
        await asyncio.sleep(0.1)
        await page.locator('#joinBtn').click()
        await asyncio.sleep(0.1)
        await page.locator('#inputpasscode').fill(password)
        await asyncio.sleep(0.1)
        await page.locator('#joinBtn').click()
        while True:
            await asyncio.sleep(0.1)
            if currentCommand == "leave":
                print(currentCommand)
                currentCommand = "idle"
                
                await browser.close()
                return
            if currentCommand == "mic":
                print(currentCommand)
                await page.evaluate("()=>{var a=document.querySelector('#wc-footer');a.classList.remove('footer--hidden');}")
                await page.click(microphoneButton)
                currentCommand = "idle"
            if currentCommand == "cam":
                print(currentCommand)
                await page.evaluate("()=>{var a=document.querySelector('#wc-footer');a.classList.remove('footer--hidden');}")
                await page.click(cameraButton)
                currentCommand = "idle"

async def findCOM():
    global comPort
    while True:
        await asyncio.sleep(0.1)
        ports = list(serial.tools.list_ports.comports())
        for i in ports:
            if ("Arduino" in i.manufacturer):
                comPort = i.device

async def arduino():
    global currentCommand
    global comPort
    await asyncio.sleep(0.5)
    arduino = serial.Serial(comPort, 9600, timeout=0)
    while True:
        await asyncio.sleep(0.1)
        arduinoRaw = arduino.readline()
        arduinoRaw2 = arduinoRaw.decode("utf-8")
        arduinoRead = arduinoRaw2.rstrip('\r\n')
        if arduinoRead == "join":
            print(arduinoRead)
            currentCommand = arduinoRead
            asyncio.ensure_future(launch())
        if arduinoRead == "leave":
            currentCommand = arduinoRead
        if arduinoRead == "mic":
            currentCommand = arduinoRead
        if arduinoRead == "cam":
            currentCommand = arduinoRead

# async def cURL(): #Check cURL file for next available meeting
#     while True:
#         with open('zoomSessionInfo.txt') as f:
#             time.sleep(10)
#             info = f.readlines()
#             print(info[1])
#             #if (link[1] == computerID and link[2] == "available"):
#             #    meetingAvailable == True

async def main():
    findComLoop = asyncio.get_running_loop()
    arduinoSerialLoop = asyncio.get_running_loop()
    findComLoop.create_task(findCOM())
    arduinoSerialLoop.create_task(arduino())
    findComLoop.run_forever()
    arduinoSerialLoop.run_forever()

asyncio.run(main())

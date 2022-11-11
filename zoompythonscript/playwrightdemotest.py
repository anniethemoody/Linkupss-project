import asyncio
from playwright.async_api import async_playwright
import nest_asyncio
nest_asyncio.apply()

global currentCommand
currentCommand = "idle"

async def launch():
    global currentCommand
    with open('info.dat') as extract:
        file = extract.readlines()
        username = file[2]
        code = file[0]
        password = file[1]
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
                await page.click('//*[@id="foot-bar"]/div[1]/div[2]/button')
                currentCommand = "idle"
            if currentCommand == "cam":
                print(currentCommand)
                await page.evaluate("()=>{var a=document.querySelector('#wc-footer');a.classList.remove('footer--hidden');}")
                await page.click('//*[@id="foot-bar"]/div[1]/div[2]/button')
                currentCommand = "idle"
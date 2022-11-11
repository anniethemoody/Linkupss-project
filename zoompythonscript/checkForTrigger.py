from playwrightdemotest import launch
import requests
from requests.structures import CaseInsensitiveDict
import asyncio

triggerAPILink = "https://api.linkupss.com/checkfortrigger"

participantID = "22"

name = "Eric Test"

H = CaseInsensitiveDict()
H["accept"] = "application/json"
H["Content-Type"] = "application/json"
d = '{"participant_id":"'+participantID+'"}'

async def curl():
    while True:
        resp = requests.post(triggerAPILink, headers=H, data=d)
        resp = resp.json().items()
        print("Looking for meeting...")
        for key, value in resp:
            if key == 'meetinginfo':
                if len(value) > 0:
                    print('Meeting found!')
                    URL = value[0]['url']
                    password = value[0]['password']
                    with open('info.dat', 'w+') as store:
                        store.write(URL+'\n')
                        store.write(password+'\n')
                        store.write(name)
                    asyncio.ensure_future(launch())
                    await asyncio.sleep(62)
        await asyncio.sleep(2)

async def main():
    arduinoSerialLoop = asyncio.get_running_loop()
    arduinoSerialLoop.create_task(curl())
    arduinoSerialLoop.run_forever()

asyncio.run(main())
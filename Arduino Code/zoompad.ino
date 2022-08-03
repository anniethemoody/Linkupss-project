#include <ArduinoBLE.h>

int button1 = D2;
int button2 = D3;
int button3 = D4;
int button4 = D5;
int button1_value=0;
int button2_value=0;
int button3_value=0;
int button4_value=0;

BLEService ButtonService("A123"); // create service
BLEFloatCharacteristic ButtonValues("2A19", BLERead | BLENotify); //create characteristic for buttons, each integer in a sequence represents a specific button value

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  BLE.begin();

  BLE.setLocalName("Zoompad");
  BLE.setAdvertisedService(ButtonService); 
  ButtonService.addCharacteristic(ButtonValues); 
  BLE.addService(ButtonService); 

  BLE.advertise();

  
  pinMode(button1, INPUT_PULLUP);
  pinMode(button2, INPUT_PULLUP);
  pinMode(button3, INPUT_PULLUP);
  pinMode(button4, INPUT_PULLUP);
  
}

void loop() {
//serial monitor for debugging
  button1_value = digitalRead(button1);
  button2_value = digitalRead(button2);
  button3_value = digitalRead(button3);
  button4_value = digitalRead(button4);
  //button 1
  Serial.print("Button 1 value: ");
  Serial.println(button1_value);
  //button 2
  Serial.print("Button 2 value: ");
  Serial.println(button2_value);
  //button 3
  Serial.print("Button 3 value: ");
  Serial.println(button3_value);
  //button 4
  Serial.print("Button 4 value: ");
  Serial.println(button4_value);
  delay(1000);


  //ble part
  //TODO: have integers 1000, 100, 10, 1 and add them up together and use logic to find which ones are pressed
    BLEDevice central = BLE.central();
  if (central) {
    while (central.connected()) {
      ButtonValues.writeValue(button1_value);
      delay(250);
    }
  }
}

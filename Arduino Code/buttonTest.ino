#include <ezButton.h>

int join = 0;
int leave = 0;
int mic = 0;
int cam = 0;
ezButton joinButton(2);
ezButton leaveButton(4);
ezButton micButton(7);
ezButton camButton(12);
int joinLast = 0;
int leaveLast = 0;
int micLast = 0;
int camLast = 0;
const int joinLED = 3;
const int leaveLED = 5;
const int micLED = 9;
const int camLED = 13;
int joinState = 1;
int leaveState = 0;
int micState = 0;
int camState = 0;

void setup()
{
    Serial.begin(9600);
    joinButton.setDebounceTime(25);
    leaveButton.setDebounceTime(25);
    micButton.setDebounceTime(25);
    camButton.setDebounceTime(25);

    //david's code for pinModes of each input switch goes here:



    pinMode(joinLED, OUTPUT);
    pinMode(leaveLED, OUTPUT);
    pinMode(micLED, OUTPUT);
    pinMode(camLED, OUTPUT);
}

void loop()
{
    joinButton.loop();
    leaveButton.loop();
    micButton.loop();
    camButton.loop();
    join = joinButton.getState();
    leave = leaveButton.getState();
    mic = micButton.getState();
    cam = camButton.getState();
    digitalWrite(joinLED, joinState);
    digitalWrite(leaveLED, leaveState);

    
    if (micState == HIGH)
    {
        digitalWrite(micLED, HIGH);
    }
    else
    {
        digitalWrite(micLED, LOW);
    }
    if (camState == HIGH)
    {
        digitalWrite(camLED, HIGH);
    }
    else
    {
        digitalWrite(camLED, LOW);
    }
    if (join != joinLast && joinState == HIGH)
    {
        if (join == HIGH)
        {
            digitalWrite(joinLED, LOW);
            Serial.println("join");
            delay(12000);
            joinState = !joinState;
            leaveState = !leaveState;
            micState = HIGH;
            camState = HIGH;
        }
    }
    joinLast = join;
    if (leave != leaveLast && leaveState == HIGH)
    {
        if (leave == HIGH)
        {
            micState = LOW;
            camState = LOW;
            Serial.println("leave");
            delay(2000);
            joinState = !joinState;
            leaveState = !leaveState;
        }
    }
    leaveLast = leave;
    if (mic != micLast && leaveState == HIGH)
    {
        if (mic == HIGH)
        {
            Serial.println("mic");
            micState = !micState;
        }
    }
    micLast = mic;
    if (cam != camLast && leaveState == HIGH)
    {
        if (cam == HIGH)
        {
            Serial.println("cam");
            camState = !camState;
        }
    }
    camLast = cam;
}

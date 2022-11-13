
#ifndef ezButton_h
#define ezButton_h

#define COUNT_FALLING 0
#define COUNT_RISING 1
#define COUNT_BOTH 2

class ezButton
{
private:
    int btnPin;
    unsigned long debounceTime;
    unsigned long count;
    int countMode;

    int previousSteadyState;  // the previous steady state from the input pin, used to detect pressed and released event
    int lastSteadyState;      // the last steady state from the input pin
    int lastFlickerableState; // the last flickerable state from the input pin
    int currentState;         // the current reading from the input pin

    unsigned long lastDebounceTime; // the last time the output pin was toggled

public:
    ezButton(int pin);
    void setDebounceTime(unsigned long time);
    int getState(void);
    int getStateRaw(void);
    bool isPressed(void);
    bool isReleased(void);
    void setCountMode(int mode);
    unsigned long getCount(void);
    void resetCount(void);
    void loop(void);
};

#endif

ezButton::ezButton(int pin)
{
    btnPin = pin;
    debounceTime = 0;
    count = 0;
    countMode = COUNT_FALLING;

    pinMode(btnPin, INPUT_PULLUP);

    previousSteadyState = digitalRead(btnPin);
    lastSteadyState = digitalRead(btnPin);
    lastFlickerableState = digitalRead(btnPin);

    lastDebounceTime = 0;
}

void ezButton::setDebounceTime(unsigned long time)
{
    debounceTime = time;
}

int ezButton::getState(void)
{
    return lastSteadyState;
}

int ezButton::getStateRaw(void)
{
    return digitalRead(btnPin);
}

bool ezButton::isPressed(void)
{
    if (previousSteadyState == HIGH && lastSteadyState == LOW)
        return true;
    else
        return false;
}

bool ezButton::isReleased(void)
{
    if (previousSteadyState == LOW && lastSteadyState == HIGH)
        return true;
    else
        return false;
}

void ezButton::setCountMode(int mode)
{
    countMode = mode;
}

unsigned long ezButton::getCount(void)
{
    return count;
}

void ezButton::resetCount(void)
{
    count = 0;
}

void ezButton::loop(void)
{
    // read the state of the switch/button:
    currentState = digitalRead(btnPin);

    // check to see if you just pressed the button
    // (i.e. the input went from LOW to HIGH), and you've waited long enough
    // since the last press to ignore any noise:

    // If the switch/button changed, due to noise or pressing:
    if (currentState != lastFlickerableState)
    {
        // reset the debouncing timer
        lastDebounceTime = millis();
        // save the the last flickerable state
        lastFlickerableState = currentState;
    }

    if ((millis() - lastDebounceTime) >= debounceTime)
    {
        // whatever the reading is at, it's been there for longer than the debounce
        // delay, so take it as the actual current state:

        // save the the steady state
        previousSteadyState = lastSteadyState;
        lastSteadyState = currentState;
    }

    if (previousSteadyState != lastSteadyState)
    {
        if (countMode == COUNT_BOTH)
            count++;
        else if (countMode == COUNT_FALLING)
        {
            if (previousSteadyState == HIGH && lastSteadyState == LOW)
                count++;
        }
        else if (countMode == COUNT_RISING)
        {
            if (previousSteadyState == LOW && lastSteadyState == HIGH)
                count++;
        }
    }
}

/*

*/
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
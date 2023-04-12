# LINKUPSS
LINKUPSS is a platform designed to make participating in online meetings and activities easier for seniors. Our solution consists of a user-friendly and intuitive meeting manager for meeting hosts, as well as a physical device called the Linkpad that serves as a one-click-to-join solution for meeting members. The Linkpad features large, easy-to-press buttons with attention-grabbing lights, enabling seniors and those with disabilities to easily join and participate in virtual meetings. Our goal is to promote social inclusion, community engagement, and overall well-being, while providing equal access to technology and services for all members of society.

## Features
### For Hosts/Admins (linkupss.com)
- User Management: 
Admins can easily add participants to their organization, and can assign different meetings to different participants
- Meeting Management: 
Admins can schedule, start, and manage online meetings in one place

### For Seniors (Linkpad)
- Four easy buttons:
Seniors have one-click access to basic meeting functions: Join meeting, Leave meeting, Toggle microphone, Toggle camera
- Bright LEDs: 
Attention-grabbing LEDs that flash when a meeting has been called, as well as display microphone/camera status

## Technologies Used
- React.js for frontend development
- Flask for backend development
- Firebase for authentication
- MySQL for database and storage
- Amazon Web Services (AWS) for hosting

## How to run our code
1) clone our repository
```
git clone https://github.com/ambroseling/Linkupss-project.git
```

2) Technology testing: 

### Meeting Managemetnt System - React App 
- To run our React app, start a terminal window at linkupss-app directory

```javascript
npm start
```

- To do any testing on our dashboard or frontend, login with credentials:
```
Email : jamesye@gmail.com
Password: jamesye
```

### Arduino Code
- For our Linkpad we used a SEEED studio XIAO nRF5840 microcontroller to control all inputs from the senior users. To see our full schematic for the pad, you can visit [here](https://www.tinkercad.com/things/3qNMJpLZFGd?sharecode=_uwIGY4jK6Z1Inu4f1ZSCcdVEBMK_WpNFaEPrrtq2_M)

### Flutter App
- For our flutter app...

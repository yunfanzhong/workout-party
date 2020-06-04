# workout-party 🥳

Project for CS 97.

Team: Ethan Shahbazian, Frank Zheng, Jason Jewik, Yunfan Zhong

## Backend server setup
Paste the following into `server/.env`.
```
MONGO_URI=mongodb+srv://frank:Wk0KYnSePbKrCBzN@the-milky-way-xgvel.mongodb.net/workout-party?retryWrites=true&w=majority
PORT=3000
FACEBOOK_APP_ID=703716050458717
FACEBOOK_APP_SECRET=20e2f790d8bb774693971cc16430c130
```
Then run:
```
cd server
npm i
npm start
```

## Frontend setup
Paste the following into `client/env.json`.

```
{
  "facebookAppID": "703716050458717"
}
```

Then run:

```
npm i -g expo-cli
npm i
npm start
```

The Expo server should start at `localhost:19002`.

## Android setup
If you have an Android device, download the Expo app from the Play Store and scan the QR code [here](https://expo.io/@franktzheng/workout-party) to start the Workout Party app.

Otherwise, follow the instructions [here](https://docs.expo.io/workflow/android-studio-emulator/) to run an Android emulator on your computer.

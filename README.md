# workout-party 🥳

Final project for CS 97.

Team: Ethan Shahbazian, Frank Zheng, Jason Jewik, Yunfan Zhong

## Setup

### Android

If you have an Android device, download the Expo app from the Play Store and scan the QR code [here](https://expo.io/@franktzheng/workout-party) to start the Workout Party app. Otherwise, follow the instructions [here](https://docs.expo.io/workflow/android-studio-emulator/) to run an Android emulator on your computer.

### iOS

> Note: this is not thoroughly tested, as the application was created for Android devices. Some functionality is not guaranteed to work with

Follow the instructions below to build the frontend from source. Apple prevents users from running Expo apps directly from the cloud.

Download the Expo app from the App Store. Scan the QR code from the running client on your computer or the QR code [here](https://expo.io/@franktzheng/workout-party) to start the Workout Party app.

## Building From Source

### Frontend

To build the frontend from the source code, make sure you have Node.js installed. Then run the following in the command line:

```shell
npm install -g expo-cli # Installs the expo-cli *globally*
cd client
npm install
npm start
```

The Expo server should start at `localhost:19002`. Follow the instructions for either Android/iOS above to view the app on your phone or emulator.

### Backend

The backend is hosted on Heroku, so there is no need to build it from source.

If you would still like to build the backend from the source code, make sure you have Node.js installed. Then run the following in the command line:

```shell
cd server
npm install
npm start
```

Note that if you run the frontend locally as well, it will not access your local server. To do so, you will need to rebuild the frontend with the following line in `client/utils/API.js` (currently commented out).

```js
const BASE_URL =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? 'http://' + manifest.debuggerHost.split(`:`).shift().concat(':3000')
    : `api.example.com`
```

## Considerations

- Keep in mind that the backend is hosted on a free Heroku dyno. It may take up to a minute for the first request to get through, so be patient when first loading the app.
- If you would like to be able to create a workout party, you need to add some friends first! Here are a few usernames you can use that are currently in our database: `boiledwatermelon`, `bufa`, `eshah22`.

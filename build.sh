#!/bin/bash

echo "window.firebaseConfig = {" > firebase-config.js
echo "  apiKey: \"${FIREBASE_API_KEY}\"," >> firebase-config.js
echo "  authDomain: \"${FIREBASE_AUTH_DOMAIN}\"," >> firebase-config.js
echo "  projectId: \"${FIREBASE_PROJECT_ID}\"," >> firebase-config.js
echo "  storageBucket: \"${FIREBASE_STORAGE_BUCKET}\"," >> firebase-config.js
echo "  messagingSenderId: \"${FIREBASE_MESSAGING_SENDER_ID}\"," >> firebase-config.js
echo "  appId: \"${FIREBASE_APP_ID}\"," >> firebase-config.js
echo "  measurementId: \"${FIREBASE_MEASUREMENT_ID}\"" >> firebase-config.js
echo "};" >> firebase-config.js

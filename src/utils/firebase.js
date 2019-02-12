import firebase from "firebase";

const config = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  storageBucket: `${process.env.STORAGE_BUCKET}.appspot.com`
}

firebase.initializeApp(config)

export default firebase
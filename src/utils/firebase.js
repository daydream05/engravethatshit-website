import firebase from "firebase";
import 'firebase/storage'

const config = {
  apiKey: `${process.env.GATSBY_FIREBASE_API_KEY}`,
  storageBucket: `${process.env.GATSBY_STORAGE_BUCKET}.appspot.com`
}

firebase.initializeApp(config)

export default firebase
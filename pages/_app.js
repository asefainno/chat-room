import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

export default function App({ Component, pageProps }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCofpGDhWncXT0dPgUO1U-mgkm81xrf6_U",
    authDomain: "asefachat.firebaseapp.com",
    databaseURL: "https://asefachat-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "asefachat",
    storageBucket: "asefachat.appspot.com",
    messagingSenderId: "22523063784",
    appId: "1:22523063784:web:68ab7dc9698ef31866085d",
    measurementId: "G-EXYBBTH66Z",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // const analytics = getAnalytics(app);
  console.log("[app]", app);
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

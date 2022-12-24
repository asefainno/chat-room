import styles from "../styles/Home.module.css";
import React, { useEffect, useState, useRef } from "react";
import { Grid, Text } from "@nextui-org/react";
import { collection, addDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
export default function Home() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [name, setName] = useState(Math.floor(Math.random() * 3));
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

  const readdata = async () => {
    // setData([]);
    const q = query(collection(db, "message"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push(doc.data());
      });
      setData(datas.sort((a, b) => a.date - b.date));
    });
  };

  // readdata();
  useEffect(() => {
    readdata();
  }, []);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const sendMessage = async () => {
    console.log(message);
    try {
      const docRef = await addDoc(collection(db, "message"), {
        key: Math.random().toString().replace(".", ""),
        name: name,
        message: message,
        date: Date.now(),
      });
      setMessage("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Grid.Container gap={2} justify={"center"} style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Grid xs={6} md={12} style={{ width: "100%", height: "10vh", backgroundColor: "#f1f ", justifyContent: "flex-start", alignItems: "center" }}>
        <h1 style={{ fontSize: 20, fontWeight: "bolder" }}>{name}</h1>
      </Grid>
      <Grid
        xs={6}
        md={12}
        style={{ width: "100%", height: "vh", backgroundColor: "#1ff ", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}
      >
        {data.map((item) => (
          <div
            style={{
              flexDirection: "column",
              alignSelf: item.name == name ? "flex-end" : "flex-start",
              backgroundColor: "#1f1",
              padding: "5px",
              margin: "5px",
              width: "100px",
            }}
          >
            <h4>{item.name}</h4>
            <h6>{item.message}</h6>
          </div>
        ))}
      </Grid>
      <Grid xs={6} md={12}>
        <div className="panel-footer">
          <div className="input-group">
            <input
              onChange={(e) => {
                setMessage(e.target.value);
                console.log(e.target.value);
              }}
              value={message}
              id="btn-input"
              type="text"
              placeholder="Type your message here..."
            />
            <span className="input-group-btn">
              <button
                className="btn btn-primary btn-sm"
                id="btn-chat"
                onClick={() => {
                  sendMessage();
                }}
              >
                Send
              </button>
            </span>
          </div>
        </div>
      </Grid>
    </Grid.Container>
  );
}

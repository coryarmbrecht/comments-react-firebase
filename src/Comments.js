import React, { useEffect, useState } from "react";
import { fadeInUp, shake, tada } from "react-animations";
import "./style.scss";
import Comment from "./Comment";
import { FbAppDb } from "./firebasesetup";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { css, StyleSheet } from "aphrodite";
import "./custom.css";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const dbRef = collection(FbAppDb, "comments");
  const q = query(
    collection(FbAppDb, "comments"),
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      setComments(arr);
    });
  }, []);

  const suggest = async () => {
    if (message) {
      try {
        const obj = {
          comment: message,
          timestamp: serverTimestamp(),
        };
        setMessage("");
        const docRef = await addDoc(dbRef, obj);
        alert("Comment has been added successfully");
      } catch (error) {
        alert("Some issue occured please try again");
        console.log(error);
      }
    } else {
      alert("Please enter a comment");
    }
  };

  return (
    <div styles={{ height: "100%", backgroundColor: "coral" }}>
      <h2
        styles={{
          color: "white",
          fontSize: 20,
          textAlign: "center",
          margin: 0.2,
        }}
      >
        Comments
      </h2>
      <div
        className={css(styles.list)}
        styles={{ alignSelf: "center", overflowY: "scroll" }}
      >
        {comments?.map((comment, i) => {
          return (
            <li key={i} className={`fade-in-up`}>
              <Comment comment={comment.comment} />
            </li>
          );
        })}
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          // onBlur={this.onBlur}
          placeholder="Enter your comment here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={suggest} title="Submit">
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default Comments;

const styles = StyleSheet.create({
  list: {
    listStyle: "none",
    backgroundColor: "silver",
    borderRadius: "10px",
    border: "2px",
    borderColor: "tomato",
    color: "white",
    margin: "10px",
    padding: "10px",
    height: "250px",
    // Make this a different
    //animationName: fadeInUp,
    animationDuration: "1s",
    transitionProperty: "all",
    overflowY: "scroll",
    /*
		':hover': {
			animationName: shake
		}
		*/
  },
  fadeInUp: {
    animationName: fadeInUp,
    animationDuration: "1s",
  },
  shake: {
    animation: "shake 1s",
  },
});

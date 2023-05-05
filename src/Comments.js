// import React, { Component } from "react";
// import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import _ from "lodash";
// import moment from "moment";
// // import timeago from "timeago.js";
// // import { FbAppDB } from "./firebasesetup";
// import { FbAppDb } from "./firebasesetup";
// import { collection } from "firebase/firestore";

import { fadeInUp, shake, tada } from "react-animations";
// import { StyleSheet, css } from "aphrodite";
// // import "./style.scss";
// // import Comment from "./Comment";
import Comment from "./Comment";
// // import Transition from "react-transition-group/Transition";
// const commentsDB = collection(FbAppDb, "comments");

// // const messagesRef = FBApp.ref("messages/");

// export default class Comments extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loaded: false,
//       newComment: "New Comment",
//       store: {},
//       comment: "New Comment",
//       comments: [
//         { comment: "Change this page...", uid: "159djb" },
//         { comment: "Add this feature...", uid: "45adb" },
//         { comment: "You have a bug that...", uid: "z5djb" },
//       ],
//       commentsRef: commentsDB,
//       theme: null,
//       toggled: false,
//     };
//   }
//   componentWillMount = () => {
//     console.log("componentWillMount this.state = ", this.state);
//     //this.setState({comments:this.retrievedComments})

//     let retrievedTopComments = this.state.commentsRef.on(
//       "value",
//       (snapshot) => {
//         //console.log('retirevedComments snapshot = ', snapshot.val());

//         const snapshotComments = _.values(snapshot.val());
//         //console.log('snapshotComments = ', snapshotComments)
//         const snapshotCommentsKeys = _.keys(snapshot.val());
//         //console.log('snapshotCommentsKeys = ', snapshotCommentsKeys)
//         console.log("loaded:true");
//         //let snapshotCommentsArray = Object.keys(snapshotComments);
//         //console.log('snapshotCommentsArray = ', snapshotCommentsArray)
//         this.setState({ comments: _.reverse(snapshotComments), loaded: true });
//       },
//       function (error) {
//         //console.log("Error: " + error.code);
//       }
//     );
//   };
//   onBlur = (event) => {
//     console.log("onBlur event.target.value = ", event.target.value);
//     this.setState({ newComment: event.target.value });
//   };
//   suggest = () => {
//     console.log("suggested");
//     console.log("newComment = ", this.state.newComment);
//     let newCommentKey = this.state.commentsRef.push().key;

//     this.state.commentsRef.child(newCommentKey).update({
//       comment: this.state.newComment,
//       ts: moment.now(),
//       uid: newCommentKey,
//     });
//   };
//   componentWillUnmount = () => {
//     this.state.commentsRef.off("value", (offval) => {
//       console.log("componentWillUnmount = ", offval);
//     });
//   };
//   /*
// 	shouldComponentUpdate = (newprops) => {
// 		console.log('Comments shouldComponentUpdate, newprops = ', newprops)
// 		if(this.state.loaded === true){

// 			return false
// 		}
// 		return true

//     }
//     */
//   // componentWillReceiveProps = (newProps) => {
//   //   console.log("Comments shouldComponentUpdate, newprops = ", newprops);
//   // };
//   render = () => {
//     console.log("comments render this.state =", this.state);
//     return (
//       <div styles={{ height: "100%", backgroundColor: "coral" }}>
//         <h2
//           styles={{
//             color: "white",
//             fontSize: 20,
//             textAlign: "center",
//             margin: 0.2,
//           }}
//         >
//           Comments
//         </h2>
//         {/*
// 				<ReactCSSTransitionGroup
// 					transitionName="listAnim"
// 					transitionEnterTimeout={1500}
// 					transitionLeaveTimeout={500}
// 					transitionAppear={true}
// 					transitionAppearTimeout={1000}
// 				>
// 				<div styles={{alignSelf:'center', backgroundColor:'white','overflowY':'scroll'}}>
//                     {
//                         this.state.comments.map((comment, index) => {
//                             //console.log('comment = ', comment)
//                             return <li key={index} ><Comment comment={comment.comment}  /></li>
//                         })
//                     }
// 				</div>
// 				</ReactCSSTransitionGroup>
// 				*/}
//         <div
//           className={css(styles.list)}
//           styles={{ alignSelf: "center", overflowY: "scroll" }}
//         >
//           <ReactCSSTransitionGroup
//             transitionName="fadr"
//             transitionEnterTimeout={3000}
//             transitionLeaveTimeout={1000}
//             transitionAppear={true}
//             transitionAppearTimeout={1000}
//           >
//             {this.state.comments.map((comment) => {
//               console.log("comment = ", comment);
//               return (
//                 <li key={comment.uid}>
//                   <Comment comment={comment.comment} />
//                 </li>
//               );
//             })}
//           </ReactCSSTransitionGroup>
//         </div>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             id="name"
//             type="text"
//             onBlur={this.onBlur}
//             placeholder="Enter your comment here..."
//           />
//           <button onClick={this.suggest} title="Submit">
//             Submit Comment
//           </button>
//         </div>
//       </div>
//     );
//   };
// }

import React, { useEffect, useState } from "react";
import { FbAppDb } from "./firebasesetup";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { css, StyleSheet } from "aphrodite";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const dbRef = collection(FbAppDb, "comments");
  const q = query(collection(FbAppDb, "comments"));

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
        console.log("snapshot ", arr);
      });
      setComments(arr);
    });
  }, []);

  const suggest = async () => {
    try {
      const docRef = await addDoc(dbRef, { comment: message });
      setMessage("");
      alert("Comment has been added successfully");
    } catch (error) {
      alert("Some issue occured please try again");
      console.log(error);
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
        {/* <ReactCSSTransitionGroup
          transitionName="fadr"
          transitionEnterTimeout={3000}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={1000} */}
        {/* > */}
        {comments?.map((comment) => {
          console.log("comment = ", comment);
          return (
            <li key={comment.id}>
              <Comment comment={comment.comment} />
            </li>
          );
        })}
        {/* </ReactCSSTransitionGroup> */}
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

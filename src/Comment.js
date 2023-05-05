// import React, { Component } from "react";
// import _ from "lodash";
import "./style.scss";

// export default class Comment extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       comment: this.props.comment || "Nopes.",
//       hello: "world",
//       visualState: "--empty",
//     };
//   }
//   componentWillMount = () => {
//     /*
// 		console.log('Comment componentWillMount')
//         */
//     setTimeout(() => {
//       //console.log('Comment componentDidMount')
//       //
//     }, 500);
//   };
//   componentDidMount = () => {
//     console.log("Comment componentDidMount");

//     this.setState({ visualState: "" });
//     setTimeout(() => {
//       //console.log('Comment componentDidMount')

//       console.log("visualState = ", this.state.visualState);
//     }, 1500);
//   };
//   componentWillUnMount = () => {
//     //console.log('Comment componentWillUnMount')
//     setTimeout(() => {
//       //this.setState({visualState:'--exit'})
//     }, 2500);
//   };

//   componentWillReceiveProps = (newProps) => {
//     //console.log('Comment componentWillReceiveProps newProps.comment = ', newProps.comment)
//     //console.log('Comment componentWillReceiveProps this.state.comment = ', this.state.comment)
//     if (newProps.comment !== this.state.comment) {
//       console.log(
//         "componentWillReceiveProps newProps is new = ",
//         newProps.comment
//       );
//       setTimeout(() => {
//         console.log("Comment componentWillReceiveProps --edited");
//         this.setState({ visualState: "--edited" });
//       }, 500);
//     } else {
//       //console.log('componentWillReceiveProps newProps is not new = ', newProps.comment)
//     }
//   };

//   render = () => {
//     //console.log('Comment render')
//     return (
//       <div className={"comment" + this.state.visualState}>
//         UserImage UserName Time {this.state.visualState}
//         <p>{this.props.comment}</p>
//       </div>
//     );
//   };
// }

import React, { useState } from "react";

const Comment = ({ comment }) => {
  const [animate, setAnimate] = useState("");

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  };
  return (
    <div className={`comment ${animate && "tada"}`} onClick={handleClick}>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;

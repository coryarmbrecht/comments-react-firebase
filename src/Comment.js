import React, { useState } from "react";
import "./style.scss";

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

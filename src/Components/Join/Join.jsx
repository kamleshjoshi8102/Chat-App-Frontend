import React, { useState } from "react";
import "./Join.css";
import logo from "../../Components/images/logo.png";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById('joinInput')?.value;

// console.log(document.getElementById('joinInput'));
  document.getElementById('joinInput').value = "";
};


const Join = () =>{

  const [name, setName] = useState("");

//   console.log(name); 
  
  return (
    <>
      <div className="JoinPage">
        <div className="JoinContainer">
          <img src={logo} alt="Logo" />
          <h1>C Chat </h1>
          <input
            onChange={(e) => {
                // console.log(e);
              setName(e.target.value);
            }}
            type="text"
            id="joinInput"
            placeholder="Enter Your Name"
          />
          <Link
            onClick={(event) => !name?event.preventDefault(): null}
            to="/chat"
          >
            <button onClick={sendUser} className="joinbtn">
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Join;
export { user };

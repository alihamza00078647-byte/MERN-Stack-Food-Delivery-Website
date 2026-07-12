import { useEffect, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";

function LoginPopup({ setShowLogin }) {
  // const [currentState, setCurrentState] = useState("Sign Up");
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({...data, [name]:value}));
  }

  useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" onChange={() => onChangeHandler} value={data.name} placeholder="name" className="" required />
          )}

          <input type="email" name="email" placeholder="Email" onChange={() => onChangeHandler} value={data.email}  required />
          <input
            onChange={() => onChangeHandler} value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Countinuing, I Agree Terms & Conditions</p>
        </div>
        {currentState === "Sign Up" ? (
          <p>
            Already have An Account? <span onClick={() => setCurrentState("Login")}>Login</span>
          </p>
        ) : (
          <p>
            Create a New Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;

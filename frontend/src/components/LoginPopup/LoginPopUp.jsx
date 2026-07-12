import { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";




function LoginPopup({ setShowLogin }) {
  const { backendURL, setToken } = useContext(StoreContext);

  // const [currentState, setCurrentState] = useState("Sign Up");
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newURL = "";
    if (currentState === "Login") {
      newURL = `${backendURL}/api/user/login`;
    } else {
      newURL = `${backendURL}/api/user/register`;
    }

    // console.log(newURL, data)
    const response = await axios.post(newURL, data);
    if (response.data.success) {
      // console.log(response);
      toast.success(response.data.message);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
      // alert(response.data.message);
    }
  };

  
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
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
            <input
              type="text"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="name"
              name="name"
              className=""
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
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
            Already have An Account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login</span>
          </p>
        ) : (
          <p>
            Create a New Account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;

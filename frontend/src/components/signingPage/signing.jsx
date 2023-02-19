import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const naviagate = useNavigate();
  useEffect(() => {
    const userInfo = window.localStorage.getItem("userInfo");
    if (userInfo) {
      naviagate("/");
    }
  }, [naviagate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [response, setRespose] = useState({ status: false, message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  const submitDetails = async (event) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "signin",
        { email: user.email, password: user.password },
        config
      );
      if (typeof data === "object") {
        window.localStorage.setItem("userInfo", JSON.stringify(data));
        naviagate("/");
      } else {
        if (data) {
        }
        setRespose({ status: true, message: data });
        setTimeout(() => {
          setRespose({ status: false, message: "" });
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    setUser({
      email: "",
      password: "",
      confirmPassword: "",
    });
    event.preventDefault();
  };
  return (
    <div style={{ marginTop: "15vh" }}>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px solid black",
          width: "50%",
          // height:"0vh",
          marginTop: "20px",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            id="Sign-In"
            style={{
              width: "100%",
              border: "0px solid black",
              margin: "0%",
              textAlign: "center",
              cursor: "pointer",
              color: "green",
              fontWeight: "bold",
              fontSize: "large",
            }}
          >
            {" "}
            <h3
              onClick={() => {
                naviagate("/signin");
              }}
            >
              Sign In{" "}
            </h3>
          </div>{" "}
          <div
            id="Sign-up"
            style={{
              width: "100%",
              border: "0px solid black",
              margin: "0%",
              textAlign: "center",
              cursor: "pointer",
              color: "rgb(85,89,92)",
              fontWeight: "normal",
              fontSize: "medium",
              opacity: "0.5",
            }}
          >
            {" "}
            <h3
              onClick={() => {
                naviagate("/signup");
              }}
            >
              Sign up
            </h3>
          </div>
        </div>
        <div
          style={{
            margin: "20px",
            border: "2px double black",
            borderRadius: "50%",
            padding: "10px",
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2021/01/07/08/51/naruto-5896570_1280.png"
            alt="naruto"
            width="72"
            height="57"
          />
        </div>
        <div>{response.status && <Alert>{response.message}</Alert>}</div>
        <div>
          <form
            method="Post"
            action="signup"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignContent: "center",
            }}
          >
            <input
              placeholder="Email address"
              style={{ marginBottom: "10px", width: "40vw" }}
              onChange={handleChange}
              name="email"
              type="email"
              value={user.email}
            ></input>
            <input
              type="password"
              placeholder="Password"
              style={{ marginBottom: "10px", width: "40vw" }}
              onChange={handleChange}
              name="password"
              value={user.password}
            ></input>
            <Button variant="success" onClick={submitDetails}>
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;

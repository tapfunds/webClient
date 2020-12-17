import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../utils/firebase";
import { StyleSheet, css } from "aphrodite";
import { Card, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useHistory  } from "react-router-dom";

const styles = StyleSheet.create({
  wrapper: {
    height: "82vh",
    minHeight: "82vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "50px",
  },
  subwrapper: {
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  signIn: {
    paddingLeft: "50px",
    paddingRight: "50px",
    flexGrow: 4,
    alignSelf: "center",
  },
  text: {
    fontSize: "32px",
    lineHeight: "35px",
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  subtext: {
    color: "black",
    padding: "10px",
  },
  button: {
    background: "#48A9FF",
    border: "none",
    fontStyle: "italic",
    color: "white",
  },
  footer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  card: {
    width: "500px",
    fontSize: "30px",
  },
});

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  let history = useHistory();

  const redirect = () => {
    history.push('/home')
  }

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).then(()=>{
      redirect()
    }).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(()=>{
      redirect()
    }).catch((error) => {
      setError("Error signing in with Google");
      console.error("Error signing in with Google", error);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <React.Fragment>
      <div className={css(styles.wrapper)}>
        <div className={css(styles.signIn)}>
          <Card
            title={<h1 className={css(styles.text)}>Sign In</h1>}
            className={css(styles.card)}
          >
            {error !== null && <div>{error}</div>}

            <form>
              <div className={css(styles.subtext)}>
                <Input
                  placeholder="Email"
                  type="email"
                  name="userEmail"
                  value={email}
                  id="userEmail"
                  onChange={(event) => onChangeHandler(event)}
                />
              </div>

              <div className={css(styles.subtext)}>
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  type="password"
                  name="userPassword"
                  value={password}
                  id="userPassword"
                  onChange={(event) => onChangeHandler(event)}
                />
              </div>
            </form>
            <div className={css(styles.subtext)}>
              <Button
                className={css(styles.button)}
                onClick={(event) => {
                  signInWithEmailAndPasswordHandler(event, email, password);
                }}
              >
                Sign in
              </Button>
            </div>
            <div className={css(styles.subtext)}>
              <Button
                className={css(styles.button)}
                onClick={() => {
                  signInWithGoogle();
                }}
              >
                Sign in with Google
              </Button>
            </div>
          </Card>
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link> <br />{" "}
            <Link to="/reset">Forgot Password?</Link>
          </p>
        </div>
        <div className={css(styles.footer)}>
          <a href="emailwho">Contact Us</a> &nbsp;{" "}
          <a href="privacyright">Privacy</a> &nbsp; <a href="legal">Legal</a>{" "}
          &nbsp;
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignIn;

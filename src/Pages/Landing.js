import React, { useContext } from "react";
import { UserContext } from "../utils/UserProvider";
import { Redirect, Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { FooterContainer } from "../Components/Navigation/FooterContainer";

const styles = StyleSheet.create({
  wrapper: {
    height: "200vh",
    minHeight: "200vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "50px",

  },
  subwrapper:{
    paddingLeft: "50px",
    paddingRight: "50px",
    

  },
  text: {
    fontSize: "42px",
    lineHeight: "35px",
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
    
  },
  subtext: {
    lineHeight: "35px",
    color: "black",
  },
});

function Landing() {
  const user = useContext(UserContext);
  return user ? (
    <Redirect to="/home" />
  ) : (
    <React.Fragment>
      <div className={css(styles.wrapper)}>

      <div className={css(styles.subwrapper)}>
        <div className={css(styles.text)}>Transfer Money Fast</div>
        <p className={css(styles.subtext)}>
          Safely transfer funds bewteen any of your personal accounts
        </p>
      </div>

      <div className={css(styles.subwrapper)}>
        <div className={css(styles.text)}>Understand Spending Habits</div>
        <p className={css(styles.subtext)}>
          View account trends to advise yourself on better money habits
        </p>
      </div>
      <div className={css(styles.subwrapper)}>
        Sign up now!{" "}
        <button>
          <Link to="/login">Tap your finances</Link>
        </button>
      </div>
      <div>
        <FooterContainer />
      </div>
    </div>
    </React.Fragment>
  );
}

export default Landing;

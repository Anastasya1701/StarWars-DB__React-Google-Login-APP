import React from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";

const LoginPage = ({ isLoggedIn, onLogin }) => {
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const responseGoogle = response => {
    console.log("response", response);
    if (response) onLogin();
  };

  return (
    <div className="jumbotron">
      <p>Login to see secret page!</p>
      <GoogleLogin
        clientId="1068607023062-vnk0l7t2d891cbi5ho4qnoumb7fbdj1m.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginPage;

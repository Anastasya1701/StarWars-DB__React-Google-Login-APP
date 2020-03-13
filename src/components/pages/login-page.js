import React from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

const LoginPage = ({ isLoggedIn, onLogin }) => {

  if (isLoggedIn) {
    return <Redirect to="/"/>;
  }

    const responseGoogle = (response) => {
        console.log(response);
    }

  return (
    <div className="jumbotron">
      <p>Login to see secret page!</p>
        <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            isSignedIn={true}
            // onClick={onLogin}
        />
      {/*<button*/}
      {/*  className="btn btn-primary"*/}
      {/*  onClick={onLogin}>*/}
      {/*  Login*/}
      {/*</button>*/}
    </div>
  );
};

export default LoginPage;

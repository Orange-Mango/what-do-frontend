import React, { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    function setupGAPI() {
      window.gapi.signin2.render("google-sign-in-button", {
        width: 200,
        height: 50,
        onsuccess: onSuccess,
      });
    }
    setupGAPI();
  }, []);

  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log("Name: " + profile.getName());
  };

  return <div id="google-sign-in-button" className="g-signin2"></div>;
};

export default Login;

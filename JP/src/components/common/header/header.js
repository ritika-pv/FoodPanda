import React from "react";
import "./header.css";
import logo from "../../../images/logo.png";
import profile from "../../../images/profile.jpg";
import MyTextButton from "../button/buttons";

export const Header = () => {
  function handleLogin() {
    console.log("Login Button Clicked");
  }
  function handleSignup() {
    console.log("SignUp Button Clicked");
  }
  const isLoggedIn = false;

  return (
    <div className="max-width header">
      <img src={logo} alt="Logo" className="header-logo" />
      <div className="header-right">
        <div className="header-location-search-container">
          <div className="location-wrapper">
            <div className="location-icon-div">
              <i className="fi fi-rs-marker absolute-center location-drop-icon"></i>
              <div>Hyderabad</div>
            </div>
            <i className="fi fi-rs-caret-down absolute-center"></i>
          </div>
          <div className="location-search-separator"></div>

          <div className="header-search-bar">
            <div>
              <i className="fi fi-rs-search absolute-center search-icon"></i>
            </div>

            <div>
              <input
                placeholder="Search for cuisine or a dish"
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="profile-wrapper">
          {isLoggedIn ? (
            <>
              <img
                src={profile}
                alt="Profile"
                className="header-profile-image"
              />
              <span className="profile-username">John Wick</span>
              <i class="fi fi-rr-angle-down absolute-center profile-option-down"></i>
            </>
          ) : (
            <div className="not-logged-in absolute-center">
              <div className="log-in">
                <MyTextButton className="sign-in-button" onClick={handleLogin} style={{"color":"#ff5f1f"}} label="Log In" />
              </div>
              <div className="sign-up">
                <MyTextButton className="sign-up-button" onClick={handleSignup} style={{"color":"#ff5f1f"}} label="Sign Up" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

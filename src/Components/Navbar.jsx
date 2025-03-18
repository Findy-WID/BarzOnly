import React from "react";
import Swal from "sweetalert2";
import barzonlyFavicon from "../assets/barzonlyFavicon.png";
import "../Styles/Navbar.css"

export default function Navbar({ isLoggedIn, onLogin, onLogout }) {
  // Function to handle login/signup popups
  const handleAuthPopup = (action) => {
    Swal.fire({
      title: action === "login" ? "Log In" : "Create Account",
      html: `
        <input type="email" id="email" class="swal2-input" placeholder="Enter your email">
        <input type="password" id="password" class="swal2-input" placeholder="Enter your password">
      `,
      confirmButtonText: action === "login" ? "Log In" : "Sign Up",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        if (!email || !password) {
          Swal.showValidationMessage("Both fields are required!");
        } else {
          return { email, password };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onLogin();
        Swal.fire({
          icon: "success",
          title: `Welcome, ${result.value.email.split("@")[0]}!`,
          text: action === "login" ? "You are now logged in." : "Account created successfully!",
        });
      }
    });
  };

  return (
    <nav>
      <img src={barzonlyFavicon} alt="BarzOnly Logo" />
      <h1>BarzOnly</h1>
      <div className="navbtn">
        {isLoggedIn ? (
          <button onClick={onLogout}>Sign Out</button>
        ) : (
          <>
            <button onClick={() => handleAuthPopup("login")}>Log in</button>
            <button onClick={() => handleAuthPopup("signup")}>Create Account</button>
          </>
        )}
      </div>
    </nav>
  );
}

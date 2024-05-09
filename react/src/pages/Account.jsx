import React, { useState } from "react";
import "../styles/Account.css";

function Account() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const account = { username, password, email };

    try {
      const response = await fetch("/api/accounts/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      });

      if (response.ok) {
        const createdAccount = await response.json();
        console.log("Account created:", createdAccount);
        // Reset form
        setUsername("");
        setPassword("");
        setEmail("");
        // Optionally, redirect or update UI
      } else {
        console.error("Failed to create account:", response.status);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="account__container">
      <h2 className="account--title">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="account__input--wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="account__input"
          />
        </div>
        <div className="account__input--wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="account__input"
          />
        </div>
        <div className="account__input--wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="account__input"
          />
        </div>
        <button type="submit" className="account--submitbtn">Create Account</button>
      </form>
    </div>
  );
}

export default Account;

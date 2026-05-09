import React, { useState } from "react";
import UserCard from "./UserCard";
import "./Pages.css";
import useInput from "../hooks/useInput.jsx";

function RegisterForm() {
  // useInput hanterar value + onChange automatiskt per fält
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState("");
  const [disabled, isDisabled] = useState(true);

  const error = "red";
  const alert = "yellow";
  const success = "green";

  let firstNamestyle;
  let lastNamestyle;
  let emailstyle;

  const re = /^\S+@\S+\.\S+$/;
x<
  function handleSubmit(e) {
    e.preventDefault();
    setUsers([...users, { firstName: firstName.value, lastName: lastName.value, email: email.value }]);
    console.log(`New user added to users.`);
    firstName.reset();
    lastName.reset();
    email.reset();
    setDisplay("");
  }

  function handleValidate() {
    if (!firstName.value || !lastName.value || !email.value) {
      firstNamestyle = error;
      setDisplay("Fill in all fields");
      isDisabled(true);
      return;
    }
    if (!firstName.value.length > 2 || !lastName.value.length > 2 || !email.value.length > 2) {
      setDisplay("All fields must be at least 3 characters");
      lastNamestyle = alert;
      isDisabled(true);

      return;
    }
    if (!re.test(email.value)) {
      setDisplay("Email not valid");
      emailstyle = alert;
      isDisabled(true);

      return;
    }
    setDisplay("Registration ok to submit!");
    isDisabled(false);
    firstNamestyle = success;
    lastNamestyle = success;
    emailstyle = success;
  }

  return (
    <div className="RegisterForm">
      <div className="FormWrapper">
        <form onChange={handleValidate} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            value={firstName.value}
            onChange={firstName.onChange}
            background={firstNamestyle}
          ></input>
          <input
            type="text"
            placeholder="Last name"
            value={lastName.value}
            onChange={lastName.onChange}
            background={lastNamestyle}
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={email.value}
            onChange={email.onChange}
            background={emailstyle}
          ></input>
          <button type="submit" disabled={disabled}>
            Sign Up!
          </button>
        </form>
      </div>
      <div className="InputDisplay">
        <p>First name: {firstName.value}</p>
        <p>Last name: {lastName.value}</p>
        <p>Email: {email.value}</p>
      </div>
      <div className="RegisteredUsers">
        
        {users.map((user) => {
          return <UserCard
            key={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
          />;
        })}
      </div>
    </div>
  );
}

export default RegisterForm;

import React, { useState } from "react";
import UserCard from "./UserCard";

function RegisterForm() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
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
    setUsers([...users, { firstName, lastName, email }]);
    console.log(`New user added to users.`);
    setFirstname("");
    setLastname("");
    setEmail("");
    setDisplay("");
  }

  function handleValidate() {
    if (!firstName || !lastName || !email) {
      firstNamestyle = error;
      setDisplay("Fill in all fields");
      isDisabled(true);
      return;
    }
    if (!firstName.length > 2 || !lastName.length > 2 || !email.length > 2) {
      setDisplay("All fields must be at least 3 characters");
      lastNamestyle = alert;
      isDisabled(true);

      return;
    }
    if (!re.test(email)) {
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
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            background={firstNamestyle}
          ></input>
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            background={lastNamestyle}
          ></input>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            background={emailstyle}
          ></input>
          <button type="submit" disabled={disabled}>
            Sign Up!
          </button>
        </form>
      </div>
      <div className="InputDisplay">
        <p>First name: {firstName}</p>
        <p>Last name: {lastName}</p>
        <p>Email: {email}</p>
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

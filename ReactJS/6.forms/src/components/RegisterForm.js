import React, { useState } from "react";

const RegisterForm = () => {
  // give initial values to the form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onchange
  const onChangeFullName = (e) => {
    setFullName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  // submit
  const onFormSubmit = (e) => {
    // prevent browser refreshing
    e.preventDefault();
    console.log({
      fullName,
      email,
      password,
    });
  };

  return (
    <div>
      <h2>Register Form</h2>

      <form onSubmit={onFormSubmit}>
        <div>
          <input
            onChange={onChangeFullName}
            placeholder="Full name"
            type="text"
            value={fullName}
          />
        </div>
        <div>
          <input
            onChange={onChangeEmail}
            placeholder="Email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <input
            onChange={onChangePassword}
            placeholder="Password"
            type="password"
            value={password}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from "react";

const RegisterForm2 = () => {
  // initial state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // onchange handler
  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h2>Register Form using computed value</h2>

      <form onSubmit={onFormSubmit}>
        <div>
          <input
            onChange={onChangeHandler}
            value={formData.fullname}
            placeholder="Full name"
            type="text"
            name="fullname"
          />
        </div>
        <div>
          <input
            onChange={onChangeHandler}
            value={formData.email}
            placeholder="Email"
            type="email"
            name="email"
          />
        </div>
        <div>
          <input
            onChange={onChangeHandler}
            value={formData.password}
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm2;

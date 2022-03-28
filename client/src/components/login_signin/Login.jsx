import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const {email, password} = formData

  const onChange = (e) =>{
      setFormData(prevState =>({
          ...prevState,
          [e.target.name]: e.target.value
      }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if( !email || !password ){
        alert(`Please add all fields `)
      }
    axios.post("http://localhost:3030/login", formData)
    .then(res =>{
        alert(`Login Successfully -- ${res.data.name}`)
      console.log("Login Successfully")
      navigate("/")
    })
    .catch(err =>{
      console.log(err.message);
    })
  };

  return (
    <div className="form-container">
      <h2>Register System</h2>

      <div>
        <form onSubmit={onSubmit}>
          <div>
           
            <div className="input-items">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="example@gmail.com"
                onChange={onChange}
              />
            </div>

            <div className="input-items">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="******"
                onChange={onChange}
              />
            </div>

           
            <div>
              <button type="submit" className="btn">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

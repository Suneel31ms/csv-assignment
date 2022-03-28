import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import "./style.css";

function Signin() {
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    city: "",
  });

  const { name, email, password, password2, city } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
   
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !password || !password2 || !city){
      alert(`Please add all fields `)
    }
   if(password === password2){
    axios.post("http://localhost:3030/register", formData)
    .then(res =>{
      alert(`Register Successfully -- ${res.data.name}`)
      console.log("Register Successfully")
      navigate("/login")
    })
    .catch(err =>{
      console.log(err.message);
    })
  }else{
    alert(" Password are not matched")
  }
  };

  return (
    <div className="form-container">
      <h2>Register System</h2>

      <div>
        <form onSubmit={onSubmit} >
          <div>
            <div className="input-items">
              <label htmlFor="name">UserName</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="name"
                onChange={onChange}
              />
            </div>

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

            <div className="input-items">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                name="password2"
                value={password2}
                placeholder="*********"
                onChange={onChange}
              />
            </div>

            <div className="input-items">
              <label htmlFor="City">City</label>
              <input type="text" name="city" value={city} onChange={onChange} />
            </div>

            {/* <div className="input-items">
              <label htmlFor="File">Upload File</label>
              <input type="file" name="file" multiple />
            </div> */}
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

export default Signin;

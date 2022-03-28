import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-item">
      <div className="card">
        <h2>Sachin Tendulkar</h2>
        <h3>India | top order batsman</h3>
        <img src="sachin.jpg" alt="sachin" />
        <h4>INT CAREER: 1989- 2013</h4>
        <div>
          <a href="https://twitter.com/sachin_rt?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            Twitter
          </a>
        </div>
      </div>

      <div className="about-container">
        <div className="row">
          <div className="col">
            <h3>Full Name</h3>
            <h3>Sachin Ramesh Tendulkar</h3>
          </div>
          <div className="col">
            <h3>Born</h3>
            <h3> 24 April 1973 Bombay, Maharashtra, India</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Age</h3>
            <h3>48 yrs</h3>
          </div>
          <div className="col">
            <h3>NickName</h3>
            <h3>Little Master</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Batting Style</h3>
            <h3>Right Hand Bat</h3>
          </div>
          <div className="col">
            <h3>Bowling Style</h3>
            <h3>Right Arm offbreak</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Height</h3>
            <h3>5ft 5inch</h3>
          </div>
          <div className="col">
            <h3>Education</h3>
            <h3>Sharadasharam Vidyamandir School</h3>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;

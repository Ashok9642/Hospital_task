import React, { useState } from "react";
import "./Hospital.css";

import {
  AiOutlineBars,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
} from "react-icons/ai";
import { FaAmbulance, FaSmile, FaProcedures } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";
import { FaStethoscope, FaHospital } from "react-icons/fa";
import { ImUserPlus } from "react-icons/im";
import { AiFillGithub } from "react-icons/ai";

function Hospital() {
  const [name, setname] = useState({
    fullname: "",
    phonenumber: "",
    email: "",
  });
  const { fullname, phonenumber, email } = name;
  const changeHandler = (e) => {
    setname({ ...name, [e.target.name]: e.target.value });
  };
  const SubmitHandler = () => {
    if (fullname.length < 4) {
      alert("Enter minimum 5 characteres");
      return false;
    } else {
      alert("successfully submitted");
    }
  };

  return (
    <div className="Main">
      <header>
        <div className="container">
          <a href="#" className="logo">
            {" "}
            <span>H</span>ealth<span>C</span>are
          </a>
          <nav className="nav">
            <ul>
              <li>
                <a href="#home" id>
                  Home
                </a>
              </li>
              <li>
                <a href="#about">about</a>
              </li>
              <li>
                <a href="#facility">facility</a>
              </li>
              <li>
                <a href="#review">review</a>
              </li>
              <li>
                <a href="#contact">contact</a>
              </li>
              <li>
                <a href="#post">post</a>
              </li>
            </ul>
          </nav>

          <button id="bar">
            <AiOutlineBars />
          </button>
        </div>
      </header>
      <section className="home" id="home">
        <div className="container">
          <div className="row min-vh-100 align-items-center text-center text-md-left">
            <div style={{ display: "flex" }}>
              <img
                src="https://st2.depositphotos.com/1518767/5392/i/600/depositphotos_53923403-stock-photo-smiling-doctors-all-standing-together.jpg"
                width="100%"
                style={{ marginTop: "130px" }}
              />

              <div
                className="content"
                style={{ marginTop: "50vh", marginLeft: "20vh" }}
              >
                <h1>
                  <span>stay</span>safe,<span>stay</span>Healthy
                </h1>
                <h3>caring for you</h3>
                <a href="#">
                  <button className="button">learn more</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="aboutcenter">
          <div className="aboutcontent" style={{ display: "flex" }}>
            <div className="box">
              <h4 style={{ marginTop: "10vh" }}>
                <FaAmbulance id="icon" /> Ambulance services
              </h4>
              <p>
                lorem ipusum dolor sit ametconseture adipicing elit,ipsa,suscipt
              </p>
            </div>
            <div className="box">
              <h4 style={{ marginTop: "10vh" }}>
                <IoMdBed id="icon" /> Emergency services
              </h4>
              <p>
                lorem ipusum dolor sit ametconseture adipicing elit,ipsa,suscipt
              </p>
            </div>

            <div className="box">
              <h4 style={{ marginTop: "10vh" }}>
                <FaStethoscope id="icon" /> Free checks ups
              </h4>
              <p>
                lorem ipusum dolor sit ametconseture adipicing elit,ipsa,suscipt
              </p>
            </div>

            <div>
              <img
                src="https://webstockreview.net/images/clipart-doctor-lady-doctor-11.png"
                height="400px"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="facility" id="facility">
        <div className="facilitycontainer">
          <h1 className="heading">
            {" "}
            <span>'</span>our facilities<span>'</span>
          </h1>
          <div className="box-container">
            <div className="boxs">
              <a href="##" title="our team">
                <img
                  src="https://media.istockphoto.com/photos/smiling-medical-team-standing-together-outside-a-hospital-picture-id998313080"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title="our lab">
                <img
                  src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/11/07/752098-laboratory-thinkstock.jpg"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title="emergency room">
                <img
                  src="https://media.istockphoto.com/photos/hospital-intensive-care-unit-picture-id1164797408"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title="expert doctors">
                <img
                  src="https://st4.depositphotos.com/3200101/26030/i/1600/depositphotos_260305904-stock-photo-group-of-doctors-and-nurses.jpg"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title=" beds">
                <img
                  src="https://images.newindianexpress.com/uploads/user/imagelibrary/2021/5/10/w900X450/Tracking_status.jpg?w=900&dpr=1.5"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title="expert ICU">
                <img
                  src="https://images.unsplash.com/photo-1580281657702-257584239a55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title="expert VENTILATER">
                <img
                  src="https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                  height="250px"
                />
              </a>
            </div>
            <div className="boxs">
              <a href="##" title="expert pharmarcy">
                <img
                  src="https://thumbs.dreamstime.com/z/pharmacy-shop-18989276.jpg"
                  height="250px"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="review" id="review">
        <h1 className="review-heading">
          <span>'</span>peoples review<span>'</span>
        </h1>
        <div className="review-container">
          <div className="review-box">
            <p>
              Lorem ipsum,dolor sit ame consectetur elit.consectetur accusation
              error numquma dolore atque .atque totam ad sint ducimus!Maximum
            </p>
            <h1>Ashok</h1>
            <span>jan20,2020</span>
            <img
              src="https://images.pexels.com/photos/7129678/pexels-photo-7129678.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              width="160px"
              height="140px"
            />
          </div>
          <div className="review-box">
            <p>
              Lorem ipsum,dolor sit ame consectetur elit.consectetur accusation
              error numquma dolore atque .atque totam ad sint ducimus!Maximum
            </p>
            <h1>vinod</h1>
            <span>mar20,2020</span>
            <img
              src="https://images.pexels.com/photos/6326175/pexels-photo-6326175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              width="160px"
              height="140px"
            />
          </div>
          <div className="review-box">
            <p>
              Lorem ipsum,dolor sit ame consectetur elit.consectetur accusation
              error numquma dolore atque .atque totam ad sint ducimus!Maximum
            </p>
            <h1>Shekar</h1>
            <span>nov10,2020</span>
            <img
              src="https://images.pexels.com/photos/5061281/pexels-photo-5061281.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              width="160px"
              height="140px"
            />
          </div>
        </div>
      </section>
      <section className="counter">
        <div className="count">
          <div className="box-count">
            <h1 className="hospital">
              <FaHospital />
            </h1>
            <span>150+</span>
            <h3>Hospitals</h3>
          </div>
          <div className="box-count">
            <h1 className="users">
              <ImUserPlus />
            </h1>
            <span>250+</span>
            <h3>staff</h3>
          </div>
          <div className="box-count">
            <h1 className="smile">
              <FaSmile />
            </h1>
            <span>1250+</span>
            <h3>happy patients</h3>
          </div>
          <div className="box-count">
            <h1 className="procedures">
              <FaProcedures />
            </h1>
            <span>320+</span>
            <h3>bed facility</h3>
          </div>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="contact-center">
          <h1 className="contact-heading">
            <span>'</span>Make an appointment <span>'</span>
          </h1>
          <form onSubmit={SubmitHandler}>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Enter your fullname"
                name="fullname"
                value={fullname}
                onChange={changeHandler}
              />
              <input
                type="number"
                placeholder="Enter your phone number"
                name="phonenumber"
                value={phonenumber}
                onChange={changeHandler}
              />
            </div>
            <div className="inputBox">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={changeHandler}
              />
              <select name="" id="">
                <option value="" disabled selected>
                  Make an appointment
                </option>
                <option value="09-11 am">09-11 am</option>
                <option value="11-03 pm">11-03 pm</option>
                <option value="03-06 pm">03-06 pm</option>
                <option value="06-09 pm">06-09 pm</option>
              </select>
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="message(optional)"
            ></textarea>
            <br />
            <button id="buttons"> Make appointment </button>
          </form>
        </div>
      </section>
      <section className="post" id="post">
        <h1 className="post-heading">
          <span>'</span>our posts <spa>'</spa>
        </h1>

        <div className="post-container">
          <div className="post-box">
            <img
              src="https://cdn.pixabay.com/photo/2014/12/10/21/01/doctor-563429_1280.jpg"
              width="150px"
              height="90px"
            />
            <div className="post-content">
              <span>Mar 20,2021</span>
              <a href="###">
                <h3>WE TRUST YOU</h3>
              </a>
              <p>
                lorem ipusum dolor sit amet consecterur adipising elit.here we
                have lot of facilities in our hospital.you will surly satisfy
                with our services
              </p>
              <a href="###">
                <button className="butto">learn More</button>
              </a>
            </div>
          </div>
          <div className="post-box">
            <img
              src="https://cdn.pixabay.com/photo/2020/03/14/17/05/virus-4931227_1280.jpg"
              width="150px"
              height="90px"
            />
            <div className="post-content">
              <span>Aug 14,2021</span>
              <a href="###">
                <h3>WE SAVE YOU</h3>
              </a>
              <p>
                lorem ipusum dolor sit amet consecterur adipising elit.here we
                have lot of facilities in our hospital.you will surly satisfy
                with our services
              </p>
              <a href="###">
                <button className="butto">learn More</button>
              </a>
            </div>
          </div>
          <div className="post-box">
            <img
              src="https://cdn.pixabay.com/photo/2016/07/20/19/23/baby-1531059__480.jpg"
              width="150px"
              height="90px"
            />
            <div className="post-content">
              <span>sep 30,2021</span>
              <a href="###">
                <h3>WE PROTECT YOU</h3>
              </a>
              <p>
                lorem ipusum dolor sit amet consecterur adipising elit.here we
                have lot of facilities in our hospital.you will surly satisfy
                with our services
              </p>
              <a href="###">
                <button className="butto">learn More</button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="footer">
        <div
          className="footer-container"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="footer-row">
            <div className="coloum">
              <a href="#1" className="logo">
                <span>H</span>ealth<span>c</span>are.
              </a>
              <p>
                lorem ipusum dolor sit amet consecterur adipising elit.here we
                have lot of facilities in our hospital.you will surly satisfy
                with our services
              </p>
            </div>
          </div>
          <div className="coloum">
            <h3>Links</h3>
            <a href="#home">Home</a>
            <a href="#about">about</a>
            <a href="#facility">facility</a>
            <a href="#review">review</a>
            <a href="#contact">contact</a>
            <a href="#post">post</a>
          </div>
          <div className="coloum">
            <h3>shared</h3>
            <a href="https://www.facebook.com/">
              <AiFillFacebook id="icones" />
              facebook
            </a>
            <a href="https://mobile.twitter.com/i/flow/login">
              <AiFillTwitterCircle id="icones" />
              twitter
            </a>
            <a href="https://www.instagram.com/">
              <AiFillInstagram id="icones" />
              instagram
            </a>
            <a href="https://circleci.com/signup/?utm_source=bing&utm_medium=cpc&utm_content=signup&utm_campaign=sitelinkSignup&utm_source=">
              <AiFillGithub id="icones" />
              git hud
            </a>
          </div>
        </div>
        <h1 className="credites">
          created By <span>B.Ashok goud</span>| all rights reseved.
        </h1>
      </section>
    </div>
  );
}
export default Hospital;

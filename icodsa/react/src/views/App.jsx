import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/app.css";

export default function App() {


  // --------- Home -----------
  const [homeData, setHomeData] = useState({
    host_logo: '',
    title: '',
    place_date: '',
    description: '',
    home_bg: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/homes/1')
      .then(response => {
        setHomeData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // --------- About -----------
  const [aboutData, setAboutData] = useState({
    about_img: '',
    about_desc: '',
    event_dd: '',
    description: '',
    event_mmyy: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/abouts/1')
      .then(response => {
        setAboutData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
}, []);


  return (
    <body>
      <nav className="navbar navbar-expand-lg sticky-top py-3">
        <div className="container-fluid px-5">
          <a
            className="navbar-brand justify-content-start align-items-center"
            href="#"
          >
            <img src="./public/logo-icodis.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end align-items-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Abous Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Speakers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  For Author
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Committee
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="Home" style={{ backgroundImage: `url('/coba.jpg')` }} >
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
          <div className="container" id="hostLogo">
            <img src="/logo-telu.png" alt="Logo TelU" className="mx-2" />
            <img src="/logo-utm.png" alt="Logo UTM" className="mx-2" />
          </div>

          <div className="container" id="textHome">
            <div className="container" id="textHome">
              <h1>{homeData.title}</h1>
              <h2>{homeData.place_date}</h2>
            </div>
          </div>

          <div className="container" id="buttonHome">
            <button type="button" className="btn btn-primary mx-2">
              Submit Here
            </button>
            <button type="button" className="btn btn-primary mx-2">
              Presentation Schedule
            </button>
          </div>

          <div className="container" id="descHome">
            <p>{homeData.description}</p>
          </div>
        </div>

      </section>

      <section className="AboutUs">
        <div className="container">
          <div className="row flex">
            <div className="col-md-6 col-lg-5">
              <img src="/bali.jpg" alt="conf.date" id="confImg" />
              <div className="excellance-tag bg-primary">
                <div className="excellance-text">
                  <p>Conf. Date</p>
                  <div className="icon">
                    <div className="icon-home">
                      <i className="icon-home fa-3x"></i>
                    </div>
                    <h3 id="confDate">{aboutData.event_dd}</h3>
                    <h4>{aboutData.event_mmyy}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <h1 className="mb-5">
                About Us
              </h1>
              <p>
              {aboutData.about_desc}
              </p>
            </div>
          </div>
        </div>

      </section>

      <section className="Speakers pt-100 pb-80 bg-light">
        <div className="container">
          <div className="container">
            <div className="section-header">
              <h5>
                Keynote
              </h5>
              <h2>
                Speakers
              </h2>
            </div>
            <div className="container mt-4">

            </div>
            <div className="card">
              <img src="/HoshangKolivand.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Assoc. Prof. Dr. Hoshang Kolivand</h5>
                <p className="card-text">School of Computer Science and Mathematics, Liverpool John Moores University, England</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

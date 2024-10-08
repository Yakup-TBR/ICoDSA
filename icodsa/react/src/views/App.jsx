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
            {homeData.host_logo ? (
              <img src={`http://localhost:8000/storage/${homeData.host_logo}`} alt="Host Logo" className="mx-2" />
            ) : (
              <p></p>
            )}
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
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </section>

      <section className="AboutUs">
        <div className="container">

          <div className="row flex">

            <div className="confDay col-md-6 col-lg-5">
              <img src="/bali.jpg" alt="conf.date" id="confImg" />
              <div className="container excellance-tag text-center p-4">
                <div className="container excellance-text justtify-content-center p-2">
                  <p>Conf. Date</p>
                  <div className="icon">
                    <div className="icon-home">
                      <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1667 30.5001L30.5 10.1667L50.8334 30.5001M15.25 26.6876V48.2917C15.25 48.9658 15.5178 49.6123 15.9945 50.089C16.4711 50.5656 17.1176 50.8334 17.7917 50.8334H25.4167V43.2084C25.4167 42.5343 25.6845 41.8878 26.1611 41.4112C26.6378 40.9345 27.2843 40.6667 27.9584 40.6667H33.0417C33.7158 40.6667 34.3623 40.9345 34.8389 41.4112C35.3156 41.8878 35.5834 42.5343 35.5834 43.2084V50.8334H43.2084C43.8824 50.8334 44.5289 50.5656 45.0056 50.089C45.4822 49.6123 45.75 48.9658 45.75 48.2917V26.6876" stroke="white" />
                      </svg>
                    </div>
                    <h3 id="confDate">{aboutData.event_dd}</h3>
                    <h4>{aboutData.event_mmyy}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <h1 className="mb-5" id="aboutUsH1">
                About Us
              </h1>
              <h5 id="aboutUsDesc">
                {aboutData.about_desc}
              </h5>
            </div>

          </div>
        </div>

      </section>

      <section className="Speakers pt-100 pb-80">
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

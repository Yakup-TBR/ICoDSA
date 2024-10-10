import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "../styles/app.css";

export default function App() {


  // ------------- HOME START -------------
  const [homeData, setHomeData] = useState({
    title: '',
    place_date: '',
    description: '',
    home_bg: ''
  });

  const [hostLogoData, setHostLogoData] = useState([]);

  useEffect(() => {
    // Mengambil data home dan logo
    const fetchHomeData = async () => {
      try {
        const homeResponse = await axios.get('http://localhost:8000/api/homes/1');
        setHomeData(homeResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const newHome = {
            title: 'Judul Awal',
            place_date: 'Tanggal Awal',
            description: 'Deskripsi Awal',
            home_bg: 'background.jpg',
          };
          await axios.post('http://localhost:8000/api/homes', newHome);
          setHomeData(newHome);
        } else {
          console.error(error);
        }
      }
    };

    const fetchHostLogoData = async () => {
      try {
        const logoResponse = await axios.get('http://localhost:8000/api/host_host_logos'); // Mengambil semua logo
        setHostLogoData(logoResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHomeData();
    fetchHostLogoData();
  }, []);

  // ------------- ABOUT US -------------
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

  // ------------- SPEAKERS -------------
  const [speakers, setSpeakers] = useState([]);

  // Fetch speakers from the API
  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = () => {
    axios.get('http://localhost:8000/api/speakers')
      .then(response => {
        setSpeakers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

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
            {hostLogoData.length > 0 ? (
              hostLogoData.map((logo) => (
                <div key={logo.id} className="logo-container">
                  <img src={`http://localhost:8000/storage/${logo.host_logo}`} alt="Host Logo" className="mx-2" />

                </div>
              ))
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

      <section className="Speakers">
        <div className="container">
          <div className="section-header">
            <h5>Keynote</h5>
            <h2>Speakers</h2>
          </div>
          <div className="row mt-4 px-2">
            {speakers.map((speaker) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={speaker.id}>
                <div className="card custom-card">
                  <img
                    src={`http://localhost:8000${speaker.speakers_img}`}
                    className="card-img-top"
                    alt={speaker.speakers_name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{speaker.speakers_name}</h5>
                    <p className="card-text">{speaker.speakers_desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tutorial">
        <div className="container">
          <div className="section-header">
            <h5>Tutorial</h5>
            <h2>Session</h2>
          </div>
          <div className="container p-2" id="tutor">
            <img src="./public/tutoriall.png" alt="" />
          </div>
          <div className="section-header">
            <h2>Abstract</h2>
          </div>
          <div className="container p-0">
            <p>
              The arrival of generative AI, especially ChatGPT, has revolutionized the educational landscape and offers unprecedented opportunities for personalized and interactive learning experiences. This tutorial examines the success of ChatGPT, powered by AI, as a learning assistant in data science and its wider applications. Using natural language processing capabilities, ChatGPT provides customized training, homework support, and real-time feedback, increasing understanding of complex data science concepts. The tutorial will assess effectiveness in supporting knowledge acquisition, engagement, and continuous learning.
            </p>
          </div>
        </div>
      </section>

      <section className="importantDate" style={{ backgroundImage: `url('/coba.jpg')` }}>
        <div className="container">
          <h2>Important Date</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
              <div className="card">
                <h3 className="card-title">Important Date</h3>
                <div className="card-body">
                  <img src="iconImportantDate.png" alt=".." />
                  <h4 className="card-text">24</h4>
                  <h5>Mei, 2024</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
              <div className="card">
                <h3 className="card-title">Important Date</h3>
                <div className="card-body">
                  <img src="iconImportantDate.png" alt=".." />
                  <h4 className="card-text">24</h4>
                  <h5>Mei, 2024</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
              <div className="card">
                <h3 className="card-title">Important Date</h3>
                <div className="card-body">
                  <img src="iconImportantDate.png" alt=".." />
                  <h4 className="card-text">24</h4>
                  <h5>Mei, 2024</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
              <div className="card">
                <h3 className="card-title">Important Date</h3>
                <div className="card-body">
                  <img src="iconImportantDate.png" alt=".." />
                  <h4 className="card-text">24</h4>
                  <h5>Mei, 2024</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
              <div className="card">
                <h3 className="card-title">Important Date</h3>
                <div className="card-body">
                  <img src="iconImportantDate.png" alt=".." />
                  <h4 className="card-text">24</h4>
                  <h5>Mei, 2024</h5>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
              <div className="card">
                <h3 className="card-title">Important Date</h3>
                <div className="card-body">
                  <img src="iconImportantDate.png" alt=".." />
                  <h4 className="card-text">24</h4>
                  <h5>Mei, 2024</h5>
                </div>
              </div>
            </div>
          </div>
          <a href="#" data-scroll-goto="2">
            <span></span>
          </a>
        </div>
      </section>



    </body>
  );
}

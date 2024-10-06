import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../styles/app.css";

export default function App() {
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
            <h1>ICoDSA 2025</h1>
            <h2>Bali, July 10-11, 2024</h2>
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
            <p>The 7th International Conference on Data Science and Its Applications</p>
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
                    <h3 id="confDate">10-11</h3>
                    <h4>July, 2025</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <h1 className="mb-5">
                About Us
              </h1>
              <p>
                The rapid evolution of contemporary computing technology has propelled individuals to generate an unprecedented volume of data, characterized by both its size and diversity—a phenomenon unparalleled in the annals of computing history. This surge in data has sparked a compelling need for effective processing and analysis, captivating the attention of researchers who endeavor to propose innovative solutions. In response to this burgeoning interest, the 7th International Conference on Data Science and Its Applications (ICoDSA) 2024, themed Data for Good: Leveraging Data Science for Social Impact, has been meticulously organized.

                The conference serves as a focal point for researchers to share and disseminate their noteworthy contributions in the realms of data science, computational linguistics, and information science. Encompassing a broad spectrum of relevant topics, 7th ICoDSA 2024 extends a warm invitation to researchers to explore and present their latest insights in these dynamic fields.
                Papers from the previous ICoDSA indexed in Scopus:

                1st ICoDIS | IoP Science
                2nd ICoDIS | IoP Science
                3rd ICoDIS (ICoDSA) | IEEE Xplore
                4th ICoDIS (ICoDSA) | IEEE Xplore
                5th ICoDIS (ICoDSA) | IEEE Xplore
                6th ICoDIS (ICoDSA) | IEEE Xplore
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

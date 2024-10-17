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
        about_img: null,
        about_desc: '',
        event_dd: '',
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

    // ------------- TUTORIAL -------------


    const [tutorialData, setTutorialData] = useState({
        thumbail_img: null,
        abstract: '',
    });

    useEffect(() => {
        // Mengambil data tutorial
        axios.get('http://localhost:8000/api/tutorial/1')
            .then(response => {
                setTutorialData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // ------------- IMPORTANT DATE -------------
    const [importantDates, setImportantDates] = useState([]);


    useEffect(() => {
        fetchImportantDates();
    }, []);

    // Function to fetch important dates from the API
    const fetchImportantDates = () => {
        axios.get('http://localhost:8000/api/important-dates')
            .then(response => {
                setImportantDates(response.data);
            })
            .catch(error => {
                console.error('Error fetching important dates:', error);
            });
    };

    // ------------- OUR TOPICS -------------
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = () => {
        axios.get('http://localhost:8000/api/topics')
            .then(response => {
                setTopics(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <body>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
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

            <section className="Home" style={{ backgroundImage: `url('http://localhost:8000/storage/${homeData.home_bg || 'gb.jpg'}')` }} >
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
                            <img src={`http://localhost:8000/storage/${aboutData.about_img || 'bali.jpg'}`} alt="conf.img" id="confImg" />
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
                    <div className="container p-0" id="thumbnailImg">
                        <img src={`http://localhost:8000/storage/${tutorialData.thumbail_img || 'placeholder.jpg'}`} alt="Tutorial Thumbnail" />
                    </div>
                    <div className="section-header pt-5">
                        <h2>Abstract</h2>
                    </div>
                    <div className="container p-0 pt-4 pb-4">
                        <p> {tutorialData.abstract} </p>
                    </div>
                </div>
            </section>

            <section className="importantDate" style={{ backgroundImage: `url('/coba.jpg')` }}>
                <div className="container">
                    <h2>Important Date</h2>
                </div>
                <div className="container">
                    <div className="row">

                        {importantDates.map((date) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4" key={date.id}>
                                <div className="card">
                                    <h3 className="card-title">{date.activity}</h3>
                                    <div className="card-body">
                                        <img src={`http://localhost:8000${date.activity_icon}`} alt={date.activity} />
                                        <h4 className="card-text">{new Date(date.event_date).getDate()}</h4>
                                        <h5>{new Date(date.event_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <a href="#" data-scroll-goto="2">
                        <span></span>
                    </a>
                </div>
            </section>

            <section className="ourTopics">
                <div className="container">
                    <div className="section-header">
                        <h5>Our</h5>
                        <h2>Topics</h2>
                    </div>
                    <div className="container content p-0">
                        <div className="row m-0">
                            {topics.map((topic) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4 p-0" key={topic.id}>
                                    <div className="card">
                                        <div className="card-title pb-2">
                                            <h3>{topic.topic_order}.</h3>
                                        </div>
                                        <div className="card-body p-0">
                                            <h4 className="card-text">{topic.topic_title}</h4>
                                            <h5>{topic.topic_list}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </section>

            <section className="AuthorInfo">
                <div className="container">
                    <h1>
                        Author Information
                    </h1>
                </div>

                <div className="container">
                    <h2>
                        Paper Submission
                    </h2>
                </div>

                <div className="container mt-0">
                    <p>
                        Prospective authors are invited to submit full papers of 4-6 pages (including tables, figures and references) in standard IEEE double-column format. Please submit your paper via https://edas.info/newPaper.php?c=32055. New users are required to register with EDAS before paper submission. Each full registration for the conference will cover one paper.
                    </p>
                </div>

                <div className="container">
                    <button type="button" className="btn btn-primary">
                        Submit Here
                    </button>

                </div>
            </section>

            <section className="programComittee">
                <div className="container">
                    <div className="section-header pb-1">
                        <h2>Program Committee</h2>
                        <h5>Organaizing Committee</h5>
                    </div>

                    <div className="container content-area p-0">
                        <div className="row">
                            {/* Kolom Kiri */}
                            <div className="col-md-6">
                                <div className="content">
                                    <div className="content-head">
                                        <h3>Steering Committee:</h3>
                                    </div>
                                    <div className="content-body">
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    </div>
                                </div>

                                <div className="content">
                                    <div className="content-head">
                                        <h3>Steering Committee:</h3>
                                    </div>
                                    <div className="content-body">
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                        <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan */}
                            <div className="col-md-6">

                                <div className="content-body">
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                    <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                </div>

                            </div>
                        </div>
                        <hr />
                    </div>
                </div>

            </section>

            <section className="reviewer">
                <div className="container">
                    <div className="section-header pb-1 mb-5">
                        <h2>Reviewer</h2>
                    </div>
                    <div className="container content-area p-0">
                        <div className="row">
                            {/* Kolom Kiri */}
                            <div className="col-md-6">
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                            </div>

                            {/* Kolom Kanan */}
                            <div className="col-md-6">
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                                <h4>Prof. Dr. Adiwijaya (Telkom University, Indonesia)</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pricing">
                <div className="container">
                    <div className="section-header">
                        <h2>Pricing</h2>
                        <h5>Normal Paper</h5>
                    </div>
                    <div className="container pricing-area p-0 pt-5">
                        <div className="container p-0">
                            <div className="row">

                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                    <div className="card priceCard">
                                        <div className="card-body">
                                            <h3 className="card-title">Author</h3>
                                            <h3>(Non-Member)</h3>
                                            <hr className="opacity-100" />
                                            <h4>$400</h4>
                                            <p className="card-text mt-4">(6000K IDR)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                    <div className="card priceCard">
                                        <div className="card-body">
                                            <h3 className="card-title">Author</h3>
                                            <h3>(Non-Member)</h3>
                                            <hr className="opacity-100" />
                                            <h4>$400</h4>
                                            <p className="card-text mt-4">(6000K IDR)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                    <div className="card priceCard">
                                        <div className="card-body">
                                            <h3 className="card-title">Author</h3>
                                            <h3>(Non-Member)</h3>
                                            <hr className="opacity-100" />
                                            <h4>$400</h4>
                                            <p className="card-text mt-4">(6000K IDR)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                    <div className="card priceCard">
                                        <div className="card-body">
                                            <h3 className="card-title">Author</h3>
                                            <h3>(Non-Member)</h3>
                                            <hr className="opacity-100" />
                                            <h4>$400</h4>
                                            <p className="card-text mt-4">(6000K IDR)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                                    <div className="card priceCard">
                                        <div className="card-body">
                                            <h3 className="card-title">Author</h3>
                                            <h3>(Non-Member)</h3>
                                            <hr className="opacity-100" />
                                            <h4>$400</h4>
                                            <p className="card-text mt-4">(6000K IDR)</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="payment">
                <div className="container">
                    <div className="section-header">
                        <h5>Please follow this information for completing your registration:</h5>
                    </div>
                    <div className="container px-4">
                        <h3 className='pt-3'>Payment Method</h3>
                        <hr />

                        <div className="card payment-method">
                            <div className="card-body">
                                <h3 className="card-title">1) Virtual Account</h3>
                                <div className='card-text'>
                                    Virtual Account Number: 8321066202400006<br />
                                    Account Holder Name: Telkom University<br />
                                    Bank Name: Bank Negara Indonesia (BNI)<br />
                                    Bank Branch: Perintis Kemerdekaan<br />
                                    *Use BNI Mobile Apps or BNI ATM only
                                </div>
                            </div>
                        </div>

                        <div className="card payment-method">
                            <div className="card-body">
                                <h3 className="card-title">1) Virtual Account</h3>
                                <div className='card-text'>
                                    Virtual Account Number: 8321066202400006<br />
                                    Account Holder Name: Telkom University<br />
                                    Bank Name: Bank Negara Indonesia (BNI)<br />
                                    Bank Branch: Perintis Kemerdekaan<br />
                                    *Use BNI Mobile Apps or BNI ATM only
                                </div>
                            </div>
                        </div>

                        <div className="card payment-method">
                            <div className="card-body">
                                <h3 className="card-title">1) Virtual Account</h3>
                                <div className='card-text'>
                                    Virtual Account Number: 8321066202400006<br />
                                    Account Holder Name: Telkom University<br />
                                    Bank Name: Bank Negara Indonesia (BNI)<br />
                                    Bank Branch: Perintis Kemerdekaan<br />
                                    *Use BNI Mobile Apps or BNI ATM only
                                </div>
                            </div>
                        </div>

                        <div className="card payment-addInfo">
                            <div className="card-body">
                                <div className='card-text'>
                                    Additional Information for International Transfer:<br />
                                    Contact: icodsa@telkomuniversity.ac.id
                                </div>
                            </div>
                        </div>

                        <div className="card payment-addInfo">
                            <div className="card-body">
                                <div className='card-text'>
                                    Please be noted that to be indexed by IEEE, the paper must be presented at the conference.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="article">
                <div className="container">
                    <h1>Article</h1>
                    <div className="container d-flex justify-content-center article-content text-center p-0">
                        <div className="card mr-2">
                            <img src="/public/article2.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">updatebali.com</h5>
                                <p className="card-text">Conference ICoDSA, Ajang Men Deliver Ilmu Pengetahuan Konsisten Digelar Hingga Tahun Ini</p>
                                <a href="#">Read More</a>
                            </div>
                        </div>

                        <div className="card ml-2">
                            <img src="/public/article2.png" className="card-img-top" alt="" />
                            <div className="card-body">
                                <h5 className="card-title">updatebali.com</h5>
                                <p className="card-text">Conference ICoDSA, Ajang Men Deliver Ilmu Pengetahuan Konsisten Digelar Hingga Tahun Ini</p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="documentation">
                <div className="container">
                    <h1>Documentation</h1>
                    <a href="#">LINK DOCUMENTATION</a>
                    <div className="container photo-area">
                        <div className="row">
                            <div className="col-12 col-md-4 p-0 photo-documentation">
                                <a href="#">
                                    <img src="/public/article2.png" className="card-img-top" alt="" />
                                </a>
                            </div>

                            <div className="col-12 col-md-4 p-0 photo-documentation">
                                <a href="#">
                                    <img src="/public/article2.png" className="card-img-top" alt="" />
                                </a>
                            </div>

                            <div className="col-12 col-md-4 p-0 photo-documentation">
                                <a href="#">
                                    <img src="/public/article2.png" className="card-img-top" alt="" />
                                </a>
                            </div>

                            <div className="col-12 col-md-4 p-0 photo-documentation">
                                <a href="#">
                                    <img src="/public/article2.png" className="card-img-top" alt="" />
                                </a>
                            </div>

                            <div className="col-12 col-md-4 p-0 photo-documentation">
                                <a href="#">
                                    <img src="/public/article2.png" className="card-img-top" alt="" />
                                </a>
                            </div>

                            <div className="col-12 col-md-4 p-0 photo-documentation">
                                <a href="#">
                                    <img src="/public/article2.png" className="card-img-top" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="container video-documentation p-0">
                        <iframe width="100%" height="400"
                            src="https://www.youtube.com/embed/2KnuZaqjvo4"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>

                </div>
            </section>

            <section className="address">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-md-6 address-area" style={{ backgroundImage: `url('/bgfooter.jpg')` }}>
                            <div className="address-place">
                                <h5>
                                    Venue: <br />
                                    Aston Kuta Hotel & Residence
                                </h5>
                                <div className="address-city">
                                    <p>
                                        Bali, ID
                                    </p>
                                </div>
                                <div className="contact">
                                    <p>
                                        Contacts: icodsa@telkomuniversity.ac.id
                                        <br />
                                        commdis.telkomuniversity.ac.id/icodsa/2024
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 map-area">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15840.958936556244!2d107.6522965579938!3d-6.981012981163149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adf177bf8d%3A0x437398556f9fa03!2sUniversitas%20Telkom!5e0!3m2!1sid!2sid!4v1729189533259!5m2!1sid!2sid" allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </section>

        </body>

    );
}

// SCRIPT


import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
// import Particle from '../Particle';
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

    const fetchImportantDates = () => {
        axios.get('http://localhost:8000/api/important-dates')
            .then(response => {
                setImportantDates(response.data);
            })
            .catch(error => {
                console.error('Error fetching important dates:', error);
            });
    };


    // IMPORTANT DATE BG

    const [importantDateData, setImportantDateData] = useState({
        important_date_bg: null,
    });

    useEffect(() => {
        const fetchImportantDateData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/important_date_bg/1');
                setImportantDateData(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    const newImportantDate = { important_date_bg: null };
                    const createResponse = await axios.post('http://localhost:8000/api/important_date_bg', newImportantDate);
                    setImportantDateData(createResponse.data);
                } else {
                    console.error(error);
                }
            }
        };

        fetchImportantDateData();
    }, []);

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


    document.addEventListener('scroll', function () {
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // ------------- AUTHOR INFORMATION -------------
    const [authorData, setAuthorData] = useState([]);



    useEffect(() => {
        fetchAuthorData();
    }, []);


    const fetchAuthorData = () => {
        axios.get('http://localhost:8000/api/author-information')
            .then(response => {
                setAuthorData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };


    // ------------- NAVBAR -------------
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveTriangle = (link) => {
        const { left, width } = link.getBoundingClientRect();
        link.style.setProperty('--triangle-left', `${left + width / 2}px`);
    };

    const updateActiveLink = () => {
        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            const rect = section.getBoundingClientRect();

            if (rect.top >= 0 && rect.top < window.innerHeight) {
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
                setActiveTriangle(link);
            }
        });
    };

    // Set active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Set initial position of triangle on page load
    document.addEventListener('DOMContentLoaded', updateActiveLink);


    // ------------- REGISTRATION -------------
    const [registrationData, setRegistrationData] = useState([]);

    useEffect(() => {
        fetchRegistrationData();
    }, []);

    const fetchRegistrationData = () => {
        axios.get('http://localhost:8000/api/registration')
            .then(response => {
                setRegistrationData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // PROGRAM COMMITTEE
    const [committees, setCommittees] = useState([]);

    useEffect(() => {
        fetchCommittees();
    }, []);

    const fetchCommittees = () => {
        axios.get('http://localhost:8000/api/program-committees')
            .then(response => {
                setCommittees(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Bagi komite menjadi dua kolom
    const splitCommittees = (committees) => {
        const midIndex = Math.ceil(committees.length / 2);
        return [committees.slice(0, midIndex), committees.slice(midIndex)];
    };

    const [leftColumn, rightColumn] = splitCommittees(committees);



    // REVIEWER
    const [savedReviewers, setSavedReviewers] = useState([]); // Persisted list from database

    useEffect(() => {
        axios.get('http://localhost:8000/api/reviewers')
            .then(response => {
                setSavedReviewers(response.data.map(reviewer => reviewer.reviewer_name));
            })
            .catch(error => console.error("Error fetching reviewers:", error));
    }, []);


    // --------------------------------------------------- PRICING --------------------------------------------------
    const [pricings, setPricings] = useState([]);

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/pricing');
            console.log(response.data);
            setPricings(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching pricing data:", error);
        }
    };

    // PAYMENT METHOD
    const [paymentData, setPaymentData] = useState([]);

    useEffect(() => {
        fetchPaymentData();
    }, []);

    const fetchPaymentData = () => {
        axios.get('http://localhost:8000/api/payment-methods')
            .then(response => setPaymentData(response.data))
            .catch(error => console.error(error));
    };

    // --------------------------------------------------- ARTICLE ---------------------------------------------------
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const response = await axios.get('http://localhost:8000/api/articles');
        setArticles(response.data);
    };

    // --------------------------------------------------- DOCUMENTATION ---------------------------------------------------

    // Documentation Image
    const [documentationImages, setDocumentationImages] = useState([]);
    const [videoLink, setVideoLink] = useState('');

    useEffect(() => {
        fetchDocumentationImages();
        fetchLinks();
    }, []);

    const fetchDocumentationImages = () => {
        axios.get('http://localhost:8000/api/documentation-images')
            .then(response => {
                setDocumentationImages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const [documentationLink, setDocumentationLink] = useState('');


    const fetchLinks = () => {
        axios.get('http://localhost:8000/api/documentation-links')
            .then(response => {
                const data = response.data;
                if (data) {
                    setDocumentationLink(data.documentation_cloud);
                    setVideoLink(data.video_link);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    // --------------------------------------------------- ADDRESS ---------------------------------------------------
    const [addressData, setAddressData] = useState({ place: '', address_additional_info: '', google_map_link: '' });

    useEffect(() => {
        fetchAddressData();
    }, []);

    const fetchAddressData = () => {
        axios.get('http://localhost:8000/api/address')
            .then(response => {
                if (response.data) {
                    setAddressData(response.data);
                }
            })
            .catch(error => console.error(error));
    };

    // --------------------------------------------------- SPONSORE ---------------------------------------------------
    const [sponsorsLogoList, setSponsorsLogoList] = useState([]);

    // Fetch sponsors data
    useEffect(() => {
        const fetchSponsorsLogo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/sponsored_by');
                setSponsorsLogoList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSponsorsLogo();
    }, []);

    // --------------------------------------------------- SUPPORTED BY ---------------------------------------------------
    const [supportLogoList, setSupportLogoList] = useState([]);

    // Fetch supported logos data
    useEffect(() => {
        const fetchSupportLogo = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/supported_by');
                setSupportLogoList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSupportLogo();
    }, []);

    // --------------------------------------------------- COPYRIGHT ---------------------------------------------------

    const [copyrightText, setCopyrightText] = useState('');

    // Fetch the current copyright text from the server
    useEffect(() => {
        const fetchCopyrightText = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/copyright');
                if (response.data.length > 0) {
                    setCopyrightText(response.data[0].copyright_text);
                }
            } catch (error) {
                console.error('Error fetching copyright text:', error);
            }
        };
        fetchCopyrightText();
    }, []);

    const [buttonLinks, setButtonLinks] = useState({});


    // Fetch the button links from the server
    useEffect(() => {
        const fetchButtonLinks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/button-links');
                setButtonLinks(response.data || {});
            } catch (error) {
                console.error('Error fetching button links:', error);
            }
        };
        fetchButtonLinks();
    }, []);

    return (

        <body>
            <nav className="navbar navbar-expand-lg sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand sm-2 justify-content-start align-items-center" href="#">
                        <img src="./public/logo-icodis.png" alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#homeSection" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="#aboutSection" className="nav-link">About Us</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a href="#speakersSection" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded="false">
                                    Speakers <i className="bi bi-caret-down-fill ms-1"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a href="#speakersSection" className="dropdown-item">Keynote Speakers</a>
                                    </li>
                                    <li>
                                        <a href="#tutorialSession" className="dropdown-item">Tutorial Session</a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <a href="#authorInformation" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-expanded="false">
                                    For Author <i className="bi bi-caret-down-fill ms-1"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a href="#importantDateSection" className="dropdown-item">Important Date</a>
                                    </li>
                                    <li>
                                        <a href="#authorInformation" className="dropdown-item">Submission</a>
                                    </li>
                                    <li>
                                        <a href="#registration" className="dropdown-item">Registration</a>
                                    </li>
                                    <li>
                                        <a href="#pricing" className="dropdown-item">Pricing</a>
                                    </li>
                                    <li>
                                        <a href={buttonLinks.presentation_schedule_link}target="_blank"rel="noopener noreferrer"className="dropdown-item">
                                            Schedule
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <a href="#programComittee" className="nav-link">Committee</a>
                            </li>
                            <li className="nav-item">
                                <a href="#address" className="nav-link">Contacts</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className='content'>
                <section className="Home" id="homeSection" style={{ backgroundImage: `url('http://localhost:8000/storage/${homeData.home_bg || 'gb.jpg'}')` }} >
                    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center homecontent">
                        {/* <Particle className="tsparticles"/> */}

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
                            <button
                                type="button"
                                className="btn btn-primary mx-2"
                                onClick={() => window.open(buttonLinks.submit_here_link, '_blank', 'noopener,noreferrer')}
                            >
                                Submit Here
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary mx-2"
                                onClick={() => window.open(buttonLinks.presentation_schedule_link, '_blank', 'noopener,noreferrer')}
                            >
                                Presentation Schedule
                            </button>



                        </div>

                        <div className="wrapper">
                            <div className="container typing-demo" id="descHome">
                                <p className='sec-text'>
                                    <span className="typing-text">{homeData.description}</span>
                                    <span className="cursor"></span>
                                </p>
                            </div>
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

                <section className="AboutUs" id='aboutSection'>
                    <div className="container">

                        <div className="row flex">
                            <div className="confDay col-md-6 col-lg-5">
                                <div className="container p-0" id="aboutImg">
                                    <img src={`http://localhost:8000/storage/${aboutData.about_img || 'bali.jpg'}`} alt="conf.img" id="confImgDash" />
                                </div>
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
                                    {aboutData.about_desc.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </h5>

                            </div>

                        </div>
                    </div>

                </section>

                <section className="Speakers" id='speakersSection'>
                    <div className="container">
                        <div className="section-header">
                            <h5>Keynote</h5>
                            <h2>Speakers</h2>
                        </div>
                        <div className="row mt-4 px-2">
                            {speakers.map((speaker) => (
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 mb-4" key={speaker.id}>
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


                <section className="tutorial" id="tutorialSession">
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
                            <p>
                                {tutorialData.abstract.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="importantDate" id="importantDateSection" style={{ backgroundImage: `url(${importantDateData.important_date_bg})` }}>
                    <div className="container">
                        <h2>Important Date</h2>
                    </div>
                    <div className="container">
                        <div className="row">

                            {importantDates.map((date) => (
                                <div className="col-12  col-xxl-3 col-xl-4 col-lg-4 col-md-4 mb-4 " key={date.id}>
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
                                    <div className="col-12 col-md-4 col-lg-4 mb-4 p-0" key={topic.id}>
                                        <div className="card">
                                            <div className="card-title pb-2">
                                                <h3>{topic.topic_order}.</h3>
                                            </div>
                                            <div className="card-body p-0">
                                                <h4 className="card-text">{topic.topic_title}</h4>
                                                <h5>
                                                    {topic.topic_list.split('\n').map((line, index) => (
                                                        <span key={index}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </h5>

                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                </section>

                <section className="AuthorInfo" id="authorInformation">
                    <div className="container">
                        <h1>
                            Author Information
                        </h1>
                    </div>

                    <div className="container mt-3">
                        {authorData.map((data) => (
                            <div key={data.id}>
                                {data.author_add === 'subtitle' && <h2>
                                    {data.author_subtitle.split('\n').map((line, index) => (
                                        <span key={index}>{line}<br /></span>
                                    ))}
                                </h2>
                                }
                                {data.author_add === 'text' && <p>
                                    {data.author_text.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                                }
                                {data.author_add === 'button' && (
                                    <button type='button' className='btn btn-primary'>
                                        <a href={data.author_button_link} target="_blank" >{data.author_button_text || 'Visit'}</a>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="registration" id="registration">
                    <div className="container">
                        <h1>
                            Registration
                        </h1>
                    </div>


                    <div className="container mt-3">
                        {registrationData.map((data) => (
                            <div key={data.id}>
                                {data.registration_add === 'subtitle' && (
                                    <h2>
                                        {data.registration_subtitle.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </h2>
                                )}

                                {data.registration_add === 'text' && (
                                    <p>
                                        {data.registration_text.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </p>
                                )}

                                {data.registration_add === 'button' && (
                                    <button type='button' className='btn btn-primary' >
                                        <a href={data.registration_button_link} target="_blank">{data.registration_button_text || 'Visit'}</a>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="programComittee" id="programComittee">
                    <div className="container">
                        <div className="section-header pb-1">
                            <h2>Program Committee</h2>
                            <h5>Organaizing Committee</h5>
                        </div>

                        <div className="container content-area p-0">
                            <div className="row">
                                {/* Kolom Kiri */}
                                <div className="col-md-6">
                                    {leftColumn.map(committee => (
                                        <div className="content" key={committee.id}>
                                            <div className="content-head">
                                                <h3>{committee.committee_position}</h3>
                                            </div>
                                            <div className="content-body">
                                                <h4>{committee.committee_members}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Kolom Kanan */}
                                <div className="col-md-6">
                                    {rightColumn.map(committee => (
                                        <div className="content" key={committee.id}>
                                            <div className="content-head">
                                                <h3>{committee.committee_position}</h3>
                                            </div>
                                            <div className="content-body">
                                                <h4>{committee.committee_members}</h4>
                                            </div>
                                        </div>
                                    ))}
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
                                    {savedReviewers
                                        .slice(0, Math.ceil(savedReviewers.length / 2))
                                        .map((reviewer, index) => (
                                            <h4 key={index}>
                                                {reviewer}
                                            </h4>
                                        ))}
                                </div>

                                {/* Kolom Kanan */}
                                <div className="col-md-6">
                                    {savedReviewers
                                        .slice(Math.ceil(savedReviewers.length / 2))
                                        .map((reviewer, index) => (
                                            <h4 key={index + Math.ceil(savedReviewers.length / 2)}>
                                                {reviewer}
                                            </h4>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pricing" id="pricing">
                    <div className="container">
                        <div className="section-header">
                            <h2>Pricing</h2>
                            <h5>Normal Paper</h5>
                        </div>
                        <div className="container pricing-area p-0 pt-5">
                            <div className="container p-0">
                                <div className="row">


                                    {Array.isArray(pricings) && pricings.map((pricing) => (
                                        <div className="col-xxl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-4 fade-in" key={pricing.id}>
                                            <div className="card priceCard">
                                                <div className="card-body">
                                                    <div className="card-head">
                                                        <h3 className="card-title">
                                                            {pricing.price_label.split('\n').map((line, index) => (
                                                                <span key={index}>
                                                                    {line}
                                                                    <br />
                                                                </span>
                                                            ))}
                                                        </h3>
                                                    </div>

                                                    <hr className="opacity-100" />
                                                    <h4>${pricing.price}</h4>
                                                    <p className="card-text mt-4">{pricing.price_idr}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

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

                            {paymentData.map((data) => (
                                <div key={data.id} className="card mt-3">
                                    <div className="card-body">
                                        {data.method_or_info === 'method' && (
                                            <>
                                                <h3>{data.payment_method}</h3>
                                                <p className='card-text'>
                                                    {data.payment_details.split('\n').map((line, index) => (
                                                        <span key={index}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </p>
                                            </>
                                        )}
                                        {data.method_or_info === 'info' && (
                                            <p className='card-text'>
                                                {data.payment_additional_info.split('\n').map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                            </p>
                                        )}

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                <section className="article">
                    <div className="container">
                        <h1>Article</h1>
                        <div className="container d-flex justify-content-center article-content text-center p-0">
                            {articles.map((article) => (
                                <div key={article.id} className="card mr-2">
                                    {/* Pastikan gambar diakses dengan URL lengkap */}
                                    <img src={`http://localhost:8000${article.article_img}`} className="card-img-top" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.article_title}</h5>
                                        <p className="card-text">{article.article_description}</p>
                                        <a href={article.article_link} target="_blank" rel="noopener noreferrer">Read More</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="documentation">
                    <div className="container">
                        <h1>Documentation</h1>
                        <a href={documentationLink || '#'} target="_blank" rel="noopener noreferrer">LINK DOCUMENTATION</a>
                        <div className="container photo-area">
                            <div className="row">

                                {documentationImages.map((image) => (
                                    <div className="col-12 col-md-4 p-0 photo-documentation" key={image.id}>
                                        <a href="#">
                                            <img src={`http://localhost:8000${image.documentation_img}`} alt="" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="container video-documentation p-0">
                            <iframe width="100%" height="400"
                                src={videoLink || 'https://www.youtube.com/embed/2KnuZaqjvo4'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>

                    </div>
                </section>


                <section className="address" id="address">
                    <div className="container-fluid">
                        <div className="row no-gutters m-0">
                            <div className="col-md-6 address-area" style={{ backgroundImage: `url('/bgfooter.jpg')` }}>
                                <div className="address-place">
                                    <h5>
                                        {addressData.place}
                                    </h5>
                                    <div className="address-city">
                                        <p>
                                            Bali, ID
                                        </p>
                                    </div>
                                    <div className="contact">
                                        <p>
                                            {addressData.address_additional_info}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 map-area">
                                <iframe
                                    src={addressData.google_map_link || "https://www.google.com/maps"}
                                    allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="footer">
                <div className="container-fluid footer-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col icodsa-footer">
                                <img src="/public/logo-icodis.png" alt="" />
                                <p>The International Conference on Data Science and Its Applications</p>
                            </div>

                            <div className="col">
                                <h3 className="m-0">Supported by:</h3>
                                <div className="container-fluid support-logo p-0">
                                    {supportLogoList.length > 0 ? (
                                        <div className="d-flex">
                                            {supportLogoList.map((supportLogo) => (
                                                <div key={supportLogo.id} className="support-logo-container position-relative mx-2">
                                                    <img
                                                        src={`http://localhost:8000/storage/${supportLogo.support_logo}`}
                                                        alt="Support Logo"
                                                        className="mx-2"
                                                    />

                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No logos uploaded yet.</p>
                                    )}
                                </div>
                            </div>


                            <div className="container text-center">
                                <hr className="opacity-100" />
                                <p>© {copyrightText}</p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid justify-content-center align-items-center sponsored-area">
                    <div className="sponsored d-flex align-items-center justify-content-center">
                        <h3 className="m-0">Sponsored by:</h3>
                        {sponsorsLogoList.length > 0 ? (
                            sponsorsLogoList.map((sponsorLogo) => (
                                <div key={sponsorLogo.id} className="sponsor-logo-container position-relative mx-2">
                                    <img
                                        src={`http://localhost:8000/storage/${sponsorLogo.sponsore_logo}`}
                                        alt="Sponsor Logo"
                                        className="mx-2"
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No sponsor logos uploaded yet.</p>
                        )}
                    </div>
                </div>
            </footer>

        </body>

    );
}

// SCRIPT 



import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import '../styles/dashboard.css';

export default function Dashboard() {

    // ------------- HOME START -------------

    const [homeData, setHomeData] = useState({
        title: '',
        place_date: '',
        description: '',
        home_bg: null // Ubah menjadi null untuk menampung file gambar
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
                        title: 'ICODSA',
                        place_date: 'Place & Date',
                        description: 'Description',
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/api/homes/1', homeData);
            setHomeData(response.data);
            alert('Post updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHomeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBgUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return; // Pastikan file ada

        const formData = new FormData();
        formData.append('home_bg', file); // Simpan file gambar

        try {
            const response = await axios.post('http://localhost:8000/api/homes/1/bg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setHomeData((prevData) => ({ ...prevData, home_bg: response.data.home_bg }));
            alert('Background image uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogoUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append('host_logo[]', files[i]); // Menyimpan file gambar dalam array
        }

        try {
            await axios.post('http://localhost:8000/api/host_host_logos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Memperbarui data logo setelah berhasil diupload
            const response = await axios.get('http://localhost:8000/api/host_host_logos');
            setHostLogoData(response.data);
            alert('Logos uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogoDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/host_host_logos/${id}`);
            // Memperbarui data logo setelah berhasil dihapus
            const response = await axios.get('http://localhost:8000/api/host_host_logos');
            setHostLogoData(response.data);
            alert('Logo deleted successfully!');
        } catch (error) {
            console.error(error);
        }
    };

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

    const handleSubmitAbout = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/api/abouts/1', aboutData)
            .then(response => {
                setAboutData(response.data);
                alert('About Us updated successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleInputChangeAbout = (event) => {
        const { name, value } = event.target;
        setAboutData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAboutImgUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return; // Pastikan file ada

        const formData = new FormData();
        formData.append('about_img', file); // Simpan file gambar

        try {
            const response = await axios.post('http://localhost:8000/api/abouts/1/about_img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Update about_img sesuai nama yang benar dalam response
            setAboutData((prevData) => ({ ...prevData, about_img: response.data.about_img }));
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };


    // ------------- SPEAKERS -------------
    const [speakers, setSpeakers] = useState([]);
    const [newSpeaker, setNewSpeaker] = useState({
        speakers_img: '',
        speakers_name: '',
        speakers_desc: '',
    });
    const [showModal, setShowModalSpeakers] = useState(false);
    const [selectedLogo, setSelectedLogoSpeakers] = useState(null);

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

    const handleInputChangeSpeakers = (event) => {
        const { name, value } = event.target;
        setNewSpeaker((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChangeSpeakers = (event) => {
        setSelectedLogoSpeakers(event.target.files[0]);
    };

    const handleSubmitSpeakers = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('speakers_img', selectedLogo);
        formData.append('speakers_name', newSpeaker.speakers_name);
        formData.append('speakers_desc', newSpeaker.speakers_desc);

        axios.post('http://localhost:8000/api/speakers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setSpeakers([...speakers, response.data]);
                setShowModalSpeakers(false);
                alert('Speaker added successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteSpeakers = (id) => {
        if (window.confirm('Are you sure you want to delete this speaker?')) {
            axios.delete(`http://localhost:8000/api/speakers/${id}`)
                .then(() => {
                    setSpeakers(speakers.filter(speaker => speaker.id !== id));
                    alert('Speaker deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
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

    const handleSubmitTutorial = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/api/tutorial/1', tutorialData)
            .then(response => {
                setTutorialData(response.data);
                alert('Tutorial updated successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleInputChangeTutorial = (event) => {
        const { name, value } = event.target;
        setTutorialData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleThumbnailImgUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return; // Pastikan file ada

        const formData = new FormData();
        formData.append('thumbail_img', file); // Simpan file gambar

        try {
            const response = await axios.post('http://localhost:8000/api/tutorial/1/thumbail_img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Update thumbail_img sesuai nama yang benar dalam response
            setTutorialData((prevData) => ({ ...prevData, thumbail_img: response.data.thumbail_img }));
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // ------------- Important Date -------------

    const [importantDates, setImportantDates] = useState([]);
    const [newImportantDate, setNewImportantDate] = useState({
        activity: '',
        activity_icon: '',
        event_date: '',
    });
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showModalImportantDate, setShowModalImportantDate] = useState(false);

    // Fetch important dates from the API
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

    // Function to handle input changes in the form
    const handleInputChangeImportantDate = (event) => {
        const { name, value } = event.target;
        setNewImportantDate((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle file changes (icon upload)
    const handleFileChangeImportantDate = (event) => {
        setSelectedIcon(event.target.files[0]);
    };

    // Function to handle the submission of the new important date
    const handleSubmitImportantDate = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('activity_icon', selectedIcon);
        formData.append('activity', newImportantDate.activity);
        formData.append('event_date', newImportantDate.event_date);

        axios.post('http://localhost:8000/api/important-dates', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setImportantDates([...importantDates, response.data]);
                setShowModalImportantDate(false);
                alert('Important date added successfully!');
            })
            .catch(error => {
                console.error('Error adding important date:', error);
            });
    };

    // Function to handle the deletion of an important date
    const handleDeleteImportantDate = (id) => {
        if (window.confirm('Are you sure you want to delete this important date?')) {
            axios.delete(`http://localhost:8000/api/important-dates/${id}`)
                .then(() => {
                    setImportantDates(importantDates.filter(date => date.id !== id));
                    alert('Important date deleted successfully!');
                })
                .catch(error => {
                    console.error('Error deleting important date:', error);
                });
        }
    };

    // IMPORTANT DATE BG


    // ---------- TOPICS ----------
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({
        topic_order: '',
        topic_title: '',
        topic_list: '',
    });
    const [showModalTopics, setShowModalTopics] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState(null);

    // Fetch topics from the API
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

    const handleInputChangeTopics = (event) => {
        const { name, value } = event.target;
        setNewTopic((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitTopics = (event) => {
        event.preventDefault();
        if (selectedTopicId) {
            // Update existing topic
            axios.put(`http://localhost:8000/api/topics/${selectedTopicId}`, newTopic)
                .then(response => {
                    setTopics(topics.map(topic => topic.id === selectedTopicId ? response.data : topic));
                    setShowModalTopics(false);
                    alert('Topic updated successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // Add new topic
            axios.post('http://localhost:8000/api/topics', newTopic)
                .then(response => {
                    setTopics([...topics, response.data]);
                    setShowModalTopics(false);
                    alert('Topic added successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleDeleteTopics = (id) => {
        if (window.confirm('Are you sure you want to delete this topic?')) {
            axios.delete(`http://localhost:8000/api/topics/${id}`)
                .then(() => {
                    setTopics(topics.filter(topic => topic.id !== id));
                    alert('Topic deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleEditTopics = (topic) => {
        setNewTopic({
            topic_order: topic.topic_order,
            topic_title: topic.topic_title,
            topic_list: topic.topic_list,
        });
        setSelectedTopicId(topic.id);
        setShowModalTopics(true);
    };


    return (




        <div>


            <div className="main">
                {/* Section Home */}
                <section className="Home" style={{ backgroundImage: `url('http://localhost:8000/storage/${homeData.home_bg || 'gb.jpg'}')` }} >
                    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                        <div className="container align-items-center" id="hostLogo">
                            {hostLogoData.length > 0 ? (
                                hostLogoData.map((logo) => (
                                    <div id="logo-container" key={logo.id} className="logo-container position-relative"> {/* Tambahkan position-relative */}
                                        <img src={`http://localhost:8000/storage/${logo.host_logo}`} alt="Host Logo" className="mx-2" />
                                        <svg
                                            type="button" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => handleLogoDelete(logo.id)} className="delete-icon"
                                        > <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" fill="white" /> <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" stroke="#DE5858" /> <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#DE5858" />
                                        </svg>
                                    </div>
                                ))
                            ) : (
                                <p>No logos uploaded yet.</p>
                            )}

                        </div>

                        <div className="container" id="inputLogo">
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2231 15.3125C14.654 15.3125 15.0807 15.2276 15.4788 15.0627C15.8769 14.8978 16.2386 14.6561 16.5433 14.3514C16.848 14.0468 17.0897 13.685 17.2546 13.2869C17.4195 12.8888 17.5044 12.4621 17.5044 12.0312C17.5044 11.6004 17.4195 11.1737 17.2546 10.7756C17.0897 10.3775 16.848 10.0157 16.5433 9.71106C16.2386 9.40636 15.8769 9.16467 15.4788 8.99977C15.0807 8.83487 14.654 8.75 14.2231 8.75C13.3529 8.75 12.5183 9.0957 11.9029 9.71106C11.2876 10.3264 10.9419 11.161 10.9419 12.0312C10.9419 12.9015 11.2876 13.7361 11.9029 14.3514C12.5183 14.9668 13.3529 15.3125 14.2231 15.3125Z" fill="white" />
                                <path d="M30.625 30.625C30.625 31.7853 30.1641 32.8981 29.3436 33.7186C28.5231 34.5391 27.4103 35 26.25 35H8.75C7.58968 35 6.47688 34.5391 5.65641 33.7186C4.83594 32.8981 4.375 31.7853 4.375 30.625V4.375C4.375 3.21468 4.83594 2.10188 5.65641 1.28141C6.47688 0.460936 7.58968 0 8.75 0L20.7812 0L30.625 9.84375V30.625ZM8.75 2.1875C8.16984 2.1875 7.61344 2.41797 7.2032 2.8282C6.79297 3.23844 6.5625 3.79484 6.5625 4.375V26.25L11.4275 21.385C11.5999 21.213 11.8248 21.1035 12.0665 21.0737C12.3082 21.044 12.5529 21.0958 12.7619 21.2209L17.5 24.0625L22.2184 17.4562C22.3108 17.3271 22.4301 17.2197 22.5681 17.1413C22.7062 17.0629 22.8596 17.0155 23.0178 17.0024C23.176 16.9893 23.3351 17.0108 23.4842 17.0654C23.6332 17.1199 23.7686 17.2063 23.8809 17.3184L28.4375 21.875V9.84375H24.0625C23.1923 9.84375 22.3577 9.49805 21.7423 8.88269C21.127 8.26734 20.7812 7.43274 20.7812 6.5625V2.1875H8.75Z" fill="white" />
                            </svg>

                            <label htmlFor="file-upload" className="custom-file-upload">
                                Choose png logo
                            </label>
                            <input id="file-upload" type="file" multiple onChange={handleLogoUpload} />
                        </div>



                        <form onSubmit={handleSubmit}>
                            {/* Form untuk data home */}
                            <div className="container" id="textHome">
                                <input
                                    type="text" className="title-input editable-text" name="title"
                                    value={homeData.title} onChange={handleInputChange} placeholder="Event Name"
                                />

                                <input
                                    type="text" className="place-date-input editable-text mb-0" name="place_date"
                                    value={homeData.place_date} onChange={handleInputChange} placeholder="Place, Date"
                                />
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
                                <textarea
                                    className="description-input editable-text mb-0" value={homeData.description}
                                    onChange={handleInputChange} placeholder="Short Description" rows="3"
                                ></textarea>
                            </div>

                            <input type="file" accept="image/*" onChange={handleBgUpload} />

                            <button type="submit">Update Home</button>
                        </form>
                    </div>
                </section>

                {/* Section About Us */}
                <section className="AboutUs">
                    <div className="container">
                        <form onSubmit={handleSubmitAbout}>
                            <div className="row flex">
                                <div className="confDay col-md-6 col-lg-5">
                                    <div className="container p-0" id="aboutImg">
                                        <img src={`http://localhost:8000/storage/${aboutData.about_img || 'bali.jpg'}`} alt="conf.img" id="confImgDash" />
                                    </div>
                                    <div className="container excellance-tag text-center p-4" id="excelance-tag">
                                        <div className="container excellance-text justify-content-center p-2">
                                            <p>Conf. Date</p>
                                            <div className="icon">
                                                <div className="icon-home">
                                                    {/* SVG */}
                                                </div>
                                                <h3 id="confDate"><input
                                                    type="text" className="eventDD-input editable-text mb-0" name="event_dd"
                                                    value={aboutData.event_dd} onChange={handleInputChangeAbout} placeholder="10-11" />
                                                </h3>
                                                <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.1667 30.5001L30.5 10.1667L50.8334 30.5001M15.25 26.6876V48.2917C15.25 48.9658 15.5178 49.6123 15.9945 50.089C16.4711 50.5656 17.1176 50.8334 17.7917 50.8334H25.4167V43.2084C25.4167 42.5343 25.6845 41.8878 26.1611 41.4112C26.6378 40.9345 27.2843 40.6667 27.9584 40.6667H33.0417C33.7158 40.6667 34.3623 40.9345 34.8389 41.4112C35.3156 41.8878 35.5834 42.5343 35.5834 43.2084V50.8334H43.2084C43.8824 50.8334 44.5289 50.5656 45.0056 50.089C45.4822 49.6123 45.75 48.9658 45.75 48.2917V26.6876" stroke="white" />
                                                </svg>
                                                <h4><input
                                                    type="text" className="eventMMYY-input editable-text" name="event_mmyy"
                                                    value={aboutData.event_mmyy} onChange={handleInputChangeAbout} placeholder="July, 2025"
                                                /></h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <h1 className="mb-5" id="aboutUsH1">About Us</h1>
                                    <textarea
                                        className="descAbout-input"
                                        name="about_desc"
                                        value={aboutData.about_desc}
                                        onChange={handleInputChangeAbout}
                                        placeholder="About Description"
                                        rows="10"
                                    />
                                </div>
                            </div>
                            <div className="container" id='gambarAbout'>
                                <input type="file" accept="image/*" onChange={handleAboutImgUpload} style={{ marginTop: '10px' }} />
                            </div>
                            <button type="submit">Update About Us</button>
                        </form>
                    </div>
                </section>

                {/* Section Speakers */}
                <section className="Speakers pt-100 pb-80">
                    <div className="container">
                        <div className="section-header">
                            <h5>Keynote</h5>
                            <h2>Speakers</h2>
                            <button className="btn btn-primary" onClick={() => setShowModalSpeakers(true)}>
                                + Add Speaker
                            </button>
                        </div>

                        <div className="row">
                            {speakers.map((speaker) => (
                                <div className="col-md-4" key={speaker.id}>
                                    <div className="card mb-4">
                                        <img src={`http://localhost:8000${speaker.speakers_img}`} className="card-img-top" alt={speaker.speakers_name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{speaker.speakers_name}</h5>
                                            <p className="card-text">{speaker.speakers_desc}</p>
                                            <button className="btn btn-danger" onClick={() => handleDeleteSpeakers(speaker.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Modal for Adding New Speaker */}
                {showModal && (
                    <div className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Speaker</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModalSpeakers(false)}></button>
                                </div>
                                <form onSubmit={handleSubmitSpeakers}>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label className="form-label">Upload Image</label>
                                            <input type="file" className="form-control" onChange={handleFileChangeSpeakers} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Speaker Name</label>
                                            <input type="text" className="form-control" name="speakers_name" onChange={handleInputChangeSpeakers} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" name="speakers_desc" onChange={handleInputChangeSpeakers} required></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModalSpeakers(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Add Speaker</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <section className="tutorial-dash">
                    <div className="section-header">
                        <h5>Tutorial</h5>
                        <h2>Session</h2>
                    </div>
                    <div className="container">
                        <form onSubmit={handleSubmitTutorial}>
                            <div className="container p-0" id="thumbnailImg">
                                <img src={`http://localhost:8000/storage/${tutorialData.thumbail_img || 'placeholder.jpg'}`} alt="Tutorial Thumbnail" />
                            </div>
                            <div className="container" id="uploadThumbnail">
                                <input type="file" accept="image/*" onChange={handleThumbnailImgUpload} />
                            </div>
                            <div className="container p-0">
                                <textarea
                                    className="abstract-input" name="abstract" value={tutorialData.abstract} onChange={handleInputChangeTutorial}
                                    placeholder="Tutorial Description" rows="10" />
                            </div>
                            <button type="submit">Update Tutorial</button>
                        </form>
                    </div>
                </section>


                <section className="importantDate" style={{ backgroundImage: `url('/coba.jpg')` }}>
                    <p>Input BG Disini</p>
                    <div className="container">
                        <h2>Important Date</h2>
                        <button className="btn btn-primary" onClick={() => setShowModalImportantDate(true)}>+ Add Important Date</button>
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
                                            <button className="btn btn-danger" onClick={() => handleDeleteImportantDate(date.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {showModalImportantDate && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New Important Date</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModalImportantDate(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmitImportantDate}>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Activity</label>
                                                <input type="text" className="form-control" name="activity" onChange={handleInputChangeImportantDate} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Upload Icon</label>
                                                <input type="file" className="form-control" onChange={handleFileChangeImportantDate} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Event Date</label>
                                                <input type="date" className="form-control" name="event_date" onChange={handleInputChangeImportantDate} required />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModalImportantDate(false)}>Close</button>
                                            <button type="submit" className="btn btn-primary">Add Important Date</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <section className="ourTopics">
                    <div className="container">
                        <div className="section-header">
                            <h5>Our</h5>
                            <h2>Topics</h2>
                            <button className="btn btn-primary" onClick={() => { setNewTopic({ topic_order: '', topic_title: '', topic_list: '' }); setSelectedTopicId(null); setShowModalTopics(true); }}>
                                + Add Topic
                            </button>
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
                                                <button className="btn btn-danger" onClick={() => handleDeleteTopics(topic.id)}>
                                                    Delete
                                                </button>
                                                <button className="btn btn-secondary" onClick={() => handleEditTopics(topic)}>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Modal for Adding/Editing Topic */}
                    {showModalTopics && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{selectedTopicId ? 'Edit Topic' : 'Add New Topic'}</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModalTopics(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmitTopics}>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label">Topic Order</label>
                                                <input type="text" className="form-control" name="topic_order" value={newTopic.topic_order} onChange={handleInputChangeTopics} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Topic Title</label>
                                                <input type="text" className="form-control" name="topic_title" value={newTopic.topic_title} onChange={handleInputChangeTopics} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Topic List</label>
                                                <textarea className="form-control" name="topic_list" value={newTopic.topic_list} onChange={handleInputChangeTopics} required></textarea>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModalTopics(false)}>Close</button>
                                            <button type="submit" className="btn btn-primary">{selectedTopicId ? 'Update Topic' : 'Add Topic'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>

        </div>
    );
}

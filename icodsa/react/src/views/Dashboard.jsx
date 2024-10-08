import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboard.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {

    // ------------- HOME -------------
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8000/api/homes/1', homeData)
            .then(response => {
                setHomeData(response.data);
                alert('Post updated successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHomeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAboutData((prevData) => ({
                    ...prevData,
                    about_img: reader.result, // Simpan URL gambar sementara
                }));
            };
            reader.readAsDataURL(file); // Membaca file sebagai URL
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


    return (
        <div>
            {/* Section Home */}
            <section className="Home" style={{ backgroundImage: `url('/coba.jpg')` }}>
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="container" id="hostLogo">
                            {homeData.host_logo ? (
                                <img src={`http://localhost:8000/storage/${homeData.host_logo}`} alt="Host Logo" className="mx-2" />
                            ) : (
                                <p>No logo uploaded yet.</p>
                            )}
                        </div>

                        <div className="container" id="textHome">
                            <input
                                type="text"
                                className="title-input editable-text"
                                name="title"
                                value={homeData.title}
                                onChange={handleInputChange}
                                placeholder="Judul ICODSAnya"
                            />
                            <h1 className="hidden">{homeData.title}</h1>

                            <input
                                type="text"
                                className="place-date-input editable-text"
                                name="place_date"
                                value={homeData.place_date}
                                onChange={handleInputChange}
                                placeholder="Place Date"
                            />
                            <h2 className="hidden">{homeData.place_date}</h2>
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
                            <input
                                type="text"
                                className="description-input editable-text"
                                name="description"
                                value={homeData.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                            />
                            <p className="hidden">{homeData.description}</p>
                        </div>

                        <button type="submit">Update Home</button>
                    </form>
                </div>
            </section>

            {/* Section About Us */}
            <section className="AboutUs">
                <div className="container">
                    <form onSubmit={handleSubmitAbout}>
                        <div className="row flex">
                            <div className="col-md-6 col-lg-5">
                                <div className="excellance-tag bg-primary">
                                    <div className="excellance-text">
                                        <p>Conf. Date</p>
                                        <div className="icon">
                                            <div className="icon-home">
                                                <i className="icon-home fa-3x"></i>
                                            </div>
                                            <input
                                                type="text"
                                                className="eventDD-input editable-text"
                                                name="event_dd"
                                                value={aboutData.event_dd}
                                                onChange={handleInputChangeAbout}
                                                placeholder="10-11"
                                            />
                                            <input
                                                type="text"
                                                className="eventMMYY-input editable-text"
                                                name="event_mmyy"
                                                value={aboutData.event_mmyy}
                                                onChange={handleInputChangeAbout}
                                                placeholder="July, 2025"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <img src="/bali.jpg" alt="conf.date" id="confImg" />
                                <input
                                    type="file"
                                    accept="image/*" // Membatasi file yang bisa diupload menjadi gambar
                                    onChange={handleFileChange} // Menangani perubahan file
                                />
                                {aboutData.about_img && (
                                    <img
                                        src={aboutData.about_img}
                                        alt="Preview"
                                        style={{ width: '100%', height: 'auto', marginTop: '10px' }} // Menampilkan gambar yang diupload
                                    />
                                )}
                            </div>


                            <div className="col" id="aboutDesc">
                                <h1 className="mb-5">About Us</h1>
                                <div className="container">
                                    <textarea
                                        className="descAbout-input"
                                        name="about_desc"
                                        value={aboutData.about_desc}
                                        onChange={handleInputChangeAbout}
                                        placeholder="About Description"
                                        rows="10" // Menetapkan jumlah baris yang diinginkan
                                    />
                                </div>
                            </div>

                        </div>
                        <button type="submit">Update About Us</button>
                    </form>
                </div>
            </section>

            {/* Section Speakers */}
            <section className="Speakers pt-100 pb-80 bg-light">
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
        </div>
    );
}

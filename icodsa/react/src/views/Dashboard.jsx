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

    // ------------- HOME END -------------

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
            <section className="Home" style={{ backgroundImage: `url('/coba.jpg')` }} >
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                    <div className="container" id="hostLogo">
                        {hostLogoData.length > 0 ? (
                            hostLogoData.map((logo) => (
                                <div key={logo.id} className="logo-container">
                                    <img src={`http://localhost:8000/storage/${logo.host_logo}`} alt="Host Logo" className="mx-2" />
                                    <button type="button" onClick={() => handleLogoDelete(logo.id)} className="btn btn-danger mx-2">
                                        Delete Logo
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No logos uploaded yet.</p>
                        )}
                        <input type="file" multiple onChange={handleLogoUpload} /> {/* Menambahkan atribut multiple */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Form untuk data home */}
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
                            
                            <div className="confDay col-md-6 col-lg-5">
                                <div className="container">
                                    <img src="/bali.jpg" alt="conf.date" id="confImg" />
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
                                            <h3 id="confDate"><input
                                                type="text"
                                                className="eventDD-input editable-text"
                                                name="event_dd" value={aboutData.event_dd} onChange={handleInputChangeAbout} placeholder="10-11"
                                            /></h3>
                                            <h4><input
                                                type="text"
                                                className="eventMMYY-input editable-text"
                                                name="event_mmyy" value={aboutData.event_mmyy} onChange={handleInputChangeAbout} placeholder="July, 2025"
                                            /></h4>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="col">
                                <h1 className="mb-5" id="aboutUsH1">
                                    About Us
                                </h1>
                                <textarea
                                    className="descAbout-input"
                                    name="about_desc"
                                    value={aboutData.about_desc}
                                    onChange={handleInputChangeAbout}
                                    placeholder="About Description"
                                    rows="50"
                                />
                            </div>

                        </div>
                        <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
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

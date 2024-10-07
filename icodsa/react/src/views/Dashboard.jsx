import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboard.css';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard() {

    // ------------- HOME START -------------
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

    // ------------- ABOUT US START ------------- 
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

    return (
        <div>
            {/* Section Home */}
            <section className="Home" style={{ backgroundImage: `url('/coba.jpg')` }}>
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                    <form onSubmit={handleSubmit}>
                        <div className="container" id="hostLogo">
                            <img src="/logo-telu.png" alt="Logo TelU" className="mx-2" />
                            <img src="/logo-utm.png" alt="Logo UTM" className="mx-2" />
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
                    </div>
                    <div className="card">
                        <img src="/HoshangKolivand.jpg" className="card-img-top" alt="Assoc. Prof. Dr. Hoshang Kolivand" />
                        <div className="card-body">
                            <h5 className="card-title">Assoc. Prof. Dr. Hoshang Kolivand</h5>
                            <p className="card-text">
                                School of Computer Science and Mathematics, Liverpool John Moores University, England
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/dashboard.css';

export default function Dashboard() {
    // --------------------------------------------------- Auth and Logout ---------------------------------------------------

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Jika tidak ada token, arahkan ke halaman login
        if (!token) {
            navigate('/login');
            return;
        }

    }, [navigate]);

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(() => {
                localStorage.removeItem('token');
                navigate('/login'); // Logout and redirect to login
            });
    };

    const confirmLogout = () => {
        setShowLogoutModal(true);
    };


    // --------------------------------------------------- QUILL EDITOR  ---------------------------------------------------



    // --------------------------------------------------- NAVBAR ---------------------------------------------------
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


    // --------------------------------------------------- HOME START ---------------------------------------------------

    const [homeData, setHomeData] = useState({
        title: '',
        place_date: '',
        description: '',
        home_bg: null // Ubah menjadi null untuk menampung file gambar
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
                        title: 'ICODSA',
                        place_date: 'Place & Date',
                        description: 'Description',
                        home_bg: 'background.jpg',
                    };
                    await axios.post('http://localhost:8000/api/homes/1', newHome);
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

    // --------------------------------------------------- ABOUT US ---------------------------------------------------

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



    // --------------------------------------------------- SPEAKERS ---------------------------------------------------
    const [speakers, setSpeakers] = useState([]);
    const [newSpeaker, setNewSpeaker] = useState({
        speakers_img: '',
        speakers_name: '',
        speakers_desc: '',
    });
    const [showModal, setShowModalSpeakers] = useState(false);
    const [selectedLogo, setSelectedLogoSpeakers] = useState(null);

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

    // --------------------------------------------------- TUTORIAL ---------------------------------------------------

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

    // --------------------------------------------------- Important Date ---------------------------------------------------

    const [importantDates, setImportantDates] = useState([]);
    const [newImportantDate, setNewImportantDate] = useState({
        activity: '',
        activity_icon: '',
        event_date: '',
    });
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [showModalImportantDate, setShowModalImportantDate] = useState(false);

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

    const handleInputChangeImportantDate = (event) => {
        const { name, value } = event.target;
        setNewImportantDate((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChangeImportantDate = (event) => {
        setSelectedIcon(event.target.files[0]);
    };

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

    // --------------------------------------------------- IMPORTANT DATE BG ---------------------------------------------------
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

    const handleBgUploadImportantBg = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('background', file);

        try {
            const response = await axios.post(`http://localhost:8000/api/important_date_bg/1/bg`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImportantDateData((prevData) => ({ ...prevData, important_date_bg: response.data.background_url }));
            alert('Background image uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // --------------------------------------------------- OUT TOPICS ---------------------------------------------------

    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({
        topic_order: '',
        topic_title: '',
        topic_list: '',
    });
    const [showModalTopics, setShowModalTopics] = useState(false);
    const [selectedTopicId, setSelectedTopicId] = useState(null);

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

    // --------------------------------------------------- AUTHOR INFORMATION ---------------------------------------------------

    const [authorData, setAuthorData] = useState([]);
    const [newAuthorData, setNewAuthorData] = useState({
        author_subtitle: '',
        author_text: '',
        author_button_link: '',
        author_button_text: '',
        author_add: ''
    });
    const [showModalAuthor, setShowModal] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    // Fetch author information
    useEffect(() => {
        fetchAuthorData();
    }, []); // Menggunakan array kosong agar hanya berjalan sekali


    const fetchAuthorData = () => {
        axios.get('http://localhost:8000/api/author-information')
            .then(response => {
                setAuthorData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmitAuthor = (event) => {
        event.preventDefault();
        if (selectedId) {
            // Update existing author data
            axios.put(`http://localhost:8000/api/author-information/${selectedId}`, newAuthorData)
                .then(response => {
                    setAuthorData(authorData.map(data =>
                        data.id === selectedId ? response.data : data
                    ));
                    setShowModal(false);
                    alert('Author data updated successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // Add new author data
            axios.post('http://localhost:8000/api/author-information', newAuthorData)
                .then(response => {
                    setAuthorData([...authorData, response.data]); // Update state langsung
                    setShowModal(false);
                    alert('Author data added successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };


    const handleInputChangeAuthor = (e) => {
        const { name, value } = e.target;
        setNewAuthorData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteAuthor = (id) => {
        if (window.confirm('Are you sure you want to delete this author entry?')) {
            axios.delete(`http://localhost:8000/api/author-information/${id}`)
                .then(() => {
                    setAuthorData(authorData.filter(data => data.id !== id));
                    alert('Author data deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleAddSubtitleAuthor = () => {
        setNewAuthorData({
            author_subtitle: '',
            author_text: '',
            author_button_link: '',
            author_button_text: '',
            author_add: 'subtitle'
        });
        setSelectedType('subtitle');
        setSelectedId(null);
        setShowModal(true);
    };

    const handleAddTextAuthor = () => {
        setNewAuthorData({
            author_subtitle: '',
            author_text: '',
            author_button_link: '',
            author_button_text: '',
            author_add: 'text'
        });
        setSelectedType('text');
        setSelectedId(null);
        setShowModal(true);
    };

    const handleAddButtonLinkAuthor = () => {
        setNewAuthorData({
            author_subtitle: '',
            author_text: '',
            author_button_link: '',
            author_button_text: '',
            author_add: 'button'
        });
        setSelectedType('button');
        setSelectedId(null);
        setShowModal(true);
    };


    // --------------------------------------------------- REGISTRATION ---------------------------------------------------
    const [registrationData, setRegistrationData] = useState([]);
    const [newRegistrationData, setNewRegistrationData] = useState({
        registration_subtitle: '',
        registration_text: '',
        registration_button_link: '',
        registration_button_text: '',
        registration_add: ''
    });
    const [showModalRegistration, setShowModalRegistration] = useState(false);
    const [selectedRegistrationType, setSelectedRegistrationType] = useState('');
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

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

    const handleSubmitRegistration = (event) => {
        event.preventDefault();
        if (selectedRegistrationId) {
            axios.put(`http://localhost:8000/api/registration/${selectedRegistrationId}`, newRegistrationData)
                .then(response => {
                    setRegistrationData(registrationData.map(data =>
                        data.id === selectedRegistrationId ? response.data : data
                    ));
                    setShowModalRegistration(false);
                    alert('Registration data updated successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            axios.post('http://localhost:8000/api/registration', newRegistrationData)
                .then(response => {
                    setRegistrationData([...registrationData, response.data]);
                    setShowModalRegistration(false);
                    alert('Registration data added successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleInputChangeRegistration = (e) => {
        const { name, value } = e.target;
        setNewRegistrationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteRegistration = (id) => {
        if (window.confirm('Are you sure you want to delete this registration entry?')) {
            axios.delete(`http://localhost:8000/api/registration/${id}`)
                .then(() => {
                    setRegistrationData(registrationData.filter(data => data.id !== id));
                    alert('Registration data deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleAddSubtitleRegistration = () => {
        setNewRegistrationData({
            registration_subtitle: '',
            registration_text: '',
            registration_button_link: '',
            registration_button_text: '',
            registration_add: 'subtitle'
        });
        setSelectedRegistrationType('subtitle');
        setSelectedRegistrationId(null);
        setShowModalRegistration(true);
    };

    const handleAddTextRegistration = () => {
        setNewRegistrationData({
            registration_subtitle: '',
            registration_text: '',
            registration_button_link: '',
            registration_button_text: '',
            registration_add: 'text'
        });
        setSelectedRegistrationType('text');
        setSelectedRegistrationId(null);
        setShowModalRegistration(true);
    };

    const handleAddButtonLinkRegistration = () => {
        setNewRegistrationData({
            registration_subtitle: '',
            registration_text: '',
            registration_button_link: '',
            registration_button_text: '',
            registration_add: 'button'
        });
        setSelectedRegistrationType('button');
        setSelectedRegistrationId(null);
        setShowModalRegistration(true);
    };


    // PROGRAM COMMITEE
    const [committees, setCommittees] = useState([]);
    const [newCommittee, setNewCommittee] = useState({
        committee_position: '',
        committee_members: '',
    });
    const [selectedCommitteeId, setSelectedCommitteeId] = useState(null);

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

    const handleInputChangeCommittee = (event) => {
        const { name, value } = event.target;
        setNewCommittee((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitCommittee = (event) => {
        event.preventDefault();
        if (selectedCommitteeId) {
            // Update existing committee
            axios.put(`http://localhost:8000/api/program-committees/${selectedCommitteeId}`, newCommittee)
                .then(response => {
                    setCommittees(committees.map(committee => committee.id === selectedCommitteeId ? response.data : committee));
                    resetForm();
                    alert('Committee updated successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            // Add new committee
            axios.post('http://localhost:8000/api/program-committees', newCommittee)
                .then(response => {
                    setCommittees([...committees, response.data]);
                    resetForm();
                    alert('Committee added successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleDeleteCommittee = (id) => {
        if (window.confirm('Are you sure you want to delete this committee?')) {
            axios.delete(`http://localhost:8000/api/program-committees/${id}`)
                .then(() => {
                    setCommittees(committees.filter(committee => committee.id !== id));
                    alert('Committee deleted successfully!');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleEditCommittee = (committee) => {
        setNewCommittee({
            committee_position: committee.committee_position,
            committee_members: committee.committee_members,
        });
        setSelectedCommitteeId(committee.id);
        window.$('#addCommitteeModal').modal('show');
    };

    const resetForm = () => {
        setNewCommittee({
            committee_position: '',
            committee_members: '',
        });
        setSelectedCommitteeId(null);
        window.$('#addCommitteeModal').modal('hide');
    };


    // --------------------------------------------------- REVIEWER ---------------------------------------------------
    const [modalReviewers, setModalReviewers] = useState([]); // List of reviewer names in modal
    const [savedReviewers, setSavedReviewers] = useState([]); // Persisted list from database
    const [modalReviewerName, setModalReviewerName] = useState(""); // New reviewer name input
    const [showModalReviewer, setShowModalReviewer] = useState(false); // Modal visibility

    useEffect(() => {
        axios.get('http://localhost:8000/api/reviewers')
            .then(response => {
                setSavedReviewers(response.data.map(reviewer => reviewer.reviewer_name));
            })
            .catch(error => console.error("Error fetching reviewers:", error));
    }, []);

    const handleModalReviewerAdd = () => {
        if (modalReviewerName.trim()) {
            setModalReviewers([...modalReviewers, modalReviewerName]);
            setModalReviewerName("");
        }
    };

    const handleModalReviewerRemove = (index) => {
        setModalReviewers(modalReviewers.filter((_, i) => i !== index));
    };

    const handleModalReviewerSave = () => {
        axios.post('http://localhost:8000/api/reviewers', { reviewers: modalReviewers })
            .then(() => {
                setSavedReviewers(modalReviewers); // 
                setShowModalReviewer(false);
            })
            .catch(error => console.error("Error saving reviewers:", error));
    };

    const handleOpenModal = () => {
        setModalReviewers(savedReviewers);
        setShowModalReviewer(true);
    };


    // --------------------------------------------------- PRICING --------------------------------------------------

    const [pricings, setPricings] = useState([]);

    const [modalVisiblePricing, setModalVisiblePricing] = useState(false);
    const [currentPricing, setCurrentPricing] = useState({ id: null, price_label: '', price: '', price_idr: '' });

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

    const handleInputChangePricing = (e) => {
        const { name, value } = e.target;
        setCurrentPricing({ ...currentPricing, [name]: value });
    };

    const handleSubmitPricing = async (e) => {
        e.preventDefault();
        try {
            if (currentPricing.id) {
                await axios.put(`http://localhost:8000/api/pricing/${currentPricing.id}`, currentPricing);
            } else {
                await axios.post('http://localhost:8000/api/pricing', currentPricing);
            }
            setModalVisiblePricing(false);
            setCurrentPricing({ id: null, price_label: '', price: '', price_idr: '' });
            fetchPricing();
        } catch (error) {
            console.error("Error submitting pricing data:", error);
        }
    };

    const handleEditPricing = (pricing) => {
        setCurrentPricing(pricing);
        setModalVisiblePricing(true);
    };

    const handleDeletePricing = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/pricing/${id}`);
            fetchPricing();
        } catch (error) {
            console.error("Error deleting pricing data:", error);
        }
    };





    // --------------------------------------------------- PAYMENT METHOD ---------------------------------------------------
    const [paymentData, setPaymentData] = useState([]);
    const [newPaymentData, setNewPaymentData] = useState({
        payment_method: '',
        payment_details: '',
        payment_additional_info: '',
        method_or_info: ''
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedTypePaymentData, setSelectedTypePaymentData] = useState('');

    const [isEditModePayment, setIsEditModePayment] = useState(false);
    const [editPaymentId, setEditPaymentId] = useState(null);

    // Fetch payment data
    useEffect(() => {
        fetchPaymentData();
    }, []);

    const fetchPaymentData = () => {
        axios.get('http://localhost:8000/api/payment-methods')
            .then(response => setPaymentData(response.data))
            .catch(error => console.error(error));
    };

    const handlePaymentSubmit = (event) => {
        event.preventDefault();

        if (isEditModePayment) {
            axios.put(`http://localhost:8000/api/payment-methods/${editPaymentId}`, newPaymentData)
                .then(response => {
                    setPaymentData(paymentData.map(data => data.id === editPaymentId ? response.data : data));
                    setShowPaymentModal(false);
                    setIsEditModePayment(false);
                    alert('Payment data updated successfully!');
                })
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8000/api/payment-methods', newPaymentData)
                .then(response => {
                    setPaymentData([...paymentData, response.data]);
                    setShowPaymentModal(false);
                    alert('Payment data added successfully!');
                })
                .catch(error => console.error(error));
        }
    };

    const handleInputChangePaymentData = (e) => {
        const { name, value } = e.target;
        setNewPaymentData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditPayment = (payment) => {
        setNewPaymentData({
            payment_method: payment.payment_method || '',
            payment_details: payment.payment_details || '',
            payment_additional_info: payment.payment_additional_info || '',
            method_or_info: payment.method_or_info
        });
        setSelectedTypePaymentData(payment.method_or_info);
        setEditPaymentId(payment.id);
        setIsEditModePayment(true);
        setShowPaymentModal(true);
    };

    const handleAddPaymentType = (type) => {
        setNewPaymentData({
            payment_method: type === 'method' ? '' : null,
            payment_details: type === 'method' ? '' : null,
            payment_additional_info: type === 'info' ? '' : null,
            method_or_info: type
        });
        setSelectedTypePaymentData(type);
        setShowPaymentModal(true);
    };

    const handleDeletePayment = (id) => {
        axios.delete(`http://localhost:8000/api/payment-methods/${id}`)
            .then(() => {
                setPaymentData(paymentData.filter(data => data.id !== id));
                alert('Payment data deleted successfully!');
            })
            .catch(error => console.error(error));
    };

    const closeModalPayment = () => {
        setShowPaymentModal(false);
        setIsEditModePayment(false);
        setEditPaymentId(null);
    };


    // --------------------------------------------------- ARTICLE ---------------------------------------------------
    const [articles, setArticles] = useState([]);
    const [showModalArticle, setShowModalArticle] = useState(false);
    const [isEditingArticle, setIsEditingArticle] = useState(false);
    const [currentArticleId, setCurrentArticleId] = useState(null);
    const [articleData, setArticleData] = useState({
        article_img: null,
        article_title: '',
        article_description: '',
        article_link: '',
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const response = await axios.get('http://localhost:8000/api/articles');
        setArticles(response.data);
    };

    const handleInputChangeArticle = (e) => {
        const { name, value } = e.target;
        setArticleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChangeArticle = (e) => {
        setArticleData((prevData) => ({
            ...prevData,
            article_img: e.target.files[0],
        }));
    };

    const handleSubmitArticle = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Jika gambar baru ada, kirimkan gambar; jika tidak, lewati
        if (articleData.article_img) {
            formData.append('article_img', articleData.article_img);
        }
        formData.append('article_title', articleData.article_title);
        formData.append('article_description', articleData.article_description);
        formData.append('article_link', articleData.article_link);

        // Mengirimkan POST atau PUT berdasarkan apakah sedang mengedit
        if (isEditingArticle) {
            await axios.post(`http://localhost:8000/api/articles/${currentArticleId}`, formData);
        } else {
            await axios.post('http://localhost:8000/api/articles', formData);
        }

        setShowModalArticle(false);
        fetchArticles();
    };


    const handleEditArticle = (article) => {
        setIsEditingArticle(true);
        setCurrentArticleId(article.id);
        setArticleData({
            article_img: null,
            article_title: article.article_title,
            article_description: article.article_description,
            article_link: article.article_link,
        });
        setShowModalArticle(true);
    };

    const handleDeleteArticle = async (id) => {
        await axios.delete(`http://localhost:8000/api/articles/${id}`);
        fetchArticles();
    };

    const handleCloseModalArticle = () => {
        setShowModalArticle(false);
        setIsEditingArticle(false);
        setArticleData({
            article_img: null,
            article_title: '',
            article_description: '',
            article_link: '',
        });
    };

    // --------------------------------------------------- DOCUMENTATION ---------------------------------------------------

    // Documentation Image
    const [documentationImages, setDocumentationImages] = useState([]);
    const [newDocumentationImage, setNewDocumentationImage] = useState(null);
    const [showModalDocumentationImg, setShowModalDocumentationImg] = useState(false);

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

    const handleFileChangeDocumentationImg = (event) => {
        setNewDocumentationImage(event.target.files[0]);
    };

    const handleSubmitDocumentationImg = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('documentation_img', newDocumentationImage);

        axios.post('http://localhost:8000/api/documentation-images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setDocumentationImages([...documentationImages, response.data]);
                setShowModalDocumentationImg(false);
                alert('Image added successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteDocumentationImg = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this image?');
        if (confirmDelete) {
            try {
                // Kirim permintaan untuk menghapus gambar
                await axios.delete(`http://localhost:8000/api/documentation-images/${id}`);
                // Setelah berhasil, lakukan pengambilan data ulang
                fetchDocumentationImages();  // Untuk memperbarui tampilan
                alert('Image deleted successfully!');
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };



    // Documentation Link dan Video Link
    const [documentationLink, setDocumentationLink] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [showModalLink, setShowModalLink] = useState(false);
    const [showModalVideoLink, setShowModalVideoLink] = useState(false);

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

    // CRUD untuk Documentation Link dan Video Link
    const handleSubmitLink = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/documentation-links', {
            documentation_cloud: documentationLink,
        })
            .then(() => {
                setShowModalLink(false);
                alert('Documentation Link updated successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleSubmitVideoLink = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/documentation-links', {
            video_link: videoLink,
        })
            .then(() => {
                setShowModalVideoLink(false);
                alert('Video Link updated successfully!');
            })
            .catch(error => {
                console.error(error);
            });
    };

    // --------------------------------------------------- ADDRESS ---------------------------------------------------
    const [addressData, setAddressData] = useState({ place: '', address_additional_info: '', google_map_link: '' });
    const [showModalMapLinkAddress, setShowModalMapLinkAddress] = useState(false);
    const [newMapLinkAddress, setNewMapLinkAddress] = useState('');

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

    const handleInputChangeAddress = (event) => {
        const { name, value } = event.target;
        setAddressData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmitAddress = (event) => {
        event.preventDefault();
        const endpoint = addressData.id ? `http://localhost:8000/api/address/${addressData.id}` : 'http://localhost:8000/api/address';
        const method = addressData.id ? 'put' : 'post';

        axios[method](endpoint, addressData)
            .then(response => {
                setAddressData(response.data);
                alert('Address updated successfully!');
            })
            .catch(error => console.error(error));
    };

    const handleMapLinkChangeAddress = (event) => {
        setNewMapLinkAddress(event.target.value);
    };

    const handleSaveMapLinkAddress = () => {
        const updatedAddressData = { ...addressData, google_map_link: newMapLinkAddress };

        axios.put(`http://localhost:8000/api/address/${addressData.id}`, updatedAddressData)
            .then(response => {
                setAddressData(response.data);
                setShowModalMapLinkAddress(false);
                alert('Google Map link updated successfully!');
            })
            .catch(error => console.error(error));
    };

    // --------------------------------------------------- SPONSORE BY ---------------------------------------------------
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

    // Handle logo upload
    const handleLogoUploadSponsoreLogo = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('sponsore_logo', file);

        try {
            await axios.post('http://localhost:8000/api/sponsored_by', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Refresh sponsors list after upload
            const response = await axios.get('http://localhost:8000/api/sponsored_by');
            setSponsorsLogoList(response.data);
            alert('Logo uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // Handle logo delete
    const handleLogoDeleteSponsoreLogo = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/sponsored_by/${id}`);
            // Refresh sponsors list after deletion
            const response = await axios.get('http://localhost:8000/api/sponsored_by');
            setSponsorsLogoList(response.data);
            alert('Logo deleted successfully!');
        } catch (error) {
            console.error(error);
        }
    };

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

    // Handle logo upload for supported logos
    const handleLogoUploadSupportLogo = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('support_logo', file);

        try {
            await axios.post('http://localhost:8000/api/supported_by', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Refresh the list after upload
            const response = await axios.get('http://localhost:8000/api/supported_by');
            setSupportLogoList(response.data);
            alert('Logo uploaded successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // Handle logo deletion
    const handleLogoDeleteSupportLogo = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/supported_by/${id}`);
            // Refresh the list after deletion
            const response = await axios.get('http://localhost:8000/api/supported_by');
            setSupportLogoList(response.data);
            alert('Logo deleted successfully!');
        } catch (error) {
            console.error(error);
        }
    };



    // --------------------------------------------------- COPYRIGHT ---------------------------------------------------

    const [copyrightText, setCopyrightText] = useState('');
    const [isModalOpenCopyright, setIsModalOpenCopyright] = useState(false);
    const [newCopyrightText, setNewCopyrightText] = useState('');

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

    // Handle open and close of the modal
    const handleModalToggleCopyright = () => {
        setIsModalOpenCopyright(!isModalOpenCopyright);
    };

    // Handle changes in the input field
    const handleChangeCopyright = (event) => {
        setNewCopyrightText(event.target.value);
    };

    // Save or create the copyright text
    const handleSaveCopyright = async () => {
        try {
            if (copyrightText) {
                // Update the copyright text
                await axios.put('http://localhost:8000/api/copyright', { copyright_text: newCopyrightText });
                setCopyrightText(newCopyrightText);
            } else {
                // Create new copyright text if none exists
                await axios.post('http://localhost:8000/api/copyright', { copyright_text: newCopyrightText });
                setCopyrightText(newCopyrightText);
            }
            handleModalToggleCopyright();
        } catch (error) {
            console.error('Error saving copyright text:', error);
        }
    };

    // --------------------------------------------------- HOME BUTTON LINK ---------------------------------------------------
    const [buttonLinks, setButtonLinks] = useState({});
    const [isModalOpenSubmitHere, setIsModalOpenSubmitHere] = useState(false);
    const [isModalOpenPresentationSchedule, setIsModalOpenPresentationSchedule] = useState(false);
    const [newSubmitHereLink, setNewSubmitHereLink] = useState('');
    const [newPresentationScheduleLink, setNewPresentationScheduleLink] = useState('');

    // Fetch the button links from the server
    useEffect(() => {
        const fetchButtonLinks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/button-links');
                setButtonLinks(response.data || {});
                setNewSubmitHereLink(response.data?.submit_here_link || '');
                setNewPresentationScheduleLink(response.data?.presentation_schedule_link || '');
            } catch (error) {
                console.error('Error fetching button links:', error);
            }
        };
        fetchButtonLinks();
    }, []);

    // Toggle modals for editing the links
    const handleModalToggleSubmitHere = () => setIsModalOpenSubmitHere(!isModalOpenSubmitHere);
    const handleModalTogglePresentationSchedule = () => setIsModalOpenPresentationSchedule(!isModalOpenPresentationSchedule);

    // Handle input changes for each link
    const handleChangeSubmitHereLink = (event) => setNewSubmitHereLink(event.target.value);
    const handleChangePresentationScheduleLink = (event) => setNewPresentationScheduleLink(event.target.value);

    // Save or update the "Submit Here" link
    const handleSaveSubmitHereLink = async () => {
        try {
            await axios.post('http://localhost:8000/api/button-links', {
                submit_here_link: newSubmitHereLink,
                presentation_schedule_link: buttonLinks.presentation_schedule_link,
            });
            // After saving, update the state with the new link
            setButtonLinks((prevLinks) => ({
                ...prevLinks,
                submit_here_link: newSubmitHereLink,
            }));
            handleModalToggleSubmitHere();
        } catch (error) {
            console.error('Error saving Submit Here link:', error);
        }
    };

    // Save or update the "Presentation Schedule" link
    const handleSavePresentationScheduleLink = async () => {
        try {
            await axios.post('http://localhost:8000/api/button-links', {
                submit_here_link: buttonLinks.submit_here_link,
                presentation_schedule_link: newPresentationScheduleLink,
            });
            // After saving, update the state with the new link
            setButtonLinks((prevLinks) => ({
                ...prevLinks,
                presentation_schedule_link: newPresentationScheduleLink,
            }));
            handleModalTogglePresentationSchedule();
        } catch (error) {
            console.error('Error saving Presentation Schedule link:', error);
        }
    };

    return (
        <div>

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
                                        <a href={buttonLinks.presentation_schedule_link} target="_blank" rel="noopener noreferrer" className="dropdown-item">
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

                        <div className="text-center ml-1" id="previewAreaNavbar">
                            <a href="/" className="btn" id="buttonPreviewNavbar" target="_blank" rel="noopener noreferrer">
                                <h2>Preview</h2>
                                <i className="bi bi-eye-fill ml-2"></i>
                            </a>
                        </div>

                        <div className="vl ml-3"></div>

                        <li className="nav-item list-unstyled">
                            <a href="#" onClick={(e) => { e.preventDefault(); confirmLogout(); }} className="nav-link justify-content-center" id="logout">Logout</a>
                        </li>
                    </div>
                </div>


            </nav>

            {showLogoutModal && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" id="modalLogout">
                        <div className="modal-content">
                            <div className="modal-body text-center px-5">
                                <h4>Are you sure you want to <span className="text-danger">logout</span> ?</h4>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-danger" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-primary" id="logoutYes" onClick={handleLogout}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className="dashboard-content">
                {/* Section Home */}
                <section className="Home" id="homeSection" style={{ backgroundImage: `url('http://localhost:8000/storage/${homeData.home_bg || 'gb.jpg'}')` }} >
                    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                        <div className="home-dashboard">
                            <div className="container d-flex align-items-center" id="hostLogo">
                                {hostLogoData.length > 0 ? (
                                    hostLogoData.map((logo) => (
                                        <div id="logo-container" key={logo.id} className="logo-container position-relative mx-2">
                                            <img src={`http://localhost:8000/storage/${logo.host_logo}`} alt="Host Logo" className="mx-2" />
                                            <svg
                                                type="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                onClick={() => handleLogoDelete(logo.id)} className="delete-icon"
                                            >
                                                <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" fill="white" />
                                                <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" stroke="#DE5858" />
                                                <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#DE5858" />
                                            </svg>
                                        </div>
                                    ))
                                ) : (
                                    <p>No logos uploaded yet.</p>
                                )}

                                <div className="align-items-center mx-2" id="inputLogo">
                                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.2231 15.3125C14.654 15.3125 15.0807 15.2276 15.4788 15.0627C15.8769 14.8978 16.2386 14.6561 16.5433 14.3514C16.848 14.0468 17.0897 13.685 17.2546 13.2869C17.4195 12.8888 17.5044 12.4621 17.5044 12.0312C17.5044 11.6004 17.4195 11.1737 17.2546 10.7756C17.0897 10.3775 16.848 10.0157 16.5433 9.71106C16.2386 9.40636 15.8769 9.16467 15.4788 8.99977C15.0807 8.83487 14.654 8.75 14.2231 8.75C13.3529 8.75 12.5183 9.0957 11.9029 9.71106C11.2876 10.3264 10.9419 11.161 10.9419 12.0312C10.9419 12.9015 11.2876 13.7361 11.9029 14.3514C12.5183 14.9668 13.3529 15.3125 14.2231 15.3125Z" fill="white" />
                                        <path d="M30.625 30.625C30.625 31.7853 30.1641 32.8981 29.3436 33.7186C28.5231 34.5391 27.4103 35 26.25 35H8.75C7.58968 35 6.47688 34.5391 5.65641 33.7186C4.83594 32.8981 4.375 31.7853 4.375 30.625V4.375C4.375 3.21468 4.83594 2.10188 5.65641 1.28141C6.47688 0.460936 7.58968 0 8.75 0L20.7812 0L30.625 9.84375V30.625ZM8.75 2.1875C8.16984 2.1875 7.61344 2.41797 7.2032 2.8282C6.79297 3.23844 6.5625 3.79484 6.5625 4.375V26.25L11.4275 21.385C11.5999 21.213 11.8248 21.1035 12.0665 21.0737C12.3082 21.044 12.5529 21.0958 12.7619 21.2209L17.5 24.0625L22.2184 17.4562C22.3108 17.3271 22.4301 17.2197 22.5681 17.1413C22.7062 17.0629 22.8596 17.0155 23.0178 17.0024C23.176 16.9893 23.3351 17.0108 23.4842 17.0654C23.6332 17.1199 23.7686 17.2063 23.8809 17.3184L28.4375 21.875V9.84375H24.0625C23.1923 9.84375 22.3577 9.49805 21.7423 8.88269C21.127 8.26734 20.7812 7.43274 20.7812 6.5625V2.1875H8.75Z" fill="white" />
                                    </svg>

                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        Choose png logo
                                    </label>
                                    <input id="file-upload" type="file" multiple onChange={handleLogoUpload} />
                                </div>
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
                                    <button
                                        type="button"
                                        className="btn btn-primary mx-2"
                                        onClick={handleModalToggleSubmitHere}>
                                        Submit Here
                                        <i className="bi bi-pencil ml-1" ></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-primary mx-2"
                                        onClick={handleModalTogglePresentationSchedule}
                                    >
                                        Presentation Schedule
                                        <i className="bi bi-pencil ml-1" ></i>
                                    </button>


                                </div>

                                <textarea
                                    name="description" className="description-input editable-text mb-0"
                                    value={homeData.description} onChange={handleInputChange} placeholder="Short Description" rows="2">
                                </textarea>



                                <div className="file-upload-container align-items-center mx-2" id="inputBgHome">
                                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.2231 15.3125C14.654 15.3125 15.0807 15.2276 15.4788 15.0627C15.8769 14.8978 16.2386 14.6561 16.5433 14.3514C16.848 14.0468 17.0897 13.685 17.2546 13.2869C17.4195 12.8888 17.5044 12.4621 17.5044 12.0312C17.5044 11.6004 17.4195 11.1737 17.2546 10.7756C17.0897 10.3775 16.848 10.0157 16.5433 9.71106C16.2386 9.40636 15.8769 9.16467 15.4788 8.99977C15.0807 8.83487 14.654 8.75 14.2231 8.75C13.3529 8.75 12.5183 9.0957 11.9029 9.71106C11.2876 10.3264 10.9419 11.161 10.9419 12.0312C10.9419 12.9015 11.2876 13.7361 11.9029 14.3514C12.5183 14.9668 13.3529 15.3125 14.2231 15.3125Z" fill="white" />
                                        <path d="M30.625 30.625C30.625 31.7853 30.1641 32.8981 29.3436 33.7186C28.5231 34.5391 27.4103 35 26.25 35H8.75C7.58968 35 6.47688 34.5391 5.65641 33.7186C4.83594 32.8981 4.375 31.7853 4.375 30.625V4.375C4.375 3.21468 4.83594 2.10188 5.65641 1.28141C6.47688 0.460936 7.58968 0 8.75 0L20.7812 0L30.625 9.84375V30.625ZM8.75 2.1875C8.16984 2.1875 7.61344 2.41797 7.2032 2.8282C6.79297 3.23844 6.5625 3.79484 6.5625 4.375V26.25L11.4275 21.385C11.5999 21.213 11.8248 21.1035 12.0665 21.0737C12.3082 21.044 12.5529 21.0958 12.7619 21.2209L17.5 24.0625L22.2184 17.4562C22.3108 17.3271 22.4301 17.2197 22.5681 17.1413C22.7062 17.0629 22.8596 17.0155 23.0178 17.0024C23.176 16.9893 23.3351 17.0108 23.4842 17.0654C23.6332 17.1199 23.7686 17.2063 23.8809 17.3184L28.4375 21.875V9.84375H24.0625C23.1923 9.84375 22.3577 9.49805 21.7423 8.88269C21.127 8.26734 20.7812 7.43274 20.7812 6.5625V2.1875H8.75Z" fill="white" />
                                    </svg>
                                    <label htmlFor="fileInput" className="file-upload-label">
                                        Upload Background
                                    </label>
                                    <input
                                        id="fileInput" type="file" accept="image/*" onChange={handleBgUpload} className="file-input"
                                    />
                                </div>

                                <button type="submit" id="UpdateHome">Update Home</button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Modal for editing "Submit Here" link */}
                <div className={`modal fade ${isModalOpenSubmitHere ? 'show' : ''}`} style={{ display: isModalOpenSubmitHere ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="submitHereModalLabel" aria-hidden={!isModalOpenSubmitHere}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content " id="modalHomeLink">
                            <div className="modal-header modalHomeLink">
                                <h5 className="modal-title" id="submitHereModalLabel">Edit Submit Here Link</h5>
                                <button type="button" className="btn-close" onClick={handleModalToggleSubmitHere} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="url"
                                    value={newSubmitHereLink}
                                    onChange={handleChangeSubmitHereLink}
                                    placeholder="Enter new Submit Here link"
                                    className="form-control"
                                />
                            </div>
                            <div className="modal-footer" id="modalButtonLinkHome">
                                <button type="button" id="modalButtonLinkHomClose" className="btn btn-secondary" onClick={handleModalToggleSubmitHere}>Close</button>
                                <button type="button" id="modalButtonLinkHomSave" className="btn btn-primary" onClick={handleSaveSubmitHereLink}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for editing "Presentation Schedule" link */}
                <div className={`modal fade ${isModalOpenPresentationSchedule ? 'show' : ''}`} style={{ display: isModalOpenPresentationSchedule ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="presentationScheduleModalLabel" aria-hidden={!isModalOpenPresentationSchedule}>
                    <div className="modal-dialog modal-dialog-centered" id="modalHomeLink">
                        <div className="modal-content">
                            <div className="modal-header" >
                                <h5 className="modal-title" id="presentationScheduleModalLabel">Edit Presentation Schedule Link</h5>
                                <button type="button" className="btn-close" onClick={handleModalTogglePresentationSchedule} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="url"
                                    value={newPresentationScheduleLink}
                                    onChange={handleChangePresentationScheduleLink}
                                    placeholder="Enter new Presentation Schedule link"
                                    className="form-control"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="modalButtonLinkHomClose" className="btn btn-secondary" onClick={handleModalTogglePresentationSchedule}>Close</button>
                                <button type="button" id="modalButtonLinkHomSave" className="btn btn-primary" onClick={handleSavePresentationScheduleLink}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section About Us */}
                <section className="AboutUs" id='aboutSection'>
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

                                    <div className="container" id="inputImgAbout">
                                        <svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M35.3546 38.0625C36.4257 38.0625 37.4863 37.8515 38.4759 37.4416C39.4655 37.0318 40.3646 36.431 41.122 35.6736C41.8793 34.9162 42.4801 34.0171 42.89 33.0275C43.2999 32.0379 43.5109 30.9773 43.5109 29.9062C43.5109 28.8352 43.2999 27.7745 42.89 26.785C42.4801 25.7954 41.8793 24.8963 41.122 24.1389C40.3646 23.3815 39.4655 22.7807 38.4759 22.3709C37.4863 21.961 36.4257 21.75 35.3546 21.75C33.1915 21.75 31.1169 22.6093 29.5873 24.1389C28.0577 25.6685 27.1984 27.7431 27.1984 29.9062C27.1984 32.0694 28.0577 34.144 29.5873 35.6736C31.1169 37.2032 33.1915 38.0625 35.3546 38.0625Z" fill="#868686" />
                                            <path d="M76.125 76.125C76.125 79.0092 74.9792 81.7753 72.9398 83.8148C70.9003 85.8542 68.1342 87 65.25 87H21.75C18.8658 87 16.0997 85.8542 14.0602 83.8148C12.0208 81.7753 10.875 79.0092 10.875 76.125V10.875C10.875 7.99077 12.0208 5.22467 14.0602 3.18521C16.0997 1.14576 18.8658 0 21.75 0L51.6562 0L76.125 24.4688V76.125ZM21.75 5.4375C20.3079 5.4375 18.9248 6.01038 17.9051 7.03011C16.8854 8.04984 16.3125 9.43289 16.3125 10.875V65.25L28.4055 53.157C28.8341 52.7295 29.3931 52.4572 29.9939 52.3833C30.5947 52.3094 31.203 52.4382 31.7224 52.7492L43.5 59.8125L55.2287 43.3913C55.4582 43.0703 55.7548 42.8032 56.0979 42.6083C56.441 42.4135 56.8224 42.2958 57.2156 42.2632C57.6088 42.2306 58.0044 42.2839 58.3749 42.4196C58.7454 42.5552 59.082 42.7699 59.3612 43.0487L70.6875 54.375V24.4688H59.8125C57.6493 24.4688 55.5748 23.6094 54.0452 22.0798C52.5156 20.5502 51.6562 18.4757 51.6562 16.3125V5.4375H21.75Z" fill="#868686" />
                                        </svg>

                                        <label htmlFor="file-upload-about" className="custom-file-upload-about">
                                            Choose a 3:4 image
                                        </label>
                                        <input id="file-upload-about" type="file" onChange={handleAboutImgUpload} />
                                    </div>


                                </div>
                                <div className="col">
                                    <h1 className="mb-5" id="aboutUsH1">About Us</h1>
                                    <textarea id="textAbout"
                                        className="descAbout-input" name="about_desc" value={aboutData.about_desc}
                                        onChange={handleInputChangeAbout} placeholder="About Description" rows="10"
                                    />
                                    <button type="submit">Update About Us</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </section>

                {/* Section Speakers */}
                <section className="Speakers pt-100 pb-80" id="speakersSection">
                    <div className="container">
                        <div className="section-header">
                            <h5>Keynote</h5>
                            <h2>Speakers</h2>
                        </div>

                        <div className="row">
                            {speakers.map((speaker) => (
                                <div className="col-md-4" key={speaker.id}>
                                    <div className="card mb-4" id="cardSpeaker-dashboard">
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

                            {/* Tambahkan tombol "Add Speaker" sebagai elemen terakhir setelah semua card */}
                            <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <button className="btn w-50" onClick={() => setShowModalSpeakers(true)} id="buttonAddSpeaker">
                                    <button onClick={() => setShowModalSpeakers(true)} id="buttonAddSpeaker">
                                        <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M105.625 16.25H24.375C22.2201 16.25 20.1535 17.106 18.6298 18.6298C17.106 20.1535 16.25 22.2201 16.25 24.375V105.625C16.25 107.78 17.106 109.847 18.6298 111.37C20.1535 112.894 22.2201 113.75 24.375 113.75H105.625C107.78 113.75 109.847 112.894 111.37 111.37C112.894 109.847 113.75 107.78 113.75 105.625V24.375C113.75 22.2201 112.894 20.1535 111.37 18.6298C109.847 17.106 107.78 16.25 105.625 16.25ZM93.4375 69.0625H69.0625V93.4375C69.0625 94.5149 68.6345 95.5483 67.8726 96.3101C67.1108 97.072 66.0774 97.5 65 97.5C63.9226 97.5 62.8892 97.072 62.1274 96.3101C61.3655 95.5483 60.9375 94.5149 60.9375 93.4375V69.0625H36.5625C35.4851 69.0625 34.4517 68.6345 33.6899 67.8726C32.928 67.1108 32.5 66.0774 32.5 65C32.5 63.9226 32.928 62.8892 33.6899 62.1274C34.4517 61.3655 35.4851 60.9375 36.5625 60.9375H60.9375V36.5625C60.9375 35.4851 61.3655 34.4517 62.1274 33.6899C62.8892 32.928 63.9226 32.5 65 32.5C66.0774 32.5 67.1108 32.928 67.8726 33.6899C68.6345 34.4517 69.0625 35.4851 69.0625 36.5625V60.9375H93.4375C94.5149 60.9375 95.5483 61.3655 96.3101 62.1274C97.072 62.8892 97.5 63.9226 97.5 65C97.5 66.0774 97.072 67.1108 96.3101 67.8726C95.5483 68.6345 94.5149 69.0625 93.4375 69.0625Z" fill="url(#paint0_linear_80_396)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_80_396" x1="65" y1="16.25" x2="65" y2="113.75" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#463F7D" />
                                                    <stop offset="1" stopColor="#31CDBC" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </button>
                                </button>
                            </div>
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

                {/* TUTORIAL */}
                <section className="tutorial-dash" id="tutorialSession">
                    <div className="section-header">
                        <h5>Tutorial</h5>
                        <h2>Session</h2>
                    </div>
                    <div className="container">
                        <form onSubmit={handleSubmitTutorial}>
                            <div className="container position-relative p-0" id="thumbnailImg">
                                <img
                                    src={`http://localhost:8000/storage/${tutorialData.thumbail_img || 'placeholder.jpg'}`}
                                    alt="Tutorial Thumbnail"
                                />
                                <div className="container position-absolute d-flex flex-column justify-content-center align-items-center" id="uploadThumbnail">
                                    <svg width="84" height="83" viewBox="0 0 84 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34.1355 36.3125C35.1697 36.3125 36.1937 36.1112 37.1491 35.7202C38.1046 35.3291 38.9727 34.756 39.704 34.0334C40.4352 33.3109 41.0153 32.4531 41.411 31.509C41.8068 30.5649 42.0105 29.5531 42.0105 28.5312C42.0105 27.5094 41.8068 26.4976 41.411 25.5535C41.0153 24.6094 40.4352 23.7516 39.704 23.0291C38.9727 22.3065 38.1046 21.7334 37.1491 21.3423C36.1937 20.9513 35.1697 20.75 34.1355 20.75C32.0469 20.75 30.0439 21.5698 28.567 23.0291C27.0902 24.4883 26.2605 26.4675 26.2605 28.5312C26.2605 30.595 27.0902 32.5742 28.567 34.0334C30.0439 35.4927 32.0469 36.3125 34.1355 36.3125Z" fill="#868686" />
                                        <path d="M73.5 72.625C73.5 75.3766 72.3937 78.0155 70.4246 79.9612C68.4555 81.9069 65.7848 83 63 83H21C18.2152 83 15.5445 81.9069 13.5754 79.9612C11.6062 78.0155 10.5 75.3766 10.5 72.625V10.375C10.5 7.62338 11.6062 4.98446 13.5754 3.03877C15.5445 1.09308 18.2152 0 21 0L49.875 0L73.5 23.3438V72.625ZM21 5.1875C19.6076 5.1875 18.2723 5.73404 17.2877 6.70688C16.3031 7.67973 15.75 8.99919 15.75 10.375V62.25L27.426 50.713C27.8398 50.3051 28.3795 50.0454 28.9596 49.9749C29.5397 49.9044 30.127 50.0272 30.6285 50.3239L42 57.0625L53.3242 41.3963C53.5458 41.0901 53.8322 40.8352 54.1635 40.6493C54.4948 40.4635 54.863 40.3511 55.2427 40.32C55.6223 40.2889 56.0043 40.3399 56.362 40.4693C56.7197 40.5987 57.0447 40.8035 57.3142 41.0694L68.25 51.875V23.3438H57.75C55.6614 23.3438 53.6584 22.5239 52.1815 21.0647C50.7047 19.6054 49.875 17.6262 49.875 15.5625V5.1875H21Z" fill="#868686" />
                                    </svg>

                                    <label htmlFor="thumbnail-upload" className="custom-file-upload" id="labelThumbnail">
                                        Choose a 16:9 image
                                    </label>
                                    <input id="thumbnail-upload" type="file" onChange={handleThumbnailImgUpload} />
                                </div>
                            </div>



                            <div className="container p-0">
                                <textarea
                                    className="abstract-input" name="abstract" value={tutorialData.abstract} onChange={handleInputChangeTutorial}
                                    placeholder="Tutorial Description" rows="10" />
                            </div>
                            <button type="submit" className='mb-3'>Update Tutorial</button>
                        </form>
                    </div>
                </section>

                {/* IMPORTANT DATES */}
                <section className="importantDate" id="importantDateSection" style={{ backgroundImage: `url(${importantDateData.important_date_bg})` }}>


                    <div className="file-upload-container align-items-center mx-2" id="inputBgDate">
                        <div className="svg-icon-wrapper">
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2231 15.3125C14.654 15.3125 15.0807 15.2276 15.4788 15.0627C15.8769 14.8978 16.2386 14.6561 16.5433 14.3514C16.848 14.0468 17.0897 13.685 17.2546 13.2869C17.4195 12.8888 17.5044 12.4621 17.5044 12.0312C17.5044 11.6004 17.4195 11.1737 17.2546 10.7756C17.0897 10.3775 16.848 10.0157 16.5433 9.71106C16.2386 9.40636 15.8769 9.16467 15.4788 8.99977C15.0807 8.83487 14.654 8.75 14.2231 8.75C13.3529 8.75 12.5183 9.0957 11.9029 9.71106C11.2876 10.3264 10.9419 11.161 10.9419 12.0312C10.9419 12.9015 11.2876 13.7361 11.9029 14.3514C12.5183 14.9668 13.3529 15.3125 14.2231 15.3125Z" fill="white" />
                                <path d="M30.625 30.625C30.625 31.7853 30.1641 32.8981 29.3436 33.7186C28.5231 34.5391 27.4103 35 26.25 35H8.75C7.58968 35 6.47688 34.5391 5.65641 33.7186C4.83594 32.8981 4.375 31.7853 4.375 30.625V4.375C4.375 3.21468 4.83594 2.10188 5.65641 1.28141C6.47688 0.460936 7.58968 0 8.75 0L20.7812 0L30.625 9.84375V30.625ZM8.75 2.1875C8.16984 2.1875 7.61344 2.41797 7.2032 2.8282C6.79297 3.23844 6.5625 3.79484 6.5625 4.375V26.25L11.4275 21.385C11.5999 21.213 11.8248 21.1035 12.0665 21.0737C12.3082 21.044 12.5529 21.0958 12.7619 21.2209L17.5 24.0625L22.2184 17.4562C22.3108 17.3271 22.4301 17.2197 22.5681 17.1413C22.7062 17.0629 22.8596 17.0155 23.0178 17.0024C23.176 16.9893 23.3351 17.0108 23.4842 17.0654C23.6332 17.1199 23.7686 17.2063 23.8809 17.3184L28.4375 21.875V9.84375H24.0625C23.1923 9.84375 22.3577 9.49805 21.7423 8.88269C21.127 8.26734 20.7812 7.43274 20.7812 6.5625V2.1875H8.75Z" fill="white" />
                            </svg>
                        </div>
                        <label htmlFor="bgUpload" className="file-upload-label">
                            Upload Background
                        </label>
                        <input
                            type="file"
                            id="bgUpload"
                            onChange={handleBgUploadImportantBg}
                        />
                    </div>

                    <div className="container">
                        <h2>Important Date</h2>
                    </div>

                    <div className="container">
                        <div className="row">
                            {importantDates.map((date) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4" key={date.id} style={{ position: 'relative' }}>
                                    <div className="card">
                                        <button
                                            className="btn delete-date" style={{ position: 'absolute', top: '0px', right: '0px', zIndex: 1 }}
                                            onClick={() => handleDeleteImportantDate(date.id)}
                                        >
                                            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="48" height="48" rx="9.5" stroke="#DE5858" />
                                                <path d="M12.25 38.7917C12.25 39.8746 12.6802 40.9132 13.446 41.679C14.2117 42.4448 15.2504 42.875 16.3333 42.875H32.6667C33.7496 42.875 34.7882 42.4448 35.554 41.679C36.3198 40.9132 36.75 39.8746 36.75 38.7917V14.2917H12.25V38.7917ZM16.3333 18.375H32.6667V38.7917H16.3333V18.375ZM31.6458 8.16667L29.6042 6.125H19.3958L17.3542 8.16667H10.2083V12.25H38.7917V8.16667H31.6458Z" fill="#DE5858" />
                                            </svg>
                                        </button>

                                        <h3 className="card-title">{date.activity}</h3>
                                        <div className="card-body">
                                            <img src={`http://localhost:8000${date.activity_icon}`} alt={date.activity} />
                                            <h4 className="card-text">{new Date(date.event_date).getDate()}</h4>
                                            <h5>{new Date(date.event_date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="col-12 col-sm-6 col-md-4 col-lg-auto mb-4">
                                <button className="btn" onClick={() => setShowModalImportantDate(true)}>
                                    <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M105.625 16.25H24.375C22.2201 16.25 20.1535 17.106 18.6298 18.6298C17.106 20.1535 16.25 22.2201 16.25 24.375V105.625C16.25 107.78 17.106 109.847 18.6298 111.37C20.1535 112.894 22.2201 113.75 24.375 113.75H105.625C107.78 113.75 109.847 112.894 111.37 111.37C112.894 109.847 113.75 107.78 113.75 105.625V24.375C113.75 22.2201 112.894 20.1535 111.37 18.6298C109.847 17.106 107.78 16.25 105.625 16.25ZM93.4375 69.0625H69.0625V93.4375C69.0625 94.5149 68.6345 95.5483 67.8726 96.3101C67.1108 97.072 66.0774 97.5 65 97.5C63.9226 97.5 62.8892 97.072 62.1274 96.3101C61.3655 95.5483 60.9375 94.5149 60.9375 93.4375V69.0625H36.5625C35.4851 69.0625 34.4517 68.6345 33.6899 67.8726C32.928 67.1108 32.5 66.0774 32.5 65C32.5 63.9226 32.928 62.8892 33.6899 62.1274C34.4517 61.3655 35.4851 60.9375 36.5625 60.9375H60.9375V36.5625C60.9375 35.4851 61.3655 34.4517 62.1274 33.6899C62.8892 32.928 63.9226 32.5 65 32.5C66.0774 32.5 67.1108 32.928 67.8726 33.6899C68.6345 34.4517 69.0625 35.4851 69.0625 36.5625V60.9375H93.4375C94.5149 60.9375 95.5483 61.3655 96.3101 62.1274C97.072 62.8892 97.5 63.9226 97.5 65C97.5 66.0774 97.072 67.1108 96.3101 67.8726C95.5483 68.6345 94.5149 69.0625 93.4375 69.0625Z" fill="url(#paint0_linear_80_283)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_80_283" x1="65" y1="16.25" x2="65" y2="113.75" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#EBE9F6" />
                                                <stop offset="1" stopColor="#31CDBC" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>

                    {showModalImportantDate && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content" >
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="modalDate" >Add New Important Date</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModalImportantDate(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmitImportantDate}>
                                        <div className="modal-body" >
                                            <div className="mb-3">
                                                <label className="form-label" id="modalDate" >Activity</label>
                                                <input type="text" className="form-control" name="activity" onChange={handleInputChangeImportantDate} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" id="modalDate" >Upload Icon</label>
                                                <input type="file" className="form-control" onChange={handleFileChangeImportantDate} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" id="modalDate" >Event Date</label>
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

                {/* OUT TOPICS */}
                <section className="ourTopics">
                    <div className="container">
                        <div className="section-header">
                            <h5>Our</h5>
                            <h2>Topics</h2>
                            <button className="btn btn-secondary" onClick={() => { setNewTopic({ topic_order: '', topic_title: '', topic_list: '' }); setSelectedTopicId(null); setShowModalTopics(true); }}>
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
                                                <button className="btn btn-danger mr-2" onClick={() => handleDeleteTopics(topic.id)}>
                                                    Delete
                                                </button>
                                                <button className="btn btn-warning" onClick={() => handleEditTopics(topic)}>
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

                {/* AUTHOR INFORMATION */}
                <section className="AuthorInfo" id="authorInformation">
                    <div className="container">
                        <h1>Author Information</h1>
                        <button onClick={handleAddSubtitleAuthor} className="btn mr-2" id="buttonAuthorRegisSubtitle">Add Subtitle</button>
                        <button onClick={handleAddTextAuthor} className="btn btn-secondary mr-2" id="buttonAuthorRegisText">Add Text</button>
                        <button onClick={handleAddButtonLinkAuthor} className="btn mr-2" id="buttonAuthorRegis">+ Add Button Link</button>
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
                                    <a href={data.author_button_link} className="btn btn-primary mr-3" id="buttonAuthorRegis">{data.author_button_text || 'Visit'}</a>
                                )}
                                <button onClick={() => handleDeleteAuthor(data.id)} className="btn btn-danger my-1">Delete</button>
                            </div>
                        ))}
                    </div>

                    {/* Modal for adding/editing */}
                    {showModalAuthor && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add {selectedType}</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmitAuthor}>
                                        <div className="modal-body">
                                            {selectedType === 'subtitle' && (
                                                <input type="text" className="form-control" placeholder="Subtitle" value={newAuthorData.author_subtitle} onChange={(e) => setNewAuthorData({ ...newAuthorData, author_subtitle: e.target.value })} />
                                            )}
                                            {selectedType === 'text' && (
                                                <textarea className="form-control" placeholder="Text" value={newAuthorData.author_text} onChange={(e) => setNewAuthorData({ ...newAuthorData, author_text: e.target.value })}></textarea>
                                            )}
                                            {selectedType === 'button' && (
                                                <>
                                                    <input
                                                        type="text"
                                                        name="author_button_text"
                                                        className="form-control"
                                                        placeholder="Button Text"
                                                        value={newAuthorData.author_button_text}
                                                        onChange={handleInputChangeAuthor} // Menambahkan handleInputChange
                                                    />
                                                    <input
                                                        type="text"
                                                        name="author_button_link"
                                                        className="form-control mt-3"
                                                        placeholder="Button Link"
                                                        value={newAuthorData.author_button_link}
                                                        onChange={handleInputChangeAuthor} // Menambahkan handleInputChange
                                                    />
                                                </>
                                            )}

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* REGISTRATION */}
                <section className="registration" id="registration">
                    <div className="container">
                        <h1>Registration</h1>
                        <button onClick={handleAddSubtitleRegistration} className="btn btn-primary mr-2" id="buttonAuthorRegisSubtitle">+ Add Subtitle</button>
                        <button onClick={handleAddTextRegistration} className="btn btn-secondary mr-2" id="buttonAuthorRegisText">Add Text</button>
                        <button onClick={handleAddButtonLinkRegistration} className="btn btn-success mr-2" id="buttonAuthorRegis">+ Add Button Link</button>
                    </div>

                    <div className="container mt-3">
                        {registrationData.map((data) => (
                            <div key={data.id}>
                                {data.registration_add === 'subtitle' && <h2 className=''>{data.registration_subtitle}</h2>}
                                {data.registration_add === 'text' && <p>{data.registration_text}</p>}
                                {data.registration_add === 'button' && (
                                    <a href={data.registration_button_link} className="btn btn-primary mr-3" id="buttonAuthorRegis">
                                        {data.registration_button_text || 'Visit'}
                                    </a>
                                )}
                                <button onClick={() => handleDeleteRegistration(data.id)} className="btn btn-danger my-1">Delete</button>
                            </div>
                        ))}
                    </div>

                    {showModalRegistration && (
                        <div className="modal fade show" style={{ display: 'block' }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add {selectedRegistrationType}</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModalRegistration(false)}></button>
                                    </div>
                                    <form onSubmit={handleSubmitRegistration}>
                                        <div className="modal-body">
                                            {selectedRegistrationType === 'subtitle' && (
                                                <input type="text" className="form-control" placeholder="Subtitle" name="registration_subtitle" value={newRegistrationData.registration_subtitle} onChange={handleInputChangeRegistration} />
                                            )}
                                            {selectedRegistrationType === 'text' && (
                                                <textarea className="form-control" placeholder="Text" name="registration_text" value={newRegistrationData.registration_text} onChange={handleInputChangeRegistration}></textarea>
                                            )}
                                            {selectedRegistrationType === 'button' && (
                                                <>
                                                    <input type="text" name="registration_button_text" className="form-control" placeholder="Button Text" value={newRegistrationData.registration_button_text} onChange={handleInputChangeRegistration} />
                                                    <input type="text" name="registration_button_link" className="form-control mt-3" placeholder="Button Link" value={newRegistrationData.registration_button_link} onChange={handleInputChangeRegistration} />
                                                </>
                                            )}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModalRegistration(false)}>Close</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* PROGRAM COMMITTEE */}
                <section className="programComittee" id="programComittee">
                    <div className="container">
                        <div className="section-header pb-1">
                            <h2>Program Committee</h2>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => window.$('#addCommitteeModal').modal('show')}>
                                ADD Committee
                            </button>
                        </div>

                        <div className="committee-list">
                            {committees.map(committee => (
                                <div key={committee.id} className="committee-item my-4">
                                    <h3>{committee.committee_position}</h3>
                                    <h4>
                                        {committee.committee_members.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                <br />
                                            </span>
                                        ))}
                                    </h4>
                                    <button className="btn btn-warning mr-3" onClick={() => handleEditCommittee(committee)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteCommittee(committee.id)}>Delete</button>
                                </div>
                            ))}
                        </div>

                        {/* Modal */}
                        <div className="modal fade" id="addCommitteeModal" tabIndex="-1" role="dialog" aria-labelledby="addCommitteeModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addCommitteeModalLabel">{selectedCommitteeId ? 'Edit Committee' : 'Add Committee'}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmitCommittee}>
                                        <div className="modal-body">
                                            <div className="container ModalCommittee_Position">
                                                <label>
                                                    Position:
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="committee_position"
                                                        value={newCommittee.committee_position}
                                                        onChange={handleInputChangeCommittee}
                                                        required
                                                    />
                                                </label>
                                            </div>
                                            <div className="container ModalCommitteeMember">
                                                <label>
                                                    Members:
                                                    <textarea
                                                        className="form-control"
                                                        name="committee_members"
                                                        value={newCommittee.committee_members}
                                                        onChange={handleInputChangeCommittee}
                                                        required
                                                    />
                                                </label>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                            <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* REVIEWER */}
                <section className="reviewer">
                    <div className="container">
                        <div className="section-header pb-1 mb-5">
                            <h2>Reviewer</h2>
                        </div>
                        <div className="container content-area p-3 border border-dashed rounded">
                            <div className="row">
                                {/* Kolom Kiri */}
                                <div className="col-md-6">
                                    {savedReviewers
                                        .slice(0, Math.ceil(savedReviewers.length / 2))
                                        .map((reviewer, index) => (
                                            <h4 key={index} onClick={handleOpenModal} className="reviewer-name" style={{ cursor: 'pointer' }}>
                                                {reviewer}
                                            </h4>
                                        ))}
                                </div>

                                {/* Kolom Kanan */}
                                <div className="col-md-6">
                                    {savedReviewers
                                        .slice(Math.ceil(savedReviewers.length / 2))
                                        .map((reviewer, index) => (
                                            <h4
                                                key={index + Math.ceil(savedReviewers.length / 2)}
                                                onClick={handleOpenModal}
                                                className="reviewer-name"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {reviewer}
                                            </h4>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal for Adding or Viewing Reviewers */}
                        {showModalReviewer && (
                            <div className="modal show d-block" tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Manage Reviewers</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModalReviewer(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            {/* Form tambah reviewer */}
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter reviewer name"
                                                    value={modalReviewerName}
                                                    onChange={(e) => setModalReviewerName(e.target.value)}
                                                />
                                                <button className="btn btn-primary mt-2" onClick={handleModalReviewerAdd}>
                                                    Add Reviewer
                                                </button>
                                            </div>

                                            {/* Daftar reviewer yang ditambahkan */}
                                            <div className="list-group">
                                                {modalReviewers.map((reviewer, index) => (
                                                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                        {reviewer}
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleModalReviewerRemove(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-secondary" onClick={() => setShowModalReviewer(false)}>Cancel</button>
                                            <button className="btn btn-primary" onClick={handleModalReviewerSave}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* PRICING */}
                <section className="pricing" id="pricing">
                    <div className="container">
                        <h2>Pricing</h2>
                        <button type="button" className="btn btn-secondary my-2" id="buttonAddPricing" onClick={() => setModalVisiblePricing(true)}>+ Add Pricing</button>


                        <div className="row">
                            {Array.isArray(pricings) && pricings.map((pricing) => (
                                <div className="col-xxl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-4" key={pricing.id}>
                                    <div className="card priceCard" id="priceCardDash">
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
                                            <button className="btn btn-warning mr-2" onClick={() => handleEditPricing(pricing)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDeletePricing(pricing.id)}>Delete</button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                        {modalVisiblePricing && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{currentPricing.id ? 'Edit Pricing' : 'Add Pricing'}</h5>
                                            <button type="button" className="btn-close" onClick={() => setModalVisiblePricing(false)}></button>
                                        </div>
                                        <form onSubmit={handleSubmitPricing}>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Price Label</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="price_label"
                                                        placeholder="Price Label"
                                                        value={currentPricing.price_label}
                                                        onChange={handleInputChangePricing}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="price"
                                                        placeholder="Price"
                                                        value={currentPricing.price}
                                                        onChange={handleInputChangePricing}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Price IDR</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="price_idr"
                                                        placeholder="Price IDR"
                                                        value={currentPricing.price_idr}
                                                        onChange={handleInputChangePricing}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => setModalVisiblePricing(false)}>Cancel</button>
                                                <button type="submit" className="btn btn-primary">{currentPricing.id ? 'Update' : 'Add'}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="payment">
                    <div className="container">
                        <div className="section-header">
                            <h5>Please follow this information for completing your registration:</h5>
                        </div>

                        <button onClick={() => handleAddPaymentType('method')} className="btn btn-primary mr-3" id="buttonAddPricing">+ Add Payment Method</button>
                        <button onClick={() => handleAddPaymentType('info')} className="btn btn-secondary">+ Add Additional Info</button>

                        <div className="container mt-3">
                            <h3 className='pt-3'>Payment Method</h3>
                            <hr />

                            {paymentData.map((data) => (
                                <div key={data.id} className="card mt-3" id="payment-dash-card">
                                    <div className="card-body">
                                        {data.method_or_info === 'method' && (
                                            <>
                                                <h3>{data.payment_method}</h3>
                                                <p>
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
                                            <p>
                                                {data.payment_additional_info.split('\n').map((line, index) => (
                                                    <span key={index}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                            </p>
                                        )}
                                        <button onClick={() => handleEditPayment(data)} className="btn btn-warning mt-3 me-2">Edit</button>
                                        <button onClick={() => handleDeletePayment(data.id)} className="btn btn-danger mt-3">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {showPaymentModal && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">
                                                {isEditModePayment ? `Edit ${selectedTypePaymentData === 'method' ? 'Payment Method' : 'Additional Info'}` : `Add ${selectedTypePaymentData === 'method' ? 'Payment Method' : 'Additional Info'}`}
                                            </h5>
                                            <button type="button" className="btn-close" onClick={closeModalPayment}></button>
                                        </div>
                                        <form onSubmit={handlePaymentSubmit}>
                                            <div className="modal-body">
                                                {selectedTypePaymentData === 'method' && (
                                                    <>
                                                        <input type="text" name="payment_method" className="form-control" placeholder="Payment Method" value={newPaymentData.payment_method} onChange={handleInputChangePaymentData} />
                                                        <textarea name="payment_details" className="form-control mt-3" placeholder="Payment Details" value={newPaymentData.payment_details} onChange={handleInputChangePaymentData}></textarea>
                                                    </>
                                                )}
                                                {selectedTypePaymentData === 'info' && (
                                                    <textarea name="payment_additional_info" className="form-control" placeholder="Additional Information" value={newPaymentData.payment_additional_info} onChange={handleInputChangePaymentData}></textarea>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={closeModalPayment}>Close</button>
                                                <button type="submit" className="btn btn-primary">{isEditModePayment ? 'Update' : 'Save'}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="article">
                    <div className="container">
                        <h1>Articles</h1>
                        <button onClick={() => setShowModalArticle(true)} className="btn btn-secondary mb-3"> + Add New Article</button>
                        <div className="container d-flex justify-content-center article-content text-center p-0">
                            {articles.map((article) => (
                                <div key={article.id} className="card mr-2">
                                    {/* Pastikan gambar diakses dengan URL lengkap */}
                                    <img src={`http://localhost:8000${article.article_img}`} className="card-img-top" alt="" />
                                    <div className="card-body">
                                        <h5 className="card-title">{article.article_title}</h5>
                                        <p className="card-text">{article.article_description}</p>
                                        <a href={article.article_link} target="_blank" rel="noopener noreferrer">Read More</a>
                                        <br />
                                        <button onClick={() => handleEditArticle(article)} className="btn btn-warning mr-1">Edit</button>
                                        <button onClick={() => handleDeleteArticle(article.id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {showModalArticle && (
                            <div className="modal" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">{isEditingArticle ? 'Edit Article' : 'Add New Article'}</h5>
                                            <button type="button" className="close" onClick={handleCloseModalArticle}>
                                                <span>&times;</span>
                                            </button>
                                        </div>
                                        <form onSubmit={handleSubmitArticle}>
                                            <div className="modal-body">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input type="text" name="article_title" value={articleData.article_title} onChange={handleInputChangeArticle} className="form-control" required />
                                                </div>
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea name="article_description" value={articleData.article_description} onChange={handleInputChangeArticle} className="form-control" required></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label>Link</label>
                                                    <input type="url" name="article_link" value={articleData.article_link} onChange={handleInputChangeArticle} className="form-control" required />
                                                </div>
                                                <div className="form-group">
                                                    <label>Image</label>
                                                    <input type="file" name="article_img" onChange={handleImageChangeArticle} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={handleCloseModalArticle}>Close</button>
                                                <button type="submit" className="btn btn-primary">{isEditingArticle ? 'Update' : 'Save'}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="documentation">
                    <div className="container">
                        <h1>Documentation</h1>

                        <a href={documentationLink || '#'} target="_blank" rel="noopener noreferrer">LINK DOCUMENTATION </a>
                        <i className="bi bi-pencil" onClick={() => setShowModalLink(true)}></i>

                        <div className="container photo-area">
                            <button className="btn btn-primary mt-5" id="buttonAddPricing" onClick={() => setShowModalDocumentationImg(true)}>
                                + Add New Image
                            </button>
                            <div className="row">
                                {documentationImages.map((image) => (
                                    <div className="col-12 col-md-4 p-0 photo-documentation" key={image.id}>
                                        {/* Tombol delete dengan SVG */}
                                        <button
                                            className="btn delete-date position-relative"
                                            style={{
                                                position: 'absolute',
                                                top: '50px',
                                                left: '15px',
                                                zIndex: 1,
                                                backgroundColor: 'white',
                                                border: 'none',
                                                padding: '0',
                                            }}
                                            onClick={() => handleDeleteDocumentationImg(image.id)}
                                        >
                                            <svg width="35" height="35" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="0.5" y="0.5" width="48" height="48" rx="9.5" stroke="#DE5858" />
                                                <path d="M12.25 38.7917C12.25 39.8746 12.6802 40.9132 13.446 41.679C14.2117 42.4448 15.2504 42.875 16.3333 42.875H32.6667C33.7496 42.875 34.7882 42.4448 35.554 41.679C36.3198 40.9132 36.75 39.8746 36.75 38.7917V14.2917H12.25V38.7917ZM16.3333 18.375H32.6667V38.7917H16.3333V18.375ZM31.6458 8.16667L29.6042 6.125H19.3958L17.3542 8.16667H10.2083V12.25H38.7917V8.16667H31.6458Z" fill="#DE5858" />
                                            </svg>
                                        </button>

                                        <a href="#">
                                            <img src={`http://localhost:8000${image.documentation_img}`} alt="" />
                                        </a>
                                    </div>
                                ))}

                            </div>
                        </div>



                        <br />

                        <a>VIDEO LINK  </a>
                        <i className="bi bi-pencil" onClick={() => setShowModalVideoLink(true)}></i>
                        <div className="container video-documentation p-0">
                            <iframe width="100%" height="400"
                                src={videoLink || 'https://www.youtube.com/embed/2KnuZaqjvo4'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>


                        {/* Modal for Documentation Link */}
                        {showModalLink && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Documentation Link</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModalLink(false)}></button>
                                        </div>
                                        <form onSubmit={handleSubmitLink}>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Documentation Link</label>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={documentationLink}
                                                        onChange={(e) => setDocumentationLink(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalLink(false)}>Close</button>
                                                <button type="submit" className="btn btn-primary">Save Link</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal for Image */}
                        {showModalDocumentationImg && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Add New Documentation Image</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModalDocumentationImg(false)}></button>
                                        </div>
                                        <form onSubmit={handleSubmitDocumentationImg}>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Upload Image</label>
                                                    <input type="file" className="form-control" onChange={handleFileChangeDocumentationImg} required />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalDocumentationImg(false)}>Close</button>
                                                <button type="submit" className="btn btn-primary">Add Image</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal for Video Link */}
                        {showModalVideoLink && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Video Link - Embed SRC Link Only!</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModalVideoLink(false)}></button>
                                        </div>
                                        <form onSubmit={handleSubmitVideoLink}>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label className="form-label">Video Link</label>
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        value={videoLink}
                                                        onChange={(e) => setVideoLink(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalVideoLink(false)}>Close</button>
                                                <button type="submit" className="btn btn-primary">Save Link</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="address" id="address">
                    <div className="container-fluid">
                        <div className="row no-gutters m-0">
                            <div className="col-md-6 kosong">
                            </div>
                            <div className="col-md-6">
                                <a>Google Map Link </a>
                                <i className="bi bi-pencil" onClick={() => setShowModalMapLinkAddress(true)}></i>
                            </div>
                        </div>

                        <div className="row no-gutters m-0">
                            <div className="col-md-6 address-area" style={{ backgroundImage: `url('/bgfooter.jpg')` }}>
                                <div className="address-place">
                                    <button type="button" onClick={handleSubmitAddress} className="btn btn-secondary mb-3">
                                        Update Address
                                    </button>
                                    <div id="place-area">
                                        <h5><textarea
                                            name="place" value={addressData.place} onChange={handleInputChangeAddress}
                                            placeholder="Enter venue" rows="3" />
                                        </h5>
                                    </div>
                                    <div id="additional-info-area">
                                        <p>
                                            <textarea name="address_additional_info" value={addressData.address_additional_info} onChange={handleInputChangeAddress}
                                                placeholder="Enter city or additional info" rows="4"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 map-area">
                                <iframe
                                    src={addressData.google_map_link || "https://www.google.com/maps"}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>

                        </div>

                        {showModalMapLinkAddress && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Edit Google Map Link - Embed SRC Only!</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModalMapLinkAddress(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <label className="form-label">Google Map Link</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newMapLinkAddress}
                                                onChange={handleMapLinkChangeAddress}
                                                placeholder="Enter Google Map embed link"
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModalMapLinkAddress(false)}>Close</button>
                                            <button type="button" className="btn btn-primary" onClick={handleSaveMapLinkAddress}>Save Link</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tombol Preview yang mengarah ke halaman index */}
                        <div className="text-center my-3" id="previewArea">
                            <a href="/" className="btn mb-3" id="buttonPreview" target="_blank" rel="noopener noreferrer">
                                <h2>Preview</h2>
                                <i className="bi bi-eye-fill ml-2"></i>
                            </a>
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
                                                    <svg
                                                        type="button"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        onClick={() => handleLogoDeleteSupportLogo(supportLogo.id)}
                                                        className="delete-icon"
                                                    >
                                                        <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" fill="white" />
                                                        <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" stroke="#DE5858" />
                                                        <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#DE5858" />
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No logos uploaded yet.</p>
                                    )}
                                    {/* Logo Upload Section */}
                                    <div className="align-items-center mx-2" id="inputLogoSupport">
                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.2231 15.3125C14.654 15.3125 15.0807 15.2276 15.4788 15.0627C15.8769 14.8978 16.2386 14.6561 16.5433 14.3514C16.848 14.0468 17.0897 13.685 17.2546 13.2869C17.4195 12.8888 17.5044 12.4621 17.5044 12.0312C17.5044 11.6004 17.4195 11.1737 17.2546 10.7756C17.0897 10.3775 16.848 10.0157 16.5433 9.71106C16.2386 9.40636 15.8769 9.16467 15.4788 8.99977C15.0807 8.83487 14.654 8.75 14.2231 8.75C13.3529 8.75 12.5183 9.0957 11.9029 9.71106C11.2876 10.3264 10.9419 11.161 10.9419 12.0312C10.9419 12.9015 11.2876 13.7361 11.9029 14.3514C12.5183 14.9668 13.3529 15.3125 14.2231 15.3125Z" fill="white" />
                                            <path d="M30.625 30.625C30.625 31.7853 30.1641 32.8981 29.3436 33.7186C28.5231 34.5391 27.4103 35 26.25 35H8.75C7.58968 35 6.47688 34.5391 5.65641 33.7186C4.83594 32.8981 4.375 31.7853 4.375 30.625V4.375C4.375 3.21468 4.83594 2.10188 5.65641 1.28141C6.47688 0.460936 7.58968 0 8.75 0L20.7812 0L30.625 9.84375V30.625ZM8.75 2.1875C8.16984 2.1875 7.61344 2.41797 7.2032 2.8282C6.79297 3.23844 6.5625 3.79484 6.5625 4.375V26.25L11.4275 21.385C11.5999 21.213 11.8248 21.1035 12.0665 21.0737C12.3082 21.044 12.5529 21.0958 12.7619 21.2209L17.5 24.0625L22.2184 17.4562C22.3108 17.3271 22.4301 17.2197 22.5681 17.1413C22.7062 17.0629 22.8596 17.0155 23.0178 17.0024C23.176 16.9893 23.3351 17.0108 23.4842 17.0654C23.6332 17.1199 23.7686 17.2063 23.8809 17.3184L28.4375 21.875V9.84375H24.0625C23.1923 9.84375 22.3577 9.49805 21.7423 8.88269C21.127 8.26734 20.7812 7.43274 20.7812 6.5625V2.1875H8.75Z" fill="white" />
                                        </svg>
                                        <label htmlFor="file-upload-support" className="file-upload-support">
                                            Choose png logo
                                        </label>

                                        <input
                                            id="file-upload-support" type="file" onChange={handleLogoUploadSupportLogo} />
                                    </div>
                                </div>


                            </div>

                            <div className="container text-center">
                                <hr className="opacity-100" />
                                <p>© {copyrightText} <i className="bi bi-pencil" onClick={handleModalToggleCopyright}></i></p>

                                {/* Modal for editing copyright text */}
                                <div className={`modal fade ${isModalOpenCopyright ? 'show' : ''}`} style={{ display: isModalOpenCopyright ? 'block' : 'none', zIndex: 10 }} tabIndex="-1" aria-labelledby="copyrightModalLabel" aria-hidden={!isModalOpenCopyright}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="copyrightModalLabel">Edit Copyright Text</h5>
                                                <button type="button" className="btn-close" onClick={handleModalToggleCopyright} aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <textarea
                                                    value={newCopyrightText}
                                                    onChange={handleChangeCopyright}
                                                    placeholder="Enter new copyright text"
                                                    rows="4"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={handleModalToggleCopyright}>Close</button>
                                                <button type="button" className="btn btn-primary" onClick={handleSaveCopyright}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <svg
                                        type="button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleLogoDeleteSponsoreLogo(sponsorLogo.id)} className="delete-icon"
                                    >
                                        <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" fill="white" />
                                        <rect x="0.5" y="0.5" width="23" height="23" rx="9.5" stroke="#DE5858" />
                                        <path d="M6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#DE5858" />
                                    </svg>
                                </div>
                            ))
                        ) : (
                            <p>No sponsor logos uploaded yet.
                            </p>
                        )}

                        {/* Logo Upload Section */}
                        <div className="align-items-center mx-2" id="inputSponsoreLogo">
                            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2231 15.3125C14.654 15.3125 15.0807 15.2276 15.4788 15.0627C15.8769 14.8978 16.2386 14.6561 16.5433 14.3514C16.848 14.0468 17.0897 13.685 17.2546 13.2869C17.4195 12.8888 17.5044 12.4621 17.5044 12.0312C17.5044 11.6004 17.4195 11.1737 17.2546 10.7756C17.0897 10.3775 16.848 10.0157 16.5433 9.71106C16.2386 9.40636 15.8769 9.16467 15.4788 8.99977C15.0807 8.83487 14.654 8.75 14.2231 8.75C13.3529 8.75 12.5183 9.0957 11.9029 9.71106C11.2876 10.3264 10.9419 11.161 10.9419 12.0312C10.9419 12.9015 11.2876 13.7361 11.9029 14.3514C12.5183 14.9668 13.3529 15.3125 14.2231 15.3125Z" fill="white" />
                                <path d="M30.625 30.625C30.625 31.7853 30.1641 32.8981 29.3436 33.7186C28.5231 34.5391 27.4103 35 26.25 35H8.75C7.58968 35 6.47688 34.5391 5.65641 33.7186C4.83594 32.8981 4.375 31.7853 4.375 30.625V4.375C4.375 3.21468 4.83594 2.10188 5.65641 1.28141C6.47688 0.460936 7.58968 0 8.75 0L20.7812 0L30.625 9.84375V30.625ZM8.75 2.1875C8.16984 2.1875 7.61344 2.41797 7.2032 2.8282C6.79297 3.23844 6.5625 3.79484 6.5625 4.375V26.25L11.4275 21.385C11.5999 21.213 11.8248 21.1035 12.0665 21.0737C12.3082 21.044 12.5529 21.0958 12.7619 21.2209L17.5 24.0625L22.2184 17.4562C22.3108 17.3271 22.4301 17.2197 22.5681 17.1413C22.7062 17.0629 22.8596 17.0155 23.0178 17.0024C23.176 16.9893 23.3351 17.0108 23.4842 17.0654C23.6332 17.1199 23.7686 17.2063 23.8809 17.3184L28.4375 21.875V9.84375H24.0625C23.1923 9.84375 22.3577 9.49805 21.7423 8.88269C21.127 8.26734 20.7812 7.43274 20.7812 6.5625V2.1875H8.75Z" fill="white" />
                            </svg>
                            <label htmlFor="file-upload-sponsore" className="file-upload-sponsore">
                                Choose png logo
                            </label>
                            <input id="file-upload-sponsore" type="file" multiple onChange={handleLogoUploadSponsoreLogo} />
                        </div>
                    </div>


                </div>

            </footer>
        </div>
    );
}

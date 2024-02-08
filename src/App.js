import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; 
const API_KEY = "4f57a526adc5435d832cf4e31bcf9602";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const CATEGORIES = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'sports', label: 'Sports' },
    { id: 'technology', label: 'Technology' },
    { id: 'entertainment', label: 'Entertainment' }
];

function App() {
    const [newsArray, setNewsArray] = useState([]);
    const [newsType, setNewsType] = useState("Today's Hot Headlines");
    const [query, setQuery] = useState("");

    useEffect(() => {
        fetchHeadlines();
    }, []);

    const fetchHeadlines = async () => {
        const res = await fetch(HEADLINES_NEWS + API_KEY);
        handleResponse(res);
    }

    const fetchNewsByCategory = async (category) => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`;
        const res = await fetch(url);
        handleResponse(res);
    }

    const fetchQueryNews = async () => {
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
        const res = await fetch(url);
        handleResponse(res);
    }

    const handleResponse = async (res) => {
        if (res.ok) {
            const data = await res.json();
            setNewsArray(data.articles);
        } else {
            console.error('Failed to fetch the news');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchQueryNews();
    }

    const handleCategoryClick = (category) => {
        setNewsType(category.label);
        fetchNewsByCategory(category.id);
    }

    return (
        <div>
            <nav className="custom-navbar navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">NewsApp</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {CATEGORIES.map((category, index) => (
                                <li className="nav-item" key={index}>
                                    <a className="nav-link" href="#" onClick={() => handleCategoryClick(category)}>{category.label}</a>
                                </li>
                            ))}
                        </ul>
                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <h3>{newsType}</h3>
                <div className="row mt-3">
                    {newsArray.map((news, index) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={index}>
                            <div className="custom-card card h-100">
                                <img src={news.urlToImage} className="card-img-top" alt={news.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{news.title}</h5>
                                    <p className="card-text">{news.description}</p>
                                </div>
                                <div className="card-footer">
                                    <a href={news.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

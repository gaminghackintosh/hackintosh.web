import React, { useState, useEffect } from "react";

export const AboutPage = () => (
  <div className="sf-local-page">
    <h1>About This Mac</h1>
    <div className="sf-local-card">
      <p><strong>hackintosh.web</strong> – веб-симуляция macOS Sonoma.</p>
      <ul>
        <li>Версия: 14.0.1 (23A344)</li>
        <li>Процессор: Apple M3 Max (Virtual)</li>
        <li>Память: 16 GB LPDDR5X</li>
        <li>Графика: Integrated GPU (16-core)</li>
      </ul>
    </div>
  </div>
);

export const HackintoshPage = () => (
  <div className="sf-local-page">
    <h1>🖥️ hackintosh.web</h1>
    <div className="sf-local-card">
      <p>Добро пожаловать в проект! Это macOS, работающая прямо в браузере.</p>
      <p>Исходный код на <a href="https://github.com/gaminghackintosh/hackintosh.web" target="_blank" rel="noreferrer">GitHub</a></p>
    </div>
  </div>
);

export const CatsPage = () => {
  const [catImg, setCatImg] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCat = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=1");
      const data = await res.json();
      if (data[0]?.url) setCatImg(data[0].url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCat(); }, []);

  return (
    <div className="sf-local-page">
      <h1>🐱 Random Cat</h1>
      <div className="sf-local-card">
        {loading ? (
          <p>Loading...</p>
        ) : catImg ? (
          <img src={catImg} alt="Cat" style={{ maxWidth: "100%", borderRadius: 12 }} />
        ) : (
          <p>Could not load cat. Try again!</p>
        )}
        <button className="sf-cat-btn" onClick={fetchCat}>Next cat</button>
      </div>
    </div>
  );
};

const pages = ["about", "hackintosh", "cats"];
export const SurprisePage = ({ onNavigate }) => {
  useEffect(() => {
    const random = pages[Math.floor(Math.random() * pages.length)];
    onNavigate(random);
  }, [onNavigate]);
  return <div className="sf-local-page"><p>Surprise...</p></div>;
};
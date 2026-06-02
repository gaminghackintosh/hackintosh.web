import React, { useState, useEffect } from "react";

const EMOJIS = ["🍎", "🚀", "🐱", "🍕", "💻", "🎨", "🔒", "✨"];

export const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  useEffect(() => {
    const doubleCards = [...EMOJIS, ...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(doubleCards);
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || solved.includes(index) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="memory-game">
      <h1>Memory Match</h1>
      <div className="grid">
        {cards.map((emoji, i) => (
          <div 
            key={i} 
            className={`card ${flipped.includes(i) || solved.includes(i) ? "flipped" : ""}`}
            onClick={() => handleCardClick(i)}
          >
            {flipped.includes(i) || solved.includes(i) ? emoji : "?"}
          </div>
        ))}
      </div>
      {solved.length === cards.length && <h2>You Won! 🎉</h2>}
    </div>
  );
};
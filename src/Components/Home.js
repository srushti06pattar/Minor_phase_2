import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cards = ["ROADMAP", "PROFILE", "QUIZES"];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCardClick = (cardName) => {
    if (cardName === "ROADMAP") navigate("/roadmaps");
    if (cardName === "PROFILE") navigate("/profile");
    if (cardName === "QUIZES") navigate("/quizes");
  };

  const getCardStyle = (index) => {
    const position = (index - currentIndex + cards.length) % cards.length;
    const baseStyle =
      "absolute w-64 h-72 rounded-2xl border bg-[#1a1a2e] flex items-center justify-center text-2xl tracking-[0.3em] font-semibold transition-all duration-700 ease-in-out cursor-pointer transform-style-3d";

    if (position === 0) {
      // Left
      return `${baseStyle} -translate-x-[100%] rotate-y-45 scale-75 z-0 opacity-50 backdrop-blur-sm`;
    } else if (position === 1) {
      // Center
      return `${baseStyle} translate-x-0 rotate-y-0 scale-100 z-10 shadow-[0_0_30px_3px_rgba(255,255,255,0.4)]`;
    } else if (position === 2) {
      // Right
      return `${baseStyle} translate-x-[100%] -rotate-y-45 scale-75 z-0 opacity-50 backdrop-blur-sm`;
    } else {
      return "hidden";
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#0a0a14] to-[#1a1a2e] text-white flex flex-col items-center justify-center overflow-hidden">
<h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-5xl font-bold tracking-[0.1em] drop-shadow-[0_0_20px_rgba(255,200,200,0.7)]" style={{ fontFamily: "'Orbitron', sans-serif" }}>CrackIT</h1>
<button className="absolute top-8 right-10 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md tracking-widest">LOGIN</button>

      {/* Arrows & Carousel */}
      <div className="flex items-center justify-center w-full max-w-6xl px-4 relative mt-20 perspective-[1200px]">
        <button
          onClick={handleLeftClick}
          className="absolute left-0 text-white text-4xl px-4 hover:scale-125 transition z-20"
        >
          {"<"}
        </button>

        <div className="relative flex items-center justify-center w-full h-[400px]">
          {cards.map((card, index) => (
            <div
              key={card}
              className={getCardStyle(index)}
              onClick={() => handleCardClick(card)}
            >
              {card}
            </div>
          ))}
        </div>

        <button
          onClick={handleRightClick}
          className="absolute right-0 text-white text-4xl px-4 hover:scale-125 transition z-20"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Home;

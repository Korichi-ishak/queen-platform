import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import teaQuotes from '../../data/tea-quotes.json';

interface Quote {
  quote: string;
  author: string;
}

const TeaCeremonyTeaser: React.FC = () => {
  const [showSteam, setShowSteam] = useState(false);
  const [showTypingGhost, setShowTypingGhost] = useState(false);
  const [fortune, setFortune] = useState<Quote | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [rsvp, setRsvp] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const storedRsvp = localStorage.getItem('teaNotify');
    if (storedRsvp) {
      setRsvp(JSON.parse(storedRsvp));
    }

    const steamInterval = setInterval(() => {
      setShowSteam(true);
      setTimeout(() => {
        setShowSteam(false);
      }, 4000); // Steam animation duration
    }, 40000); // Show steam every 40s

    const typingInterval = setInterval(() => {
      setShowTypingGhost(true);
      setTimeout(() => {
        setShowTypingGhost(false);
      }, 2000); // Show for 2s
    }, 15000); // Show every 15s

    return () => {
      clearInterval(steamInterval);
      clearInterval(typingInterval);
    };
  }, []);

  const handleCardClick = () => {
    if (isFlipped) return;

    let availableQuotes = teaQuotes;
    const shownQuotesJSON = localStorage.getItem('shownTeaQuotes');
    let shownQuotes: Quote[] = shownQuotesJSON ? JSON.parse(shownQuotesJSON) : [];

    if (shownQuotes.length > 0) {
      availableQuotes = teaQuotes.filter(
        (q) => !shownQuotes.some((sq) => sq.quote === q.quote)
      );
    }

    if (availableQuotes.length === 0) {
      // All quotes shown, reset
      localStorage.removeItem('shownTeaQuotes');
      shownQuotes = [];
      availableQuotes = teaQuotes;
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const newFortune = availableQuotes[randomIndex];

    setFortune(newFortune);

    gsap.to(cardRef.current, {
      rotationY: 180,
      duration: 0.6,
      onComplete: () => {
        const updatedShownQuotes = [...shownQuotes, newFortune];
        localStorage.setItem('shownTeaQuotes', JSON.stringify(updatedShownQuotes));
      },
    });

    setIsFlipped(true);
  };

  const handleRsvpChange = () => {
    const newRsvp = !rsvp;
    setRsvp(newRsvp);
    localStorage.setItem('teaNotify', JSON.stringify(newRsvp));
    if (newRsvp) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="p-4 bg-ivory text-royal-purple rounded-lg shadow-lg">
      <div className="flex items-center">
        <div className="steam-container">
          <img src="/assets/illustrations/cup.svg" alt="Teacup" className="w-16 h-16" />
          {showSteam && <img src="/assets/illustrations/steam.svg" alt="Steam" className="steam" />}
        </div>
        <h2 className="text-2xl font-bold text-imperial-gold ml-4">Afternoon Tea Ceremony</h2>
      </div>
      <div className={`typing-ghost ${showTypingGhost ? 'visible' : ''} mt-4`}>
        <p className="text-sm italic">Aunty is typing...</p>
      </div>

      <div className="mt-6">
        <p className="mb-2">A special fortune for you:</p>
        <div className="card-container" onClick={handleCardClick}>
          <div className="card" ref={cardRef}>
            <div className="card-face card-front">
              <p>Click to reveal</p>
            </div>
            <div className="card-face card-back">
              {fortune && (
                <>
                  <p>"{fortune.quote}"</p>
                  <p className="mt-2 font-bold">- {fortune.author}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <p>RSVP for the next tea ceremony:</p>
        <label className="switch">
          <input type="checkbox" checked={rsvp} onChange={handleRsvpChange} />
          <span className="slider"></span>
        </label>
      </div>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        You will be notified about the next tea ceremony!
      </div>

      <p>Coming soon...</p>
    </div>
  );
};

export default TeaCeremonyTeaser; 
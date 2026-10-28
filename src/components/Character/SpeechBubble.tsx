import { useState, useEffect } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import "../styles/SpeechBubble.css";

interface SpeechBubbleProps {
  visible?: boolean;
}

const SpeechBubble = ({ visible = true }: SpeechBubbleProps) => {
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  // Play natural speech synthesis greeting
  const speakGreeting = () => {
    if (isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Hi! Welcome to my portfolio!");
    utterance.rate = 1.05;
    utterance.pitch = 1.35; // friendly, cheerful anime tone

    // Try to find a friendly English female voice if available
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Female") ||
          v.name.includes("Zira") ||
          v.name.includes("Samantha") ||
          v.name.includes("Victoria") ||
          v.name.includes("Google UK English Female") ||
          v.name.includes("Natural"))
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
    setHasSpoken(true);
  };

  useEffect(() => {
    // Speak on initial load after brief delay
    const timer = setTimeout(() => {
      speakGreeting();
    }, 1200);

    // Fade out speech bubble when scrolling away from Hero
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > 160);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMuted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      speakGreeting();
    } else {
      setIsMuted(true);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  if (!visible || isScrolledPastHero) return null;

  return (
    <div
      className="speech-bubble-container"
      onClick={speakGreeting}
      title="Click to replay greeting"
    >
      <div className="speech-bubble-box">
        {/* Sparkles */}
        <span className="speech-sparkle sparkle-top">✦</span>
        <span className="speech-sparkle sparkle-bottom">✧</span>

        {/* Content */}
        <div className="speech-header-row">
          <span className="speech-title">
            Hi! <span className="speech-wave-emoji">👋</span>
          </span>
          <button
            className="speech-sound-btn"
            onClick={toggleSound}
            title={isMuted ? "Unmute greeting voice" : "Mute greeting voice"}
            aria-label="Toggle greeting audio"
          >
            {isMuted ? <HiVolumeOff size={15} /> : <HiVolumeUp size={15} />}
          </button>
        </div>

        <p className="speech-subtitle">Welcome to my portfolio!</p>

        {/* Speech tail pointing to anime girl */}
        <div className="speech-bubble-tail"></div>
      </div>
    </div>
  );
};

export default SpeechBubble;

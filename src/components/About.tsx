import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-pill">
          <span className="about-pill-dot"></span>
          <span>BACKGROUND & MINDSET</span>
        </div>

        <h3 className="title">About Me</h3>

        <p className="para">
          I’m Shalini H R, an MCA graduate and aspiring AI/ML Software Engineer who learns by building, testing, deploying, and contributing to open source. With 130+ DSA problems solved in Java, I focus on turning AI/ML concepts into practical, production-ready systems—solving complex real-world challenges with clean, reliable code.
        </p>

        <div className="about-highlights-grid">
          <div className="about-highlight-card">
            <div className="highlight-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <div className="highlight-info">
              <h4>MCA Graduate</h4>
              <p>GM University &bull; Strong CS & Math foundation</p>
            </div>
          </div>

          <div className="about-highlight-card">
            <div className="highlight-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div className="highlight-info">
              <h4>130+ LeetCode Solved</h4>
              <p>Data Structures & Algorithms in Java</p>
            </div>
          </div>

          <div className="about-highlight-card">
            <div className="highlight-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div className="highlight-info">
              <h4>Open-Source Builder</h4>
              <p>Smart India Hackathon &bull; 32+ merged PRs</p>
            </div>
          </div>

          <div className="about-highlight-card">
            <div className="highlight-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
            </div>
            <div className="highlight-info">
              <h4>Practical AI/ML</h4>
              <p>RAG pipelines, LLMs, Computer Vision & APIs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

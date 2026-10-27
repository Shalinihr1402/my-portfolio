import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>Gem Ventures LLP</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Built an intelligent voice assistant for university ERP using Vapi, Deepgram, and OpenAI across English, Hindi, and Kannada. Connected React.js & Flutter apps to PHP REST APIs and MySQL, and implemented a Node.js WebSocket pipeline for low-latency audio streaming.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Open Source & Hackathons</h4>
                <h5>Smart India Hackathon & Open Source</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Merged 32 pull requests across 9 open-source projects (including TheAlgorithms/Java) focusing on backend features and edge-case handling. Built rockfall risk prediction ML classifier at Smart India Hackathon achieving 80% accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

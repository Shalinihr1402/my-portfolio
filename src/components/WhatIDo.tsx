import "./styles/WhatIDo.css";

const WhatIDo = () => {
  return (
    <div className="whatIDO" id="skills">
      <div className="skills-wrapper">
        <div className="skills-header">
          <div className="skills-pill">
            <span className="skills-pill-dot"></span>
            <span>CORE COMPETENCIES</span>
          </div>
          <h2 className="skills-main-title">
            Technical <span className="skills-gradient-text">Expertise</span>
          </h2>
          <p className="skills-subtitle">
            Architecting intelligent AI models, scalable backend systems, and clean algorithmic solutions.
          </p>
        </div>

        <div className="skills-grid">
          {/* Pillar 1: AI & Machine Learning */}
          <div className="skill-card skill-card-ai">
            <div className="skill-card-top">
              <div className="skill-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h3a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2h-1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2H8a2 2 0 0 1-2-2v-1a3 3 0 0 1 3-3h3V9.5C10.8 8.8 10 7.5 10 6a4 4 0 0 1 4-4z"></path>
                  <circle cx="12" cy="6" r="1"></circle>
                </svg>
              </div>
              <span className="skill-badge">SPECIALIZATION</span>
            </div>

            <h3 className="skill-title">AI & Machine Learning</h3>
            <p className="skill-desc">
              Building production-ready AI systems combining LLM pipelines, RAG with vector search, computer vision for document processing, and predictive ML classifiers evaluated on real-world datasets.
            </p>

            <div className="skill-tags-group">
              <span className="skill-tag skill-tag-accent">Python</span>
              <span className="skill-tag">scikit-learn</span>
              <span className="skill-tag">Model Evaluation</span>
              <span className="skill-tag skill-tag-accent">LangChain</span>
              <span className="skill-tag">Groq LLM</span>
              <span className="skill-tag">RAG Pipelines</span>
              <span className="skill-tag">ChromaDB</span>
              <span className="skill-tag">OpenCV</span>
              <span className="skill-tag">Tesseract OCR</span>
              <span className="skill-tag">FastAPI</span>
            </div>
          </div>

          {/* Pillar 2: Full Stack & Backend */}
          <div className="skill-card skill-card-stack">
            <div className="skill-card-top">
              <div className="skill-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <span className="skill-badge skill-badge-cyan">ENGINEERING</span>
            </div>

            <h3 className="skill-title">Full Stack & Backend</h3>
            <p className="skill-desc">
              Developing robust RESTful APIs, high-throughput backend services, real-time WebSocket pipelines for voice streaming, and responsive modern user interfaces with type-safe state management.
            </p>

            <div className="skill-tags-group">
              <span className="skill-tag skill-tag-cyan">React.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag skill-tag-cyan">FastAPI</span>
              <span className="skill-tag">Flask</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">REST APIs</span>
              <span className="skill-tag">WebSockets</span>
              <span className="skill-tag">PostgreSQL</span>
              <span className="skill-tag">MySQL</span>
            </div>
          </div>

          {/* Pillar 3: DSA & Software Engineering */}
          <div className="skill-card skill-card-dsa">
            <div className="skill-card-top">
              <div className="skill-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <span className="skill-badge">FOUNDATIONS</span>
            </div>

            <h3 className="skill-title">DSA & Software Engineering</h3>
            <p className="skill-desc">
              Strong core computer science foundation with disciplined complexity analysis (time & space), modular object-oriented design, and clean architecture. Solved 130+ LeetCode problems in Java.
            </p>

            <div className="skill-tags-group">
              <span className="skill-tag skill-tag-accent">Java</span>
              <span className="skill-tag">Data Structures</span>
              <span className="skill-tag">Algorithms</span>
              <span className="skill-tag skill-tag-accent">130+ LeetCode Solved</span>
              <span className="skill-tag">OOP</span>
              <span className="skill-tag">Problem Solving</span>
              <span className="skill-tag">Clean Architecture</span>
              <span className="skill-tag">Git & CI/CD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

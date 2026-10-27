import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!box || box.length === 0 || !container) return;
      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX > 0 ? translateX : 2000}`,
        scrub: true,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: () => -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Projects</span>
        </h2>

        <div className="work-flex">
          {/* Project 01: Rockfall Prediction & Alert System */}
          <div className="work-box" key="rockfall-prediction">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>Rockfall Prediction & Alert System</h4>
                  <p className="work-category">Geotechnical AI &bull; Smart India Hackathon</p>
                </div>
              </div>

              <div className="work-section-block">
                <h5>Problem</h5>
                <p>
                  Open-pit mining environments face catastrophic safety hazards from unexpected rock slope failures, wall collapses, and lack of real-time early warning telemetry.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Solution & Architecture</h5>
                <p>
                  Engineered an automated slope hazard monitoring platform analyzing geotechnical sensor telemetry with an ML classifier (~80% evaluation accuracy), featuring interactive risk heatmaps and automated alert dispatches.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Tech Stack</h5>
                <div className="work-tags-flex">
                  <span>Python</span>
                  <span>scikit-learn</span>
                  <span>Next.js</span>
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn"
                  data-cursor="disable"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>

            <WorkImage image="1.jpeg" alt="Rockfall Hazard Prediction & Alert System" />
          </div>

          {/* Project 02: AI Career Counselor */}
          <div className="work-box" key="ai-career-counselor">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>AI Career Counselor</h4>
                  <p className="work-category">LLM RAG &bull; Resume Skill Gap Analysis</p>
                </div>
              </div>

              <div className="work-section-block">
                <h5>Problem</h5>
                <p>
                  Job seekers struggle to understand exact prerequisite skill deficits between their current resumes and target industry roles.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Solution & Architecture</h5>
                <p>
                  Built a multimodal resume parsing pipeline with PyMuPDF and Groq LLM returning structured JSON skills, matching against 1,000+ O*NET careers via vector embeddings to generate personalized weekly learning roadmaps.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Tech Stack</h5>
                <div className="work-tags-flex">
                  <span>Python</span>
                  <span>FastAPI</span>
                  <span>Groq LLM</span>
                  <span>LangChain</span>
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Supabase</span>
                </div>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn"
                  data-cursor="disable"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>

            <WorkImage image="AI-Career-Councelor1.jpeg" alt="AI Career Counselor Project" />
          </div>

          {/* Project 03: ScholarSense AI */}
          <div className="work-box" key="scholarsense-ai">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>ScholarSense AI</h4>
                  <p className="work-category">Computer Vision &bull; OCR Document Verification</p>
                </div>
              </div>

              <div className="work-section-block">
                <h5>Problem</h5>
                <p>
                  Scholarship disbursement teams waste weeks manually reviewing student certificates and academic marksheets, making error detection challenging.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Solution & Architecture</h5>
                <p>
                  Automated document verification system using Tesseract OCR and OpenCV image pre-processing, flagging fraudulent or inconsistent submissions with a trained scikit-learn classifier (~95% accuracy) and Chart.js dashboards.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Tech Stack</h5>
                <div className="work-tags-flex">
                  <span>Python</span>
                  <span>Flask</span>
                  <span>Tesseract OCR</span>
                  <span>OpenCV</span>
                  <span>scikit-learn</span>
                  <span>MySQL</span>
                  <span>Chart.js</span>
                </div>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn"
                  data-cursor="disable"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>

            <WorkImage image="Scholar-sense-ai.jpeg" alt="ScholarSense AI Project" />
          </div>

          {/* Project 04: GMU Intelligent Voice Assistant */}
          <div className="work-box" key="gmu-voice-assistant">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>GMU Voice Assistant</h4>
                  <p className="work-category">Multilingual Voice AI &bull; Gem Ventures LLP</p>
                </div>
              </div>

              <div className="work-section-block">
                <h5>Problem</h5>
                <p>
                  Navigating enterprise ERP systems across thousands of academic records is tedious on mobile and inaccessible for multi-lingual users.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Solution & Architecture</h5>
                <p>
                  Conversational ERP voice AI supporting English, Hindi, and Kannada. Built React.js client interfaces connected to REST APIs, and architected a Node.js WebSocket pipeline for low-latency voice streaming with Deepgram and OpenAI.
                </p>
              </div>

              <div className="work-section-block">
                <h5>Tech Stack</h5>
                <div className="work-tags-flex">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>WebSockets</span>
                  <span>Deepgram</span>
                  <span>OpenAI</span>
                  <span>PHP REST</span>
                  <span>MySQL</span>
                </div>
              </div>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn"
                  data-cursor="disable"
                >
                  GitHub Repository ↗
                </a>
              </div>
            </div>

            <WorkImage image="Gmu-Voice-Assistant.jpeg" alt="GMU Intelligent Voice Assistant Project" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

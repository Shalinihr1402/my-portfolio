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
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
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
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-flex">
          {/* Project 01: AI Career Counselor */}
          <div className="work-box" key="ai-career-counselor">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>AI Career Counselor</h4>
                  <p>Resume Skill Gap & Roadmap App</p>
                </div>
              </div>

              <h4>Tools and Features</h4>
              <p>Python, FastAPI, Groq LLM, React, TypeScript, Supabase PostgreSQL</p>

              <p>
                Reads PDF resumes via PyMuPDF and Groq LLM returning structured JSON.
                Compares skills with 1000+ O*NET careers using vector embeddings
                to detect missing prerequisites and builds weekly learning roadmaps.
              </p>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <WorkImage image="1.jpeg" alt="AI Career Counselor Project" />
          </div>

          {/* Project 02: ScholarSense AI */}
          <div className="work-box" key="scholarsense-ai">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>ScholarSense AI</h4>
                  <p>Scholarship Risk Assessment with OCR</p>
                </div>
              </div>

              <h4>Tools and Features</h4>
              <p>Python, Flask, Tesseract OCR, OpenCV, scikit-learn, MySQL, Chart.js</p>

              <p>
                Automated scholarship verification pipeline parsing student documents
                with Tesseract OCR and OpenCV. Flags anomalous applications using a
                trained scikit-learn model (~95% accuracy) with role-based Chart.js dashboards.
              </p>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <WorkImage image="2.jpeg" alt="ScholarSense AI Project" />
          </div>

          {/* Project 03: GMU Voice Assistant */}
          <div className="work-box" key="gmu-voice-assistant">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>GMU Voice Assistant</h4>
                  <p>Multilingual Voice AI for ERP</p>
                </div>
              </div>

              <h4>Tools and Features</h4>
              <p>React.js, Node.js, WebSockets, Vapi, Deepgram, OpenAI, PHP, MySQL</p>

              <p>
                Intelligent conversational assistant for university ERP supporting
                English, Hindi, and Kannada. Connected React.js frontends to REST APIs
                and engineered a Node.js WebSocket pipeline for low-latency voice streaming.
              </p>

              <div className="project-links">
                <a
                  href="https://github.com/Shalinihr1402"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            <WorkImage image="3.jpeg" alt="GMU Intelligent Voice Assistant Project" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

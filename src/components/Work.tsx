import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  tags: string[];
  image: string;
  github: string;
}

const projects: Project[] = [
  {
    id: "ai-career-counselor",
    number: "01",
    title: "AI Career Counselor",
    category: "LLM RAG • Career Intelligence System",
    problem:
      "Job seekers struggle to understand exact prerequisite skill deficits between their resume and target technical industry roles, lacking structured guidance.",
    solution:
      "Engineered an automated resume parsing pipeline with PyMuPDF and Groq LLM returning structured JSON. Matched skills against 1,000+ O*NET careers via vector embeddings in Supabase PostgreSQL, dynamically generating personalized weekly learning roadmaps.",
    tags: [
      "Python",
      "FastAPI",
      "Groq LLM",
      "React",
      "TypeScript",
      "Supabase PostgreSQL",
      "PyMuPDF",
      "Vector Search",
    ],
    image: "/images/AI-Career-Councelor1.jpeg",
    github: "https://github.com/Shalinihr1402",
  },
  {
    id: "scholarsense-ai",
    number: "02",
    title: "ScholarSense AI",
    category: "Computer Vision • OCR Document Verification",
    problem:
      "Scholarship disbursement teams waste weeks manually reviewing student certificates and academic marksheets, making tampering and discrepancy detection challenging.",
    solution:
      "Automated document verification system using Tesseract OCR and OpenCV image pre-processing. Flags fraudulent or inconsistent submissions with a trained scikit-learn classifier (~95% accuracy) and role-based Chart.js audit dashboards.",
    tags: [
      "Python",
      "Flask",
      "Tesseract OCR",
      "OpenCV",
      "scikit-learn",
      "MySQL",
      "Chart.js",
    ],
    image: "/images/Scholar-sense-ai.jpeg",
    github: "https://github.com/Shalinihr1402",
  },
  {
    id: "gmu-voice-assistant",
    number: "03",
    title: "GMU Intelligent Voice Assistant",
    category: "Multilingual Voice AI • University ERP Integration",
    problem:
      "Navigating enterprise ERP portals on mobile devices is friction-heavy and inaccessible for students and faculty across multiple regional languages.",
    solution:
      "Conversational ERP voice assistant supporting English, Hindi, and Kannada. Connected React.js client interfaces to PHP REST APIs and engineered a Node.js WebSocket pipeline for low-latency streaming audio with Deepgram and OpenAI.",
    tags: [
      "React.js",
      "Node.js",
      "WebSockets",
      "Deepgram",
      "OpenAI",
      "PHP",
      "MySQL",
      "Vapi",
    ],
    image: "/images/Gmu-Voice-Assistant.jpeg",
    github: "https://github.com/Shalinihr1402",
  },
  {
    id: "rockfall-prediction",
    number: "04",
    title: "Rockfall Hazard Prediction & Alert System",
    category: "Geotechnical AI • Smart India Hackathon",
    problem:
      "Open-pit mining environments face catastrophic safety hazards from unexpected rock slope failures, wall collapses, and lack of real-time early warning telemetry.",
    solution:
      "Engineered an automated slope hazard monitoring platform analyzing geotechnical sensor telemetry with an ML classifier (~80% evaluation accuracy), featuring interactive risk heatmaps and automated alert dispatches.",
    tags: [
      "Python",
      "scikit-learn",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Sensor Telemetry",
    ],
    image: "/images/1.jpeg",
    github: "https://github.com/Shalinihr1402",
  },
];

const Work = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "work") trigger.kill();
      });
    };
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-container">
        {/* Section Header */}
        <div className="work-header">
          <div className="work-pill">
            <span className="work-pill-dot"></span>
            <span>WHAT I'VE DONE & BUILT</span>
          </div>
          <h2 className="work-main-title">
            My <span className="work-gradient-text">Work</span>
          </h2>
          <p className="work-subtitle">
            A curated showcase of real-world AI/ML pipelines, computer vision systems,
            multilingual conversational assistants, and full-stack software applications.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="work-projects-list">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`project-card ${isEven ? "project-card-reversed" : ""}`}
              >
                {/* Information Column */}
                <div className="project-card-info">
                  <div className="project-card-header">
                    <span className="project-index-badge">{project.number}</span>
                    <div>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-category">{project.category}</p>
                    </div>
                  </div>

                  <div className="project-detail-block">
                    <span className="project-detail-label">PROBLEM</span>
                    <p className="project-detail-text">{project.problem}</p>
                  </div>

                  <div className="project-detail-block">
                    <span className="project-detail-label">SOLUTION & ARCHITECTURE</span>
                    <p className="project-detail-text">{project.solution}</p>
                  </div>

                  <div className="project-detail-block">
                    <span className="project-detail-label">TECH STACK</span>
                    <div className="project-tags-wrap">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions-row">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-github-btn"
                      data-cursor="disable"
                    >
                      <FaGithub size={16} />
                      <span>GitHub Repository</span>
                      <MdArrowOutward size={16} />
                    </a>
                  </div>
                </div>

                {/* Mockup Preview Column */}
                <div className="project-card-preview">
                  <div className="project-window-frame">
                    <div className="project-window-bar">
                      <div className="window-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <span className="window-url-badge">{project.title.toLowerCase().replace(/\s+/g, "-")}.app</span>
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-image-link"
                      data-cursor="disable"
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} Preview`}
                        className="project-mockup-img"
                        loading="lazy"
                      />
                      <div className="project-image-overlay">
                        <span className="project-overlay-pill">
                          View Code on GitHub <MdArrowOutward />
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;

import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const handleCardClick = (targetCard: HTMLDivElement) => {
      containerRef.current.forEach((card) => {
        if (!card) return;
        if (card === targetCard) {
          card.classList.add("what-content-active");
          card.classList.remove("what-sibling");
        } else {
          card.classList.remove("what-content-active");
          card.classList.add("what-sibling");
        }
      });
    };

    containerRef.current.forEach((container) => {
      if (container) {
        container.addEventListener("click", () => handleCardClick(container));
      }
    });

    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () =>
            handleCardClick(container)
          );
        }
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch what-content-active"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>AI & ML</h3>
              <h4>Description</h4>
              <p>
                I build intelligent AI systems integrating Large Language Models (Groq, OpenAI), RAG pipelines, vector search (ChromaDB), and computer vision (OpenCV, Tesseract OCR).
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">LangChain</div>
                <div className="what-tags">Groq LLM</div>
                <div className="what-tags">OpenAI API</div>
                <div className="what-tags">RAG</div>
                <div className="what-tags">ChromaDB</div>
                <div className="what-tags">scikit-learn</div>
                <div className="what-tags">OpenCV</div>
                <div className="what-tags">Tesseract OCR</div>
                <div className="what-tags">FastAPI</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>FULL STACK & DSA</h3>
              <h4>Description</h4>
              <p>
                I develop scalable full-stack web platforms using Python (FastAPI/Flask), Node.js, and React, backed by strong Data Structures & Algorithms proficiency (130+ LeetCode solved).
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">Python (DSA)</div>
                <div className="what-tags">130+ LeetCode</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">React.js</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">WebSockets</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

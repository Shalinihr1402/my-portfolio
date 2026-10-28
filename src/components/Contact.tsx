import { MdArrowOutward, MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaFilePdf, FaArrowUp } from "react-icons/fa";
import "./styles/Contact.css";

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-pill">
            <span className="contact-pill-dot"></span>
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="contact-main-title">
            Get In <span className="contact-gradient-text">Touch</span>
          </h2>
          <p className="contact-subtitle">
            Whether you are looking to hire for an AI/ML or Software Engineering role,
            collaborate on open-source projects, or discuss system architecture — feel free
            to reach out!
          </p>
        </div>

        {/* Contact Cards Grid (2 Balanced Cards: Email & Profiles) */}
        <div className="contact-cards-grid contact-cards-dual">
          {/* Email Card */}
          <div className="contact-card">
            <div className="contact-card-icon-wrap">
              <MdEmail size={24} color="#c084fc" />
            </div>
            <span className="contact-card-label">DIRECT EMAIL</span>
            <h4 className="contact-card-value">shalinidvg16@gmail.com</h4>
            <p className="contact-card-desc">
              Fastest response for engineering inquiries, role discussions, and project collaborations.
            </p>
            <a
              href="mailto:shalinidvg16@gmail.com"
              className="contact-card-action"
              data-cursor="disable"
            >
              <span>Send Email</span>
              <MdArrowOutward size={16} />
            </a>
          </div>

          {/* Profiles & Resume Card */}
          <div className="contact-card">
            <div className="contact-card-icon-wrap">
              <FaFilePdf size={22} color="#f472b6" />
            </div>
            <span className="contact-card-label">PROFILES & RESUME</span>
            <h4 className="contact-card-value">Connect & Review Credentials</h4>
            <div className="contact-card-status">
              <span className="status-indicator"></span>
              <span>Open to Immediate AI/ML & Software Roles</span>
            </div>
            <div className="contact-social-pills">
              <a
                href="https://github.com/Shalinihr1402"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                data-cursor="disable"
              >
                <FaGithub size={15} />
                <span>GitHub</span>
                <MdArrowOutward size={13} />
              </a>
              <a
                href="https://www.linkedin.com/in/shalini-h-r-90862a251"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                data-cursor="disable"
              >
                <FaLinkedin size={15} />
                <span>LinkedIn</span>
                <MdArrowOutward size={13} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="social-pill social-pill-resume"
                data-cursor="disable"
              >
                <FaFilePdf size={15} />
                <span>Download Resume</span>
                <MdArrowOutward size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer">
          <div className="footer-left">
            <span className="footer-brand">SHALINI H R</span>
            <span className="footer-dot">•</span>
            <span className="footer-role">AI/ML & Software Engineer</span>
          </div>

          <div className="footer-right">
            <span className="footer-copyright">© 2026 Shalini H R. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="back-to-top-btn"
              data-cursor="disable"
              title="Back to Top"
            >
              <FaArrowUp size={14} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';
import './Pages.css';
import useInput from '../hooks/useInput.jsx';

/**
 * Contact.js - Kontaktsidan
 * 
 * Denna komponent visar en enkel kontaktform.
 * Den använder useState för att hantera formulärdata.
 */

function ContactPage() {
  // useInput hanterar value + onChange automatiskt per fält
  const name = useInput('');
  const email = useInput('');
  const message = useInput('');

  // State för att visa bekräftelse
  const [submitted, setSubmitted] = useState(false);

  /**
   * handleChange()
   * Denna funktion körs när användaren skriver i ett inputfält
   * Den uppdaterar state med det som användaren skriver
   * — ersatt av useInput-hookens onChange per fält
   */

  /**
   * handleSubmit()
   * Denna funktion körs när användaren klickar "Skicka"
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Förhindra sida-omladdning

    // I en riktig app skulle vi skicka detta till en server här
    console.log('Formulär skickat:', { name: name.value, email: email.value, message: message.value });

    // Visa bekräftelse
    setSubmitted(true);

    // Rensa formuläret
    name.reset();
    email.reset();
    message.reset();

    // Dölj bekräftelse efter 5 sekunder
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="page-container contact-page">
      <h1>Contact us</h1>
      <p className="section-intro">We usually respond within 24 hours</p>

      <div className="contact-content">
        {/* Kontaktinformation */}
        <div className="contact-info">
          <h3>Contact information</h3>

          <div className="info-item">
            <h4>📧 Email</h4>
            <p>hello@apexcore.com</p>
          </div>

          <div className="info-item">
            <h4>📞 Phone</h4>
            <p>+44 (0) 20 1234 5678</p>
          </div>

          <div className="info-item">
            <h4>📍 Address</h4>
            <p>1 Main Street<br/>London EC1A 1BB</p>
          </div>

          <div className="info-item">
            <h4>🕐 Opening hours</h4>
            <p>Mon-Fri: 09:00 - 17:00<br/>Sat-Sun: Closed</p>
          </div>
        </div>

        {/* Kontaktformulär */}
        <div className="contact-form">
          <h3>Send a message</h3>

          {submitted ? (
            <div className="form-success">
              <p>✓ Thank you for your message! We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  value={name.value}
                  onChange={name.onChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={email.value}
                  onChange={email.onChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  value={message.value}
                  onChange={message.onChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

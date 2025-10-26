import React, { useState } from "react";
import "../styles/ContactForm.css";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    const res = await fetch("https://formspree.io/f/mldpzqjp", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="contact-wrapper">
      <p className="contact-subtitle">
        Have a question, collaboration idea, or just want to say hi?  
        Drop your message below!
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Gmail" required />
        <textarea
          name="message"
          rows="5"
          placeholder="Write your query or message..."
          required
        ></textarea>

        <button type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? "Sending..."
            : status === "success"
            ? "✅ Sent!"
            : "Send Message"}
        </button>

        {status === "error" && (
          <p className="error-text">Something went wrong. Try again later.</p>
        )}
      </form>
    </div>
  );
}

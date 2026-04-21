import useReveal from "../hooks/useReveal";
import { Link, useNavigate } from "react-router-dom";
const Contact = () => {
  useReveal();
  const navigate = useNavigate();

  return (
    <main className="px-6 md:px-12 lg:px-20">

      {/* HERO */}
      <section className="py-32 max-w-2xl reveal">
        <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Contact
        </h1>
        <p className="mt-6 text-text-secondary text-lg leading-relaxed">
          Questions, collaborations, or just saying hello —
          we’d love to hear from you.
        </p>
      </section>

      {/* CONTENT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 py-16 lg:py-24">

        {/* INFO */}
        <div className="reveal">
          <h2 className="text-lg md:text-xl font-semibold mb-8">
            Get in touch
          </h2>

          <div className="space-y-6 text-text-secondary">
            <p>
              Email
              <br />
              <span className="text-text-primary">hello@unlume.co</span>
            </p>

            <p>
              Support
              <br />
              <span className="text-text-primary">support@unlume.co</span>
            </p>

            <p>
              Location
              <br />
              <span className="text-text-primary">
                Designed in India
              </span>
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="reveal">
          <form className="flex flex-col gap-8">

            <input
              type="text"
              placeholder="Your name"
              className="border-b border-border bg-transparent py-3 outline-none text-sm"
            />

            <input
              type="email"
              placeholder="Your email"
              className="border-b border-border bg-transparent py-3 outline-none text-sm"
            />

            <textarea
              placeholder="Your message"
              rows="4"
              className="border-b border-border bg-transparent py-3 outline-none text-sm resize-none"
            />

            <button
              type="submit"
              className="self-start animated-underline text-sm"
            >
              Send message
            </button>

          </form>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="py-24 max-w-xl reveal">
        <p className="text-text-secondary text-sm">
          We usually reply within 24–48 hours.
          Thoughtful messages get thoughtful replies.
        </p>
      </section>

    </main>
  );
};

export default Contact;

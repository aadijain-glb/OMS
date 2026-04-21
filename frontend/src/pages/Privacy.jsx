
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <main className="px-6 md:px-12 lg:px-20">

      {/* HERO */}
      <section className="py-32 max-w-3xl">
        <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed">
          Your privacy matters to us.
          We collect only what’s necessary and nothing more.
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-3xl space-y-16 py-24">

        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Information we collect
          </h2>
          <p className="text-text-secondary leading-relaxed">
            When you interact with UNLUME, we may collect basic
            information such as your name, email address, shipping
            details, and payment-related data required to process orders.
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            How we use your information
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We use your information to fulfill orders, communicate
            updates, provide support, and improve our products and
            services. We never sell your personal data.
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Cookies
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Cookies help us understand how visitors use our website
            so we can improve the experience. You can disable cookies
            in your browser settings at any time.
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Data security
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We take reasonable steps to protect your information.
            While no system is 100% secure, we follow industry standards
            to safeguard your data.
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Your rights
          </h2>
          <p className="text-text-secondary leading-relaxed">
            You may request access, correction, or deletion of your
            personal data by contacting us directly.
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Contact
          </h2>
          <p className="text-text-secondary leading-relaxed">
            If you have any questions about this policy, reach us at
            <br />
            <span className="text-text-primary">privacy@unlume.co</span>
          </p>
        </div>

      </section>

      {/* FOOTER NOTE */}
      <section className="py-24 max-w-3xl">
        <p className="text-text-secondary text-sm">
          This policy may be updated from time to time.
          Last updated: 2026.
        </p>
      </section>

    </main>
  );
};

export default Privacy;

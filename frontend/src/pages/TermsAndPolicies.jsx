

import { useNavigate } from "react-router-dom";

const TermsAndPolicies = () => {
  const navigate = useNavigate();


  return (
    <main className="px-6 md:px-12 lg:px-20">

      {/* HERO */}
      <section className="py-32 max-w-3xl ">
        <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Terms & Policies
        </h1>
        <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed">
          Clear, honest, and straightforward.
        </p>
      </section>

      {/* TERMS */}
      <section className="max-w-3xl space-y-16 py-24">

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Terms & Conditions
          </h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing or using UNLUME, you agree to follow these terms.
            All content, products, and services are provided for personal
            use only. Any misuse, duplication, or resale without
            permission is prohibited.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Orders & Payments
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Prices are listed clearly and may change without notice.
            Orders are confirmed only after successful payment.
            We reserve the right to cancel or refuse any order.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Shipping & Delivery
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Delivery timelines are estimates. Delays caused by logistics,
            weather, or external factors are beyond our control.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Returns & Refunds
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Returns are accepted only for unused products in original
            condition. Refunds are processed after inspection.
            Shipping charges are non-refundable unless stated otherwise.
          </p>
        </div>

      </section>

      {/* PRIVACY */}
      <section className="max-w-3xl space-y-16 py-24">

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Privacy Policy
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We collect only necessary personal information such as
            name, email, address, and payment details to process orders
            and provide support. We never sell your data.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Cookies
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Cookies help improve website functionality and user
            experience. You can disable cookies through your browser
            settings.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Data Security
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We follow industry-standard practices to protect your data.
            However, no online platform can guarantee absolute security.
          </p>
        </div>

        <div className="">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Contact
          </h2>
          <p className="text-text-secondary leading-relaxed">
            For questions regarding terms or privacy, contact us at
            <br />
            <span className="text-text-primary">
              legal@unlume.co
            </span>
          </p>
        </div>

      </section>

      {/* FOOTER NOTE */}
      <section className="py-24 max-w-3xl ">
        <p className="text-text-secondary text-sm">
          These terms and policies may be updated periodically.
          Last updated: 2026.
        </p>
      </section>

    </main>
  );
};

export default TermsAndPolicies;

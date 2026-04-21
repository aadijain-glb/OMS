import { Link, useNavigate } from "react-router-dom";

const stories = [
  {
    title: "The Making",
    subtitle: "Why quality takes time",
    image: "/images/making.jpg",
  },
  {
    title: "Fabric First",
    subtitle: "Feel before fashion",
    image: "/images/fabric.jpg",
  },
  {
    title: "Community",
    subtitle: "Worn by real people",
    image: "/images/community.jpg",
  },
];


const Stories = () => {
  const navigate = useNavigate();
  return (
    <main className="px-6 md:px-12 lg:px-20">

      {/* HERO */}
      <section className="py-32 text-center">
        <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">STORIES</h1>
        <p className="mt-4 text-text-secondary">
          Where design meets intention.
        </p>
      </section>

      {/* EDITORIAL GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
        {stories.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-[280px] md:h-[350px] lg:h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg md:text-xl font-semibold">
                <span className="animated-underline">
                  {item.title}
                </span>
              </h3>
              <p className="mt-2 text-text-secondary">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURED STORY */}
      <section className="py-20 lg:py-40 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div>
          <p className="text-sm text-text-secondary mb-4">FEATURED</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            The Making of a Basic
          </h2>
          <p className="mt-6 text-text-secondary max-w-md">
            Why a simple tee is never simple — from fabric sourcing
            to final stitching.
          </p>

          <Link
            to="/stories/making"
            className="inline-block mt-8 animated-underline text-sm"
          >
            Read Story
          </Link>
        </div>

        <img
          src="/images/featured.jpg"
          alt="Featured story"
          className="h-[320px] md:h-[420px] lg:h-[520px] w-full object-cover"
        />
      </section>

      {/* FOUNDER NOTE */}
      <section className="py-32 max-w-3xl mx-auto text-center">
        <img
          src="/images/founder.png"
          alt="Founder"
          className="w-100 h-20 mx-auto rounded-full object-cover mb-8"
        />

        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          A Note from the Founder
        </h3>

        <p className="text-text-secondary leading-relaxed">
          UNLUME started with frustration — nothing felt honest anymore.
          So we slowed everything down. Less drops. Better fabric.
          Pieces meant to stay.
        </p>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
          Designed to be lived in.
        </h2>
        <Link to="/collections" className="animated-underline text-sm">
          Shop Collection
        </Link>
      </section>

    </main>
  );
};

export default Stories;

import { Link, useNavigate } from "react-router-dom";
import useReveal from "../hooks/useReveal";

const About = () => {
    useReveal();
    const navigate = useNavigate();
    return (
        <main className="px-6 md:px-12 lg:px-20">

            {/* HERO */}
            <section className="py-32 max-w-3xl reveal">
                <button onClick={() => navigate(-1)} className="inline-block mb-4 text-sm text-text-secondary hover:text-text-primary animated-underline bg-transparent border-none p-0 cursor-pointer">← Back</button>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                    About UNLUME
                </h1>
                <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed">
                    UNLUME exists to slow things down.
                    In a world obsessed with more, we focus on better.
                    Fewer drops, honest materials, and design that feels right.
                    Nothing extra. Only what matters.
                </p>
            </section>

            {/* IMAGE + PHILOSOPHY */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center py-16 lg:py-24">

                <img
                    src="/images/about-hero.jpg"
                    alt="Minimal workspace"
                    className="h-fit w-full md:w-[400px] object-cover reveal"
                />

                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                        Designed with intention
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-6">
                        We don’t chase trends. We don’t rush drops.
                        Every piece is designed to live longer than a season —
                        in your wardrobe and in your life.
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                        Neutral tones. Honest fabrics. Thoughtful silhouettes.
                        Nothing extra. Nothing loud.
                    </p>
                </div>
            </section>

            {/* VALUES */}
            <section className="py-32 reveal">

                <h2 className="text-2xl md:text-3xl font-extrabold mb-10 md:mb-16 text-center">
                    What we believe in
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Less, but better</h3>
                        <p className="text-text-secondary">
                            Fewer products. Higher standards. Longer lifespan.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quality first</h3>
                        <p className="text-text-secondary">
                            Fabric is felt before fashion. Always.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Timeless design</h3>
                        <p className="text-text-secondary">
                            Pieces that don’t expire with trends.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOUNDER NOTE */}
            <section className="py-32 max-w-3xl mx-auto text-center">
                <img
                    src="/images/founder.png"
                    alt="Founder"
                    className="w-100 h-20 mx-auto rounded-full object-cover mb-8"
                />
                <h3 className="text-xl md:text-2xl font-semibold mb-6">
                    A note from the founder
                </h3>

                <p className="text-text-secondary leading-relaxed">
                    UNLUME started as a personal frustration —
                    clothes that looked good but didn’t feel right.
                    This brand is my answer to that.
                </p>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                    Built to stay.
                </h2>
                <Link to="/collections" className="animated-underline text-sm">
                    Explore Collection
                </Link>
            </section>

        </main>
    );
};

export default About;

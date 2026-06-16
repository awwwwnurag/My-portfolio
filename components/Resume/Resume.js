import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS } from "../../constants";
import Button from "../Button/Button";

const Resume = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: "none" } })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.3 },
          "<"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".resume-wrapper"),
        start: "100px bottom",
        end: "center center",
        scrub: 0,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resume"
      aria-label="Resume"
      className="w-full relative select-none mt-4 sm:mt-6 mb-16 sm:mb-24"
    >
      <div className="section-container pt-4 pb-16 flex flex-col justify-center">
        <div className="flex flex-col resume-wrapper">
          <div className="flex flex-col">
            <h2 className="text-6xl font-medium text-gradient w-fit staggered-reveal">
              My Resume
            </h2>
            <p className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              The experience, skills, and achievements that define my journey so far.
            </p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center staggered-reveal">
            {/* Highlights Column */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="text-gray-light-3 text-base sm:text-lg leading-relaxed max-w-xl">
                Ready to review the complete professional summary, technical expertise, and detailed experience records? Grab a copy of my resume using the direct access options below.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  type="primary"
                  classes="link py-3 px-8 text-sm font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple/20"
                >
                  View PDF
                </Button>
                <Button
                  href="/resume.pdf"
                  download="Anurag_Aryan_Resume.pdf"
                  type="secondary"
                  classes="link py-3 px-8 text-sm font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple/20"
                >
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Visual Document Mockup Column */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-[280px] aspect-[1/1.414] rounded-2xl border border-white/10 bg-gray-dark-3/60 p-5 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-purple/30 hover:shadow-purple/10">

                {/* Background glow behind paper */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple/5 via-transparent to-[#00f5d4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Document Header lines representation */}
                <div className="w-fit px-3 py-1 rounded bg-purple/40 mb-3 flex items-center justify-center">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-white select-none leading-none">
                    Anurag Aryan
                  </span>
                </div>
                <div className="w-1/3 h-2 rounded bg-white/20 mb-8" />

                {/* Document Sections representation */}
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="w-1/4 h-2.5 rounded bg-white/30 mb-2" />
                    <div className="w-full h-1.5 rounded bg-white/15 mb-1.5" />
                    <div className="w-5/6 h-1.5 rounded bg-white/15" />
                  </div>
                  <div>
                    <div className="w-1/3 h-2.5 rounded bg-white/30 mb-2" />
                    <div className="w-full h-1.5 rounded bg-white/15 mb-1.5" />
                    <div className="w-4/5 h-1.5 rounded bg-white/15 mb-1.5" />
                    <div className="w-3/4 h-1.5 rounded bg-white/15" />
                  </div>
                  <div>
                    <div className="w-1/4 h-2.5 rounded bg-white/30 mb-2" />
                    <div className="w-full h-1.5 rounded bg-white/15 mb-1.5" />
                    <div className="w-5/6 h-1.5 rounded bg-white/15" />
                  </div>
                </div>

                {/* Holographic badge mockup */}
                <div className="absolute right-5 bottom-5 w-8 h-8 rounded-full bg-gradient-to-tr from-purple to-[#00f5d4] opacity-30 group-hover:opacity-75 transition-opacity duration-300 blur-sm" />
                <div className="absolute right-6 bottom-6 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center bg-black/40 text-[8px] text-white select-none">
                  CV
                </div>

                {/* Overlap interactive action cover on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 items-center justify-center pointer-events-none">
                  <span className="text-3xl animate-bounce">📄</span>
                  <span className="text-white text-xs font-mono tracking-wider font-semibold">CLICK TO VIEW RESUME</span>
                </div>

                {/* View link wrapper surrounding the entire card */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label="View Resume PDF"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;

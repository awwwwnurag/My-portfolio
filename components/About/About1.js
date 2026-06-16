import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS } from "../../constants";

const About1 = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          defaults: { ease: "none", duration: 0.1 },
        })
        .fromTo(
          quoteRef.current.querySelector(".sentence-1"),
          { opacity: 0.2, textShadow: "0 0 0px rgba(255,255,255,0)" },
          { opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)" }
        )
        .to(quoteRef.current.querySelector(".sentence-1"), {
          opacity: 0.2,
          textShadow: "0 0 0px rgba(255,255,255,0)",
          delay: 0.5,
        })
        .fromTo(
          quoteRef.current.querySelector(".sentence-2"),
          { opacity: 0.2, textShadow: "0 0 0px rgba(255,255,255,0)" },
          { opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)" },
          "<"
        )
        .to(quoteRef.current.querySelector(".sentence-2"), {
          opacity: 0.2,
          textShadow: "0 0 0px rgba(255,255,255,0)",
          delay: 0.5,
        })
        .fromTo(
          quoteRef.current.querySelector(".sentence-3"),
          { opacity: 0.2, textShadow: "0 0 0px rgba(255,255,255,0)" },
          { opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)" },
          "<"
        )
        .to(quoteRef.current.querySelector(".sentence-3"), {
          opacity: 0.2,
          textShadow: "0 0 0px rgba(255,255,255,0)",
          delay: 0.5,
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        end: "bottom 35%",
        scrub: 0.5,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Me"
      className="w-full relative select-none mt-16 sm:mt-24 mb-16 sm:mb-24"
    >
      <div className="section-container py-16 flex flex-col justify-center">
        <div className="flex flex-col about-wrapper">
          <div className="flex flex-col">
            <h2 className="text-6xl font-medium text-gradient w-fit staggered-reveal">
              About Me
            </h2>
            <p className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              A brief intro to who I am and what I do.
            </p>
          </div>

          <div className="mt-16 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Story Paragraphs */}
            <div
              ref={quoteRef}
              className="md:col-span-7 flex flex-col gap-6 text-gray-light-3 text-lg sm:text-xl leading-relaxed font-semibold"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              <p>
                <span className="sentence-1 block mb-4 transition-all duration-300">
                  I am a Full Stack Developer, aspiring Software Engineer, and AI enthusiast passionate about building practical digital solutions that blend functionality, usability, and intelligent experiences.
                </span>
                <span className="sentence-2 block mb-4 transition-all duration-300">
                  My approach combines modern web technologies with problem-solving to create applications that are both impactful and user-focused.
                </span>
                <span className="sentence-3 block transition-all duration-300">
                  I enjoy transforming ideas into scalable digital products while continuously learning emerging technologies and building meaningful real-world solutions.
                </span>
              </p>
            </div>

            {/* Quick Details Grid */}
            <div className="md:col-span-5 w-full flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white tracking-wide border-b border-white/10 pb-3 mb-2">
                Quick Details
              </h3>

              <div className="grid grid-cols-6 gap-3 w-full max-w-md mx-auto md:max-w-none">
                {/* Experience */}
                <div className="col-span-2 p-4 rounded-xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-[#ff7675]/40 hover:shadow-[0_0_20px_rgba(255,118,117,0.15)] flex flex-col items-center justify-center text-center min-h-[110px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ff7675]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-4xl font-extrabold text-[#ff7675] tracking-tight transition-transform duration-300 group-hover:scale-110">3+</span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-light-4 mt-2">Years Exp</span>
                </div>

                {/* Projects */}
                <div className="col-span-2 p-4 rounded-xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-[#1dd1a1]/40 hover:shadow-[0_0_20px_rgba(29,209,161,0.15)] flex flex-col items-center justify-center text-center min-h-[110px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1dd1a1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-4xl font-extrabold text-[#1dd1a1] tracking-tight transition-transform duration-300 group-hover:scale-110">8+</span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-light-4 mt-2">Projects</span>
                </div>

                {/* Tech Stack */}
                <div className="col-span-2 p-4 rounded-xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-[#54a0ff]/40 hover:shadow-[0_0_20px_rgba(84,160,255,0.15)] flex flex-col items-center justify-center text-center min-h-[110px]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#54a0ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-4xl font-extrabold text-[#54a0ff] tracking-tight transition-transform duration-300 group-hover:scale-110">11+</span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-gray-light-4 mt-2">Tech Stack</span>
                </div>

                {/* Current Location */}
                <div className="col-span-6 p-4 rounded-xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-[#00f5d4]/40 hover:shadow-[0_0_20px_rgba(0,245,212,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00f5d4]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f5d4] block">Location</span>
                  <span className="text-sm font-semibold text-white mt-1 block">Greater Noida, India 📍</span>
                </div>

                {/* Education */}
                <div className="col-span-6 p-4 rounded-xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-[#9f55ff]/40 hover:shadow-[0_0_20px_rgba(159,85,255,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#9f55ff]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9f55ff] block">Education</span>
                  <span className="text-sm font-semibold text-white mt-1 block">B.Tech in CSE at Sharda University 🎓</span>
                </div>

                {/* Interests */}
                <div className="col-span-6 p-4 rounded-xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-[#ff9f43]/40 hover:shadow-[0_0_20px_rgba(255,159,67,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ff9f43]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff9f43] block">Interests</span>
                  <span className="text-sm font-semibold text-white mt-1 block">Web Dev, Artificial Intelligence, MERN Stack 🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About1;

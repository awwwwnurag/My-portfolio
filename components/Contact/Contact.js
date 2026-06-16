import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS } from "../../constants";

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.from(
      sectionRef.current.querySelectorAll(".staggered-reveal"),
      { opacity: 0, duration: 0.5, stagger: 0.5 },
      "<",
    );

    const st = ScrollTrigger.create({
      trigger: sectionRef.current.querySelector(".contact-wrapper"),
      start: "100px bottom",
      end: "center center",
      scrub: 0,
      animation: tl,
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[5].ref}
      aria-label="Contact"
      className="mt-6 sm:mt-8 w-full relative select-none bg-transparent pt-4 pb-8"
    >
      <div className="section-container py-16 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center text-center max-w-2xl w-full contact-wrapper">
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-5xl md:text-6xl font-medium text-gradient w-fit staggered-reveal">
              Let&rsquo;s Connect
            </h2>
            <p className="text-[1.4rem] md:text-[1.65rem] font-medium text-gray-light-2 mt-4 leading-tight staggered-reveal">
              Have an exciting project, a job opportunity, or just want to chat about AI & Web Dev? Let&rsquo;s make it happen.
            </p>

            <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-gray-dark-3/40 backdrop-blur-md relative overflow-hidden transition-all duration-300 group hover:border-purple/30 hover:shadow-purple/5 w-full max-w-md text-left staggered-reveal">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Availability Status */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5d4]"></span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f5d4] font-bold">
                  Open to Opportunities
                </span>
              </div>

              <p className="text-gray-light-3 text-sm leading-relaxed mb-6 font-medium">
                I am currently seeking full-stack engineering roles, internship opportunities, or collaborative open-source projects. Feel free to reach out!
              </p>

              {/* Quick Links */}
              <div className="flex flex-col gap-3 font-mono text-xs text-gray-light-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-purple font-bold">EMAIL:</span>
                  <a
                    href="mailto:anuragaryannn@gmail.com"
                    className="text-white hover:text-purple transition-colors duration-200"
                  >
                    anuragaryannn@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00f5d4] font-bold">GITHUB:</span>
                  <a
                    href="https://github.com/awwwwnurag"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-[#00f5d4] transition-colors duration-200"
                  >
                    awwwwnurag
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, WORK_CONTENTS } from "../../constants";

const Work = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: "none" } })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector(".work-wrapper"),
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
      id={MENULINKS[3].ref}
      aria-label="Work Experience"
      className="w-full relative select-none xs:mt-40 sm:mt-72 mb-96"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/left-pattern.svg"
        className="absolute hidden left-0 -top-1/4 w-1/12 max-w-xs md:block"
        loading="lazy"
        height={700}
        width={320}
        alt="left pattern"
      />
      <div className="section-container py-16 flex flex-col justify-center">
        <div className="flex flex-col work-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
              WORK
            </p>
            <h2 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
              Experience
            </h2>
            <p className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              A quick recap of my professional background.{" "}
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto w-full flex flex-col gap-12 relative pl-8 border-l border-gray-dark-1">
            {WORK_CONTENTS.map((exp, index) => (
              <div key={exp.company + index} className="relative staggered-reveal flex flex-col gap-2">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-3.5 w-6 h-6 rounded-full bg-black border-2 border-purple flex items-center justify-center z-10 shadow-md">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple" />
                </div>
                
                {/* Content Card */}
                <div className="p-6 rounded-2xl bg-gray-dark-3 border border-gray-dark-1 hover:border-purple transition-all duration-300 shadow-sm hover:shadow-purple/10 cursor-default">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{exp.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-wide">{exp.title}</h3>
                        <p className="text-sm text-purple font-semibold">{exp.company}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-gray-light-3 px-3.5 py-1 rounded-full bg-gray-dark-2">
                      {exp.date}
                    </span>
                  </div>
                  
                  <p className="mt-4 text-gray-light-3 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                  
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] md:text-xs px-2.5 py-1 rounded bg-gray-dark-2 text-gray-light-2 border border-gray-dark-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;

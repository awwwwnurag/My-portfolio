import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, WORK_CONTENTS } from "../../constants";

const Work = () => {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressDotRef = useRef(null);
  const progressContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal items
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

      // moncy.dev scroll-triggered progress line animation
      const progressTimeline = gsap.timeline({ defaults: { ease: "none" } });
      progressTimeline
        .to(progressBarRef.current, { height: "100%" })
        .to(progressDotRef.current, { top: "100%" }, "<");

      ScrollTrigger.create({
        trigger: progressContainerRef.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.5,
        animation: progressTimeline,
      });

      // Scroll-triggered timeline dot activation (glowing when crossed)
      sectionRef.current.querySelectorAll(".work-item").forEach((item) => {
        const dot = item.querySelector(".timeline-dot");
        const innerDot = item.querySelector(".timeline-inner-dot");
        
        const dotTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: dot,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              dot.classList.add("timeline-dot-glow");
            },
            onLeaveBack: () => {
              dot.classList.remove("timeline-dot-glow");
            }
          }
        });

        dotTimeline
          .to(dot, {
            borderColor: "#8b31ff",
            backgroundColor: "#000000",
            duration: 0.25,
          })
          .to(innerDot, {
            scale: 1,
            opacity: 1,
            backgroundColor: "#8b31ff",
            duration: 0.25,
          }, "<");
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[3].ref}
      aria-label="Work Experience"
      className="w-full relative select-none mt-16 sm:mt-24 mb-4 sm:mb-6"
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
      <div className="section-container pt-16 pb-4 flex flex-col justify-center">
        <div className="flex flex-col work-wrapper">
          <div className="flex flex-col">
            <h2 className="text-6xl font-medium text-gradient w-fit staggered-reveal">
              Experience
            </h2>
            <p className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal">
              A quick recap of my professional background.{" "}
            </p>
          </div>

          <div 
            ref={progressContainerRef}
            className="mt-16 max-w-3xl mx-auto w-full flex flex-col gap-12 relative pl-8"
          >
            {/* Custom Interactive Progress Line (moncy.dev effect) */}
            <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-gray-dark-1/40 pointer-events-none">
              {/* Progress Fill Line */}
              <div 
                ref={progressBarRef}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple to-[#00f5d4] origin-top"
                style={{ height: "0%" }}
              />
              {/* Glowing Circle Bead at the tip */}
              <div 
                ref={progressDotRef}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple border-2 border-white shadow-[0_0_12px_#9f55ff,0_0_25px_#8b31ff] pointer-events-none z-20"
                style={{ top: "0%", transform: "translate(-50%, -50%)" }}
              />
            </div>

            {WORK_CONTENTS.map((exp, index) => (
              <div key={exp.company + index} className="work-item relative staggered-reveal flex flex-col gap-2">
                {/* Timeline Dot */}
                <div className="timeline-dot absolute -left-[41px] top-3.5 w-6 h-6 rounded-full bg-gray-dark-3 border-2 border-white/10 flex items-center justify-center z-10 shadow-md">
                  <div className="timeline-inner-dot w-2.5 h-2.5 rounded-full bg-white/10 scale-0 origin-center" />
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
                  
                  <p className="mt-4 text-gray-light-3 leading-relaxed text-sm md:text-base whitespace-pre-line">
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

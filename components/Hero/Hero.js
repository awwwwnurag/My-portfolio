import { useEffect, useRef, useLayoutEffect } from "react";
import Typed from "typed.js";
import gsap from "gsap";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import styles from "./Hero.module.scss";
import { MENULINKS, TYPED_STRINGS, METADATA } from "../../constants";

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 50,
  startDelay: 1500,
  backSpeed: 50,
  backDelay: 8000,
  loop: true,
};

const Hero = () => {
  const [firstName, lastName] = METADATA.author.split(" ");
  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "none" } })
        .to(sectionRef.current, { opacity: 1, duration: 2 })
        .from(
          sectionRef.current.querySelectorAll(".staggered-reveal"),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          "<"
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);

    return () => typed.destroy();
  }, [typedElementRef]);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      aria-label="Introduction"
      className="w-full flex md:items-center py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 min-h-screen relative mb-24"
      style={{ opacity: 0 }}
    >
      <style jsx global>
        {`
          .typed-cursor {
            font-size: 2rem;
          }

          /* Drop-in animation for container */
          @keyframes lanyardDrop {
            from {
              transform: translateY(-400px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          /* Continuous gentle swinging pendulum animation */
          @keyframes swing {
            0% { transform: rotate3d(0, 0, 1, -4.5deg); }
            50% { transform: rotate3d(0, 0, 1, 4.5deg); }
            100% { transform: rotate3d(0, 0, 1, -4.5deg); }
          }

          .card-container {
            perspective: 1500px;
            animation: lanyardDrop 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          }

          .card-swing-wrapper {
            transform-origin: top center;
            animation: swing 5.5s ease-in-out infinite;
            z-index: 10;
            position: relative;
          }

          .id-card {
            width: 290px;
            height: 420px;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            z-index: 10;
          }

          /* Trigger card flip on hover */
          .id-card:hover {
            transform: rotateY(180deg);
          }

          .card-front,
          .card-back {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(18, 14, 22, 0.82);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }

          .card-back {
            transform: rotateY(180deg);
          }

          /* Lanyard twisting state transitions */
          .lanyard-twisted {
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .lanyard-untwisted {
            opacity: 1;
            transition: opacity 0.4s ease;
          }

          /* Twist the lanyard when card is hovered */
          .id-card:hover ~ svg .lanyard-twisted {
            opacity: 1;
          }

          .id-card:hover ~ svg .lanyard-untwisted {
            opacity: 0;
          }
        `}
      </style>
      <div className="flex flex-col pt-40 md:pt-0 select-none">
        <h5
          className={`${styles.intro} font-mono font-medium text-indigo-light staggered-reveal`}
        >
          Hi, my name is
        </h5>
        <h1 className={`${styles.heroName} text-white text-6xl font-semibold`}>
          <span className={`relative ${styles.emphasize} staggered-reveal`}>
            {firstName}
          </span>
          <span className="staggered-reveal"> {lastName}</span>
        </h1>
        <p>
          <span
            ref={typedElementRef}
            className="staggered-reveal text-3xl text-gray-light-3 font-mono leading-relaxed"
          />
        </p>
        <div className="staggered-reveal">
          <Profiles />
        </div>
        <div className="staggered-reveal pt-4">
          <Button href={`#${MENULINKS[4].ref}`} classes="link" type="primary">
            Let&apos;s Talk
          </Button>
        </div>
      </div>

      {/* Interactive ID Card Hanger & swing illustration on the right */}
      <div className="absolute invisible lg:visible lg:right-12 xl:right-24 2xl:right-32 top-1/2 -translate-y-1/2 select-none z-10 card-container">
        {/* Card Hanger and Holder Card Swing Wrap */}
        <div className="card-swing-wrapper">
          {/* ID Card 3D container */}
          <div className="id-card">
            {/* Front Side */}
            <div className="card-front flex flex-col items-center p-6 justify-between">
              {/* Strap Cutout Hole */}
              <div className="w-10 h-3 rounded-full bg-black/60 border border-white/10 mt-1 mb-3" />
              
              {/* Header */}
              <div className="text-center">
                <span className="font-mono text-[10px] tracking-wider text-purple font-bold">SHARDA UNIVERSITY</span>
                <h4 className="text-[12px] font-sans font-extrabold tracking-widest text-white/90 leading-none">DEPT OF CSE</h4>
              </div>

              {/* Profile image */}
              <div className="relative w-32 h-32 rounded-2xl border-2 border-purple/40 overflow-hidden mt-3 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/anurag_avatar.png" alt="Anurag Aryan" className="w-full h-full object-cover" />
              </div>

              {/* Personal Details */}
              <div className="text-center mt-3 flex-1 flex flex-col justify-center">
                <h2 className="text-xl font-bold tracking-wide text-white leading-tight">ANURAG ARYAN</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#00f5d4] mt-1 inline-block">FULL STACK DEVELOPER</span>
                <p className="font-mono text-[9px] text-gray-light-3 mt-1.5">ID: 2023328197</p>
              </div>

              {/* Barcode SVG */}
              <svg width="130" height="24" viewBox="0 0 120 24" className="mx-auto mt-2 opacity-80">
                <rect x="0" y="0" width="4" height="24" fill="white" />
                <rect x="6" y="0" width="2" height="24" fill="white" />
                <rect x="10" y="0" width="6" height="24" fill="white" />
                <rect x="18" y="0" width="2" height="24" fill="white" />
                <rect x="22" y="0" width="4" height="24" fill="white" />
                <rect x="28" y="0" width="8" height="24" fill="white" />
                <rect x="38" y="0" width="2" height="24" fill="white" />
                <rect x="42" y="0" width="4" height="24" fill="white" />
                <rect x="48" y="0" width="2" height="24" fill="white" />
                <rect x="52" y="0" width="6" height="24" fill="white" />
                <rect x="60" y="0" width="4" height="24" fill="white" />
                <rect x="66" y="0" width="8" height="24" fill="white" />
                <rect x="76" y="0" width="2" height="24" fill="white" />
                <rect x="80" y="0" width="4" height="24" fill="white" />
                <rect x="86" y="0" width="2" height="24" fill="white" />
                <rect x="90" y="0" width="6" height="24" fill="white" />
                <rect x="98" y="0" width="4" height="24" fill="white" />
                <rect x="104" y="0" width="8" height="24" fill="white" />
                <rect x="114" y="0" width="2" height="24" fill="white" />
              </svg>
            </div>

            {/* Back Side */}
            <div className="card-back flex flex-col p-6 justify-between">
              {/* Strap Cutout Hole */}
              <div className="w-10 h-3 rounded-full bg-black/60 border border-white/10 mt-1 mb-2 mx-auto" />
              
              <div className="flex flex-col gap-4 mt-2 flex-1 justify-center">
                {/* Tech Specialization */}
                <div>
                  <h4 className="font-sans text-[10px] tracking-wider text-[#00f5d4] font-extrabold uppercase border-b border-white/10 pb-1">
                    Tech Specialization
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["ReactJS", "NodeJS", "TailwindCSS", "Python", "Java", "SQL"].map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-light-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects Made */}
                <div>
                  <h4 className="font-sans text-[10px] tracking-wider text-purple font-extrabold uppercase border-b border-white/10 pb-1">
                    Featured Projects
                  </h4>
                  <ul className="flex flex-col gap-1.5 mt-2">
                    <li className="flex flex-col">
                      <span className="font-sans text-[11px] font-bold text-white leading-tight">Campus Crave</span>
                      <span className="font-mono text-[9px] text-gray-light-3 leading-none">Smart Food Ordering (YOLOv8)</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-sans text-[11px] font-bold text-white leading-tight">Expense Tracker</span>
                      <span className="font-mono text-[9px] text-gray-light-3 leading-none">Data Visualization (Chart.js)</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-sans text-[11px] font-bold text-white leading-tight">Sky Buddy</span>
                      <span className="font-mono text-[9px] text-gray-light-3 leading-none">Weather Forecasting App</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hologram authentication circle & access footer */}
              <div className="relative mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8px] text-gray-light-4 block uppercase leading-none">Developer ID</span>
                  <span className="font-mono text-[10px] text-green font-bold block uppercase leading-none mt-1">Access Granted</span>
                </div>
                {/* Hologram badge */}
                <div className="w-12 h-12 rounded-full opacity-80"
                     style={{
                       background: "radial-gradient(circle, #00f5d4 0%, #8b31ff 50%, #7000ff 100%)",
                       filter: "hue-rotate(30deg) brightness(1.1)",
                       boxShadow: "0 0 10px rgba(0,245,212,0.3)"
                     }} />
              </div>
            </div>
          </div>

          {/* Lanyard Strap SVG - Placed below id-card in markup for sibling selectors */}
          <svg width="80" height="240" viewBox="0 0 80 240" fill="none" className="absolute left-1/2 -translate-x-1/2 -top-[210px] z-0 pointer-events-none">
            {/* Lanyard Cord - UNTWISTED State */}
            <path className="lanyard-untwisted" d="M15 0 C 15 160, 35 190, 40 215" stroke="#8b31ff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
            <path className="lanyard-untwisted" d="M65 0 C 65 160, 45 190, 40 215" stroke="#8b31ff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
            <path className="lanyard-untwisted" d="M15 0 C 15 160, 35 190, 40 215" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
            <path className="lanyard-untwisted" d="M65 0 C 65 160, 45 190, 40 215" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />

            {/* Lanyard Cord - TWISTED State (paths cross in the middle) */}
            <path className="lanyard-twisted" d="M15 0 C 15 110, 55 130, 40 215" stroke="#8b31ff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
            <path className="lanyard-twisted" d="M65 0 C 65 110, 25 130, 40 215" stroke="#8b31ff" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8" />
            <path className="lanyard-twisted" d="M15 0 C 15 110, 55 130, 40 215" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
            <path className="lanyard-twisted" d="M65 0 C 65 110, 25 130, 40 215" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />

            {/* Metal Ring & Strap Clip */}
            <circle cx="40" cy="215" r="8" fill="#555555" stroke="#999" strokeWidth="2" />
            <rect x="36" y="217" width="8" height="15" fill="#444" rx="1" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;

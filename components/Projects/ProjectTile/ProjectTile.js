import { useEffect, useRef } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import styles from "./ProjectTile.module.scss";
import { PROJECT_IMAGES } from "../images";

const tiltOptions = {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
  gyroscope: false,
};

const ProjectTile = ({ project, classes, isDesktop }) => {
  const projectCard = useRef(null);

  const { name, imageKey, description, gradient, url, github, tech } = project;

  const image = PROJECT_IMAGES[imageKey];

  let additionalClasses = "";
  if (classes) {
    additionalClasses = classes;
  }

  useEffect(() => {
    const node = projectCard.current;
    VanillaTilt.init(node, tiltOptions);
    return () => node?.vanillaTilt?.destroy();
  }, []);

  return (
    <div
      className={`flex flex-col snap-start ${additionalClasses}`}
      style={{
        maxWidth: isDesktop ? "calc(100vw - 2rem)" : "calc(100vw - 4rem)",
        flex: "1 0 auto",
      }}
    >
      <a
        href={url || undefined}
        className="link overflow-hidden rounded-3xl"
        target="_blank"
        rel="noreferrer"
        style={{
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
      >
        <div
          ref={projectCard}
          className={`${styles.projectTile} rounded-3xl relative p-6 flex flex-col justify-between max-w-full`}
          style={{
            background: `linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          }}
        >
          <Image
            src="/project-bg.svg"
            alt=""
            className="absolute w-full h-full top-0 left-0 opacity-20 rounded-3xl"
            fill
          />
          <Image
            src={image}
            alt={name}
            placeholder="blur"
            fill
            className={styles.projectImage}
          />
          {!isDesktop && (
            <div
              className="absolute bottom-0 left-0 w-full h-20"
              style={{
                background: `linear-gradient(0deg, ${gradient[0]} 10%, rgba(0,0,0,0) 100%)`,
              }}
            />
          )}
          <h3
            className="font-medium text-2xl sm:text-3xl z-10 pl-2 pt-2 transform-gpu"
            style={{ transform: "translateZ(3rem)" }}
          >
            {name}
          </h3>
          <div
            className={`
              ${styles.techIcons} w-1/2 h-full absolute left-24 top-0 sm:flex items-center hidden
            `}
          >
            <div className="flex flex-col pb-8">
              {tech.map((el, i) => (
                <Image
                  className={`${i % 2 === 0 && "ml-16"} mb-4`}
                  src={`/projects/tech/${el}.svg`}
                  alt={el}
                  height={45}
                  width={45}
                  key={el}
                />
              ))}
            </div>
          </div>
          <p
            className="text-lg z-10 tracking-wide font-medium text-white transform-gpu"
            style={{ transform: "translateZ(0.8rem)" }}
          >
            {description}
          </p>
        </div>
      </a>

      <div className="flex gap-6 mt-4 pl-2 font-mono text-sm uppercase tracking-wider">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="link flex items-center gap-1.5 font-bold text-purple hover:underline"
        >
          Visit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="link flex items-center gap-1.5 font-bold text-gray-light-3 hover:text-white transition-colors duration-200"
        >
          Github
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectTile;

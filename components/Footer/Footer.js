import { useState } from "react";
import { useSfx } from "utils/use-sfx";
import Button from "../Button/Button";
import Profiles from "../Profiles/Profiles";
import { MENULINKS } from "../../constants";

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [btnText, setBtnText] = useState("Email Me");
  const sfx = useSfx();

  const handleClick = () => {
    const newRate = playbackRate + 0.1;
    sfx.play("heart", { rate: newRate });
    setPlaybackRate(newRate);
  };

  return (
    <footer
      id={MENULINKS[5].ref}
      className="w-full relative select-none bg-transparent pt-12 pb-10"
    >
      <div className="w-full h-full">
        <div className="section-container flex flex-col h-full justify-end z-10 items-center contact-wrapper">
          
          <h2 className="text-5xl md:text-6xl font-medium text-gradient w-fit">
            Let&rsquo;s Connect
          </h2>

          <p className="font-medium text-xl md:text-2xl text-center max-w-3xl leading-relaxed text-gray-light-2 mt-4">
            Have an exciting project, a job opportunity, or just want
            <br />
            to chat about AI &amp; Web Dev?
          </p>

          <p className="font-semibold text-2xl md:text-3xl text-center max-w-3xl leading-relaxed text-white mt-6">
            Let&rsquo;s connect and build something meaningful together.
          </p>
          <p className="font-semibold text-2xl md:text-3xl text-center max-w-3xl leading-relaxed text-white mt-2">
            Feel free to reach out or connect with me on social media.
          </p>

          <div className="mt-8 text-center">
            <Profiles exclude={["mail"]} />
          </div>

          <div className="pt-3 text-center">
            <Button
              href="mailto:anuragaryannn@gmail.com"
              onMouseEnter={() => setBtnText("anuragaryannn@gmail.com")}
              onMouseLeave={() => setBtnText("Email Me")}
              classes="link py-3 px-8 text-sm sm:text-base font-semibold tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple/20 whitespace-nowrap"
              type="secondary"
            >
              {btnText}
            </Button>
          </div>

          <p className="text-center text-white text-sm sm:text-base font-medium tracking-wide mt-6">
            Developed with{" "}
            <button onClick={handleClick} className="link cursor-none">
              <span className="block animate-bounce">🤍</span>
            </button>
          </p>

          <p className="text-center text-gray-light-4 text-xs font-mono tracking-wider mt-2">
            &copy; 2026 Anurag Aryan. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

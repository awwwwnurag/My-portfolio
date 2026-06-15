import { useEffect, useRef } from "react";

const Background = ({
  className = "",
  quantity = 60,
  staticity = 50,
  ease = 50,
  refresh = false,
  maxDpr = 2,
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const contextRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const animationFrameIdRef = useRef(0);
  
  // Calculate device pixel ratio safely
  const getDpr = () => {
    return typeof window !== "undefined" ? Math.min(window.devicePixelRatio, maxDpr) : 1;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener("resize", initCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const initCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && contextRef.current) {
      particlesRef.current.length = 0;
      const w = canvasContainerRef.current.offsetWidth;
      const h = canvasContainerRef.current.offsetHeight;
      const dpr = getDpr();
      
      canvasSizeRef.current = { w, h };
      canvasRef.current.width = w * dpr;
      canvasRef.current.height = h * dpr;
      canvasRef.current.style.width = `${w}px`;
      canvasRef.current.style.height = `${h}px`;
      
      contextRef.current.scale(dpr, dpr);
      createParticles();
    }
  };

  const createParticles = () => {
    for (let i = 0; i < quantity; i++) {
      particlesRef.current.push(generateParticle());
    }
  };

  const generateParticle = () => {
    const w = canvasSizeRef.current.w || window.innerWidth;
    const h = canvasSizeRef.current.h || window.innerHeight;
    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);
    const size = Math.random() * 1.8 + 0.3; // size between 0.3px and 2.1px
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.25;
    const dy = (Math.random() - 0.5) * 0.25;
    const magnetism = 0.1 + 4 * Math.random();
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawParticle = (p, isUpdating = false) => {
    if (contextRef.current) {
      const dpr = getDpr();
      const { x, y, translateX, translateY, size, alpha } = p;
      contextRef.current.translate(translateX, translateY);
      contextRef.current.beginPath();
      contextRef.current.arc(x, y, size, 0, 2 * Math.PI);
      contextRef.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      contextRef.current.fill();
      contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!isUpdating) {
        particlesRef.current.push(p);
      }
    }
  };

  const clearCanvas = () => {
    if (contextRef.current) {
      contextRef.current.clearRect(0, 0, canvasSizeRef.current.w, canvasSizeRef.current.h);
    }
  };

  const animate = () => {
    clearCanvas();
    const mouseXFromCenter = mouseRef.current.x - window.innerWidth / 2;
    const mouseYFromCenter = mouseRef.current.y - window.innerHeight / 2;

    particlesRef.current.forEach((p, index) => {
      // Fade near edges
      const edgeDistance = [
        p.x + p.translateX - p.size,
        canvasSizeRef.current.w - p.x - p.translateX - p.size,
        p.y + p.translateY - p.size,
        canvasSizeRef.current.h - p.y - p.translateY - p.size,
      ].reduce((min, val) => Math.min(min, val), Number.MAX_VALUE);

      const fadeRatio = edgeDistance > 0 ? edgeDistance / 20 : 0;
      if (fadeRatio > 1) {
        if (p.alpha < p.targetAlpha) {
          p.alpha += 0.02;
        } else {
          p.alpha = p.targetAlpha;
        }
      } else {
        p.alpha = p.targetAlpha * fadeRatio;
      }

      // Update positions
      p.x += p.dx;
      p.y += p.dy;

      // Update translations
      p.translateX += (mouseXFromCenter / (staticity / p.magnetism) - p.translateX) / ease;
      p.translateY += (mouseYFromCenter / (staticity / p.magnetism) - p.translateY) / ease;

      // Reset offscreen particles
      if (
        p.x < -p.size ||
        p.x > canvasSizeRef.current.w + p.size ||
        p.y < -p.size ||
        p.y > canvasSizeRef.current.h + p.size
      ) {
        particlesRef.current.splice(index, 1);
        drawParticle(generateParticle());
      } else {
        drawParticle(
          {
            ...p,
            x: p.x,
            y: p.y,
            translateX: p.translateX,
            translateY: p.translateY,
            alpha: p.alpha,
          },
          true
        );
      }
    });

    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  return (
    <div
      className={`${className} fixed inset-0 -z-10 bg-gradient-to-tl from-[#030712] via-[#52525b]/10 to-[#030712] w-screen h-screen overflow-hidden`}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Background;

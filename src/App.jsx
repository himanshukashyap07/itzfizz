import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loder';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const App = () => {
  const container = useRef(null);
  const carRef = useRef(null);
  const textRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    if (loading) return;

    const isMobile = window.innerWidth < 640;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: isMobile ? "+=140%" : "+=200%",
        scrub: isMobile ? 0.6 : 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });

    tl.to(carRef.current, { x: isMobile ? "120vw" : "110vw", ease: "none" }, 0);
    tl.to(textRef.current, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
    tl.to(container.current, { backgroundColor: "#1e293b", duration: 0.5 }, 0); // dark slate instead of pure black

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: container, dependencies: [loading] });

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div
          ref={container}
          className="relative overflow-hidden h-screen w-full bg-[#334155]" // slate gray base
        >
          <div className="relative h-full w-full flex flex-col items-center justify-center px-4 sm:px-8">

            {/* Text Reveal */}
            <div
              ref={textRef}
              className="w-full text-center whitespace-nowrap z-10"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            >
              <h1 className="text-blue-400 text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-extrabold tracking-tight leading-none drop-shadow-lg">
                WELCOME ITZ FIZZ
              </h1>
            </div>

            {/* Car */}
            <div
              ref={carRef}
              className="absolute w-56 sm:w-72 md:w-96 lg:w-md z-20 pointer-events-none will-change-transform"
              style={{ left: '-10%' }}
            >
              <img
                src="https://pngimg.com/d/porsche_PNG10624.png"
                alt="Racing Car"
                className="w-full h-auto drop-shadow-[0_15px_60px_rgba(255,255,255,0.3)]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 sm:bottom-10 w-full flex flex-col sm:flex-row justify-between items-center gap-2 px-4 sm:px-10 text-gray-200 font-mono text-xs sm:text-sm tracking-widest uppercase">
            <p className="animate-pulse">Scroll to Explore</p>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
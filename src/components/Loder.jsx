import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const textRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete,
        });

        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
            .to(barRef.current, {
                width: "100%",
                duration: 1.2,
                ease: "power2.out",
            })
            .to(loaderRef.current, {
                y: "-100%",
                duration: 1,
                ease: "power4.inOut",
                delay: 0.2,
            });

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center"
        >
            <h1
                ref={textRef}
                className="text-blue-300 text-5xl md:text-7xl font-black tracking-tight"
            >
                WELCOME ITZ FIZZ
            </h1>

            <div className="mt-6 w-64 h-1 bg-zinc-800 overflow-hidden">
                <div ref={barRef} className="h-full w-0 bg-blue-400" />
            </div>
        </div>
    );
};

export default Loader;
import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
import Head from "next/head";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Gsap = () => {
  const boxRef = useRef();
  const nameRef = useRef();
  const inputRef = useRef();
  const buttonRef = useRef();

  // const q = gsap.utils.selector(dadRef)

  useEffect(() => {
    // gsap.to(q('.box'), {stagger: 1, x: 50, repeat: -1, repeatDelay: 1, yoyo: true})
    gsap.to(boxRef.current, { scrollTrigger: boxRef.current , duration: 1, height: "200", ease: "power4" });
    gsap.to(boxRef.current, {
      scrollTrigger: boxRef.current,
      duration: 1,
      delay: 0.5,
      width: "400",
      ease: "power4",
    });
    gsap.to(nameRef.current, {
      scrollTrigger: nameRef.current,
      duration: 0.5,
      delay: 1,
      opacity: 1,
      ease: "power1",
    });
    gsap.to(inputRef.current, {
      scrollTrigger: inputRef.current,
      duration: 0.5,
      delay: 1,
      width: "230px",
      ease: "power1",
    });
    gsap.to(buttonRef.current, {
      scrollTrigger: buttonRef.current,
      duration: 0.5,
      delay: 1,
      opacity: 1,
      ease: "power1",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Gsap Animation</title>
      </Head>

      <div className="app flex flex-col w-screen h-screen justify-center items-center">
        <div
          className="box flex flex-col w-1 h-1 bg-pink-300 rounded-md items-center text-lg font-bold text-white text-center my-4"
          ref={boxRef}
        >
          <span className="name mt-6 opacity-0" ref={nameRef}>
            This is a input Card  
          </span>
          <input className="input mt-6 w-0 h-9 rounded-md" ref={inputRef} />
          <button
            className="btn mt-6 py-2 px-4 bg-blue-400 rounded-md opacity-0"
            ref={buttonRef}
          >
            Send
          </button>
        </div>
        
      </div>
    </>
  );
};

export default Gsap;

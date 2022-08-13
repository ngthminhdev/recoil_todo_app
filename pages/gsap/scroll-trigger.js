import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
import Head from "next/head";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const Scroll = () => {
  
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "none" },
      scrollTrigger: {
        trigger: "#container",
        // toggleActions: "restart pause resume pause",
        start: "top top",
        end: "+=4000",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        markers: true,
      },
    });

    tl.from(".a", { xPercent: -100 })
      .from(".b", { xPercent: 100 })
      .from(".c", { yPercent: 100 })
      .from(".d", { yPercent: -100 });
    // tl.to('.b', {
    //   rotation: 360,
    //   duration: 3,
    //   x: 400,
    // })
    // tl.to('.b', {
    //   backgroundColor: "purple",
    //   duration: 1,
    // })
    // tl.to('.b', {
    //   rotation: 360,
    //   duration: 1,
    //   x: 0,
    // })

    
  }, []);

  return (
    <>
      <Head>
        <title>Gsap Animation</title>
      </Head>

      <div id="container" className="app flex flex-col w-screen h-1000 items-center">
        {/* <div className="a p-8 my-8 bg-red-500">a</div>
        <div className="b p-8 my-8 bg-yellow-500">b</div>
        <div className="c p-8 my-8 bg-blue-500">c</div> */}
        <div id="a" className="panel a w-screen h-screen text-center bg-blue-500">blue panel</div>
        <div id="a" className="panel b w-screen h-screen text-center bg-red-500">red panel</div>
        <div id="a" className="panel c w-screen h-screen text-center bg-yellow-500">blue panel</div>
        <div id="a" className="panel d w-screen h-screen text-center bg-pink-500">pink panel</div>
      </div>
    </>
  );
};

export default Scroll;

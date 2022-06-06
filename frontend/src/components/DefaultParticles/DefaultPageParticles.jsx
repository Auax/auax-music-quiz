import React from "react";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";

const DefaultParticles = () => {

    const particlesInit = async (main) => {
        console.log("Loaded engine");
        await loadFull(main);
    };

    const particlesLoaded = (_) => {
        console.log("Loaded particles");
    };

    return (
        <Particles className="w-full absolute"
                   init={particlesInit}
                   loaded={particlesLoaded}
                   options={{
                       fpsLimit: 60,
                       interactivity: {
                           events: {
                               onHover: {
                                   enable: true,
                                   // mode: "repulse",
                                   parallax: {enable: false, force: 60, smooth: 10}
                               },
                               resize: true
                           },
                           // modes: {
                           //     repulse: {distance: 10, duration: 1}
                           // }
                       },
                       retina_detect: true,
                       particles: {
                           color: {value: "#fff"},
                           move: {
                               direction: "none",
                               enable: true,
                               outModes: "out",
                               random: false,
                               speed: 2,
                               straight: false
                           },
                           number: {
                               density: {
                                   enable: true,
                                   area: 800
                               },
                               value: 80
                           },
                           opacity: {
                               value: {
                                   min: 0.1,
                                   max: 0.2
                               }
                           },
                           shape: {
                               type: "square"
                           },
                           size: {
                               value: {min: 1, max: 5}
                           }
                       }
                   }}
        />
    );
}

export default DefaultParticles;
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
        <Particles className="w-full h-full absolute"
                   init={particlesInit}
                   loaded={particlesLoaded}
                   options={{
                       fpsLimit: 60,
                       number: {
                           density: {
                               enable: true,
                               value_area: 1000
                           },
                           value: 100
                       },
                       interactivity: {
                           events: {
                               onHover: {
                                   enable: true,
                                   mode: "grab",
                                   parallax: {
                                       enable: true,
                                       force: 65,
                                       smooth: 10
                                   }
                               },
                               resize: true,
                           },
                       },
                       retina_detect: true,
                       particles: {
                           color: {
                               value: "#454b93"
                           },
                           number: {
                               density: {enable: true},
                               value: 80,
                           },
                           links: {
                               enable: true,
                               color: "#21245e",
                               distance: 150,
                               opacity: 0.5,
                           },
                           opacity: {
                               value: 0.5,
                           },
                           move: {
                               enable: true
                           }
                       }
                   }}
        />
    );
}

export default DefaultParticles;
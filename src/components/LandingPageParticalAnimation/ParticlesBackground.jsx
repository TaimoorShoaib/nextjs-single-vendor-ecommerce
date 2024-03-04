"use client"
import Particles from "react-tsparticles";
import React from "react";
import { useCallback,useEffect } from "react";
import { loadFull } from "tsparticles";
import styles from "./pageParticle.module.css";

//import Particles from "react-particles";
import ParticlesConfig from "../config/particles-config";
const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {
     console.log(container);
  }, []);
  return (
    <div id="particles-background">
      <Particles className={styles.particlesBackground}
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        init={particlesInit}
        loaded={particlesLoaded}
        options={ParticlesConfig}
        height="100vh"
        width="100vw"
      >
        
      </Particles>
    </div>
  );
};

/*export default ParticlesBackground;
'use client'
import React, { useCallback } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";

import ParticlesConfig from "../config/particles-config";

const ParticlesBackground = ({ children }) => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);

        // LOAD ANY ONE 
        // await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);


    return (

        <>

            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={ParticlesConfig}

            />
            {children}
        </>



    )
}*/
export default ParticlesBackground


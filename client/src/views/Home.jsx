import React from "react";
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";
import DefaultParticles from "components/DefaultParticles/DefaultPageParticles";


const MainPageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(5, 4, 17);
  overflow: auto;
`;

const MainPageTitle = styled.h1`
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.025em;
  font-weight: bold;
`;

const Home = () => {

    return (
        <MainPageDiv className="hero-height hero-main-page">
            {/*https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html*/}
            <DefaultParticles/>
            <div className="text-center px-4 z-1 relative">
                <MainPageTitle className="text-7xl sm:text-8xl md:text-9xl text-white">Music
                    <span className="text-blue-700"> Quiz</span></MainPageTitle>
                <p className="text-white/70">By Ibai Farina</p>
                <Link to="/choose">
                    <button className="btn btn-primary mt-3 px-10">PLAY</button>
                </Link>
            </div>
        </MainPageDiv>
    );
}

export default withRouter(Home);
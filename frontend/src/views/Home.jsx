import React from "react";
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";
import {ImGithub} from "react-icons/im";
import {BsChevronDown} from "react-icons/bs";
import * as queryString from "query-string";

import {Link as AnimateLink} from "react-scroll";
import {RLink, Container, Note, ALink, colors} from "util/Styles";
import DefaultParticles from "components/DefaultParticles/DefaultPageParticles";
import ModeCard from "components/ModeViewer/Card/ModeCard";
import SearchBar from "components/SearchBar/SearchBar";


const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - var(--navbar-height));
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0);
`;

const MainPageTitle = styled.h1`
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.025em;
  font-weight: bold;
`;

const SectionContainer = styled.div`
  background-color: ${colors.base200};
  color: #fff;
  position: relative;
  padding: 45px 10px 60px 10px;
  @media (max-width: 640px) {
    padding: 45px 10px 10px 10px;
  }

`;

const Section = styled(Container)`
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(0, 0, 0, 0.15);
  padding: 30px;
  border-radius: 5px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  // sm
  @media (min-width: 640px) {
    font-size: 2em;
  }
`;

const SectionSubtitle = styled.h1`
  font-size: 1.1em;
  // sm
  @media (min-width: 640px) {
    font-size: 1.4em;
  }
`;

const SectionParagraph = styled.p`
  color: #bebebe;
`;

const ChevronContainer = styled.div`
  position: absolute;
  height: 100%;
  z-index: 0;
  top: 0;
`;

const ChevronButton = styled(AnimateLink)`
  position: relative;
  top: 90%;
  cursor: pointer;
`;

const ChevronDown = () => {
    return (
        <ChevronContainer>
            <ChevronButton
                activeClass="active"
                to="contentSection"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}>
                <BsChevronDown size={37} color="#fff"/>
            </ChevronButton>
        </ChevronContainer>
    )
}

const Home = () => {
    return (
        <div>
            <HeroContainer className="hero-main-page">
                <DefaultParticles/>
                <div className="text-center px-4 z-1 relative z-10">
                    <MainPageTitle className="text-7xl sm:text-8xl md:text-9xl text-white">Music
                        <span className="text-blue-700">Quiz</span></MainPageTitle>
                    <h2 className="text-white/70 absolute mr-4 sm:mt-2 md:mt-0 right-0">By Ibai Farina</h2>
                    <Link to="/choose">
                        <button className="btn btn-primary mt-3 px-7 font-bold">PLAY</button>
                    </Link>
                </div>
                <ChevronDown/>
            </HeroContainer>

            <SectionContainer id={"contentSection"}>
                <h1 className="text-center mb-12 text-5xl">Information</h1>
                <Section>
                    <SectionTitle>What is Music Quiz?</SectionTitle>
                    <SectionParagraph>
                        <b>Music Quiz</b> is a website to test your music knowledge with different music modes while
                        having fun!
                    </SectionParagraph>
                    <SectionParagraph>
                        You will have to try your best to guess
                        the <b>artist</b> and <b>name</b> of the song!
                    </SectionParagraph>
                </Section>

                <Section className="mt-5">
                    <SectionTitle>How to play?</SectionTitle>

                    <SectionParagraph>
                        First, head over to the <RLink to="/choose">Play Section</RLink>, select a music mode you like,
                        and... <b>that's all!</b>
                    </SectionParagraph>

                    <SectionParagraph>
                        Some of the songs of these modes are updated often, such as:
                    </SectionParagraph>
                    <ModeCard key="3155776842"
                              dataId="3155776842"
                              hideLikeButton={true}
                              link={"/play?" + queryString.stringify({id: "37i9dQZEVXbMDoHDwVN2tF", tn: 10})}
                              title="Top 50 Global"
                              img="https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg"
                              difficulty="1"
                              customCardStyle={{marginBottom: "8px", marginTop: "8px", width: "33%", height: "100px"}}
                    />
                    <SectionSubtitle className="mt-8">Create a mode</SectionSubtitle>
                    <Note>You can also play a custom mode in the <RLink to="/create/mode">Creator</RLink>.</Note>
                    <Note>The only thing you need is the <b>Spotify playlist link</b> and it must not be private.</Note>
                    <br/>

                    <SectionParagraph>
                        The playlist link should look like this. Make sure the ID of the playlist is included! It should
                        be there by default
                    </SectionParagraph>
                    <div className="w-full">
                        <SearchBar text="https://open.spotify.com/playlist/"
                                   highlighted="37i9dQZEVXbMDoHDwVN2tF"/>
                    </div>

                </Section>

                <Section className="mt-5">
                    <SectionTitle>Difficulty</SectionTitle>
                    <SectionParagraph>
                        There are lots of <b>music modes</b> to choose from, but the difficulty is not the same for all
                        of
                        them. We based the difficulty mainly on the <b>popularity</b> of the songs and
                        the <b>decade</b> of the mode.
                    </SectionParagraph>
                    <br/>
                    <b>The difficulty ranges from:</b>
                    <ul className="list-disc ml-12">
                        <li className="text-green-200">1: Easy</li>
                        <li className="text-yellow-100">2: Normal</li>
                        <li className="text-red-200">3: Hard</li>
                    </ul>
                </Section>

                <Section className="mt-5">
                    <SectionTitle>Open Source</SectionTitle>
                    <SectionParagraph>
                        <b>Music Quiz</b> is open source, meaning that you can see the website's code and contribute if
                        you feel like it!
                    </SectionParagraph>
                    <Note>
                        This website was created and is currently maintained by <b>one person</b>, if you like
                        it,
                        please
                        consider <ALink href="https://paypal.me/zellius">donating</ALink>, it really
                        helps.
                    </Note>
                    <div className="flex">
                        <a href="https://github.com/Auax/auax-music-quiz" target="blank">
                            <button className="btn btn-primary flex mt-3"><b className="mt-1">GitHub</b>
                                <ImGithub size={25} className="ml-3 mt-0"/>
                            </button>
                        </a>
                    </div>
                </Section>
            </SectionContainer>
        </div>
    );
}

export default withRouter(Home);
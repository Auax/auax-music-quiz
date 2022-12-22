import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import {themeChange} from 'theme-change';
import "./navigation.css";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false); // Toggle menu

    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <nav className="navbar">
            <div className="flex items-center flex-shrink-0 mr-6 ml-3 sm:ml-0">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1028 1028"
                         width="40" height="40" stroke="currentColor"
                         className="text-white ml-1 hover:scale-110 ease-in duration-75">
                        <defs>
                            <clipPath id="_clipPath_yIrMOZXHCGKYzlTTE44mHhzImaVYbfsN">
                                <rect width="1028" height="1028"/>
                            </clipPath>
                        </defs>
                        <g clipPath="url(#_clipPath_yIrMOZXHCGKYzlTTE44mHhzImaVYbfsN)">
                            <path
                                d=" M 797.969 534.204 L 797.969 534.204 C 917.614 549.803 1010 649.516 1010 770.035 C 1010 901.371 900.283 1008 765.142 1008 C 635.426 1008 529.134 909.761 520.824 785.723 L 520.824 785.723 C 488.174 794.106 453.892 798.565 418.547 798.565 C 197.479 798.565 18 624.133 18 409.283 C 18 194.432 197.479 20 418.547 20 C 639.614 20 819.093 194.432 819.093 409.283 C 819.093 452.973 811.672 494.992 797.969 534.204 Z  M 797.969 534.204 L 797.969 534.204 C 787.233 532.793 776.274 532.069 765.142 532.069 C 630.001 532.069 520.284 638.698 520.284 770.035 C 520.284 775.307 520.461 780.54 520.824 785.723 L 520.824 785.723 C 650.885 752.4 755.138 657.025 797.969 534.204 Z "
                                fillRule="evenodd" fill="currentColor">
                            </path>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className="block sm:hidden mr-3">
                <button onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-primary">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div className={`menu-content ${isOpen ? "block" : "hidden"}`}>
                <div className="ml-3 sm:ml-0 text-sm sm:flex-grow">
                    <Link to="/choose" className="link-component">
                        Play
                    </Link>
                    <a href="https://paypal.me/zellius" className="link-component">
                        Donate
                    </a>
                    <a href="https://github.com/Auax/auax-music-quiz" className="link-component" target="blank">
                        GitHub
                    </a>
                </div>
                <div className="my-6 mx-3 sm:m-0">
                    <a href="/create/mode" className="btn btn-secondary-outline">Custom Mode </a>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(NavBar);
import React from "react";
import { Link, withRouter } from "react-router-dom";

// SVG Logo
import { ReactComponent as SVGLogo } from '../../assets/icons/logo.svg';

const Navigation = () => {
    return (
        <nav className="navbar flex items-center justify-between flex-wrap dark:bg-black bg-white p-3 w-full">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/"> <SVGLogo className="dark:invert invert-0 ml-2 hover:scale-110 ease-in duration-75" width="40" height="40" /></Link>
                {/* <span className="font-semibold text-xl tracking-tight ml-3">Auax MQ</span> */}
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-blue-600 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link to="/play" className="block mt-4 lg:inline-block lg:mt-0 dark:text-white text-black 
                    hover:text-blue-300 mr-4">
                        Play
                    </Link>
                    <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 dark:text-white text-black 
                    hover:text-blue-300 mr-4">
                        About
                    </Link>
                    <a href="https://github.com/auax" className="block mt-4 lg:inline-block lg:mt-0 dark:text-white
                     text-black hover:text-blue-300" target="blank">
                        GitHub
                    </a>
                </div>
                <div>
                    <a href="https://paypal.me/zellius" className="inline-block text-sm px-4 py-2 leading-none 
                    border rounded dark:text-white text-black dark:border-white border-black hover:border-transparent 
                    dark:hover:text-black hover:text-white dark:hover:bg-white hover:bg-black mt-4 lg:mt-0">Donate</a>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(Navigation);
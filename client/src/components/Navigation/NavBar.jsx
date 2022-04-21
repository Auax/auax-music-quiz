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
            <div className="flex items-center flex-shrink-0 mr-6">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1028 1028"
                         width="40" height="40" stroke="currentColor"
                         className="ml-1 hover:scale-110 ease-in duration-75">
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
                        className="btn">
                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div className={`menu-content ${isOpen ? "block" : "hidden"}`}>
                <div className="ml-3 sm:ml-0 text-sm sm:flex-grow">
                    <Link to="/play" className="link-component">
                        Play
                    </Link>
                    <Link to="/about" className="link-component">
                        About
                    </Link>
                    <a href="https://github.com/auax" className="link-component" target="blank">
                        GitHub
                    </a>
                </div>

                <div className="m-3 sm:m-0">
                    <a href="https://paypal.me/zellius" className="btn link-btn-component w-full sm:w-auto">Donate </a>
                </div>
            </div>
            <div className="changeThemeContainer mx-4 right-14 absolute z-50">
                <div title="Change Theme" className="dropdown dropdown-end">
                    <div tabIndex="0" className="btn link-btn-component gap-1 normal-case">
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             className="inline-block h-5 w-5 stroke-current sm:h-6 sm:w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                        </svg>
                        <span className="hidden sm:inline">Theme</span>
                        <svg width="12px" height="12px"
                             className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"/>
                        </svg>
                    </div>
                    <div
                        className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-0 w-52 overflow-y-auto shadow-lg mt-16">
                        <div className="grid grid-cols-1 gap-3 p-3" tabIndex="0">
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="auax" data-act-class="outline">
                                <div data-theme="auax"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Default</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="night" data-act-class="outline">
                                <div data-theme="night"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Night</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="halloween" data-act-class="outline">
                                <div data-theme="halloween"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Halloween</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="dracula" data-act-class="outline">
                                <div data-theme="dracula"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Dracula</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="synthwave" data-act-class="outline">
                                <div data-theme="synthwave"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Synthwave</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="lofi" data-act-class="outline">
                                <div data-theme="lofi"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Lofi</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
                                 data-set-theme="coffee" data-act-class="outline">
                                <div data-theme="coffee"
                                     className="bg-base-100 text-base-content w-full cursor-pointer font-sans">
                                    <div className="grid grid-cols-5 grid-rows-3">
                                        <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">Coffee</div>
                                            <div className="flex flex-shrink-0 flex-wrap gap-1">
                                                <div className="bg-primary w-2 rounded"/>
                                                <div className="bg-secondary w-2 rounded"/>
                                                <div className="bg-accent w-2 rounded"/>
                                                <div className="bg-neutral w-2 rounded"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default withRouter(NavBar);
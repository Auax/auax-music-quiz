import React from "react";

const Footer = () => {
    return (

        <footer className="footer p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black">
            <span className="text-sm text-gray-500 mx-auto dark:text-gray-400">© 2022 <a href="https://github.com/auax" target="blank" className="hover:underline">Ibai Farina (Auax)</a>. All Rights Reserved.
            </span>
            {/* <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul> */}
        </footer>

    );
}

export default Footer;
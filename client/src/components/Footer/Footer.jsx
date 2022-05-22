import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const FooterObj = styled.footer`
  height: var(--footer-height);
`;

const Footer = () => {
    return (
        <FooterObj className="bg-base100 p-4 text-white relative z-40">
            <div className="flex w-full text-neutral-300 mt-3">
                <span className="text-sm">Copyright © 2022 - Ibai Farina</span>
                <ul className="flex flex-wrap ml-auto items-center text-sm text-gray-500">
                    <li>
                        <Link to="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                    </li>
                    <li>
                        <a href="mailto:auax@musicquiz.me" className="mr-4 hover:underline md:mr-6 ">Contact</a>
                    </li>
                </ul>
            </div>
        </FooterObj>
    );
}

export default Footer;
import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const FooterObj = styled.footer`
  height: var(--footer-height);
`;

const Footer = () => {
    return (
        <FooterObj className="bg-base100 p-4 text-white relative z-40">
            <div className="grid sm:grid-cols-2 grid-cols-1 w-full mt-0 sm:mt-3">
                <span
                    className="text-sm text-center sm:text-left text-neutral-100">Copyright © 2022 - Ibai Farina</span>
                <hr className="visible sm:hidden my-1 opacity-20 w-full mx-auto"/>
                <ul className="grid grid-cols-2 gap-3 mx-auto sm:ml-auto sm:mr-0 text-xs text-neutral-400 sm:text-neutral-100">
                    <li className="text-center">
                        <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    </li>
                    <li className="text-center">
                        <a href="mailto:auax@musicquiz.me" className="hover:underline ">Contact</a>
                    </li>
                </ul>
            </div>
        </FooterObj>
    );
}

export default Footer;
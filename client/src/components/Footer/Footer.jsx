import React from "react";
import "./footer.css"
import styled, {keyframes, css} from "styled-components";


const FooterObj = styled.footer`
  height: var(--footer-height);
  box-shadow: 0px -4px 6px 0px rgba(0, 0, 0, 0.1);
`;

const Footer = () => {
    return (
        <FooterObj className="bg-base-200 p-4 text-base-200-content">
            <div className="items-center text-center w-full mt-3">
                <p className="text-sm">Copyright © 2022 - Ibai Farina</p>
            </div>
        </FooterObj>
    );
}

export default Footer;
import React from "react";
import styled from "styled-components";


const FooterObj = styled.footer`
  height: var(--footer-height);
`;

const Footer = () => {
    return (
        <FooterObj className="bg-base100 p-4 text-white relative z-40">
            <div className="items-center text-center w-full mt-1">
                <p className="text-sm">Alpha version<br/>Copyright © 2022 - Ibai Farina</p>
            </div>
        </FooterObj>
    );
}

export default Footer;
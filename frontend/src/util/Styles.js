import styled from "styled-components";
import {Link} from "react-router-dom";


// CONSTANTS
export const colors = {
    base100: "#0f0f10",
    base200: "#1b1c22",
    base300: "#24252C",
    gray: "#2f314b",
    darkGray: "#191919",
    darkGray2: "#121212",
    semiBlack: "#050505",
    darkBlue: "#0f172a",
    electricBlue: "#256cd3",

    heartBase: "#c6c6c6",
    heartRed: "#d26159"
};

export const shadows = {
    shadowSm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    shadowLg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
};

// ELEMENTS

export const Container = styled.div`
  // sm
  @media (min-width: 640px) {
    max-width: 640px;
  }
  // md
  @media (min-width: 768px) {
    max-width: 768px;
  }
  // lg
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
  // xl
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
  // 2xl
  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`;

export const Note = styled.p`
  background-color: rgba(0, 0, 0, 0.2);
  color: #b9b9b9;
  font-size: .90em;
  padding: 6px 10px 6px 10px;
  border-radius: 5px;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const RLink = styled(Link)`
  color: ${colors.electricBlue};

  &:hover {
    color: #245db0;
  }
`;

export const ALink = styled.a`
  color: ${colors.electricBlue};

  &:hover {
    color: #245db0;
  }
`;
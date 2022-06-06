import React from "react";
import {FaLock} from "react-icons/fa";
import styled from "styled-components";

const SearchBox = styled.div`
  align-items: center;
  display: flex;
  background-color: #2f2f2f;
  padding: 10px;
  border-radius: 10px;
  margin-top: 8px;
  width: ${({width}) => width || "100%"};

  // sm
  @media (max-width: 640px) {
    font-size: .9em;
  }
`;

const HighlightedSpan = styled.span`
  background-color: rgba(255, 115, 0, 0.47);
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  height: 16px;
`;

const SearchBar = (props) => {
    return (
        <SearchBox width={props.width}>
            <FaLock size={16} className="ml-1" color="#c6c6c6"/>
            <span className="ml-4">{props.text}
                {props.highlighted && <HighlightedSpan>{props.highlighted}</HighlightedSpan>}
            </span>
        </SearchBox>
    );
}

export default SearchBar;

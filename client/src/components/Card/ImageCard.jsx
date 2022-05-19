import React from "react";
import {Link} from "react-router-dom";

// import "./card.css"
import StarRating from "components/Rating/StarRating";
import {colors, shadows} from "util/Styles";
import styled, {css} from "styled-components";



const Card = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: ${shadows.shadowLg};
  transition: all 1s ease-in-out;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: ${shadows.shadowLg};
  position: relative;
  padding: 100px 25px 100px 25px;

  & .starRatingContainer {
    transition: all .2s ease-in-out;
    filter: opacity(100%);
  }
  
  &:hover {
    & > img {
      filter: opacity(80%) blur(2px);
      transform: scale(103%);
    }

    .starRatingContainer {
      filter: opacity(0);
      transform: scale(90%);
    }

    & > h1 {
      transform: scale(110%);
      text-shadow: rgba(0, 0, 0, 0.32) 0 10px 20px;
    }
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  filter: opacity(40%) blur(0);
  transition: .2s ease-in-out;
`;

const Title = styled.h1`
  font-size: 3em;
  color: white;
  transition: .2s ease-in-out;
  z-index: 1;
  position: relative;
`;


const VerticalCard = (props) => {
    return (
        <Link to={props.link}>
            <Card style={props.customCardStyle}>
                <Image src={props.img}/>
                <Title>{props.title}</Title>
                {props.difficulty &&
                    <StarRating stars={props.difficulty} totalStars={3}/>
                }
            </Card>
        </Link>
    );
}

export default VerticalCard;

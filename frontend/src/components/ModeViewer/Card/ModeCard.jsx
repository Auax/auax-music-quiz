import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

// import "./card.css"
import StarRating from "components/Rating/StarRating";
import {colors, shadows} from "util/Styles";
import styled, {css} from "styled-components";
import {FaHeart, FaRegHeart} from "react-icons/fa";


const Card = styled.div`
  width: 100%;
  height: 150px;
  box-shadow: ${shadows.shadowLg};
  background-color: ${colors.base300};
  transition: all .1s ease-in-out;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  display: grid;
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-template-columns: 30px auto 70px;
  padding: 14px;

  &:hover {
    background-color: #2a2b33;

    img {
      transform: scale(105%);
    }
  }
`;

const Image = styled.div`
  position: absolute;
  z-index: 0;
  width: 85%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: ${({img}) => `URL(${img})`};
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: opacity(0.35);
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  transition: all .5s ease-in-out;
  border-radius: 5px;
`;

const OptionText = styled.span`
  font-size: 1.6em;
  color: ${({color = "#fff"}) => color};
  transition: .2s ease-in-out;
  z-index: 1;
  position: relative;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  text-transform: capitalize;
  text-align: ${({textAlign = "left"}) => textAlign};
  ${({marginLeft}) => marginLeft && css`margin-left: ${marginLeft}px;`}
  ${({marginRight}) => marginRight && css`margin-right: ${marginRight}px;`}
`;

const HeartButtonStyle = styled.button`
  border-radius: 5px;
  transition: 0.15s all ease-in-out;
  position: relative;
  z-index: 1;
  border: 1px solid transparent;

  &:hover {
    backdrop-filter: brightness(110%) blur(5px);
    border-color: rgba(101, 101, 101, 0.1);
    //background-color: rgba(58, 59, 66, 0.29);
  }
`

const FavoriteButton = (props) => {
    const [color, setColor] = useState();
    const [isLiked, setIsLiked] = useState(props.isLiked);

    useEffect(() => {
        setColor(isLiked ? colors.heartRed : colors.heartBase);
    }, [isLiked]);

    const updateState = () => {
        let liked = !isLiked;
        setIsLiked(!isLiked);

        // Get favorites from localStorage
        let prev = localStorage.getItem("favorites");
        if (prev) {
            prev = JSON.parse(prev);
            // If we liked, add to favorites
            if (liked) prev.items.push(props.dataId);
            // If we removed the like, remove from favorites
            else prev["items"] = prev.items.filter(e => e !== props.dataId);
            // Stringify the dict
            prev = JSON.stringify(prev);
        } else
            // Null favorites from localStorage -> create new object
            prev = JSON.stringify({
                "items": [props.dataId]
            });

        // Save
        localStorage.setItem('favorites', prev);
    }

    return (
        <HeartButtonStyle onClick={updateState}>
            {isLiked ?
                <FaHeart className="mx-auto" size={20} color={color}/>
                :
                <FaRegHeart className="mx-auto" size={20} color={color}/>
            }
        </HeartButtonStyle>
    )
};

const ModeCard = (props) => {
    return (
        <Card style={props.customCardStyle}>
            <Link to={props.link}><Image img={props.img}/></Link>
            <Link to={props.link}
                  className="text-left text-white/20 h-full flex items-center font-bold">
                <OptionText>{props.title}
                    {props.difficulty &&
                        <StarRating stars={props.difficulty}
                                    totalStars={3}
                                    customContainerStyle={{display: "flex", marginTop: "2px"}}
                                    customStarStyle={{
                                        width: "13px",
                                        color: "#ffdf7a",
                                    }}/>
                    }
                </OptionText>
            </Link>
            {!(props.hideLikeButton || false) && <FavoriteButton dataId={props.dataId} isLiked={props.isLiked}/>}
        </Card>
    );
}

export default ModeCard;

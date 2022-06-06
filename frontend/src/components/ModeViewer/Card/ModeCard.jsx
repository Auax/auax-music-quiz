import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

// import "./card.css"
import StarRating from "components/Rating/StarRating";
import {colors, shadows} from "util/Styles";
import styled, {css} from "styled-components";
import {FaHeart, FaRegHeart} from "react-icons/fa";


const Card = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: ${shadows.shadowLg};
  background-color: ${colors.base300};
  transition: all .1s ease-in-out;
  border-radius: 5px;
  overflow: hidden;
  display: grid;
  border: 1px solid rgba(79, 79, 79, 0.22);
  grid-template-rows: repeat(1, minmax(0, 1fr));
  grid-template-columns: 90px auto 70px;
  padding: 14px;

  &:hover {
    background-color: #2a2b33;
  }
`;

const Image = styled.img`
  width: 69px;
  height: 69px;
  object-fit: cover;
  outline: 1px solid rgba(255, 255, 255, 0.05);
  outline-offset: -1px;
  border-radius: 5px;
`;

const OptionText = styled.span`
  font-size: 1.3em;
  color: ${({color = "#fff"}) => color};
  transition: .2s ease-in-out;
  z-index: 1;
  position: relative;
  font-weight: lighter;
  text-transform: capitalize;
  text-align: ${({textAlign = "left"}) => textAlign};
  ${({marginLeft}) => marginLeft && css`margin-left: ${marginLeft}px;`}
  ${({marginRight}) => marginRight && css`margin-right: ${marginRight}px;`}
`;

const HeartButtonStyle = styled.button`
  //background-color: #2D2E34;
  //margin: 10px;
  //border: 1px solid rgba(237, 237, 237, 0.03);
  border-radius: 5px;
  transition: 0.15s all ease-in-out;

  &:hover {
    background-color: #3a3b42;
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
            <Link to={props.link}><Image src={props.img} alt={props.title}/></Link>
            <Link to={props.link}
                  className="text-left font-inter text-white/20 h-full flex items-center">
                <OptionText>{props.title}
                    {props.difficulty &&
                        <StarRating stars={props.difficulty}
                                    totalStars={3}
                                    customContainerStyle={{display: "flex", marginTop: "2px"}}
                                    customStarStyle={{width: "13px", color: "#FFE290",}}/>
                    }
                </OptionText>
            </Link>
            {!(props.hideLikeButton || false) && <FavoriteButton dataId={props.dataId} isLiked={props.isLiked}/>}
        </Card>
    );
}

export default ModeCard;

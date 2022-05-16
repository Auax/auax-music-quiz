import React from "react";


const StarRating = (props) => {
    return (
        <div className="rating-container">
            <ul className="flex justify-center">
                {[...Array(props.stars)].map((_, i) => (
                    <li key={i}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star"
                             className={`w-4 mr-1 ${props.starsClass ? props.starsClass : "text-yellow-500"}`}
                             role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="currentColor"
                                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
                        </svg>
                    </li>
                ))}
                {[...Array(props.totalStars - props.stars)].map((_, i) => (
                    <li key={i}>
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="star"
                             className={`w-4 mr-1 ${props.starsClass ? props.starsClass : "text-yellow-500"}`}
                             role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill="currentColor"
                                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"/>
                        </svg>
                    </li>))}
            </ul>
        </div>
    );
}

export default StarRating;

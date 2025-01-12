import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStateValue } from './StateProvider';
import "./CheckoutBook.css";

function CheckoutBook({ id, title, image, price, author, author_link, rating, hideButton }) {
    const [{basket},dispatch] = useStateValue();

    const fullStars = Math.floor(rating);
    const partialStar = rating % 1;
    library.add(faStar);


    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
        })
    }

    return (
        <div className="checkoutbook">
            <img className="checkoutbook__image" src={image} alt="" />
            <div className='checkoutbook__info'>
                <p className="checkoutbook__title">{title}</p>
                <p className='author__link'><a href={author_link} className="link" >{author}</a></p>

                <p className='checkoutbook__price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>

                <div className='checkoutbook__rating'>
                    {Array(fullStars)
                        .fill()
                        .map((_) => (
                            <FontAwesomeIcon icon='star' style={{ color: '#ffc83d' }} />
                        ))}
                    {partialStar > 0 && (
                        <span
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            <FontAwesomeIcon icon='star' style={{ color: 'transparent' }} className='partStar' />
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    overflow: 'hidden',
                                    width: `${partialStar * 100}%`,
                                }}
                            >
                                <FontAwesomeIcon icon='star' style={{ color: '#ffc83d' }} className='partStar' />
                            </span>
                        </span>
                    )}
                    <span id="ratingTxt">&nbsp;{rating}</span>

                </div>
                {!hideButton && (
                    <button className="noselect" onClick={removeFromBasket}><span class='text'>Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg></span></button>
                )}

            </div>
        </div>
    )
}

export default CheckoutBook
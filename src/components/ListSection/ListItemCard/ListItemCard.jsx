import React from "react";
import PropTypes from "prop-types";
import "./list-item-card.scss";
import { CardContainer } from "components/CardContainer/CardContainer";
import SVGIcon from "components/SVGIcon/SVGIcon";
// import { Rating } from "components/Rating/Rating"; will be needed
import { HeartButton } from "components/HeartButton/HeartButton";
import { Link } from "components/Link/Link";
import { Button } from "components/Button/Button";

export const ListItemCard = (props) => {
  const {
    image,
    author,
    brand,
    title,
    name,
    bookedUntil,
    rating,
    quantity,
  } = props;

  const productSubtitle = author ?? brand;
  const productTitle = title ?? name;
  const productBookedUntil = bookedUntil && bookedUntil.replace(/-/g, "/");

  return (
    <CardContainer styleName="card-container--shadow">
      <div className="list-item-card">
        <div className="list-item-card__info">
          <img
            className="list-item-card__image"
            src={image}
            alt={productTitle}
          />
          <div className="list-item-card__description">
            <div className="list-item-card__subtitle">{productSubtitle}</div>
            <div className="list-item-card__title">{productTitle}</div>
            {productBookedUntil === "null" || productBookedUntil === null ? (
              <div className="list-item-card__availability">
                <SVGIcon name="availableProduct" />
                <div className="list-item-card__availability-text">
                  available
                </div>
              </div>
            ) : (
              <div className="list-item-card__availability">
                <SVGIcon name="notAvailableProduct" />
                <div className="list-item-card__availability-text">
                  booked until {productBookedUntil}
                </div>
              </div>
            )}
            {typeof quantity !== "undefined" ? (
              <div className="list-item-card__quantity">
                quantity: {quantity}
              </div>
            ) : (
              <div className="list-item-card__rating">
                rating {rating.score}
                {/* <Rating rating={product.rating.score} /> */}
              </div>
            )}
          </div>
        </div>
        <div className="list-item-card__interaction">
          <div className="list-item-card__heart">
            <HeartButton />
          </div>
          <div className="list-item-card__buttons">
            <Link styleName="list-item-card__link" handleClick={() => {}}>
              view more
            </Link>
            <Button
              className="list-item-card__button button--enabled"
              typeName="button"
              // handleClick={future function}
            >
              book
            </Button>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

ListItemCard.propTypes = {
  image: PropTypes.string,
  author: PropTypes.string,
  brand: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  bookedUntil: PropTypes.string,
  rating: PropTypes.object,
  quantity: PropTypes.number,
};

import React from "react";
import PropTypes from "prop-types";
import "./pagination-button.scss";

export const PaginationButton = (props) => {
  return (
    <button
      type="button"
      onClick={props.handleClick}
      className={`pagination__button ${props.className}`}
      key={props.key}
      id={props.id}
    >
      {props.children}
    </button>
  );
};

PaginationButton.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.object,
  key: PropTypes.number,
  id: PropTypes.number,
};

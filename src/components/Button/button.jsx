import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

export const Button = ({ children }) => (
  <button className="button" type="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
};

import React, { useState } from "react";
import SVGIcon from "../SVGIcon/SVGIcon";
import { NavLink, Switch } from "react-router-dom";

import "./breadcrumbs.scss";

const Breadcrumbs = () => {
  //get the current pathname
  const pathname = window.location.pathname;

  const [breadcrumbs, getBreadcrumbsState] = useState("");

  const GetBreadcrumbs = (path) => {
    //create an array that contains main value
    let breadcrumbsItems = ["Dashboard"];
    //Split pathname to an array
    let pathNameItems = path.replace("%20", " ").split("/");
    //populate an array with pathNameItems array items
    breadcrumbsItems.push(...pathNameItems);
    //filter out empty string values
    breadcrumbsItems = breadcrumbsItems.filter((item) => item);
    return breadcrumbsItems;
  };

  //return path to use for navigating
  const CreatePath = (path, index) => {
    let pathNameItems = path.split("/");
    pathNameItems.splice(index + 1);
    const pathNameJoined = pathNameItems.join("/");

    return pathNameJoined;
  };

  //check if item is last in array
  const IsLast = (index) => {
    return index === GetBreadcrumbs(pathname).length - 1;
  };

  //prevent click action for the last item in array
  const LastItemPreventClick = (e, index) => {
    return IsLast(index) ? e.preventDefault() : null;
  };

  return (
    <nav className="breadcrumb">
      <ul className="breadcrumb__list">
        {GetBreadcrumbs(pathname).map((value, index) => (
          <NavLink
            to={CreatePath(pathname, index)}
            exact
            key={index}
            className="breadcrumb__link"
            onClick={(e) => {
              LastItemPreventClick(e, index);
              getBreadcrumbsState(GetBreadcrumbs(pathname));
            }}
          >
            <li className="breadcrumb__list-item">
              <SVGIcon name="chevron-right" className="svg__arrow-icon" />
              {value}
            </li>
          </NavLink>
        ))}
      </ul>
      <Switch />
    </nav>
  );
};

export default Breadcrumbs;

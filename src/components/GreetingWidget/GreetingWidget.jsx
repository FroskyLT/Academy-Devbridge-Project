import React from "react";
import Greeting from "../UserGreeting/UserGreeting";
import Clock from "../Clock/Clock";
import "./greeting-widget.scss";
import database from "../../db.json";

export const Widget = () => {
  const user = database.userData;

  return (
    <div className="widget-block">
      <Clock />
      <Greeting name={user.userName} />
    </div>
  );
};

export default Widget;

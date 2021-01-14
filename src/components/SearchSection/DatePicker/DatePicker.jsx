import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import SVGIcon from "components/SVGIcon/SVGIcon";
import "./date-picker.scss";

const Calendar = () => {
  const [value, onChange] = useState();

  useEffect(() => {
    //function prevents tabbing through datepicker's month and day when no date is chosen
    const setTabIndex = (queryName) => {
      var el = document.querySelector(queryName);
      if (el.value.length === 0) {
        el.setAttribute("tabindex", "-1");
      } else {
        el.removeAttribute("tabindex");
      }
    };

    //function hides date's divider "/" when no date is selected
    const hideDivider = (queryName) => {
      let elements = Array.from(document.querySelectorAll(queryName));
      const chosenDay = document.querySelector(
        ".react-date-picker__inputGroup__day"
      );
      elements.map((i) => {
        if (chosenDay.value.length === 0) {
          return (i.hidden = true);
        } else {
          return (i.hidden = false);
        }
      });
    };

    setTabIndex(".react-date-picker__inputGroup__month");
    setTabIndex(".react-date-picker__inputGroup__day");
    hideDivider(".react-date-picker__inputGroup__divider");
  });

  return (
    <div className="wrapper">
      <DatePicker
        onChange={onChange}
        value={value}
        calendarIcon={<SVGIcon name="calendar" />}
        prevLabel={<SVGIcon name="buttonArrow" />}
        nextLabel={<SVGIcon name="buttonArrow" />}
        locale="en-GB"
        format="y/MM/dd"
        yearPlaceholder="Choose a date"
        monthPlaceholder=""
        dayPlaceholder=""
        clearIcon={value ? <SVGIcon name="cancel" /> : null}
      />
    </div>
  );
};

export default Calendar;

import React from "react";

import classses from "./MealsSummary.module.css";

const MealsSummary = props => {
  return (
    <section className={classses.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        Choose your favorite meal from uor broad selection of avaiable meals and
        enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-qality ingredients just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;

import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem.js";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-app-2fb63-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );
        if (!response.ok) {
          throw new Error("Error :(");
        }
        setIsError(false);
        const data = await response.json();
        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchMeals();
    setIsLoading(false);
  }, [isError]);
  
  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
  const reloadButtonHandler = () => {
    setIsError(false);
  }
  let content;
  if(isLoading){
    content = <p className={classes["loading-alert"]}>Loading...</p>;
  }
  if(isError){
    content = <button
            onClick={reloadButtonHandler}
            className={classes["reload-btn"]}
          >Reload</button>
  }
  if(!isLoading && !isError){
    content = <ul>{mealsList}</ul>
  }
  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;

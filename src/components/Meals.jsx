import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/myContext';
import { fetchMeals, fetchCategoriesMeals,
  fetchCategoryMeal } from '../utils/requestsAPI';
import lamb from '../images/lamb.svg';
import mealIcon from '../images/mealIcon.svg';
import beef from '../images/beef.svg';
import breakfast from '../images/breakfast.svg';
import dessert from '../images/dessert.svg';
import chicken from '../images/chicken.svg';
import loading from '../images/loading.gif';

function Meals() {
  const { categoryON,
    setCategoryON,
    searchON,
    setSearchON,
    searchResult,
  } = useContext(context);

  const [categories, setCategories] = useState([]);
  const [categoryMeal, setCategoryMeal] = useState([]);
  const [mealsApi, setMealsApi] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await fetchMeals();
      setMealsApi(response);

      const data = await fetchCategoriesMeals();
      const NUMBER_OF_CATEGORIES = 5;
      setCategories(data
        .filter((_, index) => index >= 0 && index < NUMBER_OF_CATEGORIES));
    };
    request();
    setCategoryON(false);
    setSearchON(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const twelveRecipes = (array) => {
    const NUMBER_OF_RECIPES = 12;
    return array.filter((_, index) => index >= 0 && index < NUMBER_OF_RECIPES);
  };

  const handleClick = async (category) => {
    const response = await fetchCategoryMeal(category);
    setCategoryMeal(response);
    setCategoryON(!categoryON);
    setSearchON(false);
  };

  const allMeals = () => {
    setCategoryON(false);
    setSearchON(false);
  };

  const renderCard = () => {
    if (categoryON) {
      return categoryMeal;
    } if (searchON) {
      return searchResult.meals;
    }
    return mealsApi;
  };

  const arrayIcon = [beef, breakfast, chicken, dessert, lamb];
  return (
    <div>
      {
        mealsApi.length === 0 ? (
          <img className="loading" src={ loading } alt="meals" />
        )
          : (

            <section>
              <div className="categories">
                {categories.map(({ strCategory }, index) => (
                  <div key={ index } className="category">
                    <button
                      data-testid={ `${strCategory}-category-filter` }
                      type="button"
                      className="categoryButton"
                      onClick={ () => handleClick(strCategory) }
                    >
                      <img className="icon" src={ arrayIcon[index] } alt="meals" />
                    </button>
                    <span>{strCategory}</span>
                  </div>
                ))}
                <div className="category">
                  <button
                    className="categoryButton"
                    type="button"
                    data-testid="All-category-filter"
                    onClick={ allMeals }
                  >
                    <img src={ mealIcon } alt="meals" className="icon" />
                  </button>
                  <span>All</span>
                </div>
              </div>
              <div className="cards">
                {renderCard() !== undefined && twelveRecipes(renderCard())
                  .map((meal, index) => (
                    <Link key={ index } to={ `meals/${meal.idMeal}` }>
                      <div
                        data-testid={ `${index}-recipe-card` }
                        className="card"
                      >
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ meal.strMealThumb }
                          alt={ meal.strMeal }
                        />
                        <p
                          className="card_txt"
                          data-testid={ `${index}-card-name` }
                        >
                          {meal.strMeal}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>
          )
      }

    </div>
  );
}

export default Meals;

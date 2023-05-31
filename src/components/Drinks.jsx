import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/myContext';
import { fetchCategoriesDrinks, fetchDrinks,
  fetchCaterogyDrink } from '../utils/requestsAPI';
import drinkIcon from '../images/drinkIcon.svg';
import cocktail from '../images/cocktail.svg';
import cocoa from '../images/cocoa.svg';
import other from '../images/other.svg';
import shake from '../images/shake.svg';
import ordinary from '../images/ordinary.svg';
import loading from '../images/loading.gif';

function Drinks() {
  const {
    setCategoryON,
    searchON,
    setSearchON,
    searchResult,
    categoryON,
  } = useContext(context);
  const [categories, setCategories] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [drinksApi, setDrinksApi] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await fetchDrinks();
      setDrinksApi(response);

      const data = await fetchCategoriesDrinks();
      const NUMBER_OF_CATEGORIES = 5;
      setCategories(data
        .filter((_, index) => index >= 0 && index < NUMBER_OF_CATEGORIES));
    };
    request();
    setCategoryON(false);
    setSearchON(false);
  }, []);

  const twelveRecipes = (array) => {
    const NUMBER_OF_RECIPES = 12;
    return array.filter((_, index) => index >= 0 && index < NUMBER_OF_RECIPES);
  };

  const handleClick = async (category) => {
    const response = await fetchCaterogyDrink(category);
    setCategoryDrink(response);
    setCategoryON(!categoryON);
    setSearchON(false);
  };

  const allDrinks = () => {
    setCategoryON(false);
    setSearchON(false);
  };

  const renderCard = () => {
    if (categoryON) {
      return categoryDrink;
    } if (searchON) {
      return searchResult.drinks;
    }
    return drinksApi;
  };

  const arrayIcon = [ordinary, cocktail, shake, other, cocoa];

  return (
    <div>
      {
        drinksApi.length === 0 ? (
          <img className="loading" src={ loading } alt="meals" />
        )
          : (
            <section>
              <div className="categories">
                {categories.map(({ strCategory }, index) => (
                  <div className="category" key={ index }>
                    <button
                      className="categoryButton"
                      data-testid={ `${strCategory}-category-filter` }
                      type="button"
                      onClick={ () => handleClick(strCategory) }
                    >
                      <img className="icon" src={ arrayIcon[index] } alt="drinks" />
                    </button>
                    <span>{strCategory.replace('/', '/ ')}</span>
                  </div>
                ))}
                <div className="category">
                  <button
                    className="categoryButton"
                    type="button"
                    data-testid="All-category-filter"
                    onClick={ allDrinks }
                  >
                    <img className="icon" src={ drinkIcon } alt="drinks" />
                  </button>
                  <span>All</span>
                </div>
              </div>
              <div className="cards">
                {renderCard() !== undefined && twelveRecipes(renderCard())
                  .map((drink, index) => (
                    <Link key={ index } to={ `drinks/${drink.idDrink}` }>
                      <div
                        data-testid={ `${index}-recipe-card` }
                        className="card"
                      >
                        <img
                          data-testid={ `${index}-card-img` }
                          src={ drink.strDrinkThumb }
                          alt={ drink.strDrink }
                        />
                        <p
                          data-testid={ `${index}-card-name` }
                          className="card_txt"
                        >
                          {drink.strDrink}
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

export default Drinks;

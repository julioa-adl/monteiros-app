import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [dataInputs, setDataInputs] = useState({ email: '', password: '' });
  // Para resultado da pesquisa no SearchBar
  const [searchResult, setSearchResult] = useState('');

  const [progressRecipe, setProgressRecipe] = useState({
    drinks: {},
    meals: {},
  });
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [selectedRadioButton, setSelectedRadioButton] = useState('ingredientsRadio'); // estado do input de t
  const [categoryON, setCategoryON] = useState(false);
  const [searchON, setSearchON] = useState(false);
  const [idDoneRecipes, setIdDoneRecipes] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const addDrinks = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const drinksPrevState = prevProgress.drinks[id] ? prevProgress.drinks[id] : [];
      return {
        ...prevProgress,
        drinks: {
          ...prevProgress.drinks,
          [id]: [
            ...drinksPrevState,
            ingredient,
          ],
        },
      };
    });
  };

  const addMeals = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const mealsPrevState = prevProgress.meals[id] ? prevProgress.meals[id] : [];
      return {
        ...prevProgress,
        meals: {
          ...prevProgress.meals,
          [id]: [
            ...mealsPrevState,
            ingredient,
          ],
        },
      };
    });
  };

  const removeDrinks = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const drinksPrevState = prevProgress.drinks[id] ? prevProgress.drinks[id] : [];
      return {
        ...prevProgress,
        drinks: {
          ...prevProgress.drinks,
          [id]: drinksPrevState.filter((item) => item !== ingredient),
        },
      };
    });
  };

  const removeMeals = (id, ingredient) => {
    setProgressRecipe((prevProgress) => {
      const mealsPrevState = prevProgress.meals[id] ? prevProgress.meals[id] : [];
      return {
        ...prevProgress,
        meals: {
          ...prevProgress.meals,
          [id]: mealsPrevState.filter((item) => item !== ingredient),
        },
      };
    });
  };

  const localStorageIngredientProgress = () => {
    const storageRecipes = localStorage.getItem('inProgressRecipes');
    if (storageRecipes) {
      setProgressRecipe(JSON.parse(storageRecipes));
    }
  };

  useEffect(() => {
    localStorageIngredientProgress();
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipe));
  }, [progressRecipe]);

  const contextValue = {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
    loading,
    setLoading,
    selectedRadioButton,
    setSelectedRadioButton,
    categoryON,
    setCategoryON,
    searchON,
    setSearchON,
    progressRecipe,
    setProgressRecipe,
    removeMeals,
    removeDrinks,
    loading2,
    setLoading2,
    ingredients,
    setIngredients,
    idDoneRecipes,
    setIdDoneRecipes,

    // dataInputLocalStorage,
    // setDataInputLocalStorage,
    // mealsTokenStorage,
    // setMealsTokenStorage,
    // drinksTokenStorage,
    // setDrinksTokenStorage,
    searchResult,
    setSearchResult,
    localStorageIngredientProgress,
    addMeals,
    addDrinks,

  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

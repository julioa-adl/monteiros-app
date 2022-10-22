// export const fetchIngredient = async (ingredient, pagePath) => {
//   try {
//     const endPoint = pagePath === '/meals'
//       ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
//       : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
//     const data = await fetch(endPoint)
//       .then((response) => response.json())
//       .then((json) => json);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchName = async (name, pagePath) => {
//   const endPoint = pagePath === '/meals'
//     ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
//     : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
//   const data = await fetch(endPoint)
//     .then((response) => response.json())
//     .then((json) => json);
//   return data;
// };

// export const fetchLetter = async (letter, pagePath) => {
//   const endPoint = pagePath === '/meals'
//     ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
//     : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
//   const data = await fetch(endPoint)
//     .then((response) => response.json())
//     .then((json) => json);
//   return data;
// };

import { FAV_RECIPES, DONE_RECIPES } from './constants';

export const apiRequest = async (radio, text, pagePath) => {
  if (pagePath === '/meals') {
    if (radio === 'ingredientsRadio') {
      const ingrediente = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
      return ingrediente.json();
    }

    if (radio === 'firstLetterRadio') {
      const primeiraLetra = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`);
      return primeiraLetra.json();
    }

    const nome = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
    return nome.json();
  }
  if (radio === 'ingredientsRadio') {
    const ingrediente = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`);
    return ingrediente.json();
  }
  if (radio === 'firstLetterRadio') {
    const primeiraLetra = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`);
    return primeiraLetra.json();
  }

  const nome = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
  return nome.json();
};

export const recipeDetailsAPI = {
  '/meals/:id': async (id) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  },
  '/drinks/:id': async (id) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  },
};

export const saveFav = (newObj) => {
  let oldInfo = JSON.parse(localStorage.getItem(FAV_RECIPES));
  if (oldInfo === null) {
    oldInfo = [];
  }
  if (oldInfo.some((e) => e.id === newObj.id)) {
    const delet = oldInfo.filter((e) => e.id !== newObj.id);
    localStorage.setItem(
      FAV_RECIPES,
      JSON.stringify(delet),
    );
  } else {
    const newInfo = [
      ...oldInfo,
      newObj,
    ];

    localStorage.setItem(
      FAV_RECIPES,
      JSON.stringify(newInfo),
    );
  }
};

export const saveDone = (newObj) => {
  let oldInfo = JSON.parse(localStorage.getItem(DONE_RECIPES));
  if (oldInfo === null) {
    oldInfo = [];
  }
  if (oldInfo.some((e) => e.id === newObj.id)) {
    const delet = oldInfo.filter((e) => e.id !== newObj.id);
    localStorage.setItem(
      DONE_RECIPES,
      JSON.stringify(delet),
    );
  } else {
    const newInfo = [
      ...oldInfo,
      newObj,
    ];

    localStorage.setItem(
      DONE_RECIPES,
      JSON.stringify(newInfo),
    );
  }
};

export const recipeInProgressAPI = {
  '/meals/:id/in-progress': async (id) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const data = await fetch(URL);
    const response = await data.json();
    return response;
  },
  '/drinks/:id/in-progress': async (id) => {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const data = await fetch(URL);
    const response = await data.json();
    return response;
  },
};

export const recipeAPI = {
  '/meals/:id': async () => {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  },
  '/drinks/:id': async () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const request = await fetch(URL);
    const response = await request.json();
    return response;
  },
};

export const fetchMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  return meals;
};

export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};

export const fetchCategoriesDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const { drinks } = await response.json();
  return drinks;
};

export const fetchCategoriesMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const { meals } = await response.json();
  return meals;
};

export const fetchCaterogyDrink = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchCategoryMeal = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const { meals } = await response.json();
  return meals;
};

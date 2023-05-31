import {
  DRINKS_KEY,
  MEALS_KEY,
  NUMBER_SIX,
  USER_KEY,
  DONE_RECIPES,
  IN_PROGRESS } from './constants';

export const validationInputs = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const validationEmail = emailRegex.test(email);
  const validationGeneral = validationEmail && password.length > NUMBER_SIX;
  return validationGeneral;
};

export const localStorageUser = (email) => {
  localStorage.setItem(USER_KEY, JSON.stringify(email));
  localStorage.setItem(MEALS_KEY, JSON.stringify(1));
  localStorage.setItem(DRINKS_KEY, JSON.stringify(1));
};

export const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem(DONE_RECIPES));
  if (doneRecipes === null) {
    return [];
  }
  return doneRecipes;
};

export const getInProgressRecipes = () => {
  const inProgressRecipes = JSON.parse(localStorage.getItem(IN_PROGRESS));
  if (inProgressRecipes === null) {
    return {
      drinks: {},
      meals: {},
    };
  }
  return inProgressRecipes;
};

import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import context from '../context/myContext';
import { apiRequest } from '../utils/requestsAPI';
import '../style/searchBar.css';

function SearchBar() {
  const history = useHistory();
  const { pathname: pagePath } = useLocation();

  console.log(pagePath === '/meals');

  const { searchResult, setSearchResult,
    setLoading,
    setCategoryON,
    setSearchON,
  } = useContext(context);

  const [searchCharacters, setSearchCharacters] = useState('');
  const [userFilter, setUserFilter] = useState('ingredientsRadio'); // estado dos radios

  console.log(searchResult);

  const handleSubmitButton = async () => {
    const SIZE_SEARCH = Number(searchCharacters.length);
    if (SIZE_SEARCH > 1 && userFilter === 'firstLetterRadio') {
      global.alert('Your search must have only 1 (one) character');
    }
    setLoading(true);
    if (pagePath === '/meals') {
      const returnFilter = await apiRequest(userFilter, searchCharacters, pagePath);
      if (returnFilter.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (returnFilter.meals.length === 1) {
        history.push(`/meals/${returnFilter.meals[0].idMeal}`);
      }

      if (returnFilter.meals !== null) {
        setSearchON(true);
        setCategoryON(false);
        setSearchResult(returnFilter);
      }
      setLoading(false);
    }

    if (pagePath === '/drinks') {
      const returnFilter = await apiRequest(userFilter, searchCharacters, pagePath);
      if (returnFilter.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else if (returnFilter.drinks.length === 1) {
        history.push(`/drinks/${returnFilter.drinks[0].idDrink}`);
      }
      if (returnFilter.drinks !== null) {
        setSearchON(true);
        setCategoryON(false);
        setSearchResult(returnFilter);
      }
      setLoading(false);
    }
  };

  return (
    <div className="searchBar">
      <form className="form">
        <label htmlFor="searchBarInput" className="text-label">
          <input
            className="form-control"
            data-testid="search-input"
            type="text"
            placeholder="Pesquisa"
            name="searchBarInput"
            id="searchBarInput"
            value={ searchCharacters }
            onChange={ ({ target: { value } }) => setSearchCharacters(value) }
          />
        </label>
        <div>
          <label htmlFor="ingredientsRadio">
            <input
              data-testid="ingredient-search-radio"
              className="radio_btn_search"
              type="radio"
              name="radio"
              value="ingredientsRadio"
              id="ingredientsRadio"
              onChange={ ({ target: { value } }) => setUserFilter(value) }
            />
            Ingredient
          </label>
          <label htmlFor="nameRadio">
            <input
              data-testid="name-search-radio"
              className="radio_btn_search"
              type="radio"
              name="radio"
              id="nameRadio"
              onChange={ ({ target: { value } }) => setUserFilter(value) }
            />
            Name
          </label>
          <label htmlFor="firstLetterRadio">
            <input
              data-testid="first-letter-search-radio"
              className="radio_btn_search"
              name="radio"
              type="radio"
              value="firstLetterRadio"
              id="firstLetterRadio"
              onChange={ ({ target: { value } }) => setUserFilter(value) }
            />
            First Letter
          </label>
        </div>
        <button
          className="btn btn-warning search_btn"
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => handleSubmitButton() }
        >
          SEARCH
        </button>
      </form>
      {/* <RecipeCard /> */}
    </div>
  );
}

export default SearchBar;

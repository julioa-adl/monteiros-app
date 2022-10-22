import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { DONE_RECIPES } from '../utils/constants';
import shareIcon from '../images/shareIcon.svg';
import all from '../images/all.svg';
import meals from '../images/mealIcon.svg';
import drinks from '../images/drinkIcon.svg';
import '../style/doneFavorite.css';

function DoneRecipes({ match }) {
  const [dones, setDones] = useState([]);
  const [renderDones, setRenderDones] = useState([]);
  const [update, setUpdate] = useState(true);
  const [alertCopy, setAlertCopy] = useState(false);

  useEffect(() => {
    let getDones = JSON.parse(localStorage.getItem(DONE_RECIPES));
    if (getDones === null) {
      getDones = [];
    }

    setDones(getDones);
    setRenderDones(getDones);
    setUpdate(true);
  }, [update]);

  const copyBoard = ({ target: { id } }) => {
    navigator.clipboard.writeText(`http://localhost:3000${id}`);
    setAlertCopy(true);
    setInterval(() => {
      setAlertCopy(false);
    }, 5000);
  };

  const handleFilter = ({ target: { id } }) => {
    if (id !== 'all') {
      setRenderDones(dones.filter((e) => e.type === id));
    } else {
      setRenderDones(dones);
    }
  };

  return (
    <div>
      <Header name={ match.path } />
      <div className="options">
        <div>
          <div className="circle">
            <img
              type="button"
              data-testid="filter-by-all-btn"
              id="all"
              onClick={ handleFilter }
              src={ all }
              role="presentation"
              alt="all"
              className="iconOptions"
            />
          </div>
          <span>All</span>
        </div>
        <div>
          <div className="circle">
            <img
              type="button"
              data-testid="filter-by-meal-btn"
              id="meal"
              onClick={ handleFilter }
              src={ meals }
              role="presentation"
              alt="meals"
              className="iconOptions"
            />
          </div>
          <span>Meals</span>
        </div>
        <div>
          <div className="circle">
            <img
              type="button"
              data-testid="filter-by-drink-btn"
              id="drink"
              onClick={ handleFilter }
              src={ drinks }
              role="presentation"
              alt="drinks"
              className="iconOptions"
            />
          </div>
          <span>Drinks</span>
        </div>
      </div>
      {
        renderDones.map((e, i) => {
          if (e.type === 'meal') {
            return (
              <div key={ e.id } className="cardRecipe">
                <Link to={ `meals/${e.id}` }>
                  <img
                    src={ e.image }
                    alt={ e.name }
                    data-testid={ `${i}-horizontal-image` }
                    width="150"
                  />
                </Link>
                <div className="recipeInformation">
                  <Link to={ `meals/${e.id}` }>
                    <p data-testid={ `${i}-horizontal-name` } className="recipeName">
                      { e.name }
                    </p>
                  </Link>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    { e.nationality }
                    {' '}
                    -
                    {' '}
                    { e.category }
                  </p>
                  <p data-testid={ `${i}-horizontal-done-date` }>
                    {`Done in: ${e.doneDate}`}
                  </p>
                  { e.tags.filter((_, index) => (index < 2)).map((tag) => (
                    <span
                      key={ tag }
                      data-testid={ `${i}-${tag}-horizontal-tag` }
                    >
                      { `${tag} `}
                    </span>
                  )) }
                  <button
                    type="button"
                    data-testid={ `${i}-horizontal-share-btn` }
                    className="button icons"
                    src={ shareIcon }
                    onClick={ copyBoard }
                  >
                    <img id={ `/meals/${e.id}` } src={ shareIcon } alt="shareIcon" />
                  </button>
                  {
                    alertCopy
                    && <p>Link copied!</p>
                  }
                </div>

              </div>
            );
          }
          return (
            <div key={ e.id } className="cardRecipe">
              <Link to={ `drinks/${e.id}` }>
                <img
                  src={ e.image }
                  alt={ e.name }
                  data-testid={ `${i}-horizontal-image` }
                  width="150"
                />
              </Link>
              <div className="recipeInformation">
                <Link to={ `drinks/${e.id}` }>
                  <p data-testid={ `${i}-horizontal-name` } className="recipeName">
                    { e.name }
                  </p>
                </Link>
                <p data-testid={ `${i}-horizontal-top-text` }>
                  { e.alcoholicOrNot }
                </p>
                <p data-testid={ `${i}-horizontal-done-date` }>
                  {`Done in: ${e.doneDate}`}
                </p>
                <button
                  type="button"
                  data-testid={ `${i}-horizontal-share-btn` }
                  className="button icons"
                  src={ shareIcon }
                  onClick={ copyBoard }
                >
                  <img id={ `/drinks/${e.id}` } src={ shareIcon } alt="shareIcon" />
                </button>
                {
                  alertCopy
                    && <p>Link copied!</p>
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default DoneRecipes;

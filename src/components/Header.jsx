import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import logo from '../images/logo_a.png';

import '../style/header.css';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import profile from '../images/profile.svg';
import done from '../images/done.svg';
import favorite from '../images/blackHeartIcon.svg';

function Header({ name }) {
  const [showElement, setShowElement] = useState(false);
  const validationHeader = {
    '/meals': ['Meals', { perfil: true }, { pesquisa: true }, mealIcon],
    '/drinks': ['Drinks', { perfil: true }, { pesquisa: true }, drinkIcon],
    '/profile': ['Profile', { perfil: true }, { pesquisa: false }, profile],
    '/done-recipes': ['Done Recipes', { perfil: true }, { pesquisa: false }, done],
    '/favorite-recipes': ['Favorite Recipes', { perfil: true }, { pesquisa: false },
      favorite],
  };
  const history = useHistory();
  const redirect = () => {
    history.push('/profile');
  };

  return (
    <div data-testid="page-title">
      <Link to="/meals">
        <img className="logo" src={ logo } alt="logo" />
      </Link>

      <div className="header">
        {
          validationHeader[name][2].pesquisa
        && (
          <button
            type="button"
            className="headerButton"
            onClick={ () => setShowElement(!showElement) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="searchIcon"
            />
          </button>
        )
        }
        {
          validationHeader[name][1].perfil
        && (
          <button
            className="headerButton"
            type="button"
            onClick={ redirect }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profileIcon"
            />
          </button>
        )

        }
      </div>
      <div className="title">
        <img src={ validationHeader[name][3] } alt="title" />
        <h1 ata-testid="page-title">{ validationHeader[name][0] }</h1>
      </div>
      { showElement && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;

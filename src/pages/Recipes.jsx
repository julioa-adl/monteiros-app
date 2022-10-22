import React from 'react';
import PropTypes from 'prop-types';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/recipes.css';

function Recipes({ match }) {
  return (
    <div className="recipes">
      <Header name={ match.path } />
      {
        (match.path === '/meals') ? <Meals /> : <Drinks />
      }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default Recipes;

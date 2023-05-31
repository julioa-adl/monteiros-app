import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';
import { recipeDetailsAPI, recipeAPI } from '../utils/requestsAPI';
import '../style/details.css';
import { getDoneRecipes, getInProgressRecipes } from '../utils/services';
import FavShareBar from '../components/FavShareBar';
import context from '../context/myContext';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from '../components/Footer';

import Goat from '../images/lamb.svg';
import Beef from '../images/beef.svg';
import Breakfast from '../images/breakfast.svg';
import Dessert from '../images/dessert.svg';
import Chicken from '../images/chicken.svg';
import Side from '../images/side.svg';
import Seafood from '../images/SeaFood.svg';
import Pasta from '../images/Pasta.svg';
import Pork from '../images/pork.svg';
import Vegetarian from '../images/vegetarian.svg';

function RecipeDetails({ match }) {
  const {
    ingredients,
    setIngredients,
  } = useContext(context);

  const [item, setItem] = useState('');
  const [reverseItem, setreverseItem] = useState('');
  const [details, setDetails] = useState({});

  const [measure, setMeasure] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [startBtt, setStartBtt] = useState(true);
  const [nameStartBtt, setNameStartBtt] = useState(false);
  const NUMBER_OF_RECOMMENDATIONS = 6;

  const filterIngredients = (key, response) => {
    const entriesIngredients = Object.entries(response).filter((e) => (
      e[0].includes(key)
      === true && e[1] !== '' && e[1] !== ' ' && e[1] !== null));
    const ingredientes = entriesIngredients.map((e) => e[1]);
    return ingredientes;
  };

  useEffect(() => {
    const request = async () => {
      const response = await recipeDetailsAPI[match.path](match.params.id);
      const firstItem = Object.keys(response)[0];
      setDetails(response[firstItem][0]);
      const saveItem = {
        '/meals/:id': () => {
          setItem('Meal');
          setreverseItem('Drink');
        },
        '/drinks/:id': () => {
          setItem('Drink');
          setreverseItem('Meal');
        },
      };
      setStartBtt(getDoneRecipes().some((e) => e.id === match.params.id));

      const inProgressKey = match.path === '/meals/:id' ? 'meals' : 'drinks';
      const inProgressLocal = getInProgressRecipes();
      setNameStartBtt(Object.keys(inProgressLocal[inProgressKey])
        .includes(match.params.id));

      const data = await recipeAPI[match.path]();
      const key = Object.keys(data)[0];
      setRecommended(data[key]);

      saveItem[match.path]();
      setIngredients(filterIngredients('strIngredient', response[firstItem][0]));
      setMeasure(filterIngredients('strMeasure', response[firstItem][0]));
    };
    request();
  }, []);

  const history = useHistory();
  const redirect = () => {
    history.push(`${match.url}/in-progress`);
  };

  const arrayIcon = {
    Goat,
    Beef,
    Breakfast,
    Chicken,
    Dessert,
    Side,
    Seafood,
    Pasta,
    Pork,
    Vegetarian,
  };
  return (
    <div>
      <div className="details_container">
        <img
          className="image"
          data-testid="recipe-photo"
          src={ details[`str${item}Thumb`] }
          alt="imagem"
        />
        <h1
          className="title_details"
          data-testid="recipe-title"
        >
          { details[`str${item}`] }
        </h1>
        <FavShareBar url={ match.url } recipe={ details } />
        {
          item === 'Meal'
            ? (
              <div>
                <p
                  data-testid="recipe-category"
                  className="category_details"
                >
                  { details.strCategory }
                </p>
                <img
                  src={ arrayIcon[details.strCategory] }
                  alt="category"
                  className="icon_category_details"
                />
              </div>
            )
            : (
              <p
                data-testid="recipe-category"
                className="alcoholic"
              >
                { details.strAlcoholic }
              </p>
            )
        }
        <div className="infos_details_container">
          <h1 className="deltails_titles_page">Ingredients</h1>
          {
            ingredients.map((e, i) => (
              <ul
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                <li className="ingredients">{`${e}: ${measure[i]}`}</li>
              </ul>
            ))
          }

          <h1 className="deltails_titles_page">Instructions</h1>
          <p
            className="instructions"
            data-testid="instructions"
          >
            { details.strInstructions }
          </p>

          {
            item === 'Meal'
            && (
              <div>
                <h1 className="deltails_titles_page">Video</h1>
                <iframe
                  className="video_details"
                  src={ details.strYoutube.replace('watch?v=', 'embed/') }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                  allowFullScreen
                  data-testid="video"
                />
              </div>
            )
          }

          <h1 className="deltails_titles_page">Recommended</h1>
          <Carousel infiniteLoop interval={ 3000 }>
            {
              recommended.filter((_, index) => index < NUMBER_OF_RECOMMENDATIONS)
                .map((e, i) => (
                  <div
                    key={ i }
                    data-testid={ `${i}-recommendation-card` }
                  >
                    <img
                      src={ e[`str${reverseItem}Thumb`] }
                      alt="First slide"
                    />
                    <p data-testid={ `${i}-recommendation-title` }>
                      <h3>{ e[`str${reverseItem}`] }</h3>
                    </p>
                  </div>
                ))
            }
          </Carousel>
        </div>
      </div>
      {
        !startBtt
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button_start_recipe"
          onClick={ redirect }
        >
          { !nameStartBtt ? 'Start Recipe' : 'Continue Recipe' }
        </button>
      )
      }
       <Footer />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired };

export default RecipeDetails;

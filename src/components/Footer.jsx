import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="Footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          className="icon_drink"
          src={ drinkIcon }
          alt="Drink"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          className="icon_meal"
          src={ mealIcon }
          alt="Meal"
        />
      </Link>
    </footer>
  );
}

export default Footer;

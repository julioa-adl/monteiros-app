import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import done from '../images/done.svg';
import favorite from '../images/blackHeartIcon.svg';
import logout from '../images/logout.svg';
import '../style/profile.css';

function ProfileComponent() {
  const [email, setEmail] = useState({});
  useEffect(() => {
    const emailLocalStorage = localStorage.getItem('user');
    if (emailLocalStorage === null || emailLocalStorage === undefined) {
      setEmail({ email: '' });
    } else {
      setEmail(JSON.parse(emailLocalStorage));
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="profile">
      <p data-testid="profile-email">{email.email}</p>
      <Link to="/done-recipes" className="profileOption">
        <button type="button" data-testid="profile-done-btn" className="profileButton">
          <div className="icon">
            <img src={ done } alt="favorite" />
          </div>
          <span>Done Recipes</span>
        </button>
      </Link>
      <Link to="/favorite-recipes" className="profileOption">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profileButton"
        >
          <div className="icon">
            <img src={ favorite } alt="favorite" />
          </div>
          <span>Favorite Recipes</span>
        </button>
      </Link>
      <Link to="/" className="profileOption">
        <button
          onClick={ clearLocalStorage }
          className="profileButton"
          type="button"
          data-testid="profile-logout-btn"
        >
          <div className="icon">
            <img src={ logout } alt="logout" />
          </div>
          <span> Logout</span>
        </button>
      </Link>
    </div>
  );
}

export default ProfileComponent;

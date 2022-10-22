import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileComponent from '../components/ProfileComponent';

function Profile({ match }) {
  return (
    <div>
      <Header name={ match.path } />
      <ProfileComponent />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired };

export default Profile;

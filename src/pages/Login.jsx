import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import context from '../context/myContext';
import '../style/login.css';
// import { useStoragedrinksToken,
//   useStorageMeals, useStorageUser } from '../utils/hooks/useStorage';
// eslint-disable-next-line import/named
import { validationInputs, localStorageUser } from '../utils/services';
import vegetais from '../images/Vegetable.png';
import monteirosLogo from '../images/monteiros_logo_a.png';

function Login() {
  const {
    isDisabled,
    setIsDisabled,
    dataInputs,
    setDataInputs,
  } = useContext(context);

  const history = useHistory();

  const { email, password } = dataInputs;

  const handleInsertStorage = () => {
    localStorageUser({ email });
    history.push('/meals');
  };

  useEffect(() => {
    const validationGeneral = validationInputs(email, password);

    if (validationGeneral) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  return (
    <div className="login_container">

      <div className="bg_container" />

      <img className="monteiros_logo" src={ monteirosLogo } alt="monteiros_logo" />
      <h2 className="app_receitas">Receitas com Amor</h2>
      <img className="vegetais" src={ vegetais } alt="vegetais" />

      <Form className="form_login">
        <h1 className="login_title">LOGIN</h1>
        <label htmlFor="email">
          {/* Email: */}
          <input
            placeholder="Email"
            className="input_login item_login_form"
            type="text"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target: { value } }) => setDataInputs({ ...dataInputs,
              email: value }) }
          />
        </label>
        <label htmlFor="password">
          {/* Senha: */}
          <input
            placeholder="Password"
            className="input_login item_login_form"
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target: { value } }) => setDataInputs({ ...dataInputs,
              password: value }) }
          />
        </label>
        <button
          className="submit_buttom item_login_form"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          style={ isDisabled ? { opacity: '50%' } : {} }
          onClick={ handleInsertStorage }
        >
          ENTRAR
        </button>
      </Form>
    </div>
  );
}

export default Login;

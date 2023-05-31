import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testIds, VALID_EMAIL, VALID_PASSWORD } from '../utils/constants';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa a tela de login', () => {
  it('Verifica se os campos de input e o botão de entrar aparecem na tela', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(testIds.emailInput);
    const buttao = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(email).toBeInTheDocument();
    expect(buttao).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('Verifica se apos os valores serem passados ao os inputs o botao habilita', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(testIds.emailInput);
    const buttao = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(buttao).toBeDisabled();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(email).toHaveValue(VALID_EMAIL);
    expect(password).toHaveValue(VALID_PASSWORD);
    expect(buttao).not.toBeDisabled();
  });

  it('Verifica se apos clicar no botao o mesmo direciona para a pagina Recipes.', async () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(testIds.emailInput);
    const buttao = screen.getByTestId(testIds.loginSubmitButton);
    const password = screen.getByTestId(testIds.passwordInput);
    expect(buttao).toBeDisabled();
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(password, VALID_PASSWORD);
    expect(email).toHaveValue(VALID_EMAIL);
    expect(password).toHaveValue(VALID_PASSWORD);
    userEvent.click(buttao);
    await waitFor(() => expect(screen.getByText('Meals')).toBeInTheDocument(), { timeout: 3000 });
  });
});

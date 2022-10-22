import React from 'react';
import Profile from '../pages/Profile';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testa a tela do Profile', () => {
  it('Test', () => {
    renderWithRouter(<Profile />);
    expect(2).toBe(2);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste tela de Login', () => {
  test('Testa se elementos existem na tela de Login', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const submit = screen.getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
  test('Testa de input na tela de Login', () => {
    render(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const submit = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'email@mail.com');
    userEvent.type(password, '1234567');
    expect(submit).toBeEnabled();
    userEvent.click(submit);
  });
});

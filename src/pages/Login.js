import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';

/* Referência: https://www.npmjs.com/package/validator. */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const minLength = 6;
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <div>
      <div>
        <form>
          <label htmlFor="email">
            LOGIN:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              placeholder="Email"
              onChange={ (e) => setEmail(e.target.value) }
              required
            />
          </label>
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ (e) => setPassword((e.target.value).length) }
            required
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !isEmail(email) || (password <= minLength) }
            onClick={ (e) => handleSubmit(e) }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

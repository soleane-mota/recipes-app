import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

/* Referência: https://www.npmjs.com/package/validator. */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const minLength = 6;

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
              onChange={ (event) => setEmail(event.target.value) }
              required
            />
          </label>
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ (event) => setPassword((event.target.value).length) }
            required
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !isEmail(email) || (password <= minLength) }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

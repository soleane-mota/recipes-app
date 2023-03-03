import React from 'react';

function Login() {
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
            />
          </label>
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
          />
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

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
        </form>
      </div>
    </div>
  );
}

export default Login;

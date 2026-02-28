import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await login({ email, password });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      // backend endpoint expects token
      await login({ googleToken: tokenResponse.access_token });
    },
    onError: errorResponse => console.error(errorResponse),
  });

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={() => googleLogin()}>Sign in with Google</button>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';

export const Login = () => {
  //[state, this.setState]
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
  };

  return (
    <article id='login'>
      <h1>Iniciar sesión</h1>
      <form onSubmit={e => onSubmit(e)} className='login-form'>
        <label htmlFor=''>
          <p>Correo electrónico:</p>
          <input
            placeholder='ejemplo@correo.com'
            type='email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </label>
        <label htmlFor=''>
          <p>Contraseña:</p>
          <input
            placeholder='Contraseña'
            type='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </label>
        <label htmlFor=''>
          <input type='submit' name='login-btn' value='Iniciar sesión' />
        </label>
      </form>
    </article>
  );
};
export default Login;

import React, { useState } from 'react';

export const Register = () => {
  //[state, this.setState]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords don't match");
    } else {
      console.log(formData);
    }
  };

  return (
    <article id='register'>
      <h1>Registrarse</h1>
      <form onSubmit={e => onSubmit(e)} className='register-form'>
        <label htmlFor=''>
          <p>Usuario:</p>
          <input
            placeholder='Nombre del usuario.'
            type='text'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </label>
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
          <p>Confirmar contraseña:</p>
          <input
            placeholder='Confirma tu contraseña'
            type='password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
            minLength='6'
          />
        </label>
        <button>Registrarse</button>
      </form>
    </article>
  );
};
export default Register;

import React, { Fragment } from 'react';
import Login from '../auth/Login';
import Register from '../auth/Register';

export const Landing = () => {
  return (
    <Fragment>
      <main className='container'>
        <aside className='orange'></aside>
        <section className='register-container'>
          <Login />
          <Register />
        </section>
      </main>
    </Fragment>
  );
};
export default Landing;

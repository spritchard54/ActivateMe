import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// eslint-disable-next-line no-unused-vars
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="my-5">

      <div className="col-6 col-lg-5 mx-auto my-4 ">

        <div className="container mt-5 sub-form d-flex p-3">

          <div className="card-body">
            {data ? (

              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>

            ) : (

              <form onSubmit={handleFormSubmit}>

                <div className='form-box p-3'>

                  <h2 className="text-white mb-2">Login</h2>

                  <label htmlFor="loginInput" className='form-label login-input'>Username</label>

                  <input
                    id="email-input"
                    className="form-input border mb-3 p-2"
                    placeholder="e.g, email@email.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />

                  <label htmlFor="loginInput" className='form-label login-input'>
                    Password
                  </label>

                  <input
                    className="form-input border p-2"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />

                  <button
                    className="btn mt-4 submit-btn"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>

                </div>

              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='container d-flex justify-content-center gap-2'>
        <p className='text-light'>Not a member?</p>
        <a className="green-title" href='/signup'>Sign up!</a>
      </div>

    </main>
  );
};

export default Login;

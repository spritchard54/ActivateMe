import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="my-5">

      <div className="col-6 col-lg-5 mx-auto my-4">

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

                <h2 className="text-white mb-2">
                  Sign Up
                </h2>

                  <label htmlFor="loginInput" className='form-label login-input'>
                    Username
                  </label>

                  <input
                    className="form-input border mb-3 p-2"
                    placeholder="Please enter a username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="loginInput" className='form-label login-input'>
                    Email
                  </label>

                  <input
                    className="form-input border d-block mb-3 p-2"
                    placeholder="email@email.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />

                  <label htmlFor="loginInput" className='form-label login-input'>Password</label>

                  <input
                    className="form-input border d-block p-2"
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

      <div className='container d-flex justify-content-center gap-2' id='signup-main'>
        <p className='text-light'>Already a member?</p>
        <a className="green-title" href='/login'>Log in!</a>
      </div>

    </main>
  );
};

export default Signup;

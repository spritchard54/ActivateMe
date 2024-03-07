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
    <main className="flex-row justify-center my-4">
      
      <div className="col-6 col-lg-5 mx-auto my-4">
      
        <div className="card mt-5">
      
          <h4 className="card-header bg-dark text-light p-2 mb-4">Sign Up</h4>
      
          <div className="card-body my-4">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="loginInput" className='form-label loginInput'>Username</label>
                <input
                  className="form-input border d-block mx-auto w-75 mb-3 p-2"
                  placeholder="Please enter a username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <label htmlFor="loginInput" className='form-label loginInput'>Email</label>
                <input
                  className="form-input border d-block mx-auto w-75 mb-3 p-2"
                  placeholder="email@email.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label htmlFor="loginInput" className='form-label loginInput'>Password</label>
                <input
                  className="form-input border d-block mx-auto w-75 mb-3 p-2"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary d-block mx-auto mt-3"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
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
    </main>
  );
};

export default Signup;

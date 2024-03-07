import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

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
    <main className="flex-row justify-center my-4">
      
      <div className="col-6 col-lg-5 mx-auto my-4 ">
        
        <div className="card mt-5 ">
         
          <h4 className="card-header bg-dark text-light p-2 mb-4 ">Login</h4>
         
          <div className="card-body my-4 ">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="loginInput" className='form-label loginInput'>Username</label>
                <input
                  id="loginInput"
                  className="form-input border d-block mx-auto w-75 mb-3 p-2"
                  placeholder="e.g, email@email.com"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label htmlFor="loginInput" className='form-label loginInput'>Password</label>
                <input
                  className="form-input border d-block mx-auto w-75 p-2"
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

export default Login;

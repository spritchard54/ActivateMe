import { Link } from 'react-router-dom';

// import Auth from '../utils/auth';

export default function Header() {

  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
  
  return (
    <>

      <header className="container-fluid header d-flex align-items-center">

        <nav className="navbar d-flex justify-content-between align-items-center">


          <Link
            to={'/'}
            className='navbar-brand ms-4'
          >

            <h1 id="dev-name">
              Tom Dossman
            </h1>

          </Link>

          <div className="nav-box d-flex align-items-center gap-4 me-4">

            <Link
              to={'/portfolio'}
              className='nav-link'
            >

              <p className="text">
                Portfolio
              </p>

            </Link>

            <Link
              to={'/resume'}
              className='nav-link'
            >

              <p className="text">
                Resume
              </p>

            </Link>

            <Link
              to={'/contact'}
              className='nav-link'
            >

              <p className="text">
                Contact
              </p>

            </Link>


          </div>

        </nav>

      </header>

    </>

  )

}
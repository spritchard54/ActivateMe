import { Link } from 'react-router-dom';

export default function Footer() {

  return (

    <>

      <footer className="container-fluid d-flex align-items-center justify-content-around">

        <Link
          to={'/contact'}
          className='nav-link'
        >

          <p className="text">
            Contact Us
          </p>

        </Link>

        <Link
          to={'/about'}
          className='nav-link'
        >

          <p className="text">
            About Us
          </p>

        </Link>



      </footer>

    </>

  )

}
import { useNavigate } from "react-router-dom";
import '../css/home.css'

export default function Home() {

  let navigate =  useNavigate(); 

  const viewSignUp = () => {
    let path = `/signup`;
    navigate(path);
  }

  return (
    <>
      <main id='home-img' className="pt-5">

        <div className="container-fluid w-75 p-5 d-flex justify-content-center align-items-center">

          <div className="col d-flex flex-column text-center home-box align-items-center justify-content-center">
            <h1 className="fw-bold mb-3">Track<span className="green-title">.</span>Learn<span className="green-title">.</span>Improve</h1>
            <p className='mb-4'>
              When life takes over, take it back with <span className="green-title">Activate.</span> Create, log and analyze your daily activities so you can answer the age old question of &apos;Where did the time go?&apos; and get a hold of time before is slips away.
            </p>
              <button onClick={viewSignUp} className="mx-auto d-block px-3 signUpBtn">
                Sign Up
              </button>

          </div>

        </div>

      </main>



    </>

  )

}
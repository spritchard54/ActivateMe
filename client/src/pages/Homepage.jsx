import hero from "../assets/hp_hero.png"
export default function Home(){

  return(

    <div className="container-fluid w-75 mt-5 p-5 border">
    <div className="row">
      <div className="col">
        <img className="mx-auto" src={hero}></img>
      </div>
      <div className="col">
      <h1 className="fw-bold">Track<span className="orange">.</span>Learn<span className="orange">.</span>Improve</h1>
      <p>
        When life takes over, take it back with <span className="orange">Activate.</span> Create, log and analyze your daily activities so you can answer the age old question of &apos;Where did the time go?&apos; and get a hold of time before is slips away.
      </p>
      <a href={'/signup'}>
      <button className="mx-auto my-3 d-block px-3 signUpBtn">Sign Up</button>
      </a>
      </div>

    </div>
    
    </div>

  )

}
export default function AboutUs() {
  
  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center my-5">
      <div className="container sub-form p-5 my-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="green-title">About Page</h2>
        </div>
        <p className="mt-3 ms-3">
          Background ActivateMe is the result of a group project completed during
          the ‘23-’24 Winter/Spring Univeristy of Pennsylvania Full Stack Web
          Development Boot-camp. This project was developed using MongoDB,
          Express.js, React.js and Node.js, also know as MERN.
        </p>
        <h2 className="green-title mt-4">Project Contributors</h2>
        <ul className="mt-3 ms-5">
          <li>Bogdan Tkachuk</li>
          <li>Bogdan Tkachuk</li>
          <li>Lisa Lar</li>
          <li>Steve Pritchard</li>
          <li>Tom Dossman</li>
          <li>Tucker McKee</li>
        </ul>
        <h2 className="green-title mt-4">GitHub Repository</h2>
        <p className="mt-2">
          <a target="_blank" className="ms-4" href="https://github.com/spritchard54/ActivateMe">
            ActivateMe Repo
          </a>
        </p>
      </div>
    </div>
  );
}
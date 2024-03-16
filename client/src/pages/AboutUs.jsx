export default function AboutUs() {


  return (

    // <main id="about-img">

    <div id="about-img">
      <div className="container-fluid w-75 p-5 d-flex justify-content-center align-items-center" id="about-main">
        <div className="container sub-form p-5 mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="green-title">About Page</h2>
          </div>
          <p className="mt-3 ms-3 me-3">
            ActivateMe is the result of a group project completed during
            the ‘23-’24 Winter/Spring Univeristy of Pennsylvania Full Stack Web
            Development Bootcamp. This project was developed using MongoDB,
            Express.js, React.js and Node.js, also know as the MERN stack.
          </p>
          <h2 className="green-title mt-4">Project Contributors</h2>
          <ul className="mt-3 ms-5">
            <a href="https://github.com/aldu1n" target="_blank">
              <li>Bogdan Tkachuk</li>
            </a>

            <a href="https://github.com/ayoleese" target="_blank">
              <li>Lisa Lar</li>
            </a>

            <a href="https://github.com/spritchard54" target="_blank">
              <li>Steve Pritchard</li>
            </a>

            <a href="https://github.com/Dossman-thomas" target="_blank">
              <li>Tom Dossman</li>
            </a>

            <a href="https://github.com/McKee-T" target="_blank">
              <li>Tucker McKee</li>
            </a>

          </ul>
          <h2 className="green-title mt-4">GitHub Repository</h2>
          <p className="mt-2">
            <a target="_blank" className="ms-4" href="https://github.com/spritchard54/ActivateMe">
              ActivateMe Repo
            </a>
          </p>
        </div>
      </div>

    </div>

    // </main>

  );
}
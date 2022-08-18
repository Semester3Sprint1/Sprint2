import React from "react";


const Footer = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex flex-row justify-content-evenly">
        <span
          className="list-group-item list-group-item-action active"
          aria-current="true"
        >
          {/* Store Hours */}
          <h5 className="mb-1">Copyright &copy; for Squishy Kitty Tech</h5>
        </span>
        {/* Follow Us */}
        <span className="list-group-item list-group-item-action active">
          <h5 className="mb-1">Follow Us</h5>
          <p className="mb-1">
            {" "}
            <a href="#">Twitter</a>
          </p>
          <p className="mb-1">
            {" "}
            <a href="#">Facebook</a>
          </p>
          <p className="mb-1">
            {" "}
            <a href="#">Instagram</a>
          </p>
        </span>

        {/* Contact Us */}
        <span className="list-group-item list-group-item-action active">
          <h5 className="mb-1">Contact Us</h5>
          <p className="mb-1">Toll Free: 1-800-555-SquihyKitty</p>
          <p className="mb-1">
            <a href="mailto:payreviews@email.com" target="_blank">
              Email: payreviews@email.com
            </a>
          </p>
        </span>
      </div>

      {/* </div> */}
    </nav>
  );
};

export default Footer;

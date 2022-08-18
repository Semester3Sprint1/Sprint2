import { Fragment } from "react";
import styles from "./css/Main.module.css";
import { useContext } from "react";
import Header from "./header";
import Auth from "../Account/Auth/Auth";
import AuthContext from "../Context/auth-context";
import Logo from "./images/Logo.svg";
import { FaPaw } from "react-icons/fa";

const Main = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <Header />

      {!isLoggedIn && <Auth />}
      {isLoggedIn && (
        <div className={styles.gridContainer}>
          <img src={Logo} alt="Our Logo" className={styles.logo} />

          <div className={styles.facts}>
            <h3> Squishy Kitty Facts</h3>
            <ul>
              <li>
                {" "}
                <FaPaw /> - Over 25,000 Movies to be Reviewed
              </li>
              <li>
                {" "}
                <FaPaw /> - Choose from Our Ameowzing Databases
              </li>
              <li>
                {" "}
                <FaPaw /> - Weekly Prize Draws{" "}
              </li>
              <li>
                {" "}
                <FaPaw /> - Squishy Kitty Featured Movie is:{" "}
              </li>
              <li>
                {" "}
                <FaPaw /> - Cool Runnings{" "}
              </li>
              <li>
                {" "}
                <FaPaw /> - Leave A Paw Rating
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Main;

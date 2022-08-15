import {Fragment, useContext} from 'react'
import classes from './css/Header.module.css'
import AuthContext from '../Context/auth-context';
import Border from '../UI/Border'

const Header = () => {
    const authCtx = useContext(AuthContext);
  return (
    <Fragment>
     <Border>
      <div className={classes.slideshow}>
        <div className={classes.mover1}></div>
        <div className={classes.mover2}></div>
      </div>
      </Border>
      <header className={classes.header}>
        <h2>Welcome {authCtx.username}  to Your Source for All Thing Movies</h2>
        {!authCtx.isLoggedIn &&
        <p className={classes.pHeader}>Log in to get acess to everything our site has to offer</p>}
        {authCtx.isLoggedIn &&
        <p className={classes.pHeader}>Select a Movie Database To Begin</p>}
      </header>
    </Fragment>
  );
};


export default Header
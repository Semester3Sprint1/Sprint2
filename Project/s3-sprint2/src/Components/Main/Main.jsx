import { Fragment } from "react";
import styles from "./css/Main.module.css";
import joe from "./images/joeYoung.jpg";
import devil from "./images/devilToPay.jpg";
import React from "react";

/*
--- COMPONENTS TO ADD ---
Header
Nav Bar
Home Page
Footer
*/

const Main = () => {
  return (
    <Fragment>
      <div className={styles.slideshow}>
        <div className={styles.mover1}></div>
        <div className={styles.mover2}></div>
      </div>
      <div className={styles.pagewrapper}>
        <h1>Your source for movie reviews!</h1>
        <p>
          Classic and recent movies from the early 1900's and up, Movies Reviews
          will have what you need when you need information about your favorite
          film. Tell the world what you think about your favorite movie, whether
          it be mainstream or obscure films. Movies Reviews has it all!
        </p>
        <p className={styles.reviewTitle}>Reviews:</p>
        <div className={styles.gridContainer}>
          <div className={styles.review}>
            <img src={joe} alt="Joe Young" height="200" />
            <span className={styles.reviewquote}>
              This was the best movie ever growing up, I must have watched it a
              100 times on WPIX and WOR. If it was on I was watching it and to
              see it on DVD brought back enjoyable memories. A fantastic movie
              when you consider it was made in 1949 the special effects are
              incredible. About a young girl who is discovered with a gorilla, a
              very large gorilla and is brought to America for shows. Not as big
              or crazy as King Kong, but more enjoyable. The only disappointment
              in the film was near the end when the filmed turned an awful brown
              color, my guess original film was damaged, and that's a shame. I'm
              giving this one 5 stars how could I give it less. The commentary
              film was an added bonus.
              <br />
              <br /> - Bruce B (Super Reviewer - Rottentomatoes.com)
            </span>
          </div>
          <div className={styles.review2}>
            <img src={devil} alt="Devil to Pay" height="200" />
            <span className={styles.reviewquote}>
              So, Amazon buying MGM already appears to have paid dividends with
              the appearance of a bunch of rare Sam Goldwyn productions
              (preceded by the MGM lion logo) popping up free to view on Amazon
              Prime. No complaints about this development though I'll try to
              watch them pretty quickly cos even old stuff tends to get priced
              after a grace period of being gratis. Before Cary Grant and David
              Niven were twinkles in the eye of a casting director, the slot of
              debonair Englishman was amply filled by Ronald Colman. Even in the
              earliest of talkies, he had a gossamer touch with dialogue,
              delivered in rich smooth tones. He had had a successful career as
              a good-looking silent actor but the additional calling card of his
              voice propelled him into the talking era with an ease that must
              have had his contemporaries spitting into their microphones. The
              Devil to Pay! is a bit of fluff floating around the delectable
              love triangle of silver-tongued Colman, gorgeous Loretta Young and
              captivating Myrna Loy. Quite a tough choice there, Ronnie! It has
              a very amusing Southern Californian interpretation of what the
              Epsom Derby might look like but its chief pleasure is in watching
              three great performers managing to step out of the early talkie
              treacle quite successfully.
              <br />
              <br />- Fint - (letterboxd.com)
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Main;

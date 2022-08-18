import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./css/banner.module.css";

const Banner = () => {
  const [posters, setPosters] = useState([]);

  const getPosters = async () => {
    console.log("I begin check");
    const res = await fetch(
      "http://localhost:3001/movies/mongo/banner/getBanner"
    );
    const data = await res.json();
    console.log(data);

    setPosters(data);
  };

  useEffect(() => {
    getPosters();
  }, []);

  const picBanner = () => {
    return (
      <>
        {posters.map((poster) => {
          return (
            <>
              {poster.poster ? (
                <img
                  src={poster.poster}
                  alt="A movie poster"
                  key={poster._id}
                />
              ) : null}
            </>
          );
        })}
      </>
    );
  };

  return <div className={styles.banner}>{picBanner()}</div>;
};

export default Banner;

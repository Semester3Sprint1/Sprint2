import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Banner = () => {
  const [posters, setPosters] = useState([]);

  const getPosters = async () => {
    console.log("I begin check");
    const res = await fetch(`http://localhost:3001/movies/mongo/getBanner`);
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
            <img src={poster.poster} alt="A movie poster" key={poster._id} />
          );
        })}
      </>
    );
  };

  return <div>Words</div>;
};

export default Banner;

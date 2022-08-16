import React from "react";
import classes from './css/ListGroup.module.css'

let ListGroup = ({ genres, onItemSelect, selectedItem }) => {
 
  return (
    <div className={classes.ListGroup}>
      <ul >
        <li  className={classes.dark}>Select Genre</li>
        <li
          onClick={() => {
            onItemSelect("All");
          }}
          className= { selectedItem === "All" ? `${classes.active}`: classes.deactive}
          
        >
          All
        </li>
        {genres.map((genre, i) => {
          return (
            <li
              onClick={() => {
                onItemSelect(genre);
              }}
              key={i}
              className={
                selectedItem === genre ? `${classes.active}`: classes.deactive
                  
              }
            >
              {" "}
              {genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ListGroup.defaultProps = {
  selectedItem: "Action",
  textProperty: "genre",
};

export default ListGroup;

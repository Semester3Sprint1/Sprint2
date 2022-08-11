import React from "react";


let ListGroup = ({ genres, onItemSelect, selectedItem }) => {
 
  return (
    <div className="mt-2">
      <ul className="list-group clickable">
        <li className="list-group-item active bg-dark">Select Genre</li>
        <li
          onClick={() => {
            onItemSelect("All");
          }}
          className={
            selectedItem === "All"
              ? " bg-primary list-group-item list-group-item-action active"
              : " list-group-item list-group-item-action"
            
          }
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
                selectedItem === genre
                  ? " bg-primary list-group-item list-group-item-action active"
                  : " list-group-item list-group-item-action"
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

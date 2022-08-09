import React from "react";

let ListGroup = ({ genres, valueProperty, onItemSelect, selectedItem }) => {
  // console.log(genres);

  return (
    <div className="mt-2">
      <ul className="list-group clickable">
        <li className="list-group-item active bg-dark">Select Genre</li>

        {genres.map((genre) => {
          return (
            <li
              onClick={() => {
                onItemSelect(genre);
              }}
              key={genre[valueProperty]}
              className={
                selectedItem === genre
                  ? " bg-primary list-group-item list-group-item-action active "
                  : " list-group-item list-group-item-action "
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
  valueProperty: "id",
};

export default ListGroup;

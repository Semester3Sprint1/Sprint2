import React from 'react'

let ListGroup =  ({genres, textProperty, valueProperty ,onItemSelect, selectedItem}) => {
    
  return (
    <div className='mt-2'>
    <ul className="list-group clickable">
      <li className='list-group-item active bg-dark'>Select Genre</li>

            {genres.map((genre) =>{
              return <li onClick={() => {onItemSelect(genre)}} 
              key={genre[valueProperty]}
              className= {selectedItem === genre 
              ? 'list-group-item list-group-item-action active'
            : 'list-group-item list-group-item-action '}> {genre[textProperty]}</li>
            })} 
    </ul>
  </div>
);
}

ListGroup.defaultProps = {
  textProperty: "genre",
  valueProperty: "id",
};


export default ListGroup;


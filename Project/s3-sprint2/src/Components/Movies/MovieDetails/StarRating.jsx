import { useState } from 'react'
import classes from './StarRating.module.css'
import { FaStar } from 'react-icons/fa'
 const StarRating = () => {

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

  return (
    <div>
        <h2>Your Rating {rating}/10</h2>
        {[...Array(10)].map((star,i) =>{
            const ratingValue = i + 1;
            return  <label>
                <input
                key= {i} 
                type="radio" 
                name="rating" 
                id="rating" 
                value={ratingValue} 
                onClick={()=>setRating(ratingValue)}
               
                />
                <FaStar 
                className={classes.star} 
                color={ratingValue<= (hover ||rating) ? "#ffc107" : "#e4e5e9"} 
                size={50}
                onMouseEnter={()=> setHover(ratingValue)}
                onMouseLeave = {() => setHover(null)}
                /></label>
        })}
         </div>
  )
}

export default StarRating;


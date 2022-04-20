import React from 'react'
import './CardCountry.css'
import { Link } from "react-router-dom";
const CardCountry = ({name,continente,img,id}) => {

  return (
    <div className='cardCounty'>
      
      <h4 className='name' >{name}</h4>
      <Link to={{pathname:`/info/${id}`}}>
        <img className='img'
        style={{ Height: 200, width: 260 }}
        alt="casa"
          width={"160px"}
          height={"200px"}
        src={img}
      />
      </Link>
      <h4 style={{textAlign:"center"}}>{continente}</h4>
    </div>
  )
}

export default CardCountry
import React from 'react'
import './CardCountry.css'
import { Link } from "react-router-dom";
const CardCountry = ({name,continente,img,id}) => {

  return (
    <div className='cardCounty'>
      <h4>{name}</h4>
      <Link to={{pathname:`/info/${id}`}}>
        <img className='img'
        style={{ Height: 300, width: 300, marginTop: 25 }}
        alt="casa"
        width={"60px"}
        height={"160px"}
        src={img}
      />
      </Link>
      <h4>{continente}</h4>
    </div>
  )
}

export default CardCountry
import React from 'react'
import './CardCountry.css'

const CardCountry = ({name,continente,img}) => {

  return (
    <div className='cardCounty'>
      <h4>{name}</h4>
        {/* <a >{name}</a> */}
        <img
        style={{ Height: 300, width: 300, marginTop: 25 }}
        alt="casa"
        width={"60px"}
        height={"160px"}
        src={img}
      />
      <h4>{continente}</h4>
        {/* <a >{continente}</a> */}
    </div>
  )
}

export default CardCountry
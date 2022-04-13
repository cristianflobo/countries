import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { inicio } from '../actions/actions'
import './Inicio.css'
const Inicio = () => {
  const Dispatch = useDispatch()
  const countries = useSelector((store => store.countries.countrie))
  
    console.log("inicio",countries)
  
  return (
    <div className='inicio' >
      <Link to="/home">
        <button className='button' onClick={()=>Dispatch(inicio())}>Home</button>
      </Link>
    </div>
  )
}

export default Inicio
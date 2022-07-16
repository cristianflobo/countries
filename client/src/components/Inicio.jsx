import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { inicio, nameTourFu } from '../actions/actions'
import './Inicio.css'
const Inicio = () => {
  const Dispatch = useDispatch()

  useEffect(() => {

  }, [])
  const onClick = ()=>{
      Dispatch(inicio())
      Dispatch(nameTourFu())
  }
  
  return (
    <div className='inicio' >
      <Link to="/home">
        <button className='button' onClick={()=>onClick() }>Home</button>
      </Link>
    </div>
  )
}

export default Inicio
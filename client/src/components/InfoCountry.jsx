import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { inicio } from '../actions/actions'
import './InfoCountry.css'

const InfoCountry = () => {
    var find = []

    const Dispatch = useDispatch()
    const info =useSelector((store =>store.countries.countrie))
    const load =useSelector((store =>store.countries.load))
    if (info.length === 0) {
        Dispatch(inicio())
    }
    const id = useParams().id
    if(load){
        
        find = info.find(item => item.id == id )

    }
    return (
    <div className='infoCountry'>  
        {/* <img src="https://img.freepik.com/vector-gratis/mapa-mundial-nodos-unidos-lineas-mapa-estructura-poligonal_110633-321.jpg" className='imgPri' alt="" /> */}
        <div className='card'>
            <div className='bandera'>
                <img className='imgbandera' src={find.imagen}></img>
            </div>
            <div className='info'>
                <span style={{borderBottom:"1px solid"}}>Nombre: {find.name}</span>
                <span style={{borderBottom:"1px solid"}}>Codigo pais: {find.id}</span>
                <span style={{borderBottom:"1px solid"}}>Continente: {find.continente}</span>
                <span style={{borderBottom:"1px solid"}}>Capital: {find.capital}</span>
                <span style={{borderBottom:"1px solid"}}>Subregion: {find.subregion}</span>
                <span style={{borderBottom:"1px solid"}}>Area: {find.area} km<sup>2</sup></span>
                <span style={{borderBottom:"1px solid"}}>Poblacion: {find.poblacion}</span>
                <span>Actividad:</span>
                    {
                        (!find.tours)? <span>Nooo hay actividad </span>:
                        find.tours.map(item=> <li>{item.name}</li> )
                    }
            </div>
           
           
        </div>
         <div className='divolver'>
                <Link to="/home">
                    <button className='volver'>Volver</button>
                </Link>
            </div>                
        
    </div>
    )
    
    
}

export default InfoCountry


// number.toLocaleString('es-CO')
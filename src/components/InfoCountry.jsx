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
                <span>Nombre: {find.name}</span>
                <span>Codigo pais: {find.id}</span>
                <span>Continente: {find.continente}</span>
                <span>Capital: {find.capital}</span>
                <span>Subregion: {find.subregion}</span>
                <span>Area: {find.area} km<sup>2</sup></span>
                <span>Poblacion: {find.poblacion}</span>
                <span>Actividad:</span>
                    {
                        (!find.tours)? <span>Nooo hay actividad </span>:
                        find.tours.map(item=> <li>{item.name}</li> )
                    }
            </div>
            
            <Link to="/home">
                <button className='volver'>Volver</button>
            </Link>

        </div>
        
    </div>
    )
    
    
}

export default InfoCountry


// number.toLocaleString('es-CO')
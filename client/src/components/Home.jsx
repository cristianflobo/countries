import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inicio } from '../actions/actions'
import CardCountry from './CardCountry'
import './Home.css'

const Home = () => {
  var cont = 0
  const arrayFor =[]
  const Dispatch = useDispatch()
  const countries = useSelector((store => store.countries.countrie))
  const load= useSelector((store => store.countries.load))
  
  if (countries.length === 0 ) {
    console.log("first")
    Dispatch(inicio())
  }
  if (arrayFor.length === 0) { 
    for (let i = 0; i < 9; i++) {
      arrayFor.push(countries[i])  
    }
    cont = 9
  } else{
    for (let i = cont; i < (cont+10); i++) {
      arrayFor.push(countries[i])  
    }
    cont = cont + 10
  }
  
  
  
  return (
    <div className='home'>
      <div className='barra'>
      <input className='input' placeholder='Nombre del pais' ></input>
      <button className='boton1'>buscar</button>
      <button className='boton2'>buscar</button>
      </div>
      <ul>
       {   
       (load)? arrayFor &&  arrayFor.map((item) =>{
          return (
           <li className='Card' >
           <CardCountry name={item.name} img ={item.imagen} continente={item.continente}/> 
           </li>  
           ) })
           :<img style={{display:"block",margin:"auto"}} src="https://pa1.narvii.com/6607/6da40c914c7145c591c0777ada8a9a177bb4f9ba_hq.gif"/>           
        }
        
      </ul>   
    </div>
  )
}

export default Home


// {   
//   carga? poke && poke.map((item,i) =>{
//       return (
//        <li className='Card' key={item.id}>
//        <CardPoquemone name={item.name} img ={item.sprites.other.home.front_default} id={item.id}/> 
//        </li>  
//        ) })   :<img style={{display:"block",margin:"auto"}} src="https://pa1.narvii.com/6607/6da40c914c7145c591c0777ada8a9a177bb4f9ba_hq.gif"/>           
// }

// arrayFor.map((item) =>{
//   return (
//    <li className='Card' key={item.id}>
//    {/* <CardCountry name={item.name} img ={item.imagen} continente={item.contienente}/>  */}
//    </li>  
//    ) })   
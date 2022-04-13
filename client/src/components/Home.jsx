import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inicio } from '../actions/actions'
import CardCountry from './CardCountry'
import './Home.css'
let count = 0
let ini = 0
let fin = 9
const Home = () => {
  var arrayFor =[]
  const Dispatch = useDispatch()
  const countries = useSelector((store => store.countries.countrie))
  const load= useSelector((store => store.countries.load))
  const [page, setPage] = useState({
    pagina:0,
    ini:0,
    fin:9,
    arrayPage:[]
  })
  
  if (countries.length === 0 ) {
    Dispatch(inicio())
  }
console.log(countries)
 
  if (page.pagina === 0 && countries.length != 0 ) {
    arrayFor = countries.slice(ini,fin)
    setPage({
      ...page,
      pagina:2,
      arrayPage:arrayFor
    })
  }


  const adelante = () =>{
    if (count !== 25) {
    count = count+1
    ini = fin 
    arrayFor = countries.slice(ini, fin=(count*10)+9)
    
    setPage({ 
       ...page, 
    arrayPage:arrayFor,
    }) 

  }
  }
  const atras = () =>{
    if (count != 0) {       
      count = count-1
      ini = ini-10 
      fin = fin -10
      if (count == 0) {
        ini = 0
      }
      arrayFor = countries.slice(ini, fin)
      setPage({ 
        ...page, 
        arrayPage:arrayFor,
      }) 
   
    }
  }
  

  return (
    <div className='home'>
      <input className='input' placeholder='Nombre del pais' ></input>
      <button className='boton1'>buscar</button>
      <button className='boton2'>buscar</button>
     
      <ul>
       {   
       (load)? page.arrayPage &&  page.arrayPage.map((item) =>{
          return (
           <li className='Card' >
           <CardCountry name={item.name} img ={item.imagen} continente={item.continente}/> 
           </li>  
           ) })
           :<img style={{display:"block",margin:"auto"}} src="https://pa1.narvii.com/6607/6da40c914c7145c591c0777ada8a9a177bb4f9ba_hq.gif"/>           
        }
        
      </ul> 
      <div className='pagina'>
        <button className='atras'onClick={()=>atras()} >{"<<"}</button>
        <span className='numpage'>{count+1}</span>
        <button className='adelante' onClick={()=>adelante()} >{">>"}</button> 
      </div> 
    </div>
  )
}

export default Home


// console.log(page.pagina)
// if (page.pagina === 0 && countries.length != 0 ) {
//   arrayFor = countries.slice(page.ini,page.fin)
//   setPage({
//     ...page,
//     pagina:1,
//     arrayPage:arrayFor
//   })
// }


// const adelante = () =>{
//   count = count+1
// arrayFor = countries.slice(page.ini,page.fin)
//  setPage({
//   ...page,
//   ini:page.fin,
//   fin:(page.pagina*10)+9,
//   pagina:page.pagina +1,
//   arrayPage:arrayFor,
//  }) 
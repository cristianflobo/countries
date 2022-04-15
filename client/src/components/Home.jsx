import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inicio,filtroCont} from '../actions/actions'
import CardCountry from './CardCountry'
import './Home.css'
let count = 0
let ini = 0
let fin = 9

const Home =  (e) => {
  let estados = useState() 
  var arrayFor =[]
  const Dispatch = useDispatch()
  const countries = useSelector((store => store.countries.countrie))
  const load = useSelector((store => store.countries.load))
  const filContry = useSelector((store => store.countries.filContry))
  const [page, setPage] = useState({
    pagina:0,
    ini:0,
    fin:9,
    nueve:false,
    arrayPage:[]
  })
  const [filtroCon, setFiltroCon] = useState([])
    console.log("cargandooo...",countries.length)
  if (countries.length === 0 ) {
    console.log("cargandooo...",countries.length) 
    
   Dispatch(inicio())
  }

  if (page.nueve === false && countries.length != 0 ) {
    arrayFor = filContry.slice(ini,fin)
    setPage({
      ...page,
      nueve:true,
      arrayPage:arrayFor
    })
  }
  
  const adelante = () =>{
    console.log("MAS")
    if (count <= (Math.floor(filContry.length/10)-1)) {  //para limitar el paginado
      count = count+1
      ini = fin 
      arrayFor = filContry.slice(ini, fin=(count*10)+9) 

      
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
  
  const filtroContienente = async (e)=>{
    console.log("FILTRO")
    const {value} = e.target
    Dispatch(filtroCont(countries,value ))
    count = 0
    ini = 0
    fin = 9
      arrayFor =countries.slice(ini,fin) 
      setPage({ 
        ...page,
        nueve:false,
        arrayPage: arrayFor,
      }) 
    
   arrayFor =countries.slice(ini,fin) 
         
   
}
  //console.log(countries)
  return (
    <div className='home'>
      <div className='barra'>
        <input className='input' placeholder='Nombre del pais' ></input>
        <button className='boton1'>buscar</button>
        <button className='boton2'>buscar</button>
      </div>
      <div className='continentes'>
        <button type='submit' value="Asia"  onClick={(e)=>filtroContienente(e)}>Asia</button>
        <button type='submit' value="Americas"  onClick={(e)=>filtroContienente(e)} >América</button>
        <button type='submit' value="Africa"  onClick={(e)=>filtroContienente(e)}>África</button>
        <button type='submit' value="Antarctic"  onClick={(e)=>filtroContienente(e)}>Antártida</button>
        <button type='submit' value="Europe"  onClick={(e)=>filtroContienente(e)}>Europa</button>
        <button type='submit' value="Oceania" name='Oceania' onClick={(e)=>filtroContienente(e)}>Oceanía</button>
      </div>
      <select id="framework">
        <option value="1">Angular</option>
        <option value="2">React</option>
      </select>
      <ul className='map'>
        {   
        (load)? page.arrayPage &&  page.arrayPage.map((item) =>{
          return (
           <li className='Card' >
           <CardCountry 
            name={item.name}
            img ={item.imagen} 
            continente={item.continente} 
            id ={item.id} 
            capital ={item.capital}
            subregion={item.subregion}
            area={item.area}
            poblacion={item.poblacion}
            />
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



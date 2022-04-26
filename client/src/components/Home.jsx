import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { inicio,filtroCont, searchName,ordenAccion,nameTourFu} from '../actions/actions'
import CardCountry from './CardCountry'
import Filtro from './Filtro'
import './Home.css'
let count = 0
let ini = 0
let fin = 9
let arraySelect = []
let arraySelect2 = []
const Home =  () => {
  var arrayFor =[]
  const Dispatch = useDispatch()
  const countries = useSelector((store => store.countries.countrie))
  const {load,filContry,ordenamiento,nameTour} = useSelector((store => store.countries))
  const [search, setSearch] = useState({letra:""})
  const [page, setPage] = useState({
    orde:true,
    nueve:false,
    arrayPage:[]
  })
  const orden = (e)=>{
    const {value} = e.target
    Dispatch(ordenAccion(value))
    setPage({
      ...page,
      orde:true,
    })
  }
  //-----------------------------------------------------------
    useEffect(() => {                     
      if (countries.length === 0 ) {
        Dispatch(inicio())
        Dispatch(nameTourFu())
      }
    }, [Dispatch])
   //----------------------------------------------------------- 
  
  if(ordenamiento === "A-Z"){   
    filContry && filContry.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
  }
  if(ordenamiento === "A-Z" && page.orde === true){
    filContry && filContry.sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
      arrayFor = filContry.slice(ini,fin)
      setPage({
        ...page,
        orde:false,
        arrayPage:arrayFor
      })
    }
  if(ordenamiento === "Z-A" && page.orde === true){
    filContry && filContry.sort((a, b) => {
        if (a.name > b.name) return -1
        if (a.name < b.name) return 1
        return 0
      })
      arrayFor = filContry.slice(ini,fin)
      setPage({
        ...page,
        orde:false,
        arrayPage:arrayFor
      })
    }
  if(ordenamiento === "Poblacion+-" && page.orde === true){   
    filContry && filContry.sort((a, b) => {
        if (a.poblacion > b.poblacion) return -1
        if (a.poblacion < b.poblacion) return 1
        return 0
      })
      arrayFor = filContry.slice(ini,fin)
      setPage({
        ...page,
        orde:false,
        arrayPage:arrayFor
      })
  }
  if(ordenamiento === "Poblacion-+" && page.orde === true){   
    console.log("Poblacion")
    filContry && filContry.sort((a, b) => {
        if (a.poblacion > b.poblacion) return 1
        if (a.poblacion < b.poblacion) return -1
        return 0
      })
      arrayFor = filContry.slice(ini,fin)
      setPage({
        ...page,
        orde:false,
        arrayPage:arrayFor
      })
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
     
      const {value} = e.target
      Dispatch(filtroCont(countries,value ))
      count = 0
      ini = 0
      fin = 9
      arrayFor = countries.slice(ini,fin) 
      setPage({ 
        ...page,
        nueve:false,
        arrayPage: arrayFor,
      })        
  }
  const handleOnchange = (e) =>{
    setSearch({
      ...search,
      letra:e.target.value.toLowerCase()
    })
  }
  const onClick = (e)=>{
      const letra = e.target.value
      console.log(page.arrayPage)
      const filtro = filContry.filter((item,i)=> item.name.startsWith(`${letra}`) === true)
      arrayFor = filtro.slice(ini,fin)
      Dispatch(searchName(filtro)) 
        setPage({ 
          ...page,
          arrayPage: arrayFor,
      })
  }
  return (
    <div className='home'>
      <Link to="/form">
      <button>Crear Tour</button>
      </Link>
      <div className='barra'>
        <span>Ordenar: </span>
        <select type="submit"  name="select" onChange={(e)=> orden(e)} >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Poblacion+-">Poblacion (+ -) </option>
            <option value="Poblacion-+">Poblacion (- +)</option>
        </select>
        
        <span>Filtrar por tour: </span>
        <select style={{width:100}} >
          <option value="A-Z"></option>
          {
           nameTour.map(item => <option value="A-Z">{item.name}</option>)
          }
        </select>
        <input  className='input' placeholder='Nombre del pais' onChange={(e)=>handleOnchange(e)} ></input>
        <button type='submit' onClick={(e)=>onClick(e)} value={search.letra} className='boton1'>buscar</button>
      </div>
      {   
      <div className='continentes'>
        <button className='asia' type='submit' value="Asia"  onClick={(e)=>filtroContienente(e)}>Asia</button>
        <button className='americas' type='submit' value="Americas"  onClick={(e)=>filtroContienente(e)} >América</button>
        <button className='africa' type='submit' value="Africa"  onClick={(e)=>filtroContienente(e)}>África</button>
        <button className='antartic' type='submit' value="Antarctic"  onClick={(e)=>filtroContienente(e)}>Antártida</button>
        <button className='europe' type='submit' value="Europe"  onClick={(e)=>filtroContienente(e)}>Europa</button>
        <button className='oceania' type='submit' value="Oceania" name='Oceania' onClick={(e)=>filtroContienente(e)}>Oceanía</button>   
      </div>
      }
      <button className='todos' type='button' value="todos" name='todos' onClick={(e)=>filtroContienente(e)}>Todos los Paises</button>
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
            actividad={(item.tours[0]===undefined)?"No tiene actividad":item.tours[0].name}
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



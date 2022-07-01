import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { inicio,filtroCont, searchName,ordenAccion,nameTourFu, filtroTour} from '../actions/actions'
import CardCountry from './CardCountry'
import Filtro from './Filtro'
import './Home.css'
let count = 0
let ini = 0
let fin = 9
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
  
  const mapTour = (e)=>{
    console.log(e.target.value)
    let aja = []
    if (e.target.value !== "2510") {
      countries.map(itemap=> {
        if (itemap.tours.length > 0) {
          const ret = itemap.tours.filter(item =>item.name === e.target.value)
          if (ret.length > 0 ) {
            aja.push(itemap)
          }      
        }
      })
      Dispatch(filtroTour(aja))
      count = 0
      ini = 0
      fin = 9
      arrayFor = aja.slice(ini,fin) 
    }else{
      count = 0
      ini = 0
      fin = 9
      arrayFor = countries.slice(ini,fin) 
      const value = "todos"
      Dispatch(filtroCont(countries,value))
    }
    
    setPage({ 
      ...page,
      nueve:true,
      arrayPage: arrayFor,
    }) 
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
      console.log("acc",letra)
      const filtro = filContry.filter((item,i)=> item.name.startsWith(`${letra}`) === true )
      arrayFor = filtro.slice(ini,fin)
      Dispatch(searchName(filtro)) 
        setPage({ 
          ...page,
          arrayPage: arrayFor,
      })
  }

  return (
    <div className='home'>
      {/* <img src="https://img.freepik.com/vector-gratis/mapa-mundial-nodos-unidos-lineas-mapa-estructura-poligonal_110633-321.jpg" className='imgPri' alt="" /> */}
      
      <div className='barra'>
        <span>Ordenar: </span>
        <select className='selectOrden' type="submit"  name="select" onChange={(e)=> orden(e)} >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Poblacion+-">Poblacion (+ -) </option>
            <option value="Poblacion-+">Poblacion (- +)</option>
        </select>
        
        <span>Filtrar por tour: </span>
        <select className='selectTour' type="submit"  name="select2"  onChange={(e)=>mapTour(e) } >
          <option value="2510" >Todos</option>
          {
           nameTour.map(item => <option value={item.name}>{item.name}</option>)
          }
        </select>
        <input  className='input' placeholder='Nombre del pais' onChange={(e)=>handleOnchange(e)} ></input>
        <button type='submit' onClick={(e)=>onClick(e)} value={search.letra} className='boton1'>Buscar</button>
        <Link to="/form">
          <button className='animated flash'>Crear Tour</button>
        </Link>
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
     
          if (item.tours.length === 0) {
            item.tours.push({name:"No tiene actividad"})
          }
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
            actividad={(item.tours.length == 1)?item.tours[0].name:item.tours[0].name}
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



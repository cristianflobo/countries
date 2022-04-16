import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inicio,filtroCont, searchName} from '../actions/actions'
import CardCountry from './CardCountry'
import './Home.css'
let count = 0
let ini = 0
let fin = 9

const Home =  () => {
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
  const [search, setSearch] = useState({letra:""})
    
  if (countries.length === 0 ) {
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
  console.log(Math.floor(filContry.length/10)-1)
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
      arrayFor =countries.slice(ini,fin) 
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
    const letra = e.target.value.toLowerCase()
    const letra2 = "casa carro" 
    console.log(page.arrayPage)
    const filtro2 = filContry.filter((item,i)=> item.name.startsWith(`${letra}`) === true)
    arrayFor =filtro2.slice(ini,fin)
    Dispatch(searchName(filtro2)) 
      setPage({ 
        ...page,
        arrayPage: arrayFor,
      })
   // console.log(filtro2)

    }
  
  return (
    <div className='home'>
      <div className='barra'>
        <input  className='input' placeholder='Nombre del pais' onChange={(e)=>handleOnchange(e)} ></input>
        <button type='submit' onClick={(e)=>onClick(e)} value={search.letra} className='boton1'>buscar</button>
        <button className='boton2'>buscar</button>
      </div>
      <div className='continentes'>
        <button className='asia' type='submit' value="Asia"  onClick={(e)=>filtroContienente(e)}>Asia</button>
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



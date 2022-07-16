import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { form, inicio, nameTourFu } from '../actions/actions'
import validationForm from '../validation/validationForm'
import './Form.css'
import foto from "../Imagenes/tour.jpg"
import { useNavigate } from 'react-router-dom'
let nameMach = []
const Form = () => {
  const navegacion = useNavigate()
    const Dispatch = useDispatch()
    const countries = useSelector((store => store.countries.countrie))
    const [machName, setmachName] = useState({
      uni:10006,
      submit:false
    })
    
    useEffect(() => {                     
        if (countries.length === 0 ) {
          Dispatch(inicio())
        }
      }, [Dispatch])
    nameMach = countries.map(item =>item.name)

    const prueba = (e) =>{
        e.preventDefault();
        for (let i = 0; i < 4; i++) {
          if (e.target[i].value==="") {
            return alert ("Completar todos los campos")
          }  
        }
        if (machName.uni === 10004) {
          if (e.nativeEvent.submitter.value === "volver") {    //boton presionado volver o crear
            setmachName({
              ...machName,
              submit:true
            })
          }
          alert ("Tour creado")
          Dispatch(form(e))
        }else{
          alert ("Ecriba los paises correctamente, separados por espacios y si es el nombre del pais lleva varias palabras escriba _ ente ellas Ej:costa_rica")
        }
        
    }
    const validate = (e)=>{
      const validateMach =  validationForm(e,nameMach)
      const aja2 = validateMach.includes(false)
      if (!aja2) {
        setmachName({
            ...machName,
            uni:10004  
        })
      }else{
        setmachName({
            ...machName,
            uni:10006  
        })
      } 
    }
    const onClick = ()=>{
      Dispatch(inicio())
      Dispatch(nameTourFu())
      navegacion(-1)
                  
    }

    useEffect(() => {
      if (machName.submit) {
        console.log(machName.submit)
        Dispatch(inicio())
        Dispatch(nameTourFu())
        navegacion(-1)
      }
    }, [machName])

  return (
    <div className='container'>
        <img src={foto} className="gay" alt="" />
        <div className='gay'> 
        <form className='form' onSubmit={(e)=> prueba(e)} onChange={(e)=>validate(e)} >
        <h2>Crea tu actividad turistica</h2>
            <label >Nombre</label>
        <input className='inputForm'  type="text" name="name" placeholder='Nombre' ></input>
            <label >Dificultad</label>
        <input className='inputForm' type="number" name="dificultad"placeholder='Dificultad'  ></input>
            <label >Duracion</label>
        <input className='inputForm' type="number" name="Duracion"  placeholder='Duracion' ></input>
            <label >Paises incluidos</label>
        <textarea 
            name='textarea'
            className='textarea' 
            placeholder='Escribir los paises que va agregar a la actividad turistica separados por espacios, si el nombre lleva varias letras poner un _ entre palabras'
            autoComplete='on'
            ></textarea>
            {
                (machName.uni === 10006)?<span style={{color:"red"}}>{String.fromCodePoint(10006)}</span>:<span style={{color:"yellow"}}>{String.fromCodePoint(10004)}</span>
            }
            {/* <span style={{color:"yellow"}}>{String.fromCodePoint(machName)}</span> */}
            <label >Temporada</label>
        <select type="submit" className='select' name="select"style={{marginTop:0}} >
            <option value="Verano">Verano</option>
            <option value="Otono">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
        </select>
        <div>
          {/* <button
            value="volver"
            type="submit"
            style={{fontSize:"15px"}}
            className='botonVolver'>
              Crear y Volver
          </button> */}
        <button
        value="crear"
          style={{fontSize:"15px"}}
          className='botonCrear'
          type="submit">
          Crear y Crear Nuevo
        </button> 
       </div> 
       <button className='botonCrear' style={{fontSize:"15px"}} type='button' onClick={()=>onClick()}>Volver</button> 
    </form>
    </div> 
    
    </div>
  )
}

export default Form



// export default Form

// import React from "react";
// import { connect } from "react-redux";
// import { addTodo } from "../../actions/index";

// // Nota 1: Para utilizar el hook `useState` para el manejo de estados de los inputs, tendras que utilizarlo de la siguiente manera
// //React.useState

// // Nota 2: En este componente tendras que usar la funcion `connect` de react-redux para conectarte al store.
// // Si usas el hook `useDispatch` no funcionaran los test.

// export function AddTodo(props) {
//   const [input, setInput] = React.useState({
//     title: "",
//     place: "",
//     description: "",
//     date: "",
//   });

//   const handleInputChange = function (e) {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = function (e) {
//     e.preventDefault();
//     props.addTodo(input);
//   };

//   return (
//     <form onSubmit={(e) => handleSubmit(e)}>
//       <label>Title</label>
//       <input
//         type="text"
//         name="title"
//         value={input.title}
//         onChange={handleInputChange}
//       />4
//       <label>Description</label>
//       <textarea
//         type="text"
//         name="description"
//         value={input.description}
//         onChange={handleInputChange}
//       />
//       <label>Place</label>
//       <input
//         type="text"
//         name="place"
//         value={input.place}
//         onChange={handleInputChange}
//       />
//       <label>Date</label>
//       <input
//         type="text"
//         name="date"
//         value={input.date}
//         onChange={handleInputChange}
//       />
//       <button
//         type="submit">
//         Submit
//       </button>
//     </form>
//   );
// }

// function mapStateToProps(state) {
//   //aca traigo solo lo que quiero del state, como que me suscribo pero solo a eso
//   //y eso lo convierto en props*1
//   return {
//     todo: state,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addTodo: (todo) => dispatch(addTodo(todo)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
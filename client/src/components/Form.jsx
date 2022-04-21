import React from 'react'
import { useDispatch } from 'react-redux'
import { form } from '../actions/actions'
import validationForm from '../validation/validationForm'
import './Form.css'
import foto from "../Imagenes/activity-1.png"

const Form = () => {
    const Dispatch = useDispatch()
    const prueba = (e) =>{
        e.preventDefault();
        Dispatch(form(e))
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        console.log(e.target[2].value)
        console.log(e.target[3].value)
        console.log(e.target[4].value)
    }
  return (
    <div className='container'>
        <img src={foto} className="gay" alt="" />
        <div className='gay'> 
        <form className='form' onSubmit={(e)=> prueba(e)} onChange={(e)=> validationForm(e)} >
        <h2>Crea tu actividad turistica</h2>
            <label style={{marginBottom:-30, marginTop:50,color:"gold"}}>Nombre</label>
        <input style={{borderRadius:10}} type="text" name="name" className='input' placeholder='Nombre' ></input>
            <label style={{marginBottom:-30, marginTop:20,color:"gold"}}>Dificultad</label>
        <input style={{borderRadius:10}} type="number" name="dificultad" className='input' placeholder='Dificultad'  ></input>
            <label style={{marginBottom:-30, marginTop:20,color:"gold"}}>Duracion</label>
        <input style={{borderRadius:10}} type="number" name="Duracion" className='input' placeholder='Duracion' ></input>
            <label style={{marginBottom:10, marginTop:20,color:"gold"}}>Paises incluidos</label>
        <textarea 
            name='textarea'
            className='textarea' 
            placeholder='Escribir los paises que va agregar a la actividad turistica separados por espacios'
            autoComplete='on'
            ></textarea>
            <label style={{marginBottom:10, marginTop:20,color:"gold"}}>Temporada</label>
        <select type="submit" className='select' name="select"style={{marginTop:0}} >
            <option value="Verano">Verano</option>
            <option value="Otono">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
        </select>
        <button
        className='boton'
            type="submit">
            Crear
       </button>
    
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
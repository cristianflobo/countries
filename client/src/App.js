import './App.css';
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import {Routes,Route, Router} from "react-router-dom";
import Inicio from './components/Inicio';



function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Routes> 
        <Route path="/" element={<Inicio/>}/>  
        {/* <Route path="/create"  element={<Create/>}/> */}
       
      </Routes> 
    </Provider>
    
  );
}
export default App;

import './App.css';
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import {Routes,Route} from "react-router-dom";
import Inicio from './components/Inicio';
import Home from './components/Home';
import InfoCountry from './components/InfoCountry';



function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Routes> 
        <Route path="/" element={<Inicio/>}/>   
        <Route path="/home" element={<Home/>}/>  
        <Route path="/info/:id" element={<InfoCountry/>}/>   
      </Routes> 
    </Provider>
    
  );
}
export default App;

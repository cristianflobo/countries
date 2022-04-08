import './App.css';
import { Provider } from 'react-redux';           //es para leer la tineda 
import generateStore from './store';
import {Routes,Route} from "react-router-dom";
import Inicio from './components/Inicio';



function App() {
 
  const store = generateStore()
  return (
    <Provider store={store}>   
      <Routes> 
        <Route path="/" element={<Inicio/>}/>     
      </Routes> 
    </Provider>
    
  );
}
export default App;

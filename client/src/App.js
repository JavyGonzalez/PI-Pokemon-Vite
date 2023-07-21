import './App.css';
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PathRoutes from './helpers/Routes.helper';




function App() {

  
  return (
    <div className="App">
      <Routes>
				<Route path={PathRoutes.LANDINGPAGE} element={<LandingPage />} />
				<Route path={PathRoutes.HOME} element={<Home />} />
        <Route path={PathRoutes.CREATEPOKE} element={<CreatePokemon />}/>
        <Route path={PathRoutes.DETAIL} element={<Detail />}/>
			</Routes>
    </div>
  );
}

export default App;

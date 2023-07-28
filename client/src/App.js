import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Detail from './components/Detail/Detail';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PathRoutes from './helpers/Routes.helper';





function App() {

  const location = useLocation();
  
  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar/>}
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

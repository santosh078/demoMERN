import react from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Registration from './components/Registration';



const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Registration />} />

      </Routes>

    </>
  );

}

export default App
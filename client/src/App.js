import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './navbar';
import Rubric from './rubric';
import NoRubric from './norubric';
import Hero from './Hero';
import Home from './Home';
import Autograder from './Autograder'
import Hiw from './hiw'
import Subscribe from './subscribe'
import Contact from './contact'
import Footer from './footer'; 


function HomePage() {

  return (
  
    <div className="home-container">
      <div id ="home">
        <Hero />
        <Home />
        </div>

      <div id="how-it-works" className = "relative z-10">
        <Hiw />
      </div>

      <div id="autograder">
        <Autograder/>
      </div>


      <div id="subscribe">
      <Subscribe />
      </div>

      <div id="contact" style ={{
        marginBottom: "70px"
      }}>
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rubric" element={<Rubric />} />
        <Route path="/norubric" element={<NoRubric />} />
      </Routes>
    </Router>
  );
}

export default App;
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


      <div id="subscribe-contact" className="flex justify-center items-start gap-12 py-10 relative">
        {/* Subscription Section */}
        <div id="subscribe" className="w-[45%] text-right">
            <Subscribe />
        </div>

        {/* Visible Divider Line */}
        <div className="absolute top-[12rem] w-[1px] bg-[#FAF9F6]/60 h-32 z-20">
            <div className="absolute inset-0 bg-black blur-lg w-full h-full opacity-80"></div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="w-[45%] text-left">
            <Contact />
        </div>
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
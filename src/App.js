import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import Employment from './components/pages/Employment'
import Education from './components/pages/Education'
import References from './components/pages/References'
import Testimonials from './components/pages/Testimonials'
import Links from './components/pages/Links'
import Resume from './components/pages/Resume'
import TopBar from './components/TopBar'
import ReferenceDetails from './components/pages/ReferenceDetails'

function App() {
  return (
    <div className="App">
      <TopBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/employment' element={<Employment />} />
        <Route exact path='/education' element={<Education />} />
        <Route exact path='/references' element={<References />} />
        <Route exact path='/testimonials' element={<Testimonials />} />
        <Route exact path='/links' element={<Links />} />
        <Route exact path='/resume' element={<Resume />} />
        <Route exact path='/references/:uuid' element={<ReferenceDetails />} />
      </Routes>
    </div>
  );
}

export default App;

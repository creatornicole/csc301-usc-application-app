import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Pages/Components
import Navigation from './pages/Navigation'
import Footer from './pages/Footer'
import LandingPage from './pages/LandingPage'
import ApplicationForm from './pages/ApplicationForm'
import IntranetOverview from './pages/IntranetOverview'
import Applications from './pages/Applications'

// Helper
import BackgroundChanger from './helper/BackgroundChanger'



function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <BackgroundChanger>
              {/* Fixed Navbar */}
              <Navigation />
              {/* Dynamic Webcontent */}
              {/* path = the URL, element = the component that needs to be rendered for that URL */}
              <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/application" element={<ApplicationForm />}></Route>
                <Route path="/intranet" element={<IntranetOverview />}></Route>
                <Route path="/intranet/applications" element={<Applications />}></Route>
              </Routes>
              {/* Fixed Footer */}
              <Footer />
          </BackgroundChanger>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

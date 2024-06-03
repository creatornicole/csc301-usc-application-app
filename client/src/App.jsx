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
import IntranetApplications from './pages/IntranetApplications'

// Helper
import BackgroundChanger from './helper/BackgroundChanger'

// Renders Components based on URL using React Router
// and changes background color based on URL by wrapping BackgroundChanger around
function App() {
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
                <Route path="/intranet/applications" element={<IntranetApplications />}></Route>
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

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ParentEnquiry from './pages/ParentEnquiry'
import TutorEnquiry from './pages/TutorEnquiry'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parent-enquiry" element={<ParentEnquiry />} />
          <Route path="/tutor-enquiry" element={<TutorEnquiry />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App

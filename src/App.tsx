import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Navbar from './components/shared/navbar/Navbar'
import Games from './pages/games/Games'
import Modal from './components/shared/modals/Modal';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path='/' element={< Home />}></Route>
            <Route path='/games' element={< Games />}></Route>
          </Routes>
        </div>
        {/* <div className="modal-container">
          <Modal isOpen />
        </div> */}
      </BrowserRouter>
    </>
  )
}

export default App

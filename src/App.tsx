import './App.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Provider } from "react-redux";
import store from "./store/store";

import Home from './pages/home/Home'
import Navbar from './components/shared/navbar/Navbar'
import Games from './pages/games/Games'
// import Modal from './components/shared/modals/Modal';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  )
}

export default App

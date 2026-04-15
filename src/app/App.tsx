import { Route, Routes } from 'react-router-dom'
import { Header } from '../sections/Header/header'
import './App.css'
import { Footer } from '../sections/Footer/footer'
import { HomePage } from '../pages/HomePage/homePage'


function App() {

  return (
    <>
    <Header/>

    <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/second' element={<></>}></Route>
    </Routes>   
    
    <Footer></Footer>
    </>
  )
}

export default App

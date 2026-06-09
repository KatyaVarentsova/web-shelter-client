import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from '../components/Header/header'
import './App.css'
import { Footer } from '../components/Footer/footer'
import { HomePage } from '../pages/HomePage/homePage'
import { useAppDispatch, useAppSelector } from '../store'
import { getPets } from '../store/petsSlice'
import { useEffect } from 'react'
import { LoginPage } from '../pages/LoginPage/loginPage'
import { ListCardsPage } from '../pages/ListCardsPage/listCardsPage'
import { PetPage } from '../pages/PetPage/petPage'
import { FormPage } from '../pages/FormPage/formPage'
import { closeAllModals } from '../store/modalSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPets())
  }, [])

  const location = useLocation();

  useEffect(() => {
    dispatch(closeAllModals());
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/pets' element={<ListCardsPage></ListCardsPage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/form' element={<FormPage></FormPage>}></Route>
          <Route path='/pet/:id' element={<PetPage />} />
        </Routes>
      </main>

      <Footer></Footer>
    </>
  )
}

export default App

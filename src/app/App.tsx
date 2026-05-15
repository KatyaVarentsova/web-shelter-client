import { Route, Routes } from 'react-router-dom'
import { Header } from '../components/Header/header'
import './App.css'
import { Footer } from '../components/Footer/footer'
import { HomePage } from '../pages/HomePage/homePage'
import { useAppDispatch, useAppSelector } from '../store'
import { getPets, petsSelector } from '../store/petsSlice'
import { useEffect } from 'react'
import { LoginPage } from '../pages/LoginPage/loginPage'
import { ListCardsPage } from '../pages/ListCardsPage/listCardsPage'
import { PetPage } from '../pages/PetPage/petPage'
import { FormPage } from '../pages/FormPage/formPage'


function App() {
  const dispatch = useAppDispatch()
  const pets = useAppSelector(petsSelector)

  useEffect(() => {
    dispatch(getPets())
  }, [])

  useEffect(() => {
    console.log(pets)
  }, [pets])

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/pets' element={<ListCardsPage></ListCardsPage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/form' element={<FormPage></FormPage>}></Route>
          <Route path='/pet/:id' element={<PetPage/>} />
        </Routes>
      </main>

      <Footer></Footer>
    </>
  )
}

export default App

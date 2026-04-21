import { Route, Routes } from 'react-router-dom'
import { Header } from '../sections/Header/header'
import './App.css'
import { Footer } from '../sections/Footer/footer'
import { HomePage } from '../pages/HomePage/homePage'
import { useAppDispatch, useAppSelector } from '../store'
import { getPets, petsSelector } from '../store/petsSlice'
import { useEffect } from 'react'
import { LoginPage } from '../pages/LoginPage/loginPage'
import { ListCardsPage } from '../pages/ListCardsPage/listCardsPage'


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
        </Routes>
      </main>

      <Footer></Footer>
    </>
  )
}

export default App

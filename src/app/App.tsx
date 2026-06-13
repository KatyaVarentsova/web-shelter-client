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
import { PrivateRoute } from '../components/PrivateRoute/privateRoute'
import { RequestsPage } from '../pages/RequestsPage/requestsPage'
import { accessTokenSelector } from '../store/authSlice'
import { AdminHeader } from '../components/AdminHeader/adminHeader'
import { PetsTablePage } from '../pages/PetsTablePage/petsTablePage'

function App() {
  const dispatch = useAppDispatch()
  const token = useAppSelector(accessTokenSelector);

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
      {token && <AdminHeader/>}
      <main className="main">
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/pets' element={<ListCardsPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/form' element={<FormPage/>}></Route>
          <Route path='/pet/:id' element={<PetPage/>} />
          <Route path='/info/requests' element={<PrivateRoute><RequestsPage/></PrivateRoute>}/>
          <Route path='/info/dogs' element={<PrivateRoute><PetsTablePage category='dogs'/></PrivateRoute>}/>
          <Route path='/info/cats' element={<PrivateRoute><PetsTablePage category='cats'/></PrivateRoute>}/>
        </Routes>
      </main>

      {!token && <Footer />}
    </>
  )
}

export default App

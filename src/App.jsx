import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Message from "./pages/Message"
import { AuthContextProvider } from './AuthContext'
import Profile from "./pages/Profile"
import { useEffect } from "react"
import { collection, onSnapshot, query } from "firebase/firestore"
import { db } from "./firebase"
import { getListUsers } from "./pages/UsersListSlice"
function App() {
  // const userOj = useSelector(store => store.access)
  const user = useSelector(store => store.access)
  const dispatch = useDispatch()
  console.log(user.user)
  useEffect(() => {
    const q = query(collection(db, "users"))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = []
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id })
      })
      dispatch(getListUsers({ usersArr }))
    })
    return () => unsubscribe()
  }, [])
  const ProtectedRoute = ({ children }) => {
    if (!user.user) {
      return <Navigate to={'/login'} /> 
    }
    return children
  }
  return (
    <>
      <AuthContextProvider>

        {/* <Routes>
          <Route index path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
          <Route path="/message" element={<Message />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes> */}

        <Routes>
          <Route path="/" >
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="/message" element={<Message />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>



      </AuthContextProvider>
    </>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppState } from '@contexts/app-context'
import 'antd/dist/antd'
import './app.scss'
import Home from '@compositions/Home'
import Profile from '@compositions/Profile'
import Login from '@compositions/Login'
import Register from '@compositions/Register'

const App = () => {
  return (
    <Router>
      <AppState>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AppState>
    </Router>
  )
}

export default App

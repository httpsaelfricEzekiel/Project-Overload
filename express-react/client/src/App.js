import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./pages/Register"
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import PagesNotAvailabe from "./pages/PagesNotAvailable";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route>
          <Route path="home" index element={<Home/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PagesNotAvailabe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
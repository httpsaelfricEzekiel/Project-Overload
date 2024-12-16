import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login";
import PagesNotAvailabe from "./pages/PagesNotAvailable";
import Home from "./pages/Home";
import Error from "./pages/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="home" index element={<Home/>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="error" element={<Error />} />
          <Route path="*" element={<PagesNotAvailabe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage.tsx";
import ListDetailPage from "./pages/ListDetailPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Navbar from "./components/navbar/Navbar.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className={"h-screen flex flex-col items-center"}>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/detail/:id"} element={<ListDetailPage />} />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

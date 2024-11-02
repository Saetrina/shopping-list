import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage.tsx";
import ListDetailPage from "./pages/ListDetailPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import { UserContextProvider } from "./context/UserContextProvider.tsx";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className={"h-screen flex flex-col items-center"}>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<MainPage />} />
            <Route path={"/detail/:id"} element={<ListDetailPage />} />
            <Route path={"/login"} element={<LoginPage />} />
          </Routes>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;

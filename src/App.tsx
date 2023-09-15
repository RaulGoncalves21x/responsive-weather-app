import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePageComponent from "./components/Home/homepage.component";
import NavBarComponent from "./components/Navigation/navbar.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBarComponent />}>
        <Route index element={<HomePageComponent />} />
        <Route path="about" element={<HomePageComponent />} />
      </Route>
    </Routes>
  );
}

export default App;

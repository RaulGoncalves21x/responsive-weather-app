import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeComponent from "./components/home/home.component";
import NavigationComponent from "./components/navigation/navigation.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationComponent />}>
        <Route index element={<HomeComponent />} />
      </Route>
    </Routes>
  );
}

export default App;

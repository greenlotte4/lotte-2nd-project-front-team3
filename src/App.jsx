import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./styles/Lending.scss";
import "./styles/Main.scss";
import router from "./router/router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

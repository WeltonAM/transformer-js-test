import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./router/main-router";
import { Toastfy } from "./components/shared/message";

export default function App() {
  return (
    <BrowserRouter>
      <Toastfy />
      <MainRouter />
    </BrowserRouter>
  );
}

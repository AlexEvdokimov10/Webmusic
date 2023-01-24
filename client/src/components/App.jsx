import Navbar from "./navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./registration/Registration";
function App() {
  return (
      <BrowserRouter>
          <div className="app">
              <Navbar/>
              <Routes>
                  <Route path="/registration" element={ <Registration/> }/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;

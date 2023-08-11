import Navbar from "./navbar/Navbar";
import {BrowserRouter , useNavigate} from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import BottomBar from "./bottombar/BottomBar";
import LoaderHome from "./loader/LoaderHome";

const App = () => {

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                <AppRouter/>
                <BottomBar/>
            </div>
        </BrowserRouter>
    );
}

export default App;

import Navbar from "./navbar/Navbar";
import {BrowserRouter} from "react-router-dom";
import {useDispatch , useSelector} from "react-redux";
import {useEffect , useMemo} from "react";
import {auth} from "../actions/user";
import AppRouter from "./routers/AppRouter";

const App = () => {
    const dispatch = useDispatch ()
    const isAuth = useSelector(state=>state.user.isAuth)



    useEffect( () => {
        dispatch ( auth () )
    } , [isAuth])


    return (
        <BrowserRouter>
            <div className="app">
                <Navbar/>
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
}

export default App;

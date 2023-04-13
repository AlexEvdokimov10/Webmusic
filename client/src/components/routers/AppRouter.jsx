import React from 'react';
import {Route , Routes} from "react-router-dom";
import Registration from "../authorization/Registration";
import Login from "../authorization/Login";
import EditUser from "../edit-user/EditUser";
import Home from "../home/Home";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const isAuth = useSelector(state=>state.user.isAuth)
    return (
            <Routes>
                {isAuth && <Route path="/home" element={ <Home/> } />}
                {isAuth && <Route path="editUser" element={ <EditUser/> }/>}
                <Route path="registration" element={ <Registration/> }/>
                <Route path="login" element={ <Login/> }/>
            </Routes>
    );
};

export default AppRouter;
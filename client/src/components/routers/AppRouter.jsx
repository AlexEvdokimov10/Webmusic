import React , {useEffect} from 'react';
import {Route , Routes , useNavigate} from "react-router-dom";
import Registration from "../authorization/Registration";
import Login from "../authorization/Login";
import EditUser from "../edit-user/EditUser";
import Home from "../home/Home";
import {useDispatch , useSelector} from "react-redux";
import MusicId from "../MusicDir/MusicList/music/MusicId/MusicId";
import UploaderPage from "../uploaders/UploaderPage";
import {auth} from "../../actions/user";
import Recommends from "../MusicDir/Recomends/Recommends";
import EditMusic from "../MusicDir/MusicList/music/EditMusic/EditMusic";
import Albums from "../albums/Albums";
import FormAddAlbum from "../albums/FormAddAlbum";
import AdminPanel from "../adminPanel/AdminPanel";
import ProfileUser from "../profile/ProfileUser";
import EditUserPanel from "../adminPanel/EditUserPanel";
import {getAllGenres} from "../../actions/genres";
import Chat from "../chat/Chat";
import ActivationLinks from "../activateLink/ActivationLinks";
import RestorePage from "../restore/RestorePage";
import RestorePasswd from "../restore/RestorePasswd";
import EditEmail from "../edit-user/edit-email/EditEmail";

const AppRouter = () => {
    const dispatch = useDispatch ()
    const isAuth = useSelector(state=>state.user.isAuth)
    const isAdmin = useSelector(state=>state.user.isAdmin)
    const isSupport = useSelector(state=>state.user.isSupport)
    const isCompositor = useSelector(state=>state.user.isCompositor)

    useEffect( () => {
        dispatch(getAllGenres())
        dispatch ( auth () )
    } , [isAuth])

    return (
        <div>
            { isAuth ?
                <Routes>
                    <Route exact path="/home" element={ <Home/> }/>
                    <Route exact path="/editUser" element={ <EditUser/> }/>
                    <Route path="/upload" element={<UploaderPage/>}/>
                    <Route exact path="/recommends" element={<Recommends/>}/>
                    <Route exact path="/albums" element={<Albums/>}/>
                    {isCompositor && <Route exact path="/createAlbums" element={<FormAddAlbum/>}/>}
                    <Route path="musics/:id" element={<MusicId/>}/>
                    <Route path="editMusic/:id" element={<EditMusic/>}/>
                    <Route path="profile/:id" element={<ProfileUser/>}/>
                    <Route path="/restoreEmail/:id" element={ <EditEmail/> }/>
                    {isSupport && <Route path="/chat" element={<Chat/>}/>}
                    {isAdmin && <Route path="/panel" element={<AdminPanel/>} />}
                    {isAdmin && <Route path="editProfile/:id" element={<EditUserPanel/>}/>}
                    <Route path="/activation/:id" element={<ActivationLinks/>}/>
                </Routes>
                :
                <Routes>
                    <Route path="registration" element={ <Registration/> }/>
                    <Route path="/login" element={ <Login/> }/>
                    <Route path="/restore" element={ <RestorePage/> }/>
                    <Route path="/restorePasswd/:id" element={ <RestorePasswd/> }/>
                    <Route path="/activation/:id" element={<ActivationLinks/>}/>
                </Routes>
            }
        </div>
    );
};

export default AppRouter;
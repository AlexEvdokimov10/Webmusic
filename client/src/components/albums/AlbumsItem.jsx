import React, {useEffect} from 'react';
import {Card, Col} from "antd";
import {API_URL} from "../../config";
import styles from "./albums.module.css"
import {
    CaretRightOutlined,
    PauseOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
    StopOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {getMusicsByAlbum} from "../../actions/albums";
import {setPause, setPlay} from "../../reducers/playerReducer";

const AlbumsItem = ({name, id, image, playMusic,setStatusPause}) => {
    const currentAlbums = useSelector(state => state.albums.currentAlbums)
    const albumImage = API_URL + image
    const dispatch = useDispatch()
    const pause = useSelector(state => state.player.pause)

    function playAlbum() {
        playMusic({id: id, name: name, image: image})
        dispatch(getMusicsByAlbum(id))
        setStatusPause()
    }

    return (
        <div>
            <Col span={4} style={{marginLeft: 30}}>
                <Card
                    hoverable
                    style={{
                        width: 150, height: 200
                    }}
                    cover={<div className={styles.albums__cover}><img className={styles.albums__cover} alt="example"
                                                                      src={albumImage}/>
                        {pause || id !== currentAlbums.id ? <CaretRightOutlined className={styles.albums__play} onClick={() => playAlbum()}/> :
                            <PauseOutlined className={styles.albums__play} onClick={() => setStatusPause()}/>
                        }
                    </div>}
                >
                    <div className={styles.albums__name}>{name}</div>
                </Card>
            </Col>
        </div>
    );
};

export default AlbumsItem;
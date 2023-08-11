import React from 'react';
import {List} from "antd";
import {useSelector} from "react-redux";

const Genres = () => {
    const genreValue= useSelector ( state => state.genre.genres )
    return (
        <div>
            <List
                size="large"
                header={<div>Genres list c</div>}
                bordered
                dataSource={genreValue}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};

export default Genres;
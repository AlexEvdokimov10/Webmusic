import React from 'react';

const Audio = ({children,...props}) => {
    return (
        <audio id="audio" {...props}>
            <source id="music" type="audio/ogg"  />
        </audio>
    );
};

export default Audio;
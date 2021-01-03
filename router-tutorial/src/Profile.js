import React from 'react';

const profileData = {
    hyesoo: {
        name: '혜수',
        description: '꺄아아아'
    },
    coco: {
        name: '코코',
        description: '너무 귀여워'
    }
}

const Profile = ({ match }) => {
    const { username } = match.params;
    const profile = profileData[username];
    if(!profile) {
        return <div>존재하지 않는 유저입니다.</div>;
    }
    return (
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    )
}

export default Profile;
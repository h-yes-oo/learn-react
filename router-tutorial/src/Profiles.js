import React from 'react';
import { Link, Route } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
    return (
        <div>
            <h3>User List:</h3>
            <ul>
                <li>
                    <Link to="/profiles/hyesoo">hyesoo</Link>
                </li>
                <li>
                    <Link to="/profiles/coco">coco</Link>
                </li>
            </ul>

            <Route 
                path="/profiles"
                exact
                render={() => <div>유저를 선택해주세요.</div>}
            />
            <Route path="/profiles/:username" component={Profile} />
            <WithRouterSample />
        </div>
    );
};

export default Profiles;
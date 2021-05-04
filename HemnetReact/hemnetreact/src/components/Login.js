import React from 'react';
import {GoogleLogin} from 'react-google-login';
import {refreshTokenSetup} from './utils/refreshToken';

const clientId = '12342795773-amov5bovsjivmcilbbkaj45ihc25qf33.apps.googleusercontent.com';

function Login() {

    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        refreshTokenSetup(res);
        localStorage.setItem('myToken', res.tokenId);
    };

    const onFailure = (res) => {
        console.log('[Login faild] res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;
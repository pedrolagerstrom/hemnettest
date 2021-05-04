import React from 'react';
import {GoogleLogout} from 'react-google-login';

const clientId = '12342795773-amov5bovsjivmcilbbkaj45ihc25qf33.apps.googleusercontent.com';

function Logout() {
    const onSuccess = (res) => {
        console.log('Logout made successfully');
        alert('Du är utloggad');
        localStorage.clear();
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}                
            />
        </div>
    );
}

export default Logout;
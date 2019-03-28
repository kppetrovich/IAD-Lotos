import config from 'config';

export const userService = {
    login,
    logout,
    getURL,
    getAll,
};
function setRole(data) {
    localStorage.setItem('role', data.role);
    return data;
};
function getURL() {
    if(localStorage.getItem('role')==='CHIEF'){
    return '/ChiefCabinet'}
    else{return '/'}

}
function setToken(data){
    localStorage.setItem('token', data.token);
    return data;
};
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ username, password }),
        mode: 'cors'
    };

    return fetch(`${config.apiUrl}/auth/authenticate`, requestOptions)
        .then(handleResponse)
        .then(setToken)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}



function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {Authorization: 'Bearer '+ localStorage.getItem('token')},
        mode:'cors'
    };

    return fetch(`${config.apiUrl}/auth/authorization`, requestOptions)
        .then(handleResponse).then(setRole)
        .then(user => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        if (!response.ok && response.status === 403) {
            const error = "Invalid login or password, please try again"
            return Promise.reject(error)
        }
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
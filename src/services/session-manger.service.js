import fetchApi from './fetchsvc.service';
import constants from './constant.service';

var login = async (values, self) => {
    try {
        const data = {
            "email": values.username,
            "password": values.password,
            "returnSecureToken": true
        }
        const dataApi = await fetchApi.post('signInWithPassword', data, { key: constants.key });
        const { idToken, email, localId } = dataApi;
        await localStorage.setItem('userToken', JSON.stringify({ idToken, email, localId }));
        const user =
        {
            "UserId": localId
        }
        const store = await fetchApi.post('api/getStoreInfo', user);
        await localStorage.setItem('storeUser', JSON.stringify(store));
        self.handleClick('dashboard');
    } catch (error) {
        console.log('login', error)
        alert(error)
    }
};

var logout = () => {
    localStorage.clear();
};

var user = {
    storeUser: localStorage.getItem('storeUser') ? JSON.parse(localStorage.getItem('storeUser')) : {},
    userToken: () => {
        return localStorage.getItem('userToken') ? JSON.parse(localStorage.getItem('userToken')) : {};
    },
}

var exports = {
    login,
    logout,
    user
}
export default exports;
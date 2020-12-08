import fetchApi from './fetchsvc';

var login = async (values, self) => {

    try {
        const data = {
            "email": values.username,
            "password": values.password,
            "returnSecureToken": true
        }
        const dataApi = await fetchApi.logInpost('signInWithPassword', JSON.stringify(data));
        const { idToken, email, localId } = dataApi;
        await localStorage.setItem('userToken', JSON.stringify({ idToken, email, localId }));
        const user =
        {
            "UserId": localId
        }
        const store = await fetchApi.post('api/getStoreInfo', JSON.stringify(user), idToken);
        await localStorage.setItem('storeUser', JSON.stringify(store));        
        self.handleClick('dashboard');
    } catch (error) {
        console.log('login', error)
        alert(error)
    }
};

var logout = () => {
    localStorage.clear();
}
var exports = {
    login,
    logout
}
export default exports;
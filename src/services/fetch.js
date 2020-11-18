import {API} from '../configs/constant';

function generalUrl(url) {
  //const baseURL = API + '/wp-json' + url;
  console.log(API +  url)
  const baseURL = API +  url;
  return {
    baseURL,
  };
}

const get = (url, options = {}, token = null) => {
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    const contentType = 'application/json'
    console.log(baseURL);
    fetch(baseURL, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

const post = (url, data, method = 'POST', token) => {
  console.log(url,data)
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    const contentType = 'application/json';

    fetch(baseURL, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
        'Content-Type': contentType,
      },
      body: data,
    })
      .then((res) => res.json())
      .then(dataApi => {
        if (dataApi.error) {
console.log('err',dataApi.error)
          //reject(new Error(dataApi.message))
        } else {
          resolve(dataApi);         
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};


const logInpost = (url, data, method = 'POST', token) => {
  console.log("fetch",url,data.username)
  return new Promise((resolve, reject) => {
    const {baseURL} = generalUrl(url);
    const urlParameters= "?grant_type=password&client_id=localbasket-client&client_secret=some-secret&username="+data.username+"&password="+data.password;
    const contentType = 'application/json';
    fetch(baseURL+urlParameters, {
      method: method,
      headers: {
        Accept: 'application/json',
        Authorization:  'Basic ' + base64.encode(`localbasket-client:some-secret`) ,
        'Content-Type': contentType,
      },
      body: data,
    })
      .then((res) => res.json())
      .then(dataApi => {
        if (dataApi.error) {
console.log('error',dataApi.error)
          //reject(new Error(dataApi.message))
        } else {
          console.log("a",dataApi)
          resolve(dataApi);
          console.log("navigation",dataApi,data.navigation);
         data.state(dataApi.access_token)
        }
      })
      .catch(error => {
        console.error("gfg",error);
        reject(error);
      });

  });
};

export default {
  get,
  post,
  logInpost,
};

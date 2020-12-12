import { host, apikey } from './constant.service';
import { trackPromise } from 'react-promise-tracker';
const API = 'https://us-central1-retailstores-28e08.cloudfunctions.net/'

function generalUrl(url) {
  //const baseURL = API + '/wp-json' + url;
  const baseURL = host + url;
  return {
    baseURL,
  };
}

const get = (url, token, options = {}) => {
  return new Promise((resolve, reject) => {
    const contentType = 'application/json';
    trackPromise(fetch(API + url, {
      ...options,
      method: 'GET',
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': contentType,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          reject(new Error(data.message));
        } else {
          console.log(data)
          resolve(data);
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      }));
  });
};

const post = (url, data, token, method = 'POST') => {
  console.log(url, data, token)
  return new Promise((resolve, reject) => {
    const contentType = 'application/json';
    trackPromise(fetch(API + url, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then(dataApi => {
        if (dataApi.error) {
          console.log('err', dataApi.error)
          //reject(new Error(dataApi.message))
        } else {
          console.log("post api", dataApi)
          resolve(dataApi);
        }
      })
      .catch(error => {
        console.error("post api", error);
        reject(error);
      }));
  });
};

const logInpost = (url, data, method = 'POST') => {
  console.log("fetch", url, data)
  return new Promise((resolve, reject) => {
    const { baseURL } = generalUrl(url);
    const urlParameters = `?key=${apikey}`
    const contentType = 'application/json';

    trackPromise(fetch(baseURL + urlParameters, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
      },
      body: data,
    })
      .then((res) => res.json())
      .then(dataApi => {
        if (dataApi.error) {
          console.log('signup URL', dataApi.error)
          //reject(new Error(dataApi.message))
        } else {
          console.log("signup response ", dataApi)
          resolve(dataApi);
        }
      })
      .catch(error => {
        console.error("signup error", error);
        reject(error);
      }));

  });
};

const uploadImage = (url, data) => {
  console.log(url, data)
  try {
    return new Promise((resolve, reject) => {
      const contentType = 'application/json';
      fetch(API + url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': contentType,
        },
        body: data,
      })
        .then((res) => console.log(res))
      // .then(dataApi => {
      //   if (dataApi.error) {
      //    console.log('Upload URL',dataApi.error)
      //     //reject(new Error(dataApi.message))
      //   } else {
      //     console.log("Upload response ",dataApi)
      //     resolve(dataApi);
      //   }
      // })   
    })
  } catch (error) {
    console.log("upload error", error)
  }
}

const fetchServices = {
  get,
  post,
  logInpost,
  uploadImage
}
export default fetchServices;

import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Alert } from 'react-native';

export async function galleryClickImage(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = options ?? {
        mediaType: 'photo',
        maxWidth: 1080,
        maxHeight: 1080,
        quality: 1,
      };
      setTimeout(() => {
        launchImageLibrary(options, async response => {
          if (response.didCancel) {
            reject('cancelled');
          } else if (response.errorMessage) {
            Alert.alert('Gallery Error', response.errorMessage);
            reject(response.errorMessage);
          } else if (response.assets?.length > 0) {
            resolve(response.assets[0]);
          } else {
            Alert.alert('Gallery Error', JSON.stringify(response));
          }
        });
      }, 500);
    } catch (err) {
      Alert.alert('Gallery Error', err?.message);
      reject(err?.message);
    }
  }
  );
}

export function isNullOrEmpty(text) {
  return text === undefined || text === '' || text === null || text.length == 0;
}

export function get(url) {
  console.log("get URL",url)
  return axios.get(url)
    .then(function (response) {
      const result = {
        isRequestSuccessFull : true,
        response : response
      }
      // handle success
      //console.log("get response",JSON.stringify(response));
      return result
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      Alert.alert("Error",error)
      return error
    })
}

export function post(url,payload){
  console.log("Post URL",url)
  console.log("Post Payload",payload)

  return axios.post(url,payload)
    .then(function (response) {
      // handle success
      console.log("Post response",JSON.stringify(response));
      return response
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      Alert.alert("Error",error)
      return error
    })
}
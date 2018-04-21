import Vue from 'vue';

export default {
  get(url){
    console.log('Api requst to '+url);
    return Vue.http.get(url)
      .then((response) => Promise.resolve(response.body))
      .catch((error) => Promise.reject(error));
  }
};

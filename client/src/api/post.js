import axios from 'axios';
// import{ v4 as uuid } from 'uuid';
// import moment from 'moment';
// import 'babel-polyfill';

/* Develop Server URL */
//const postBaseUrl = "http://localhost:3000/api";

/* Production Server URL */
const postBaseUrl = "http://weathermood-menghswu.us-east-1.elasticbeanstalk.com/api";

export function listPosts(start) {
    let url = `${postBaseUrl}/posts`;
    if(start) url = url + `?start=${start}`;
    console.log(`Making GET Request to ${url}`);
    return axios.get(url).then(
        (res) => {
            if(res.status != 200)
                throw new Error(`Unexpected response code: ${res.status}`);
            return res.data;
        }
    );
}

export function createPost(_mood, _text) {
    let url = `${postBaseUrl}/posts`;
    console.log(`Making POST Request to ${url}`);
    return axios.post(url, { _mood, _text }).then(
        (res) => {
            if(res.status != 200)
                throw new Error(`Unexpected response code: ${res.status}`);
            return res.data;
        }
    );
}

/* Local Storage Simulate Server Response */

// function _listPosts() {
//     let poststring = localStorage.getItem(postKey);
//     let posts = [];
//     if(poststring !== null) {
//         posts = JSON.parse(poststring);
    
//     }
//     //console.log("poststring:" + poststring);
//     return posts;
// }
// export function listPosts() {
//     return new Promise((resolve, reject) => {
//         resolve(_listPosts());
//     })
// }

// function _createPost(_mood, _text) {
//     const newpost = {
//         id: uuid(),
//         mood: _mood,
//         text: _text,
//         ts: moment().unix(),
//     };
//     const posts = [
//         newpost,
//         ..._listPosts()
//     ];
//     localStorage.setItem(postKey, JSON.stringify(posts));
//     //console.log("newpost:" + newpost);
//     return newpost;
// }

// export function createPost(_mood, _text) {
//     return new Promise((resolve, reject) => {
//         resolve(_createPost(_mood, _text));
//     })
// }
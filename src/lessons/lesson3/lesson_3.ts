import axios from "axios";

console.log('lesson 3');

// Event loop
// https://learn.javascript.ru/event-loop
// https://habr.com/ru/company/ruvds/blog/340508/
// https://www.youtube.com/watch?v=8aGhZQkoFbQ
// https://www.youtube.com/watch?v=j4_9BZezSUA

// Promise
// https://learn.javascript.ru/promise-basics
// https://www.youtube.com/watch?v=1idOY3C1gYU


// https://jsonplaceholder.typicode.com/posts/1
// https://habr.com/ru/company/oleg-bunin/blog/417461/?_ga=2.54695343.543933152.1602500664-1040035071.1596811661


const config = {
    baseURL: 'https://jsonplaceholder.typicode.com/'
}

const instance = axios.create(config)

const API = {
    getPost: (postNumber: number) => {
        return instance.get(`/posts/${postNumber}`)
    },
    getAllPosts: () => {
        return instance.get('/posts')
    },
    addNewPost: () => {
        return instance.post('/posts', {
            body: {
                title: 'foo',
                body: 'bar',
                userId: 1,
              },
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
    },
    updatePostInfo: (postNumber: number) => {
        return instance.put(`/posts/${postNumber}`, {
            body: {
                id: 1,
                title: 'foo',
                body: 'bar',
                userId: 1,
              },
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
    },
    deletePost: (postNumber: number) => {
        return instance.delete(`/posts/${postNumber}`)
    }
}

API.getPost(5).then(({data}) => console.log(data))
API.getAllPosts().then(({data}) => console.log(data))
API.addNewPost().then(({data}) => console.log(data)) // {title: "foo", body: "bar", userId :1}
API.updatePostInfo(15).then(({data}) => console.log(data)) // {id: 1, title: "foo", body: "bar", userId: 1}
API.deletePost(10).then(({data}) => console.log(data)) // {}

// just a plug
export default ()=>{};
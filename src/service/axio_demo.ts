import axios from 'axios'

// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'coder',
//       age: '11'
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'coder',
//       age: '11'
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
axios
  .request({
    url: 'http://httpbin.org/get',
    params: {
      name: 'coder',
      age: '11'
    }
  })
  .then((res) => {
    console.log(res.data)
  })

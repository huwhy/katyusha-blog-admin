import axios from 'axios'

// axios.interceptors.response.use(function (response) {
//   if (response.status === 200) {
//     let json = response.data
//     if (json.code === 302) {
//       window.location = json.url
//     }
//   }
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

export default axios

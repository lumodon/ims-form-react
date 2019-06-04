import axios from 'axios'

export default function fetchHelper(action) {
  return axios({
    url: 'http://localhost:28080/api',
    method: 'post',
    data: {action},
    crossDomain: true,
  })
    .then(response => response.data)
}
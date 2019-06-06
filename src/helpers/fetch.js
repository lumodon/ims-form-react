import axios from 'axios'

export default function fetchHelper(action) {
  return axios({
    url: 'http://prod.leafweaver.com/api',
    method: 'post',
    data: {action},
    crossDomain: true,
  })
    .then(response => response.data)
}
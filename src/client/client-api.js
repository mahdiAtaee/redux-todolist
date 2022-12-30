import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:5000'

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

// All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000

axiosClient.defaults.withCredentials = true

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response.data)
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(({ data }) => data)
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response)
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response)
}

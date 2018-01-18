import axios from 'axios'

const serverUrl = 'http://localhost:3001'

export const getCoinData = () => axios.get(`${serverUrl}/coins`)
  .then(res => res.data)

export const buildPortfolio = (uid) => 
  axios.post(`${serverUrl}/build-portfolio`, {
    uid: uid
  })

export const askImage = coinId =>
  axios.post(`${serverUrl}/ask-image`, {
    coinId
  })

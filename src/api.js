const serverUrl = 'http://localhost:3001'

export const getCoinData = () => fetch(`${serverUrl}/coins`)
  .then(data => data.json())

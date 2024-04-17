import axios from '@/plugins/axios'

export default function(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((response) => {
        resolve(response)
        console.log(response)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

import axios from '@/plugins/axios'

export default function(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then((response) => {
        resolve(response)
        console.log(response)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

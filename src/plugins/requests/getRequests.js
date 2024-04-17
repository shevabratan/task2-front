import axios from "axios"

export default function(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        resolve(response)
        console.log(response)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

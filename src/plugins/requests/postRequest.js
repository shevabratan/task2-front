import axios from "axios"

export default function(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((response) => {
        resolve(response)
        console.log(response)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

import axios from "@/plugins/vuex/axios";

export default function (url, data) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, data)
            .then((response) => {
                console.log(response)

                resolve()
            })
            .catch((e) => {
                reject(e)
            })
    })
}

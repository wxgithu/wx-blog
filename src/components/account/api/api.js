export default {
    getInfo(params) {
        return this.axios.get("http://127.0.0.1:3000/users/usersInfo", params)
    }
}
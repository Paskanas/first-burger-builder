import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-aa98c.firebaseio.com/",
});

export default instance;

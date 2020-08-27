import axios from "axios";

export default {
  analyzeText: function(query) {
    return axios.post("/api/analyze", {text: query.current.value});
  },
  test: function(query) {
    return axios.get("api/test").then((response) => {
      console.log("test route response", response);
    })
  }
}
//인터셉터 연습
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // timeout: 1, 오류내보기
});

//요청인터셉트
instance.interceptors.request.use(
  //요청보내기전 수행되는 함수
  (config) => {
    console.log("인터셉터요청성공");
    return config;
  },
  //오류요청보내기전 수행되는 함수
  (error) => {
    console.log("인터셉터요청오류");
    return Promise.reject(error);
  }
);
//응답인터셉트
instance.interceptors.response.use(
  //응답내보내기전 수행되는 함수
  (response) => {
    console.log("인터셉터 응답 받음");
    return response;
  },
  //오류응답내보내기전 수행되는 함수
  (error) => {
    console.log("인터셉터 응답 오류");
    return Promise.reject(error);
  }
);
export default instance;

/* eslint-disable prettier/prettier */
import axios from "axios";

export async function callAPI(url, method, data=  {}){
  const jsonObj = {
    method,
    url,
    header : { 'Content-Type': 'application/json' }
  }
  if(data){
    jsonObj['data'] = data
  }
  console.log(`.........................jsonObj`, jsonObj);
  console.log(`.........................data`, data);

  return axios(jsonObj).then((response)=>{
    console.log(`.........................response`, response);
    return response
  }).catch(e=>{
    console.log(`.........................error`, JSON.stringify(e));

  })
}

import { REALESTATES_FETCH_SUCCESS, REALESTATES_FETCH_FAIL } from "./types";

export const fetchRealestates = () => {
  console.log("fetched!!!");

  
  return dispatch => {
    fetch("/items/summaries.json?query=stocksund", {
      method: "GET",
      headers: {
        /*"access-control-allow-headers": "Access-Control-Allow-Origin,DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range",
        "access-control-allow-methods": "GET, POST, OPTIONS",
        "access-control-expose-headers": "Content-Length, Content-Range",
        "Access-Control-Allow-Origin": "*",*/
      }
    })
      .then(async response => {
        if (response.status >= 200 && response.status < 300) {
          console.log("REDUX YAO");
          return response.json();
        } else {
          console.log("something went wrong with GET REALESTATES");
        }
      })
      .then(result => {
        console.log("json: ", result);
        dispatch({ type: REALESTATES_FETCH_SUCCESS, payload: result });
        return result;
      })
      .catch(err => {
        console.log("ejjoj: ", err);
        dispatch({ type: REALESTATES_FETCH_FAIL });
      });
  };
};

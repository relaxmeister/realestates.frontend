import { REALESTATES_FETCH_SUCCESS, REALESTATES_FETCH_FAIL } from "./types";

export const fetchRealestates = () => {
    
    console.log("fetched!!!")

    /*return dispatch => {
      fetch("http://localhost:8080/", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*" //, Ändringen i backend "@CrossOrigin(origins="*")" fundamental
        }
      })
        .then(async response => {
          if (response.status >= 200 && response.status < 300) {
            console.log("REDUX YAO");
            return response.json();
          } else {
            console.log("something went wrong with GETJOBS");
          }
        })
        .then(result => {
          console.log("json: ", result);
          dispatch({ type: JOBS_FETCH_SUCCESS, payload: result });
          return result;
        })
        .catch(err => {
          console.log("ejjoj: ", err);
          dispatch({ type: JOBS_FETCH_FAIL });
        });
    };*/
  };
import axios from "axios";
import { IS_CONNECTED } from "./constant";

/**
 * Function to fetch all the users.
 */
export const isConnected = () => {
  console.log("cameraService > GET_IMAGE called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(IS_CONNECTED)
        .then((res) => {
          console.log("cameraService > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("cameraService > axios err=", err);
          reject("Error in listDevices axios!");
        });
    } catch (error) {
      console.error("in services > updateLastCwkId, Err===", error);
    }
  });
};

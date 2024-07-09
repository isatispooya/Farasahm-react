import axios from "axios";
import { getCookie } from "./cookie";
import { OnRun } from "../../config/config";

export const AccessCheck = () => {
  const id = getCookie("id");
  if (id) {
    axios({ method: "POST", url: OnRun + "/access", data: { id: id } }).then(
      (response) => {
        if (response.data.replay) {
          return response.data.acc;
        } else {
          return false;
        }
      }
    );
  } else {
    return false;
  }
};

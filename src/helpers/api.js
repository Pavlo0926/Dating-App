import axios from "axios";
import _ from "lodash";
import EventBus from "eventing-bus";
import { Notification } from "./notification";
import i18n from "i18next";
import { CANCEL } from "redux-saga";

const CancelToken = axios.CancelToken;
const DEBUG = false;

export class API {
  static headers() {
    return {
      "Content-Type": "application/json",
      platform: "mobile",
    };
  }

  static request(options) {
    options.headers = _.merge(this.headers(), options.headers);
    const source = CancelToken.source();
    options.cancelToken = source.token;
    const timeoutHandler = setTimeout(() => {
      source.cancel();
    }, 15000);

    const request = axios(options)
      .then(response => {
        clearTimeout(timeoutHandler);

        // if (response.data && response.data.status && response.data.status.code !== 200) {
        //   // Notification.error(
        //   //   response.data.status.message,
        //   //   response.data.status.explanation,
        //   // );
        //   throw response;
        // }

        return response;
      })
      .catch(error => {
        clearTimeout(timeoutHandler);

        if (options.silent === true) {
          console.log(error);
          // throw error;
        } else if (error.message === "Network Error") {
          axios({
            mehtod: "get",
            url: "https://google.com",
          })
            .then(response => {
              if (!options.silent && DEBUG)
                Notification.alert(i18n.t(`alerts.failure.serverNotResponding`));

              // throw error;
            })
            .catch(err => {
              if (!options.silent && DEBUG) {
                Notification.alert(i18n.t(`alerts.failure.checkInternetConnection`));
              }
              // throw err;
            });
        } else {
          if (error.response && error.response.status === 401) {
            Notification.alert("Invalid username/password");
          } else if (error.response && error.response.data && error.response.data.error) {
            if (!options.silent) {
              console.log(options.url);
              Notification.alert(error.response.data.message);
            }
          }
          // if (
          //   error.response &&
          //   (error.response.status === 401 || error.response.status === 404)
          // ) {
          //   // EventBus.publish('logout');
          //   global.store.dispatch({ type: "LOGOUT" });
          //
          //   const message =
          //     error.response.data?.message || error.response.data?.status?.message;
          //   if (!options.silent)
          //     Notification.error(message, error?.response?.data?.status?.explanation);
          // } else if (error.response && !options.silent) {
          //   const message =
          //     error.response.data?.status?.message || error.response.data?.message;
          //   Notification.error(message, error.response.data?.status?.explanation);
          // }
          //
          // const errorKeys = Object.keys(error);
          //
          // if (
          //   errorKeys.length === 1 &&
          //   errorKeys[0] === "message" &&
          //   error.message === undefined
          // ) {
          //   if (!options.silent) {
          //     // Notification.error(i18n.t('alerts.failure.request_timeout'));
          //   }
          // }

          throw error;
        }
        throw error;
      });

    EventBus.on("LOGOUT", () => source.cancel());
    request[CANCEL] = () => source.cancel();
    return request;
  }
}

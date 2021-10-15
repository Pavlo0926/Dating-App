import { PhoneNumberUtil } from "google-libphonenumber";
import AsyncStorage from "@react-native-community/async-storage";
import { TUTORIAL } from "@constants";

const phoneUtil = PhoneNumberUtil.getInstance();

class Validator {
  static isValidPhone(number, countryCode) {
    try {
      const parsedNumber = phoneUtil.parse(number, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
      return false;
    }
  }

  static async getSmsLastTime() {

    try {
      let lastTime = await AsyncStorage.getItem(TUTORIAL.SMS_LAST_TIME);
      if (lastTime === null) {
        return 0;
      }

      return lastTime;
    } catch (error) {
      return 0;
    }
    
  }
}

export { Validator };

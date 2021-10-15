import moment from "moment";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

class Format {
  static date(d, format = "DD MMM YYYY") {
    return moment.unix(d).format(format);
  }

  static time(d, format = "hh:mma") {
    return moment(d).format(format);
  }

  static stringFromGender(gender) {
    return gender === 0 ? "" : gender === 1 ? "Male" : "Female";
  }

  static isRecently(d) {
    let now = moment().unix();
    return now - 120 < d;
  }

  static phoneNumber(phone) {
    try {
      const parsedNumber = phoneUtil.parse(phone);
      const countryCode = phoneUtil.getCountryCodeForRegion(
        phoneUtil.getRegionCodeForNumber(parsedNumber),
      );

      return `+${countryCode} ******${phone.substring(phone.length - 4)}`;
    } catch (err) {
      console.log(err);
      return phone;
    }
  }

  static capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export { Format };

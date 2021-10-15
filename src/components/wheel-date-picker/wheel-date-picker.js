import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import { ScrollPicker } from "../wheel-scroll";
import { widthPercentageToDP as wp } from "@helpers";
import styles from "./wheel-date-picker.style";

export default class WheelDatePicker extends React.Component {
  constructor(props) {
    super(props);

    const { date, minYear } = props;

    this.state = {
      date,
      monthRange: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      yearRange: [],
    };

    this.newValue = {};

    this.parseDate(this.state.date);

    const mdate = moment(date);

    const dayNum = mdate.daysInMonth();
    this.state.dayRange = this.genDateRange(dayNum);

    let currentYear = moment(new Date()).year();
    for (let i = minYear; i <= currentYear; i += 1) {
      this.state.yearRange.push(i);
    }
  }

  parseDate = date => {
    const mdate = moment(date);

    ["year", "month", "date", "hour", "minute"].forEach(s => {
      this.newValue[s] = mdate.get(s);
    });
  };

  genDateRange(dayNum) {
    const days = [];

    for (let i = 1; i <= dayNum; i += 1) {
      days.push(i);
    }

    return days;
  }

  onYearChange = year => {
    const oldYear = this.newValue.year;

    this.newValue.year = year;
    this.checkDate(oldYear, this.newValue.month);
    if (this.props.onDateChange) {
      this.props.onDateChange(this.getValue());
    }
  };

  onMonthChange = month => {
    const oldMonth = this.newValue.month;

    this.newValue.month = month;
    this.checkDate(this.newValue.year, oldMonth);
    if (this.props.onDateChange) {
      this.props.onDateChange(this.getValue());
    }
  };

  onDateChange = date => {
    this.newValue.date = date;
    this.checkDate(this.newValue.year, this.newValue.month);
    if (this.props.onDateChange) {
      this.props.onDateChange(this.getValue());
    }
  };

  checkDate(oldYear, oldMonth) {
    const currentMonth = this.newValue.month;
    const currentYear = this.newValue.year;
    const currentDay = this.newValue.date;

    let dayRange = this.state.dayRange;
    let dayNum = dayRange.length;

    if (oldMonth !== currentMonth || oldYear !== currentYear) {
      dayNum = moment(`${currentYear}-${currentMonth + 1}`, "YYYY-MM").daysInMonth();
    }

    if (dayNum !== dayRange.length) {
      dayRange = this.genDateRange(dayNum);

      if (currentDay > dayNum) {
        this.newValue.date = dayNum;
      }

      this.setState({ dayRange });
    }
  }

  getValue() {
    const { year, month, date, hour, minute } = this.newValue;
    const nextDate = new Date(year, month, date, hour, minute);

    if (nextDate < this.props.minimumDate) {
      return this.props.minimumDate;
    }

    return nextDate > this.props.maximumDate ? this.props.maximumDate : nextDate;
  }

  render() {
    const { dayRange, monthRange, yearRange } = this.state;
    return (
      <View style={styles.container}>
        <ScrollPicker
          ref={ref => {
            this.dateComponent = ref;
          }}
          dataSource={dayRange}
          selectedIndex={dayRange.indexOf(this.newValue.date)}
          wrapperHeight={wp(178)}
          wrapperWidth={wp(80.08)}
          wrapperBackground={"transparent"}
          itemHeight={wp(46)}
          highlightColor={"white"}
          highlightWidth={wp(80.08)}
          highlightBorderWidth={wp(2)}
          itemTextStyle={styles.dateText}
          activeItemTextStyle={styles.activeDateText}
          onValueChange={(value, index) => {
            this.onDateChange(value);
          }}
        />
        <View style={styles.spacerView} />
        <ScrollPicker
          dataSource={monthRange}
          selectedIndex={this.newValue.month}
          wrapperHeight={wp(180)}
          wrapperWidth={wp(100.08)}
          wrapperBackground={"transparent"}
          itemHeight={wp(50)}
          highlightColor={"white"}
          highlightWidth={wp(100.08)}
          highlightBorderWidth={wp(2)}
          itemTextStyle={styles.dateText}
          activeItemTextStyle={styles.activeDateText}
          onValueChange={(value, index) => {
            this.onMonthChange(index);
          }}
        />
        <View style={styles.spacerView} />
        <ScrollPicker
          dataSource={yearRange}
          selectedIndex={yearRange.indexOf(this.newValue.year)}
          wrapperHeight={wp(180)}
          wrapperWidth={wp(80.08)}
          wrapperBackground={"transparent"}
          itemHeight={wp(50)}
          highlightColor={"white"}
          highlightWidth={wp(80.08)}
          itemTextStyle={styles.dateText}
          activeItemTextStyle={styles.activeDateText}
          onValueChange={(value, index) => {
            this.onYearChange(value);
          }}
        />
      </View>
    );
  }
}

WheelDatePicker.propTypes = {
  minYear: PropTypes.number,
  onDateChange: PropTypes.func,
};

WheelDatePicker.defaultProps = {
  minYear: 1945,
  onDateChange: null,
};

import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator, SafeAreaView } from "react-native";
import { Screen, Image, Text, Touchable } from "@components";
import moment from "moment";
import { Switch } from "react-native-switch";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Images from "@assets/Images";
import Header from "../header";
import GenderModal from "../../swipe/no-users/gender-modal";
import CountrySelection from "../../country-selection";
import PurchaseModal from "../../profile-settings/purchase-modal";
import { widthPercentageToDP as wp, getCurrentLocation } from "@helpers";

import styles from "./swipe-settings.style";

const screenWidth = Dimensions.get("window").width;

class SwipeSettings extends Component {
  constructor(props) {
    super(props);
    const { settings, user } = this.props;
    if (settings === null) {
      this.state = {
        distance: 20,
        minAge: 13,
        maxAge: 25,
        aroundWorld: false,
        hideMe: false,
        gender: 0,
        country: "",
        state: "",
        current_location: 1,
        visibleGenderSetting: false,
        visibleLocation: false,
        visiblePurchase: false,
      };
    } else {
      let birthday = moment().diff(moment.unix(user.birthday), "years");

      let age_from = settings.age_from;
      let age_to = settings.age_to;
      if (birthday > 17) {
        age_from = age_from > 17 ? age_from : 18;
        age_to = age_to > 17 ? age_to : 19;
      } else {
        age_to = age_to > 17 ? 17 : age_to;
      }
      this.state = {
        distance: parseInt(settings.distance, 10),
        minAge: age_from,
        maxAge: age_to,
        aroundWorld: settings.global === 1 ? true : false,
        hideMe: settings.hide === 1 ? true : false,
        gender: parseInt(settings.gender, 10),
        country: settings.country,
        state: settings.state,
        current_location: parseInt(settings.current_location, 10),
        visibleGenderSetting: false,
      };
    }
  }

  componentDidMount() {
    if (this.props.settings === null) {
      this.props.loadSettings(this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings === null && this.props.settings !== null) {
      this.updateStates();
    }
  }

  componentWillUnmount() {
    const { settings } = this.props;
    if (settings !== null) {
      settings.distance = this.state.distance;
      settings.age_from = this.state.minAge;
      settings.age_to = this.state.maxAge;
      settings.global = this.state.aroundWorld === true ? 1 : 0;
      settings.hide = this.state.hideMe === true ? 1 : 0,
      settings.gender = this.state.gender;
      settings.country = this.state.country;
      settings.state = this.state.state;
      settings.current_location = this.state.current_location;

      this.props.updateSettings(this.props.token, settings);
    }
  }

  updateStates = () => {
    const { settings, user } = this.props;
    let birthday = moment().diff(moment.unix(user.birthday), "years");

    let age_from = settings.age_from;
    let age_to = settings.age_to;
    if (birthday > 17) {
      age_from = age_from > 17 ? age_from : 18;
      age_to = age_to > 17 ? age_to : 19;
    } else {
      age_to = age_to > 17 ? 17 : age_to;
    }

    this.setState({
      distance: parseInt(settings.distance, 10),
      minAge: age_from,
      maxAge: age_to,
      aroundWorld: settings.global === 1 ? true : false,
      hideMe: settings.hide === 1 ? true : false,
      gender: parseInt(settings.gender, 10),
      country: settings.country,
      state: settings.state,
      current_location: parseInt(settings.current_location, 10),
    });
  };

  goBack = () => {
    if (this.props.isModal === true) {
      this.props.onBack();
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    const { distance, minAge, maxAge, aroundWorld, hideMe, gender } = this.state;
    const { state, city, address } = this.props.user;
    let birthday = moment().diff(moment.unix(this.props.user.birthday), "years");

    if (this.props.settings === null) {
      return (
        <Screen
          hasGradient
          style={this.props.isModal ? styles.modalContainer : styles.container}
        >
          <SafeAreaView style={this.props.isModal ? {} : styles.safeAreaContainer}>
            <View style={this.props.isModal ? styles.modalContainer : styles.container}>
              <Header title={"Discovery"} onBack={this.goBack} />
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size={"large"}
                  color={"white"}
                  style={styles.loadingIndicator}
                />
              </View>
            </View>
          </SafeAreaView>
        </Screen>
      );
    }

    return (
      <Screen
        hasGradient
        style={this.props.isModal ? styles.modalContainer : styles.container}
      >
        <SafeAreaView style={this.props.isModal ? {} : styles.safeAreaContainer}>
          <View>
            <Header title={"Discovery"} onBack={this.goBack} />

            <Touchable style={[styles.flexRow, styles.itemPadding]}
              onPress={() => {
                if (this.props.user.premium === 1) {
                  this.setState({visibleLocation: true});
                } else {
                  this.setState({visiblePurchase: true});
                }
              }}>
              <Text style={styles.titleText}>Location</Text>
              <View>
                <Text style={styles.valueText}>My Current Location</Text>
                {
                  this.state.current_location === 1 ? (
                    <Text style={styles.subValueText}>
                      {(state !== null || city !== null) ? state === null ? city : state : ""},&nbsp;
                      {address === null ? "no address" : address}
                    </Text>
                  ) : (
                    <Text style={styles.subValueText}>
                      {this.state.country === "United States" ? 
                        `${this.state.state}, ${this.state.country}` : 
                        this.state.country === null ? "United States" : `${this.state.country}`}
                    </Text>
                  )
                }
              </View>
              <Image source={Images.app.icRight} style={styles.arrowRight} />
            </Touchable>
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Maximum Distance</Text>
              <View>
                <Text style={styles.valueText}>{distance} mi</Text>
              </View>
            </View>
            <MultiSlider
              onValuesChange={value => {
                this.setState({ distance: value[0] });
              }}
              customMarker={() => {
                return <View style={styles.thumbMaker} />;
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.tracker}
              selectedStyle={styles.selectedTracker}
              unselectedStyle={styles.unselectedTracker}
              sliderLength={
                this.props.isModal ? screenWidth - wp(90) : screenWidth - wp(50)
              }
              min={0}
              max={101}
              values={[distance]}
            />

            <Touchable
              style={[styles.flexRow, styles.itemPadding]}
              onPress={() => this.setState({ visibleGenderSetting: true })}
            >
              <Text style={styles.titleText}>Show Me</Text>
              <View>
                <Text style={styles.valueText}>
                  {gender === 0 ? "Both" : gender === 1 ? "Male" : "Female"}
                </Text>
              </View>
              <Image source={Images.app.icRight} style={styles.arrowRight} />
            </Touchable>
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Age Range</Text>
              <View>
                <Text style={styles.valueText}>{`${minAge}-${maxAge}`}</Text>
              </View>
            </View>
            <MultiSlider
              onValuesChange={value => {
                this.setState({ minAge: value[0], maxAge: value[1] });
              }}
              customMarker={() => {
                return <View style={styles.thumbMaker} />;
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.tracker}
              selectedStyle={styles.selectedTracker}
              unselectedStyle={styles.unselectedTracker}
              sliderLength={
                this.props.isModal ? screenWidth - wp(90) : screenWidth - wp(50)
              }
              min={birthday > 17 ? 18 : 13}
              max={birthday > 17 ? 75 : 17}
              values={[minAge, maxAge]}
            />
            <View style={styles.separator} />

            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Hide yourself from Swipe</Text>
              <Switch
                value={hideMe}
                onValueChange={val => this.setState({ hideMe: val })}
                circleSize={20}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={"#617FFF"}
                backgroundInactive={"#ABA7D5"}
                circleActiveColor={"white"}
                circleInActiveColor={"white"}
                renderActiveText={false}
                renderInActiveText={false}
                switchBorderRadius={12}
                switchWidthMultiplier={2.2}
              />
            </View>

            <View style={styles.separator} />
            <View style={[styles.flexRow, styles.itemPadding]}>
              <Text style={styles.titleText}>Global</Text>
              <Switch
                value={aroundWorld}
                onValueChange={val => this.setState({ aroundWorld: val })}
                circleSize={20}
                barHeight={24}
                circleBorderWidth={0}
                backgroundActive={"#617FFF"}
                backgroundInactive={"#ABA7D5"}
                circleActiveColor={"white"}
                circleInActiveColor={"white"}
                renderActiveText={false}
                renderInActiveText={false}
                switchBorderRadius={12}
                switchWidthMultiplier={2.2}
              />
            </View>

            <Text style={styles.description}>
              Going gobal will allow you to see people from around the world after you've
              run out of profile nearby.
            </Text>
          </View>
        </SafeAreaView>

        <GenderModal
          isVisible={this.state.visibleGenderSetting}
          gender={this.state.gender}
          onChange={value => this.setState({ gender: value })}
          onDismiss={() => this.setState({ visibleGenderSetting: false })}
        />
        <CountrySelection
          isVisible={this.state.visibleLocation}
          locationData={{state: this.state.state, country: this.state.country, current: this.state.current_location}}
          goBack={() => this.setState({visibleLocation: false})}
          onUpdatedLocation = {(states, country, current) => {
            this.setState({current_location: current, state: states, country: country});
            if (current === 1) {
              getCurrentLocation(position => {
                const params = new FormData();
                params.append("latitude", position.coords.latitude);
                params.append("longitude", position.coords.longitude);
                this.props.updateUser(params, this.props.token);
              });
            }
          }} />
          
        <PurchaseModal
          isVisible={this.state.visiblePurchase}
          onSwipeComplete={() => this.setState({ visiblePurchase: false })}
        />
      </Screen>
    );
  }
}

export default SwipeSettings;

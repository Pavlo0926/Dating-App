import React from "react";
import {
  View,
  Dimensions,
  PanResponder,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { TransitionPresets } from "react-navigation-stack";
import { BlurView } from "@react-native-community/blur";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { GRADIENT } from "@config";
import { CardProgressBar, Touchable, BoxShadow, IconButton, ConfirmModal, NotificationModal } from "@components";
import Images from "@assets/Images";
import { initialWindowMetrics } from "react-native-safe-area-context";

import { API, widthPercentageToDP as wp } from "@helpers";
import { API_ENDPOINTS } from "@config";
import Header from "./header";
import ProfileDetail from "./profile-detail";
import ReportModal from "../report-modal";
import UserSettingModal from "../chat/user-setting-modal";

import styles from "./profile-view.style";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

class ProfileView extends React.Component {
  static navigationOptions = {
    ...TransitionPresets.ModalSlideFromBottomIOS,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      imageWidth: 1,
      imageHeight: 1,
      friend: 0,
      loading: false,
      updating: false,
      rejecting: false,
      visibleReport: false,
      visibleConfirmBlock: false,
      visibleUserSetting: false,
      visibleConfirmDelete: false,
    };

    this._panResponder = null;
    this.pan = new Animated.ValueXY();
    this.backdropOpacity = new Animated.Value(1);
    this.headerOpacity = new Animated.Value(1);
    this.initPanGesture();

    const { user } = this.props.navigation
      ? this.props.navigation.state.params
      : this.props;
    FastImage.preload(user.images.map(image => ({ uri: image.path })));
  }

  componentDidMount() {
    this.onCheckingFriend();
  }

  existBio = user => {
    return user.bio !== undefined && user.bio !== null && user.bio !== "";
  };

  initPanGesture() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5);
      },
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this),
    });
  }

  _onPanResponderMove(event, gestureState) {
    if (gestureState.dy > 0) {
      const newOpacityFactor = 1 - gestureState.dy / this.state.imageHeight;
      let zeroHeight = 30;
      const newHeaderFactor =
        gestureState.dy > zeroHeight ? 0 : 1 - gestureState.dy / zeroHeight;
      Animated.parallel([
        Animated.timing(this.backdropOpacity, {
          toValue: newOpacityFactor,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.headerOpacity, {
          toValue: newHeaderFactor,
          duration: 50,
          useNativeDriver: false,
        }),
      ]).start();
      Animated.event([null, { dy: this.pan.y }], { useNativeDriver: false })(
        event,
        gestureState,
      );
    }
  }

  _onPanResponderRelease(event, gestureState) {
    if (gestureState.vy > 1 || gestureState.dy >= this.state.imageHeight / 2) {
      Animated.parallel([
        Animated.timing(this.backdropOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.headerOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.pan, {
          toValue: { x: 0, y: this.state.imageHeight },
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start(() => {
        this.onBack();
      });
    } else {
      Animated.parallel([
        Animated.timing(this.backdropOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.headerOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(this.pan, {
          toValue: { x: 0, y: 0 },
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }

  onBack = () => {
    if (this.props.navigation) {
      this.props.navigation.goBack();
    } else {
      this.props.goBack && this.props.goBack();
    }
  };

  onImagePressed = e => {
    let index = this.state.imageIndex;
    const { user } = this.props.navigation
      ? this.props.navigation.state.params
      : this.props;
    let images = user.images || [];
    if (e.nativeEvent.pageX < screenWidth / 2) {
      index -= 1;
      if (index < 0) index = this.existBio(user) ? images.length : images.length - 1;
    } else {
      index += 1;
      if (this.existBio(user)) {
        if (index >= images.length + 1) index = 0;
      } else {
        if (index >= images.length) index = 0;
      }
    }
    this.setState({ imageIndex: index });
    ReactNativeHapticFeedback.trigger("impactLight", options);
  };

  onCheckingFriend = () => {
    const { user } = this.props.navigation
      ? this.props.navigation.state.params
      : this.props;
    let userId = user.id || user._id;
    if (userId === this.props.owner.id) {
      this.setState({ friend: 0 });
      return;
    }
    let data = new FormData();
    data.append("user_target_id", userId);
    this.setState({ loading: true });
    API.request({
      method: "post",
      url: `${API_ENDPOINTS.IS_FRIENDS}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data,
    })
      .then(response => {
        let res = response.data.data;
        this.setState({ friend: res.friend, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  onUpdateFriend = type => {
    if (this.state.updating || this.state.rejecting) return;
    const { user } = this.props.navigation
      ? this.props.navigation.state.params
      : this.props;
    let userId = user.id || user._id;

    let data = new FormData();

    data.append("username", user.username || user.name);
    data.append("user_target_id", userId);

    let url = "";
    if (type === "add") {
      url = `${API_ENDPOINTS.ADD_FRIEND_USERNAME}`;
    } else if (type === "remove") {
      this.setState({visibleConfirmDelete: true});
      return;
    } else if (type === "delete") {
      url = `${API_ENDPOINTS.REMOVE_FRIEND}`;
    } else if (type === "accept") {
      url = `${API_ENDPOINTS.ACCEPT_FRIEND_REQUEST}`;
    } else {
      url = `${API_ENDPOINTS.REJECT_FRIEND_REQUEST}`;
    }
    if (type === "reject") {
      this.setState({ rejecting: true });
    } else {
      this.setState({ updating: true });
    }

    API.request({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.token,
      },
      data,
    })
      .then(response => {
        let res = response.data.data;
        this.setState({
          friend: res.friend_info.friend,
          updating: false,
          rejecting: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ updating: false, rejecting: false });
      });
  };

  render() {
    const { user } = this.props.navigation
      ? this.props.navigation.state.params
      : this.props;
    const { imageIndex, imageWidth, imageHeight, visibleReport, visibleConfirmDelete } = this.state;
    let images = user.images || [];
    let [translateY] = [this.pan.y];

    let shadowOption = {
      width: imageWidth,
      height: imageHeight,
      color: "#0B0516",
      opacity: 1,
      _borderRadius: 22,
      spread: 0,
      blur: 20,
      offsetX: 0,
      offsetY: 6,
    };
    let boxHeight =
      screenHeight -
      75 -
      initialWindowMetrics.insets.top -
      initialWindowMetrics.insets.bottom;

    return (
      <View style={styles.container}>
        <Animated.View
          ref={ref => (this.backdropRef = ref)}
          style={[styles.flexFill, { opacity: this.backdropOpacity }]}
        >
          <Touchable
            style={styles.container}
            onPress={() => {
              this.onBack();
            }}
          >
            <BlurView style={styles.container} blurType='dark' blurAmount={10} />
          </Touchable>
        </Animated.View>
        <Animated.View style={{ opacity: this.headerOpacity }} pointerEvents={"box-none"}>
          <Header
            user={user}
            onBack={() => {
              this.onBack();
            }}
            onReport={() => this.setState({ visibleUserSetting: true })}
          />
        </Animated.View>
        <SafeAreaView style={styles.container} pointerEvents={"box-none"}>
          <Animated.View
            style={[
              styles.gestureContainer,
              { transform: [{ translateY }], height: boxHeight },
            ]}
            {...this._panResponder.panHandlers}
            pointerEvents={"box-none"}
          >
            <BoxShadow setting={shadowOption} />
            <Touchable style={styles.touchArea} onPress={e => this.onImagePressed(e)}>
              <View
                style={styles.contentContainer}
                onLayout={e => {
                  const { layout } = e.nativeEvent;
                  this.setState({
                    imageWidth: layout.width,
                    imageHeight: layout.height,
                  });
                }}
              >
                {this.existBio(user) && imageIndex === images.length ? (
                  <View style={styles.profileImage}>
                    <FastImage
                      source={{ uri: images[0].path }}
                      style={styles.profileImage}
                    />
                    <View style={styles.overlayView} />
                  </View>
                ) : (
                  <FastImage
                    source={{ uri: images[imageIndex].path }}
                    style={styles.profileImage}
                  />
                )}

                <View style={styles.detailContainer}>
                  <LinearGradient
                    colors={GRADIENT.FADE_UP}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.detailOverlay}
                  />
                  <CardProgressBar
                    count={this.existBio(user) ? images.length + 1 : images.length}
                    activeIndex={imageIndex}
                    onPress={index => {
                      this.setState({ imageIndex: index });
                    }}
                  />
                  <ProfileDetail user={user} imageIndex={imageIndex} />
                </View>
              </View>
            </Touchable>

            <View style={styles.controlContainer} pointerEvents={"box-none"}>
              {this.state.loading && (
                <View style={styles.iconButtonContainer}>
                  <ActivityIndicator color={"white"} size={"large"} />
                </View>
              )}
              {this.state.friend === 1 && (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    backColor={"#00FF77"}
                    icon={Images.app.icPlus}
                    iconWidth={wp(18)}
                    iconHeight={wp(18)}
                    iconTint={"#0B0516"}
                    loading={this.state.updating}
                    onPress={() => this.onUpdateFriend("add")}
                  />
                </View>
              )}
              {this.state.friend === 2 && (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    backColor={"#00FF77"}
                    icon={Images.app.icCheck}
                    iconWidth={wp(27)}
                    iconHeight={wp(21)}
                    loading={this.state.updating}
                    onPress={() => this.onUpdateFriend("accept")}
                  />
                </View>
              )}
              {this.state.friend === 2 && (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    backColor={"#ABA7D5"}
                    icon={Images.app.icCross}
                    iconWidth={wp(22)}
                    iconHeight={wp(22)}
                    loading={this.state.rejecting}
                    onPress={() => this.onUpdateFriend("reject")}
                  />
                </View>
              )}
              {this.state.friend === 3 && (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    backColor={"#E8E6FF"}
                    icon={Images.app.icClock}
                    iconWidth={wp(27)}
                    iconHeight={wp(27)}
                  />
                </View>
              )}
              {this.state.friend === 4 && (
                <View style={styles.iconButtonContainer}>
                  <IconButton
                    backColor={"#FF0036"}
                    icon={Images.app.icCross}
                    iconWidth={wp(18)}
                    iconHeight={wp(18)}
                    loading={this.state.updating}
                    onPress={() => this.onUpdateFriend("remove")}
                  />
                </View>
              )}
            </View>
          </Animated.View>
        </SafeAreaView>

        <UserSettingModal
          isVisible={this.state.visibleUserSetting}
          user={user}
          isFriend={this.state.friend === 4}
          onDismiss={() => this.setState({ visibleUserSetting: false })}
          onReport={() => {
            setTimeout(() => {
              this.setState({visibleReport: true});
            }, 400);
          }}
          onBlock={() => {
            setTimeout(() => {
              this.setState({visibleConfirmBlock: true});
            }, 400);
          }}
          onUnfriend={() => {
            setTimeout(() => {
              this.setState({visibleConfirmDelete: true});
            }, 400);
          }}
        />

        <ReportModal
          isVisible={visibleReport}
          userId={(user.id || user._id)}
          onDismiss={() => this.setState({ visibleReport: false })}
        />
        
        <ConfirmModal
          isVisible={this.state.visibleConfirmBlock}
          user={user}
          onDismiss={() => this.setState({ visibleConfirmBlock: false })}
          onConfirm={() => {
            this.props.blockUser((user.id || user._id), this.props.token);
            this.setState({ visibleConfirmBlock: false }, () => {
              setTimeout(() => {
                this.props.navigation.goBack();
              }, 1000);
            });
          }}
        />
        
        <NotificationModal
          isVisible={visibleConfirmDelete}
          onBack={() => this.setState({visibleConfirmDelete: false})}
          onConfirm={(userId, userName) => {
            this.setState({visibleConfirmDelete: false});
            this.onUpdateFriend("delete");
          }}
        />
      </View>
    );
  }
}

export default ProfileView;

import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import {
  Screen,
  Image,
  Text,
  BackButton,
  Touchable,
  AutoDragSortableView,
  AnimatedButton,
} from "@components";
import { BlurView } from "@react-native-community/blur";
import Modal from "react-native-modal";
import { GRADIENT } from "@config";

import Images from "@assets/Images";
import styles from "./choose-badge-modal.style";

const allBadgesList = require("@config/data/badges.json");

class ChooseBadgeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badges: [],
      arrBadges: [],
      dragIndex: -1,
    };
  }

  onModalShow = () => {
    let arrBadges = [];
    let badges = this.props.user.badges.map(badge => ({
      id: badge,
      icon: allBadgesList[badge-1].icon,
    }));
    allBadgesList.forEach((value, index) => {
      let sameBadges = badges.filter(
        badge => parseInt(value.id, 10) === parseInt(badge.id, 10),
      );
      if (sameBadges.length !== 0) {
        value.selected = true;
      } else {
        value.selected = false;
      }
      arrBadges.push(value);
    });
    this.setState({ badges, arrBadges });
  };

  onModalHide = () => {
    const params = new FormData();
    const { badges } = this.state;
    
    badges.forEach(badge => {
      params.append("badges[]", badge.id);
    });
    if (badges.length === 0) {
      params.append("remove_badges", 1);
    }
    this.props.updateUser(params, this.props.token);
  };

  onSelectBadge = index => {
    const { arrBadges, badges } = this.state;

    if (badges.length === 6 && !arrBadges[index].selected === true) {
      return;
    }

    arrBadges[index].selected = !arrBadges[index].selected;
    if (arrBadges[index].selected) {
      let newBadges = [
        ...badges,
        { id: arrBadges[index].id, icon: arrBadges[index].icon },
      ];
      this.setState({ badges: newBadges });
    } else {
      let newBadges = badges.filter(item => item.id !== arrBadges[index].id);
      this.setState({ badges: newBadges });
    }
    this.setState({ arrBadges });
  };

  renderAllBadges = () => {
    const { arrBadges } = this.state;
    return (
      <View style={styles.flexWrap}>
        {arrBadges.map((badge, index) => {
          return (
            <View style={styles.allBadgeItem} key={index}>
              <Touchable
                onPress={() => {
                  this.onSelectBadge(index);
                }}
              >
                <View
                  style={
                    badge.selected
                      ? styles.badgeSelectedWrapper
                      : styles.badgeWrapper
                  }
                >
                  <Image style={styles.badgeImage} source={Images.badges[badge.id]} />
                </View>
              </Touchable>
            </View>
          );
        })}
      </View>
    )
  }

  renderFreeBadges = () => {
    const { arrBadges } = this.state;
    let freeBadges = arrBadges.filter((value) => value.id < 7);
    let plusBadges = arrBadges.filter((value) => value.id > 6);
    return (
      <View>
        <Text style={styles.badgeText}>{"Your Badges"}</Text>
        <View style={styles.flexWrap}>
          {freeBadges.map((badge, index) => {
            return (
              <View style={styles.allBadgeItem} key={index}>
                <Touchable
                  onPress={() => {
                    this.onSelectBadge(index);
                  }}
                >
                  <View
                    style={
                      badge.selected
                        ? styles.badgeSelectedWrapper
                        : styles.badgeWrapper
                    }
                  >
                    <Image style={styles.badgeImage} source={Images.badges[badge.id]} />
                  </View>
                </Touchable>
              </View>
            );
          })}
        </View>

        <Text style={styles.badgePlusText}>{"Get Pluzo+ to unlock all badges"}</Text>
        <View style={[styles.flexWrap]}>
          {plusBadges.map((badge, index) => {
            return (
              <View style={styles.allBadgeItem} key={index}>
                <View
                  style={
                    badge.selected
                      ? styles.badgeSelectedWrapper
                      : styles.badgeWrapper
                  }
                >
                  <Image style={styles.badgeImage} source={Images.badges[badge.id]} />
                </View>
              </View>
            );
          })}
          <View style={styles.badgePlusMask} />
        </View>
      </View>
    )
  }

  render() {
    const { badges } = this.state;

    return (
      <Modal
        {...this.props}
        customBackdrop={
          <Touchable style={styles.flexFill} onPress={this.props.dismissModal}>
            <BlurView
              style={styles.flexFill}
              blurType='dark'
              blurAmount={10}
              reducedTransparencyFallbackColor='#0B0516'
            />
          </Touchable>
        }
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        backdropTransitionOutTiming={0}
        backdropOpacity={1}
        useNativeDriver={false}
        onModalShow={this.onModalShow}
        onModalWillHide={this.onModalHide}
        onSwipeComplete={this.props.dismissModal}
      >
        <Screen hasGradient style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Profile Badges</Text>
            <BackButton icon={Images.app.icBack} onPress={this.props.dismissModal} />
          </View>

          <View style={styles.myBadgeScroll}>
            <AutoDragSortableView
              horizontal={true}
              dataSource={badges.length === 0 ? [1] : badges}
              parentWidth={badges.length === 0 ? 46 : badges.length * 46}
              childrenWidth={36}
              childrenHeight={36}
              marginChildrenRight={10}
              maxScale={1}
              contentContainerStyle={styles.scrollContentCenter}
              onDragStart={index => {
                this.setState({ dragIndex: index });
              }}
              onDragEnd={() => {
                this.setState({ dragIndex: -1 });
              }}
              onDataChange={data => {
                this.setState({ badges: data });
              }}
              keyExtractor={(item, index) => (typeof item === "object") ? item.id : 0}
              renderItem={(item, index) => {
                return (
                  <View
                    style={[
                      styles.myBadgeView,
                      this.state.dragIndex === index ? styles.badgeActive : {},
                    ]}
                  >
                    {(typeof item === "object") &&
                    <Image style={styles.badgeImage} source={Images.badges[item.id]} />}
                  </View>
                );
              }}
            />
          </View>

          <Text style={styles.noteText}>
            Choose the badges you want to display on your profile
          </Text>

          <View style={styles.separatorLine} />

          <ScrollView style={styles.allBadgeScroll}>
            {this.props.user.premium === 1 ? (
              this.renderAllBadges()
            ) : (
              this.renderFreeBadges()
            )}
          </ScrollView>
          {this.props.user.premium === 0 &&
          <View style={styles.buttonContainer}>
            <AnimatedButton
              text={"Get Pluzo Plus"}
              colors={GRADIENT.PURCHASE_BUTTON}
              shadowColor={"#FF6F00"}
              animImage={Images.swipe.pluzoPlusMark}
              animCotainerStyle={styles.plusContainer}
              onPress={() => this.props.onPurchase()}
            />
          </View>}
        </Screen>
      </Modal>
    );
  }
}

export default ChooseBadgeModal;

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import EventBus from "eventing-bus";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { Text, Touchable, Image } from "@components";
import { AppBadges } from "@config";
import Images from "@assets/Images";
import { widthPercentageToDP as wp } from "@helpers";

import styles from "./messages.style";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoading: true,
      rowOpened: false,
    };
    this.swipeListRef = React.createRef();
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("willFocus", () => {
      this.props.requestChannels(this.props.token);
    });
    this.actionNewMessage = EventBus.on("NEW_MSG", messages => {
      if (this.props.isFocused === true) {
        this.props.requestChannels(this.props.token);
      }
    });
    this.actionFriendRemove = EventBus.on("Need_Update_Friends", () => {
      if (this.props.isFocused === true) {
        this.props.requestChannels(this.props.token);
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoadingChannels === true && prevState.firstLoading === true) {
      this.onFinishedLoading();
    }
  }

  componentWillUnmount() {
    this._unsubscribe;
    this.actionNewMessage();
    this.actionFriendRemove();
  }

  onFinishedLoading = () => {
    this.setState({ firstLoading: false });
  };

  onReportUser = (rowRef, reportUser) => {
    rowRef.closeRow();
    this.props.onReport && this.props.onReport(reportUser);
  }

  onRemoveUser = (rowRef, deleteUser) => {
    rowRef.closeRow();
    this.props.onRemove && this.props.onRemove(deleteUser);
  }

  renderRowItem = (channel, index, rowMap) => {
    let createdTime = channel.messages[0].created_at || channel.messages[0].createdAt;
    let timeAgo = moment.unix(createdTime).fromNow(true);
    let partner = channel.partner_info;
    let image = require("@assets/images/app-icon.png");
    let name = "Pluzo Team";
    let badges = [];
    if (typeof partner === "object") {
      image = partner.images.length > 0 ? partner.images[0].path : null;
      name = partner.first_name === null ? "No Name" : partner.first_name;
      badges = partner.badges;
    }
    let isRead = channel.messages[0].status === 1;
    let isMyMessage = channel.messages[0].user._id !== partner._id;

    return (
      <SwipeRow 
        disableRightSwipe
        rightOpenValue={typeof partner === "string" ? -wp(75) : -wp(150)}
        stopRightSwipe={typeof partner === "string" ? -wp(75) : -wp(150)}
        closeOnRowPress={true}>
        <View style={typeof partner === "string" ? styles.rowBack1 : styles.rowBack}>
          {typeof partner === "object" && <Touchable style={[styles.flexFill, styles.backReportContainer]}
            onPress={() => this.onReportUser(rowMap[index], partner)} />}
          <Touchable style={[styles.flexFill, styles.backRemoveContainer]}
              onPress={() => this.onRemoveUser(rowMap[index], partner)} />
        </View>
        <View style={styles.rowFront}>
          <Touchable
            onPress={() => {
              this.props.onPressItem(
                channel.chat_id,
                typeof partner === "string" ? 0 : partner,
              );
            }}
            disabled={this.state.rowOpened}
            key={channel.chat_id}
          >
            <View style={styles.messageContainer}>
              <View style={styles.imageContainer}>
                <FastImage
                  source={
                    image === null
                      ? require("@assets/images/message-image.png")
                      : typeof image === "string"
                      ? { uri: image }
                      : image
                  }
                  style={styles.image}
                />
              </View>
              <View style={styles.messageContentContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.subject}>{name}</Text>
                  {badges.map(badge => {
                    if (badge > AppBadges.length) return null;
                    return (
                      <Image key={`user-badge-${badge}`} style={styles.badgeImage} 
                        source={Images.badges[AppBadges[badge-1].id]} />
                    );
                  })}
                </View>
                <Text
                  style={[styles.preview, isRead ? {} : styles.previewNew]}
                  numberOfLines={1}
                >
                  {isMyMessage && "You: "}
                  {channel.messages[0].type === "invite" && "invited you to the live"}
                  {channel.messages[0].type === "close" && "The Live has ended."}
                  {channel.messages[0].type === "message" && channel.messages[0].image !== null && !isMyMessage && `${channel.messages[0].user.first_name} sent an image`}
                  {channel.messages[0].type === "message" && channel.messages[0].image !== null && isMyMessage && `You sent an image`}
                  {channel.messages[0].type === "message" && channel.messages[0].image === null && `${channel.messages[0].text}`}
                </Text>
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{timeAgo}</Text>
                {channel.messages[0].user._id === partner._id && !isRead && (
                  <View style={styles.unread} />
                )}
              </View>
            </View>
          </Touchable>
          <View style={typeof partner === "string" ? styles.hiddenContainer1 : styles.hiddenContainer}>
            {typeof partner === "object" && <Touchable style={[styles.flexFill, styles.hiddenReportContainer]}
              onPress={() => this.onReportUser(rowMap[index], partner)}>
              <View style={styles.hiddenButton}>
                <Image source={require("@assets/images/report.png")} style={styles.hiddenIcon}/>
                <Text style={styles.hiddenText}>REPORT</Text>
              </View>
            </Touchable>}
            <Touchable style={[styles.flexFill, styles.hiddenRemoveContainer]}
              onPress={() => this.onRemoveUser(rowMap[index], partner)}>
              <View style={styles.hiddenButton}>
                <Image source={require("@assets/images/ic-cross.png")} style={styles.hiddenIcon}/>
                <Text style={styles.hiddenText}>REMOVE</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </SwipeRow>
    );
  }

  render() {
    const { isLoadingChannels, channels } = this.props;
    let chatChannels = channels.filter(channel => channel.partner_info !== null);
    const { firstLoading } = this.state;
    if (isLoadingChannels && firstLoading === true) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      );
    }

    return (
      <SwipeListView
        style={styles.container}
        data={chatChannels}
        keyExtractor={item => `room-${item.chat_id}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={(rowData, rowMap) => {
          return this.renderRowItem(rowData.item, `room-${rowData.item.chat_id}`, rowMap);
        }}
        ref={(ref) => this.swipeListRef = ref}
        onRowOpen={(rowKey, rowMap) => {
          this.setState({rowOpened: true});
        }}
        onRowClose={(rowKey, rowMap) => {
          this.setState({rowOpened: false});
        }}
      />
    );
  }
}

export default Messages;

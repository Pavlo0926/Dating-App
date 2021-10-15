import React, { Component } from "react";
import {
  View,
  TextInput as RNTextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Screen, Image, BackButton, Text, Touchable, BorderButton, NotificationModal } from "@components";
import RNMasonryScroll from "react-native-masonry-scrollview";
import LiveItem from "../live/live-item";
import EventBus from "eventing-bus";
import { COLOR } from "@config";
import SearchPeopleItem from "./search-people-item";
import SearchChatItem from "./search-chat-item";
import { SafeAreaView } from "react-navigation";
import { API } from "@helpers";
import { API_ENDPOINTS } from "@config";
import { StreamStatus } from "@constants";

import styles from "./search.style";

const FilterTypes = [
  { id: 1, name: "ALL" },
  { id: 2, name: "Friends" },
  { id: 3, name: "Chat" },
  { id: 4, name: "People" },
  { id: 5, name: "Live" },
];

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 1,
      searchKeyword: "",
      addingUsers: [],
      visibleConfirmDelete: false,
      deletedUsers: [],
    };
    this.searchInput = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.searchInput.focus();
    }, 500);

    this.streamStoppedAction = EventBus.on("StreamStopped", channelName => {
      this.props.updateSearchLive(this.props.live.filter((value) => value.channel !== channelName));
    });
  }

  componentWillUnmount() {
    this.props.initSearch();
    this.streamStoppedAction();
  }

  onBack = () => {
    this.props.navigation.goBack();
  };

  onSearch = text => {
    clearTimeout(this.searchTimeout);
    this.props.initSearch();
    if (text !== "") {
      this.searchTimeout = setTimeout(() => {
        this.setState({ searchKeyword: text, addingUsers: [] });
        this.props.search(text, this.props.token);
      }, 1000);
    }
  };

  onDeleteUser = () => {
    if (this.removeUser) {
      let userId = this.removeUser.id || this.removeUser._id;

      let data = new FormData();
      data.append("username", this.removeUser.username || user.name);
      data.append("user_target_id", userId);

      let url = `${API_ENDPOINTS.REMOVE_FRIEND}`;

      API.request({
        method: "post",
        url: url,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + this.props.token,
        },
        data,
      });
      this.setState({deletedUsers: [...this.state.deletedUsers, userId]});
    }
  }

  onJoinStream = channelName => {
    let names = channelName.split("-");
    if (names.length > 1 && parseInt(names[1], 10) === this.props.user.id ||
      this.props.channelName === channelName) {
      return;
    }
    let params = {
      channelName,
      isBroadcaster: false,
      isJoin: true,
    };
    if (this.props.streamStatus !== StreamStatus.NONE) {
      EventBus.publish("APP_END_STREAM_ACTION");
      setTimeout(() => {
        EventBus.publish("NEW_STREAM_ACTION", params);
      }, 500);
    } else {
      EventBus.publish("NEW_STREAM_ACTION", params);
    }
  };

  render() {
    const { currentFilter } = this.state;
    const { isSearching, friends, chat, people, live } = this.props;console.log(chat);
    let realFriends = friends.filter((value) => !this.state.deletedUsers.includes((value.id || value._id)));
    return (
      <Screen hasGradient style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <BackButton
              onPress={() => {
                this.onBack();
              }}
            />
            <View style={styles.searchContainer}>
              <View style={styles.iconContainer}>
                <Image source={require("@assets/images/search.png")} />
              </View>
              <RNTextInput
                ref={ref => {
                  this.searchInput = ref;
                }}
                style={styles.inputField}
                returnKeyType={"search"}
                autoFocus={true}
                allowFontScaling={false}
                autoCapitalize={"none"}
                clearButtonMode={"always"}
                onChangeText={text => this.onSearch(text)}
              />
            </View>
          </View>

          <View style={styles.filterContainer}>
            <FlatList
              horizontal
              keyboardShouldPersistTaps={"always"}
              data={FilterTypes}
              keyExtractor={(item, index) => `filter-type-${item.id}`}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item: item, index }) => {
                return (
                  <Touchable onPress={() => this.setState({ currentFilter: item.id })}>
                    <View
                      style={[
                        styles.filterButtonContainer,
                        item.id === currentFilter ? styles.activeButton : {},
                      ]}
                    >
                      <Text style={styles.filterText}>{item.name}</Text>
                    </View>
                  </Touchable>
                );
              }}
            />
          </View>

          {isSearching === true ? (
            <ActivityIndicator size={"large"} color={"white"} />
          ) : (
            <ScrollView keyboardShouldPersistTaps={"always"}>
              {(currentFilter === 1 || currentFilter === 2) && realFriends.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>Friends</Text>
                  {realFriends.map((item, index) => {
                    if (index > 1 && currentFilter === 1) {
                      return;
                    }
                    return (
                      <SearchPeopleItem friend item={item} key={`friend-${index}`}
                        onRemoveFriend={() => {
                          this.removeUser = item;
                          this.setState({visibleConfirmDelete: true});
                        }} />
                    );
                  })}
                  {realFriends.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 2 })}
                      />
                    </View>
                  )}
                </View>
              )}
              {(currentFilter === 1 || currentFilter === 3) && chat.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>Chat</Text>
                  {chat.map((item, index) => {
                    if (index > 1 && currentFilter === 1) {
                      return;
                    }
                    return (
                      <SearchChatItem
                        item={item}
                        key={`chat-${index}`}
                        searchKeyword={this.state.searchKeyword}
                        currentUser={this.props.user}
                      />
                    );
                  })}
                  {chat.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 3 })}
                      />
                    </View>
                  )}
                </View>
              )}
              {(currentFilter === 1 || currentFilter === 4) && people.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>People</Text>
                  {people.map((item, index) => {
                    if (index > 1 && currentFilter === 1) {
                      return;
                    }
                    return <SearchPeopleItem item={item} key={`people-${index}`} />;
                  })}
                  {people.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 4 })}
                      />
                    </View>
                  )}
                </View>
              )}
              {(currentFilter === 1 || currentFilter === 5) && live.length > 0 && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionText}>Live</Text>
                  <RNMasonryScroll style={styles.masonryContainer} bounces={false}>
                    {live.map((item, index) => {
                      return (
                        <Touchable
                          style={styles.liveItemContainer}
                          onPress={() => {
                            this.onJoinStream(item.channel);
                          }}
                          key={`live-search-${index}`}
                        >
                          <LiveItem item={item}/>
                        </Touchable>
                      )
                    })}
                  </RNMasonryScroll>
                  {live.length > 2 && currentFilter === 1 && (
                    <View style={styles.showAllContainer}>
                      <BorderButton
                        text={"Show all results"}
                        color={COLOR.TEXT_SECONDARY_4}
                        textStyle={styles.showAllText}
                        onPress={() => this.setState({ currentFilter: 5 })}
                      />
                    </View>
                  )}
                </View>
              )}
            </ScrollView>
          )}
        </SafeAreaView>
        <NotificationModal
          isVisible={this.state.visibleConfirmDelete}
          onBack={() => this.setState({visibleConfirmDelete: false})}
          onConfirm={(userId, userName) => {
            this.setState({visibleConfirmDelete: false});
            this.onDeleteUser();
          }}
        />
      </Screen>
    );
  }
}

export default SearchScreen;

import React from "react";
import { View } from "react-native";
import moment from "moment";
import { Text, Touchable, StyledText } from "@components";
import { NavigationService } from "@helpers";
import { SCREENS } from "@constants";
import styles from "./search-chat-item.style";
import FastImage from "react-native-fast-image";

const SearchChatItem: () => React$Node = props => {
  const { chat_id, created_at, first_name, text, image, status, username } = props.item;
  const searchKeyword = props.searchKeyword || "";
  let timeAgo = moment.unix(created_at).fromNow(true);
  let styledText = text.replace(
    new RegExp(searchKeyword, "ig"),
    `<previewBold>${searchKeyword}</previewBold>`,
  );
  
  return (
    <Touchable
      onPress={() => {
        if (parseInt(props.item.id, 10) !== props.currentUser.id) {
          NavigationService.navigate(SCREENS.CHAT, {
            chatId: chat_id,
            chatUser: props.item.id === 0 ? 0 : props.item,
          });
        } else {
          NavigationService.navigate(SCREENS.CHAT, {
            chatId: chat_id,
            chatUser: props.item.partner_model.id === 0 ? 0 : props.item.partner_model,
          });
        }
      }}
    >
      <View style={styles.messageContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            source={
              (image === null || image === undefined)
                ? require("@assets/images/app-icon.png")
                : { uri: image }
            }
            style={styles.image}
          />
        </View>
        <View style={styles.messageContentContainer}>
          <Text style={styles.subject}>
            {(first_name === null || first_name === undefined) ? username : first_name}
          </Text>
          <StyledText style={styles.preview} textStyles={styles} numberOfLines={1}>
            {styledText}
          </StyledText>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{timeAgo}</Text>
          {status === 1 && <View style={styles.unread} />}
        </View>
      </View>
      <View style={styles.separator} />
    </Touchable>
  );
};

export default SearchChatItem;

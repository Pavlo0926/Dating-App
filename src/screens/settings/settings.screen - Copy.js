import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Touchable, Image, Text, DialogInput, TouchableSettingItem } from "@components";
import RNIap from "react-native-iap";
import { SCREENS } from "@constants";
import { Notification, API } from "@helpers";
import { API_ENDPOINTS } from "@config";

import Images from "@assets/Images";
import Header from "./header";
import LogoutModal from "./logout-modal/logout-modal";

import styles from "./settings.style";

// type: normal => 0, transparent => 1, empty cell => 2, separator-line => 3
const settingData = require("./settings.json");

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      visibleLogout: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  onLogout = () => {
    this.props.logout();
  };

  onDeleteAccount = inputValue => {
    this.setState({ showDelete: false }, () => {
      setTimeout(() => {
        if (inputValue === "DELETE") {
          this.props.deleteAccount(this.props.token);
        } else {
          Notification.alert(
            "Whoops",
            "Sorry, please enter the text exactly as displayed to confirm.",
          );
        }
      }, 200);
    });
  };

  onRestorePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();

      purchases.forEach(purchase => {
        switch (purchase.productId) {
        case 'com.pluzo.app.pluzoplus':
        case 'com.pluzo.app.pluzoplus3':
        case 'com.pluzo.app.pluzoplus12':
          let params = new FormData();
          let serviceId = 10;
          let amount = 11.99;
          if (purchase.productId === 'com.pluzo.app.pluzoplus3') {
            serviceId = 11;
            amount = 9.99;
          } else if (purchase.productId === 'com.pluzo.app.pluzoplus12') {
            serviceId = 12;
            amount = 7.99;
          }
          params.append("service_id", serviceId);
          params.append("receipt", purchase.transactionReceipt);
          params.append("transaction_id", purchase.transactionId);
          params.append("amount", amount);
          params.append("payment_method", Platform.OS === "ios" ? "apple" : "google");
          API.request({
            method: "post",
            url: `${API_ENDPOINTS.ITEM_PAY}`,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.props.token,
            },
            data: params,
            silent: true,
          })
            .then(async response => {
              this.props.updateUser(response.data.data.user);
            })
            .catch(e => {
              console.log(e);
            });
          break
        }
      })

      // Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles.join(', '));
    } catch(err) {
      console.warn(err);
    }
  }

  onItemPressed = itemId => {
    if (itemId === "1") {
      this.props.navigation.navigate(SCREENS.ACCOUNT_SETTINGS);
    } else if (itemId === "2") {
      this.props.navigation.navigate(SCREENS.SAFETY_PRIVACY);
    } else if (itemId === "3") {
      this.props.navigation.navigate(SCREENS.PUSH_SETTINGS);
    } else if (itemId === "5") {
      this.props.navigation.navigate(SCREENS.SWIPE_SETTINGS);
    } else if (itemId === "7") {
      this.props.navigation.navigate(SCREENS.HELP);
    } else if (itemId === "9") {
      this.props.navigation.navigate(SCREENS.LEGAL, {});
    } else if (itemId === "11") {
      this.onRestorePurchases();
    } else if (itemId === "16") {
      // delete account
      if (!this.props.isDeletingAccount) {
        this.setState({ showDelete: true });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaContainer}>
          <Header title={"Settings"} onBack={this.goBack} />

          <FlatList
            data={settingData}
            keyExtractor={item => item.id}
            renderItem={({ item: item, index }) => {
              switch (item.type) {
                case 0:
                  return (
                    <TouchableSettingItem
                      style={styles.itemContainer}
                      text={item.name}
                      icon
                      iconUri={Images.settings[item.iconUri]}
                      onPress={() => this.onItemPressed(item.id)}
                    />
                  );
                case 1:
                  if (item.name.toLowerCase() === "logout") {
                    return (
                      <Touchable
                        style={styles.itemContainer1}
                        onPress={() => this.setState({ visibleLogout: true })}
                      >
                        <Image source={Images.settings[item.iconUri]} />
                        <Text style={styles.logoutText}>{item.name}</Text>
                      </Touchable>
                    );
                  } else {
                    return (
                      <Touchable
                        style={styles.itemContainer1}
                        onPress={() => this.onItemPressed(item.id)}
                      >
                        <Image source={Images.settings[item.iconUri]} />
                        <Text style={styles.deleteText}>{item.name}</Text>
                      </Touchable>
                    );
                  }
                case 2:
                  return <View style={styles.emptyItemContainer} />;
                case 3:
                  return <View style={styles.separatorLine} />;
              }
            }}
          />
        </SafeAreaView>
        <DialogInput
          isDialogVisible={this.state.showDelete}
          title={"Delete your account?"}
          message={'Please type "DELETE" to confirm'}
          hintInput={"DELETE"}
          submitText={"Delete my account"}
          textInputProps={{ autoCapitalize: "characters" }}
          submitInput={inputText => this.onDeleteAccount(inputText)}
          placeholderTextColor={"#9892A3"}
          closeDialog={() => {
            this.setState({ showDelete: false });
          }}
        />
        <LogoutModal
          isVisible={this.state.visibleLogout}
          onCancel={() => this.setState({ visibleLogout: false })}
          onLogout={this.onLogout}
        />
      </View>
    );
  }
}

export default Settings;

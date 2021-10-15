import { Component } from "react";
import { Platform } from "react-native";
import RNIap, { purchaseUpdatedListener, purchaseErrorListener } from "react-native-iap";
import { API } from "./api";
import { API_ENDPOINTS } from "@config";
import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";

export const ItemSkus = Platform.select({
  ios: [
    "com.pluzo.app.pluzoplus",
    "com.pluzo.app.pluzoplus3",
    "com.pluzo.app.pluzoplus12",
    "com.pluzo.app.boostOne",
    "com.pluzo.app.boostFive",
    "com.pluzo.app.boostTen",
    "com.pluzo.app.superlikeOne",
    "com.pluzo.app.superlikeFive",
    "com.pluzo.app.superlikeTen",
    "com.pluzo.app.rewindsOne",
    "com.pluzo.app.rewindsFive",
    "com.pluzo.app.rewindsTen",
  ],
  android: [
    "com.pluzo.app.pluzoplus",
    "com.pluzo.app.pluzoplus3",
    "com.pluzo.app.pluzoplus12",
    "com.pluzo.app.boostOne",
    "com.pluzo.app.boostFive",
    "com.pluzo.app.boostTen",
    "com.pluzo.app.superlikeOne",
    "com.pluzo.app.superlikeFive",
    "com.pluzo.app.superlikeTen",
    "com.pluzo.app.rewindsOne",
    "com.pluzo.app.rewindsFive",
    "com.pluzo.app.rewindsTen",
  ],
});

class IapManager extends Component {
  async componentDidMount() {
    try {
      await RNIap.initConnection();
      await RNIap.clearProductsIOS();
      await RNIap.clearTransactionIOS();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      await RNIap.getProducts(ItemSkus);
      
      this.purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          this.checkingPayments(purchase);
          RNIap.finishTransaction(purchase, true);
        }
      });
  
      this.purchaseErrorSubscription = purchaseErrorListener(error => {
        console.log("purchaseErrorListener", error);
      });
    } catch (err) {
      console.log(err.code, err.message);
    }
  }

  componentWillUnmount() {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
    RNIap.endConnection();
  }

  checkingPayments = purchase => {
    let params = new FormData();
    let serviceId = ItemSkus.indexOf(purchase.productId);
    let amount = 11.99;
    if (serviceId === 0) {
      amount = 11.99;
      params.append("receipt", purchase.transactionReceipt);
    } else if (serviceId === 1) {
      amount = 9.99;
      params.append("receipt", purchase.transactionReceipt);
    } else if (serviceId === 2) {
      amount = 7.99;
      params.append("receipt", purchase.transactionReceipt);
    } else if (serviceId === 3 || serviceId === 6 || serviceId === 9) {
      amount = 3.99;
    } else if (serviceId === 4 || serviceId === 7 || serviceId === 10) {
      amount = 14.99;
    } else {
      amount = 19.99;
    }
    params.append("service_id", serviceId < 3 ? (serviceId + 10) : (serviceId-2));
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
  };

  render() {
    return null;
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    token: state.user.token,
  };
}

const mapDispatchToProps = {
  updateUser: UserCreators.updateUserSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(IapManager);

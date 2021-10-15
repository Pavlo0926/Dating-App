import React from "react";
import { View } from "react-native";
import { GradientButton } from "@components";
import { TextInputField } from "@form-components";
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import styles from "./login.style";

const LoginForm: () => React$Node = props => {
  const { t } = props;

  return (
    <View>
      <Field
        autoCapitalize={"none"}
        name={"username"}
        component={TextInputField}
        keyboardType={"email-address"}
        placeholder={t("login.username")}
      />

      <View style={styles.inputFieldSeparator} />

      <Field
        secureTextEntry
        name={"password"}
        component={TextInputField}
        placeholder={t("login.password")}
      />

      <View style={styles.buttonContainer}>
        <GradientButton
          loading={props.isLoggingIn}
          text={t("login.submitButton")}
          onPress={props.handleSubmit(props.onSubmit)}
        />
      </View>
    </View>
  );
};

export default withTranslation()(
  reduxForm({
    form: "loginForm",
  })(LoginForm),
);

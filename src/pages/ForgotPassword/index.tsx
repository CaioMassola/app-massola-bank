import React, { useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { styles } from "./styles";
import Background from "../../components/Background";
import DropDownLanguage from "../../components/Dropdown-language";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { pt, en } from "../../global/localization";
import { connect } from "react-redux";
import { ILanguage } from "../../redux/actions/language-action";
import { AppDispatch } from "../../redux/store";
import { setDarkMode } from "../../redux/actions/dark-mode-action";
import { useNavigation } from "@react-navigation/native";
import { Icon, Input } from "@rneui/themed";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { font } from "../../global/font";

type IForgotPassword = {
  language_redux: {
    language_redux: ILanguage;
  };
  dark_mode?: {
    dark_mode: boolean;
  };
  setShowDarkMode?: (value: boolean) => void;
  setShowLanguage?: (value: ILanguage) => void;
};

type Inputs = {
  email: string;
};

const ForgotPassword = (props: IForgotPassword) => {
  const { dark_mode, setShowDarkMode, language_redux, setShowLanguage } = props;
  const navigation = useNavigation();
  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = language_redux.language_redux
    ? language_redux.language_redux.surname
    : Localization.locale;

  const fieldsValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(i18n.t("forgotPassword.emailRequired"))
      .email(i18n.t("forgotPassword.typeEmail")),
  });

  const [dark_mode_value, setDarkMode] = useState<boolean>(
    dark_mode ? dark_mode.dark_mode : false
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(fieldsValidationSchema) });

  const onSubmit = (data: Inputs) => {
    console.log(data);
    Alert.alert(
      `${i18n.t("forgotPassword.label")}`,
      `${i18n.t("forgotPassword.msgForgotPassword")}`,
      [
        {
          onPress: () => navigation.navigate("Login"),
        },
      ]
    );
  };

  const _handle_dark_mode = () => {
    !dark_mode_value ? setDarkMode(true) : setDarkMode(false);
    if (setShowDarkMode) {
      !dark_mode_value ? setShowDarkMode(true) : setShowDarkMode(false);
    }
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.config}>
            <View style={{ marginRight: 100 }}>
              <DropDownLanguage
                isColor={dark_mode?.dark_mode}
                setShowLanguage={() => ""}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                _handle_dark_mode();
              }}
              accessible
              accessibilityLabel={
                dark_mode?.dark_mode
                  ? i18n.t("login.themeLight")
                  : i18n.t("login.themeDark")
              }
            >
              <Icon
                type={dark_mode_value ? "ionicon" : "font-awesome-5"}
                name={dark_mode_value ? "sunny-sharp" : "moon"}
                color="white"
                solid={true}
                style={{ marginTop: 15, marginRight: 20 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                marginLeft: 30,
                marginTop: 20,
              }}
            >
              <Icon
                name="arrow-back"
                type="material"
                size={18}
                color={"white"}
              />
              <Text
                style={[styles.labelTitle, { fontSize: 16, marginLeft: 10 }]}
              >
                {i18n.t("forgotPassword.labelBack")}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.labelTitle, { marginTop: 80 }]}>
            {i18n.t("forgotPassword.label")}
          </Text>
          <Text style={[styles.labelTitle, { marginTop: 40, fontSize: 16 }]}>
            {i18n.t("forgotPassword.helpMsg")}
          </Text>
          <View>
            <View style={styles.inputView}>
              <Controller
                name="email"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("forgotPassword.placeholderEmail")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    keyboardType={"email-address"}
                    leftIcon={{
                      type: "material",
                      name: "email",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.email?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    accessible
                    accessibilityLabel={i18n.t(
                      "forgotPassword.placeholderEmail"
                    )}
                  />
                )}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={styles.buttonView}>
                <ButtonIcon
                  color="white"
                  type="material"
                  icon="check"
                  height={40}
                  onPress={handleSubmit(onSubmit)}
                  title={i18n.t("forgotPassword.btnCreate")}
                  img={0}
                  accessibilityLabel={i18n.t("forgotPassword.btnCreate")}
                />
              </View>
            </View>
            <ListDivider />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Background>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setShowDarkMode: (value: boolean) => {
    dispatch(setDarkMode(value));
  },
});

const props = (state: any) => {
  const dark_mode = state.darkModeReducer;
  const language_redux = state.languageReducer;

  const props = {
    dark_mode,
    language_redux,
  };
  return props;
};

export default connect(props, mapDispatchToProps)(ForgotPassword);

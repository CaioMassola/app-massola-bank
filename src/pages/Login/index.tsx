import React, { useState } from "react";
import { Icon, Input } from "@rneui/themed";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import Background from "../../components/Background";
import { ButtonIcon } from "../../components/ButtonIcon";
import { ListDivider } from "../../components/ListDivider";
import DropDownLanguage from "../../components/Dropdown-language";

import Logo from "../../assets/svg/Vector.svg";
import { font } from "../../global/font";
import { styles } from "./styles";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { pt, en } from "../../global/localization";
import { connect } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setDarkMode } from "../../redux/actions/dark-mode-action";
import { ILanguage } from "../../redux/actions/language-action";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const google = require("../../assets/google.png");

type IForms = {
  email: string;
  password: string;
};

type ILogin = {
  language_redux: {
    language_redux: ILanguage;
  };
  dark_mode?: {
    dark_mode: boolean;
  };
  setShowDarkMode?: (value: boolean) => void;
  setShowLanguage?: (value: ILanguage) => void;
};

const Login = (props: ILogin) => {
  const { dark_mode, setShowDarkMode, language_redux } = props;

  const navigation = useNavigation();

  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = language_redux.language_redux
    ? language_redux.language_redux.surname
    : Localization.locale;

  const fieldsValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(i18n.t("login.emailRequired"))
      .email(i18n.t("login.typeEmail")),
    password: yup
      .string()
      .required(i18n.t("login.passwordRequired"))
      .min(6, i18n.t("login.minPassword")),
  });

  const [visibilityPassword, setVisibilityPassword] = useState<boolean>(false);
  const [dark_mode_value, setDarkMode] = useState<boolean>(
    dark_mode ? dark_mode.dark_mode : false
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForms>({ resolver: yupResolver(fieldsValidationSchema) });

  const onSubmit = (data: IForms) => {
    console.log(data);
  };

  const changeVisibilityPassword = () => {
    !visibilityPassword
      ? setVisibilityPassword(true)
      : setVisibilityPassword(false);
  };

  const _handle_dark_mode = () => {
    !dark_mode_value ? setDarkMode(true) : setDarkMode(false);
    if (setShowDarkMode) {
      !dark_mode_value ? setShowDarkMode(true) : setShowDarkMode(false);
    }
  };

  return (
    <Background>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={styles.config}>
              <View style={{ marginLeft: 15 }}>
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
            <View style={styles.viewIcon}>
              <Logo accessible accessibilityLabel={i18n.t("login.logo")} />
            </View>
            <Text
              style={styles.texto}
              accessible
              accessibilityLabel={i18n.t("login.welcome")}
            >
              {i18n.t("login.welcome")}
            </Text>
            <View style={styles.inputView}>
              <Controller
                name="email"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("login.placeholderEmail")}
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
                    accessibilityLabel={i18n.t("login.placeholderEmail")}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("login.placeholderPassword")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    secureTextEntry={!visibilityPassword ? true : false}
                    rightIcon={{
                      type: "material",
                      name: `${
                        !visibilityPassword ? "visibility-off" : "visibility"
                      }`,
                      color: "white",
                      onPress: () => {
                        changeVisibilityPassword();
                      },
                    }}
                    leftIcon={{
                      type: "material",
                      name: "lock",
                      color: "white",
                      onPress: () => {
                        changeVisibilityPassword();
                      },
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.password?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    accessible
                    accessibilityLabel={i18n.t("login.placeholderPassword")}
                  />
                )}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={styles.buttonView}>
                <ButtonIcon
                  color="white"
                  type="material"
                  icon="login"
                  height={40}
                  onPress={handleSubmit(onSubmit)}
                  title={i18n.t("login.btnLogin")}
                  img={0}
                  accessibilityLabel={i18n.t("login.btnLogin")}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              accessible
              accessibilityLabel={i18n.t("login.forgotPassword")}
            >
              <Text style={styles.createAnAccount}>
                {i18n.t("login.forgotPassword")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
              accessible
              accessibilityLabel={i18n.t("login.createAnAccount")}
            >
              <Text style={styles.createAnAccount}>
                {i18n.t("login.createAnAccount")}
              </Text>
            </TouchableOpacity>
            <View style={{ marginTop: 25 }}>
              <ListDivider color={dark_mode_value ? "#999999" : "black"} />
            </View>
            <View style={styles.googleView}>
              <Text
                style={styles.textGoogle}
                accessible
                accessibilityLabel={i18n.t("login.orSocialLogin")}
              >
                {i18n.t("login.orSocialLogin")}
              </Text>
              <View style={{ alignItems: "center" }}>
                <View style={styles.buttonView}>
                  <ButtonIcon
                    color="white"
                    img={google}
                    height={40}
                    onPress={() => console.log("Google")}
                    title={i18n.t("login.btnGoogle")}
                    icon={""}
                    accessibilityLabel={i18n.t("login.accGoogle")}
                  />
                </View>
              </View>
            </View>
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

export default connect(props, mapDispatchToProps)(Login);

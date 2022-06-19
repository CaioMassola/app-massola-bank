import React, { useState } from "react";
import { Icon, Input } from "react-native-elements";
import { View, Text, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

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
import { ILanguage } from "../../redux/actions/language-action";
import { AppDispatch } from "../../redux/store";
import { setDarkMode } from "../../redux/actions/dark-mode-action";

type Inputs = {
  email: string;
  cpf: string;
  smartphone: number;
  password: string;
};

type ICreateAccount = {
  language_redux: {
    language_redux: ILanguage;
  };
  dark_mode?: {
    dark_mode: boolean;
  };
  setShowDarkMode?: (value: boolean) => void;
  setShowLanguage?: (value: ILanguage) => void;
};

const CreateAccount = (props: ICreateAccount) => {
  const { dark_mode, setShowDarkMode, language_redux, setShowLanguage } = props;

  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = language_redux.language_redux
    ? language_redux.language_redux.surname
    : Localization.locale;

  const fieldsValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required(i18n.t("createAccount.emailRequired"))
      .email(i18n.t("createAccount.typeEmail")),
    cpf: yup
      .string()
      .required(i18n.t("createAccount.cpfRequired"))
      .min(11)
      .max(11),
    smartphone: yup
      .number()
      .required(i18n.t("createAccount.smartphoneRequired"))
      .min(11)
      .max(11),
    password: yup
      .string()
      .required(i18n.t("createAccount.passwordRequired"))
      .min(6, i18n.t("createAccount.login.minPassword")),
  });

  const [visibilityPassword, setVisibilityPassword] = useState<boolean>(false);
  const [dark_mode_value, setDarkMode] = useState<boolean>(
    dark_mode ? dark_mode.dark_mode : false
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(fieldsValidationSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const _handle_dark_mode = () => {
    !dark_mode_value ? setDarkMode(true) : setDarkMode(false);
    if (setShowDarkMode) {
      !dark_mode_value ? setShowDarkMode(true) : setShowDarkMode(false);
    }
  };

  return (
    <Background dark_mode={dark_mode?.dark_mode}>
      <SafeAreaView
        style={styles.container}
      >
        <View style={styles.config}>
          <View  style={{marginRight: 100}}>
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
                tvParallaxProperties={null}
              />
            </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'android' ? 'height' : 'padding'}
        >
          <Text style={styles.labelTitle} >{i18n.t('createAccount.label')}</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setShowDarkMode: (value: boolean) => {
    dispatch(setDarkMode(value));
  },
})

const props = (state: any) => {
  const dark_mode = state.darkModeReducer;
  const language_redux = state.languageReducer;

  const props = {
    dark_mode,
    language_redux,
  };
  return props;
};

export default connect(props, mapDispatchToProps)(CreateAccount);

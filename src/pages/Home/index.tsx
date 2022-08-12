import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";
import Background from "../../components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { pt, en } from "../../global/localization";
import { connect } from "react-redux";
import { ILanguage } from "../../redux/actions/language-action";
import { AppDispatch } from "../../redux/store";
import { setDarkMode } from "../../redux/actions/dark-mode-action";
import { useNavigation } from "@react-navigation/native";

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

const Home = (props: IForgotPassword) => {
  const { dark_mode, language_redux } = props;
  const navigation = useNavigation();
  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = language_redux.language_redux
    ? language_redux.language_redux.surname
    : Localization.locale;

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
          <Text style={{ color: "white" }}>Home</Text>
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

export default connect(props, mapDispatchToProps)(Home);

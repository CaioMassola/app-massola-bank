import React, { useState } from "react";
import { Icon, Input } from "react-native-elements";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Background from "../../components/Background";
import { ButtonIcon } from "../../components/ButtonIcon";
import { ListDivider } from "../../components/ListDivider";

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

type Inputs = {
  email: string;
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
  } = useForm<Inputs>({ resolver: yupResolver(fieldsValidationSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Background dark_mode={dark_mode?.dark_mode}>
      <SafeAreaView>
        <Text>Ola</Text>
      </SafeAreaView>
    </Background>
  );
};

const props = (state: any) => {
  const dark_mode = state.darkModeReducer;
  const language_redux = state.languageReducer;

  const props = {
    dark_mode,
    language_redux,
  };
  return props;
};

export default connect(props)(CreateAccount);

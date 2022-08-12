import React, { useEffect, useState } from "react";
import { Icon, Input } from "@rneui/themed";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Background from "../../components/Background";
import { ButtonIcon } from "../../components/ButtonIcon";
import { ListDivider } from "../../components/ListDivider";
import DropDownLanguage from "../../components/Dropdown-language";

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
import { useNavigation } from "@react-navigation/native";
import UserService, { User } from "../../Services/User";
import Loading from "../../components/Loading";
import ModalMessage from "../../components/Modal-Message";

type Inputs = {
  username: string;
  email: string;
  age: number;
  cpf: string;
  smartphone: string;
  password: string;
  passwordConfirmation: string;
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

type IModal = {
  message: string;
  error: boolean;
};

const CreateAccount = (props: ICreateAccount) => {
  const { dark_mode, setShowDarkMode, language_redux, setShowLanguage } = props;
  const [btnReload, setBtnReload] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<IModal>();
  const navigation = useNavigation();

  const userService = new UserService();

  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = language_redux.language_redux
    ? language_redux.language_redux.surname
    : Localization.locale;

  const fieldsValidationSchema = yup.object().shape({
    username: yup.string().required(i18n.t("createAccount.username")),
    email: yup
      .string()
      .required(i18n.t("createAccount.emailRequired"))
      .email(i18n.t("createAccount.typeEmail")),
    age: yup.number().required(i18n.t("createAccount.ageRequired")),
    // monthlyIncome: yup.number().notRequired(),
    cpf: yup
      .string()
      .required(i18n.t("createAccount.cpfRequired"))
      .min(11, i18n.t("createAccount.cpfValidate"))
      .max(11, i18n.t("createAccount.cpfValidate")),
    smartphone: yup
      .string()
      .required(i18n.t("createAccount.smartphoneRequired"))
      .min(11, i18n.t("createAccount.smartValidate"))
      .max(11, i18n.t("createAccount.smartValidate")),
    password: yup
      .string()
      .required(i18n.t("createAccount.passwordRequired"))
      .min(6, i18n.t("createAccount.minPassword")),
    passwordConfirmation: yup
      .string()
      .required(i18n.t("createAccount.passwordRequired"))
      .oneOf([yup.ref("password")], i18n.t("createAccount.passwordConfirmed")),
  });

  const [visibilityPassword, setVisibilityPassword] = useState<boolean>(false);
  const [visibilityPasswordConfirmed, setVisibilityPasswordConfirmed] =
    useState<boolean>(false);
  const [dark_mode_value, setDarkMode] = useState<boolean>(
    dark_mode ? dark_mode.dark_mode : false
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(fieldsValidationSchema) });

  const onSubmit = (data: Inputs) => {
    setOpenModal(false);
    setBtnReload(true);
    const location = language_redux.language_redux.surname;
    const payload: User = {
      username: data.username,
      email: data.email,
      cpf: data.cpf,
      smartphone: data.smartphone,
      age: data.age,
      password: data.password,
    };

    userService
      .create(payload, location)
      .then((x) => {
        if (x?.data.code) {
          // Alert.alert(x.data.message);
          setDataModal({ message: x?.data.message, error: false });
          //aqui
          setOpenModal(true);
          setTimeout(() => {
            setBtnReload(false);
          }, 2500);
        } else {
          // Alert.alert(x?.data.message);
          console.log("aqui");
          setDataModal({ message: x?.data.message, error: true });
          setOpenModal(true);
          setTimeout(() => {
            setBtnReload(false);
          }, 2500);
        }
      })
      .catch(() => {
        Alert.alert(`${i18n.t("createAccount.anyError")}`);
        setTimeout(() => {
          setBtnReload(false);
        }, 2500);
      });
  };

  const changeVisibilityPassword = (password: boolean) => {
    if (password) {
      !visibilityPassword
        ? setVisibilityPassword(true)
        : setVisibilityPassword(false);
    } else {
      !visibilityPasswordConfirmed
        ? setVisibilityPasswordConfirmed(true)
        : setVisibilityPasswordConfirmed(false);
    }
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
                {i18n.t("createAccount.labelBack")}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.labelTitle, { marginTop: 40 }]}>
            {i18n.t("createAccount.label")}
          </Text>
          <View>
            <View style={styles.inputView}>
              <Controller
                name="username"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("createAccount.placeholderUsername")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    leftIcon={{
                      type: "material",
                      name: "person",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.username?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    accessible
                    accessibilityLabel={i18n.t(
                      "createAccount.placeholderUsernamel"
                    )}
                  />
                )}
              />
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
                name="age"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("createAccount.placeholderAge")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    leftIcon={{
                      type: "material",
                      name: "circle",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.age?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    keyboardType={"numeric"}
                    accessible
                    accessibilityLabel={i18n.t("createAccount.placeholderAge")}
                  />
                )}
              />
              <Controller
                name="cpf"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("createAccount.placeholderCpf")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    leftIcon={{
                      type: "material",
                      name: "assignment-ind",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.cpf?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    keyboardType={"numeric"}
                    accessible
                    accessibilityLabel={i18n.t("createAccount.placeholderCpf")}
                  />
                )}
              />
              <Controller
                name="smartphone"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("createAccount.placeholderSmartphone")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    leftIcon={{
                      type: "material",
                      name: "smartphone",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.smartphone?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    keyboardType={"numeric"}
                    accessible
                    accessibilityLabel={i18n.t(
                      "createAccount.placeholderSmartphone"
                    )}
                  />
                )}
              />
              {/* <Controller
                name="monthlyIncome"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("createAccount.placeholderSalary")}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    leftIcon={{
                      type: "material",
                      name: "attach-money",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    // errorMessage={}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    keyboardType={"numeric"}
                    accessible
                    accessibilityLabel={i18n.t(
                      "createAccount.placeholderSalary"
                    )}
                  />
                )}
              /> */}
              <Controller
                name="password"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t("createAccount.placeholderPassword")}
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
                        changeVisibilityPassword(true);
                      },
                    }}
                    leftIcon={{
                      type: "material",
                      name: "lock",
                      color: "white",
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
                    accessibilityLabel={i18n.t(
                      "createAccount.placeholderPassword"
                    )}
                  />
                )}
              />
              <Controller
                name="passwordConfirmation"
                control={control}
                render={(props) => (
                  <Input
                    placeholder={i18n.t(
                      "createAccount.placeholderPasswordConfirmed"
                    )}
                    inputStyle={{
                      color: "white",
                      fontFamily: font.fonts.title400,
                    }}
                    secureTextEntry={
                      !visibilityPasswordConfirmed ? true : false
                    }
                    rightIcon={{
                      type: "material",
                      name: `${
                        !visibilityPasswordConfirmed
                          ? "visibility-off"
                          : "visibility"
                      }`,
                      color: "white",
                      onPress: () => {
                        changeVisibilityPassword(false);
                      },
                    }}
                    leftIcon={{
                      type: "material",
                      name: "lock",
                      color: "white",
                    }}
                    errorStyle={{
                      color: "#ff4d4d",
                      fontSize: 16,
                      fontFamily: font.fonts.title400,
                    }}
                    errorMessage={errors.passwordConfirmation?.message}
                    onChangeText={(value) => {
                      props.field.onChange(value);
                    }}
                    accessible
                    accessibilityLabel={i18n.t(
                      "createAccount.placeholderPasswordConfirmed"
                    )}
                  />
                )}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              {!btnReload ? (
                <View style={styles.buttonView}>
                  <ButtonIcon
                    color="white"
                    type="material"
                    icon="check"
                    height={40}
                    onPress={handleSubmit(onSubmit)}
                    title={i18n.t("createAccount.btnCreate")}
                    img={0}
                    accessibilityLabel={i18n.t("createAccount.btnCreate")}
                  />
                </View>
              ) : (
                <View>
                  <Loading />
                </View>
              )}
            </View>
            <ListDivider />
          </View>
        </KeyboardAwareScrollView>
        {openModal && (
          <ModalMessage
            message={dataModal?.message}
            error={dataModal ? dataModal.error : true}
          />
        )}
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

export default connect(props, mapDispatchToProps)(CreateAccount);

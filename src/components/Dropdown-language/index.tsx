import React from "react";
import { View, Text, Image } from "react-native";
import { Icon } from "@rneui/themed";
import SelectDropdown from "react-native-select-dropdown";
import { connect } from "react-redux";
import { color } from "../../global/color";
import {
  ILanguage,
  setLanguageAction,
} from "../../redux/actions/language-action";
import { AppDispatch } from "../../redux/store";
import i18n from "i18n-js";
import * as Localization from "expo-localization";

import { styles } from "./styles";

type IDropDown = {
  isColor?: boolean;
  setShowLanguage: (value: ILanguage) => void;
  language_redux?: ILanguage;
};

const DropDownLanguage = (props: IDropDown) => {
  const { isColor, setShowLanguage, language_redux } = props;
  let color_value = isColor ? color.dark.primary : color.light.primary;

  i18n.fallbacks = true;
  i18n.locale = language_redux ? language_redux.surname : Localization.locale;

  const languages = [
    {
      id: 1,
      language: i18n.t("login.english"),
      surname: "en",
      icon: require("../../assets/usa.jpg"),
    },
    {
      id: 2,
      language: i18n.t("login.portuguese"),
      surname: "pt",
      icon: require("../../assets/brasil.png"),
    },
  ];

  const find_idx = languages.findIndex(
    (x) => x.surname == language_redux?.surname
  );

  return (
    <SelectDropdown
      data={languages}
      onSelect={(x, idx) => {
        setShowLanguage(x);
      }}
      defaultValueByIndex={find_idx >= 0 ? find_idx : undefined}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.language;
      }}
      renderCustomizedButtonChild={(selectedItem, index) => {
        return (
          <View style={styles.viewDropdown}>
            {selectedItem ? (
              <Image source={selectedItem.icon} style={styles.imageLanguage} />
            ) : (
              <Icon
                type="ionicon"
                name="md-earth-sharp"
                color={"white"}
                size={32}
              />
            )}
            <Text
              style={styles.textLanguage}
              accessible
              accessibilityLabel={
                find_idx >= 0
                  ? languages[find_idx].language
                  : i18n.t("login.language")
              }
            >
              {find_idx >= 0
                ? languages[find_idx].language
                : i18n.t("login.language")}
            </Text>
            <Icon
              name="chevron-down"
              type="font-awesome"
              color={"white"}
              size={18}
            />
          </View>
        );
      }}
      renderCustomizedRowChild={(selected, index) => {
        return (
          <View style={styles.rowStyle}>
            <Image source={selected.icon} style={styles.rowImage} />
            <Text
              style={styles.rowText}
              accessible
              accessibilityLabel={selected.language}
            >
              {selected.language}
            </Text>
          </View>
        );
      }}
      buttonStyle={{ borderRadius: 10, backgroundColor: color_value }}
      dropdownStyle={{ backgroundColor: color_value }}
      rowTextForSelection={() => ""}
    />
  );
};
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setShowLanguage: (value: ILanguage) => {
    dispatch(setLanguageAction(value));
  },
});

const props = (state: any) => {
  const language_redux = state.languageReducer;
  return language_redux;
};

export default connect(props, mapDispatchToProps)(DropDownLanguage);

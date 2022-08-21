import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { Card, Icon } from "@rneui/themed";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { pt, en } from "../../global/localization";
import { styles } from "./styles";
import { connect } from "react-redux";
import { ILanguage } from "../../redux/actions/language-action";

type errors = {
  field: string;
  message: string;
  rule: string;
}

type IMessageModal = {
  message?: string;
  errors?: errors[]
  error: boolean;
  language_redux?: {
    language_redux: ILanguage;
  };
};

const ModalMessage = (props: IMessageModal) => {
  const { message, errors,  error, language_redux } = props;
  const [openModal, setOpenModal] = useState<boolean>(true);

  i18n.fallbacks = true;
  i18n.translations = { pt, en };
  i18n.locale = language_redux?.language_redux
    ? language_redux.language_redux.surname
    : Localization.locale;

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Modal accessible accessibilityLabel="Open" visible={openModal} transparent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Card
            containerStyle={[
              styles.container,
              { borderColor: error ? "red" : "green" },
            ]}
          > 
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Card.Title  style={[styles.titleModal, {color: error ? 'red' : 'green'}]}>{error ? i18n.t("createAccount.titleModal") : 'Sucesso!'}</Card.Title>
          <Icon  name={error ? "sentiment-dissatisfied" : "emoji-emotions"} type="material" style={styles.iconModal} color={error ? 'red' : 'green'}/>
          </View>
            
            {
                error ? errors?.map((x, idx) => {
                  return (
                    <Text style={[styles.textItemCard, {marginTop: 20}]} key={idx}>- {x.message}</Text>
                  )
                })
                :
                <Text style={styles.textItemCard}>{message}
                </Text>
              }
            <TouchableOpacity onPress={() => closeModal()} style={styles.btnCloseModal}>
              <Text style={[styles.textItemCard, {color: error ? 'red' : 'green'}]}>{i18n.t("createAccount.btnModalClose")}</Text>
            </TouchableOpacity>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const props = (state: any) => {

  const language_redux = state.languageReducer;

  const props = {
    language_redux,
  };
  return props;
};

export default connect(props)(ModalMessage);

import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { styles } from "./styles";

type IMessageModal = {
  message?: string;
  error: boolean;
};

const ModalMessage = (props: IMessageModal) => {
  const { message, error } = props;
  const [openModal, setOpenModal] = useState<boolean>(true);

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
            <Card.Title>CARD WITH DIVIDER</Card.Title>
            <Text>{message}</Text>
            <TouchableOpacity onPress={() => closeModal()}>
              <Text>Ok</Text>
            </TouchableOpacity>
          </Card>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default ModalMessage;

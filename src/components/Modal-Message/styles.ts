import { StyleSheet } from "react-native";
import { font } from "../../global/font";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginTop: 250,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "100%",
  },
  titleModal: {
    fontSize: 20,
    fontFamily: font.fonts.title400,
    color: 'black'
  },
  textItemCard: {
    fontFamily: font.fonts.title400
  },
  btnCloseModal: {
    marginTop: 40,
    marginRight: 10,
    alignSelf: 'flex-end'
  },
  iconModal: {
    fontSize: 20,
    marginTop: 3,
    marginLeft: 5
  }
});

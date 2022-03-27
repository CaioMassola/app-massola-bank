import { StyleSheet } from "react-native";
import { font } from "../../global/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewDropdown: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 6,
    },
    imageLanguage: {
        width: 20,
        height: 20,
        borderRadius: 50,
        resizeMode: "cover"
    },
    textLanguage: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        marginHorizontal: 12,
        fontFamily: font.fonts.title400
    },
    rowList: {
        color: 'white',
        fontFamily: font.fonts.title400
    },
    rowStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 18,
    },
    rowImage: {
        width: 20,
        height: 20,
        borderRadius: 50,
        resizeMode: "cover"
    },
    rowText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        marginHorizontal: 12,
        fontFamily: font.fonts.title400
    },
})
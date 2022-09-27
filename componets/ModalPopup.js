import { StyleSheet, Modal, View, Text, Pressable, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const ModalPopup = ({isVisible, closeModal, text}) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBackground}>
          <View style={styles.textModalContainer}>
            <Text style={styles.textModal}>
              {text}
            </Text>
          </View>
          <Pressable style={styles.pressable} onPress={closeModal}>
            <Text style={styles.pressableText}>Chiudi</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackground: {
    backgroundColor: "#ffffff",
    width: WIDTH / 1.5,
    height: WIDTH / 2,
    borderRadius: 5,
  },
  textModalContainer: {
    height: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  textModal: {
    fontSize: 17,
  },
  pressable: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#0c0c0c",
  },
  pressableText: {
    color: "red",
    fontSize: 20,
  },
});

export default ModalPopup;

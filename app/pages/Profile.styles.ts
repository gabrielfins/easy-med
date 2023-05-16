import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    padding: 20,
    backgroundColor: 'white'
  },
  nameBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: colors.secondary,
  },
  avatarEdit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: 'white'
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
  },
  underName: {
    color: 'grey'
  },
  blocks: {
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderTopColor: 'whitesmoke'
  }
});

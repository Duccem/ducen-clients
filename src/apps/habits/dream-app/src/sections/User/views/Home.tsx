import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Header } from "../../shared/components/Header";
import { useTranslateContext } from "../../shared/state/TranslateContext";
import { useUserContext } from "../state/UserContext";
export default function Home() {
  const { userState, setName } = useUserContext();
  const { translator } = useTranslateContext();
  const onChangeText = (text: string) => {
    setName(text)
  }
  return (
    <View style={styles.container}>
      <Header name={userState.user.name} date={translator.t('greeting')} avatar='sasdf'></Header>
      <TextInput
        style={styles.input} 
        onChangeText={onChangeText}
      ></TextInput>
      <StatusBar style="inverted" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BED6E5",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: 50,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  }
});

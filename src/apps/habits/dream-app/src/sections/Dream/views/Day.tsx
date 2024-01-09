import { StyleSheet, Text, View } from "react-native";
export function Day() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Diario</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#110f14',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
import { faCalendar, faChartPie, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export function Header(props: any) {
  const selectRoute = (route: string) => {
    props.navigation.navigate(route);
  };
  return (
    <ScrollView contentContainerStyle={styles.tabs} horizontal fadingEdgeLength={5} showsHorizontalScrollIndicator={false}>
      <Pressable style={props.route.name == 'day' ? styles.pressedTab : styles.tab} onPress={() => selectRoute('day')}>
        <FontAwesomeIcon icon={faMoon} color={props.route.name == 'day' ? "#6C63FF" : "#4e495d"} size={30} />
        <Text
          style={{
            ...styles.normalText,
            color: props.route.name == 'day' ? "#6C63FF" : "#4e495d",
          }}
        >
          Overview
        </Text>
      </Pressable>
      <Pressable style={props.route.name == 'week' ? styles.pressedTab : styles.tab} onPress={() => selectRoute('week')}>
        <FontAwesomeIcon icon={faChartPie} color={props.route.name == 'week' ? "#6C63FF" : "#4e495d"} size={30} />
        <Text
          style={{
            ...styles.normalText,
            color: props.route.name == 'week' ? "#6C63FF" : "#4e495d",
          }}
        >
          Your Week
        </Text>
      </Pressable>
      <Pressable style={props.route.name == 'month' ? styles.pressedTab : styles.tab} onPress={() => selectRoute('month')}>
        <FontAwesomeIcon icon={faCalendar} color={props.route.name == 'month' ? "#6C63FF" : "#4e495d"} size={30} />
        <Text
          style={{
            ...styles.normalText,
            color: props.route.name == 'month' ? "#6C63FF" : "#4e495d",
          }}
        >
          Month
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: 20,
    fontWeight: "normal",
    fontFamily: "Nunito_600SemiBold",
    color: "#4e495d",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    alignItems: "center",
    maxHeight: 100,
    paddingTop: 20,
    gap: 20,
    overflow: "scroll",
    paddingBottom: 20,
    backgroundColor: "#110f14",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    overflow: "hidden",
    borderColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 100,
    minWidth: 100,
  },
  pressedTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 10,
    borderColor: "#332f3a",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 100,
    minWidth: 100,
    overflow: "hidden",
  },
});

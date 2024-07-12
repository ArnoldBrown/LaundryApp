// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, StatusBar } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./src/screens/HomeScreen";
import StackNavigator from "./src/StackNavigator";
import store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
      {/* <StatusBar style="auto" /> */}
      <StatusBar barStyle={'dark-content'}/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

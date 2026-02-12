import React from "react";
import { StyleSheet, View, Text } from "react-native";

function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>Register</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Welcome;

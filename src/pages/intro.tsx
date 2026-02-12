import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import IntroSlider, { PageElementArray } from "../components/intro-slider";
import { AuthStackParamList } from "../navigation";

export type AuthNavigationProps = StackNavigationProp<AuthStackParamList, "Intro">;
type IntroProps = {
  navigation: AuthNavigationProps;
};

function Intro({ navigation }: IntroProps) {
  const sliderConfig: PageElementArray[] = [
    {
      backgroundColor: "#9DD6EB",
      title: "Welcome to Recipely",
      image: require("../assets/images/hamburger.png"),
      subHeader:
        "Finding it hard to look for recipes online? Don't worry we've got you covered",
    },
    {
      backgroundColor: "#97CAE5",
      title: "Begin your cooking journey with our AI",
      image: require("../assets/images/hamburger.png"),
      subHeader:
        "We use the latest machine learning algorithm to guide you on your culinary journey, whether it's a simple or a michelin star recipe",
    },
    {
      backgroundColor: "#92BBD9",
      title: "Register, Scan and Start Cooking",
      image: require("../assets/images/hamburger.png"),
      subHeader:
        "To begin your culinary journey, sign up for an account, start scanning for recipes using your device camera and we'll do the rest :)",
    },
  ];

  return <IntroSlider pages={sliderConfig} navigation={navigation} />;
}

export default Intro;

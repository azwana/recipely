import React, { useCallback, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import Swiper from "react-native-swiper";
import * as SecureStore from "expo-secure-store";
import { AuthNavigationProps } from "../../pages/intro";

export interface PageElementArray {
  backgroundColor: string;
  title: string;
  image: ImageSourcePropType;
  subHeader: string;
}

type ButtonTextType = "Next" | "Previous" | "Skip" | "Done";

function IntroSlider(props: {
  pages: PageElementArray[];
  navigation: AuthNavigationProps;
}) {
  const { pages, navigation } = props;
  const [index, setIndex] = useState(0);
  const swiperRef = useRef<Swiper | null>(null);

  const renderPages = () => {
    return pages.map((item: PageElementArray, index: number) => (
      <View
        key={index.toString()}
        style={{
          ...styles.pageContainer,
          backgroundColor: item.backgroundColor,
        }}
      >
        <Text style={styles.titleText}>{item.title}</Text>
        <Image style={styles.image} source={item.image}></Image>
        <Text style={styles.subHeaderText}>{item.subHeader}</Text>
      </View>
    ));
  };

  const renderButton = (type: ButtonTextType) => {
    return (
      <Text
        onPress={() =>
          type == "Done" || type == "Skip"
            ? onPressSkipOrDone()
            : type == "Next"
            ? swiperRef.current?.scrollBy(1)
            : swiperRef.current?.scrollBy(-1)
        }
        style={styles.buttonText}
      >
        {type}
      </Text>
    );
  };

  const onPressSkipOrDone = async () => {
    navigation.navigate("Welcome");
    await SecureStore.setItemAsync("SKIP_INTRO", "true");
  };

  const updateIndex = useCallback((res: number) => {
    setTimeout(() => {
      setIndex(res);
    }, 50);
  }, []);

  return (
    <Swiper
      ref={(ref) => (swiperRef.current = ref)}
      style={styles.container}
      showsButtons={true}
      buttonWrapperStyle={styles.buttonWrapper}
      nextButton={renderButton(index != 2 ? "Next" : "Done")}
      prevButton={renderButton(index == 0 ? "Skip" : "Previous")}
      onIndexChanged={updateIndex}
    >
      {renderPages()}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {},
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  titleText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeaderText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonWrapper: {
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

export default IntroSlider;

import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors, Spacing, Typography } from "../styles";
import { MORE } from "../constants/iconConstants";

const styles = StyleSheet.create({
  title: {
    fontSize: Spacing.SCALE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.BLACK,
    fontWeight: "600",
    //paddingHorizontal: "5%",
    letterSpacing: 1,
  },
  container: {
    flexDirection: "row",
    //paddingHorizontal: "5%",
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    paddingHorizontal: "5%",
    alignItems: "center",
    height: 50,
    backgroundColor: Colors.PRIMARY,
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
  moreIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    tintColor: "black",
    right : 20
  },
});

function Header({ icon, title, more, shoeMoreoptions }: any) {
  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={back}>
          {icon && <Image style={styles.iconStyle} source={icon} />}
        </TouchableOpacity>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      <TouchableOpacity onPress={shoeMoreoptions}>
        {more && <Image style={styles.moreIcon} source={MORE} />}
      </TouchableOpacity>
    </View>
  );
}

export default Header;
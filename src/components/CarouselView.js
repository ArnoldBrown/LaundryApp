import { StyleSheet, Image, View, Dimensions} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";

const { width: viewportWidth } = Dimensions.get('window');

const CarouselView = () => {
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];
  return (
    <View>
      
      <Carousel
        width={viewportWidth}
        height={200}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={5000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '95%',
    height: '100%',
    borderRadius: 10,
  },
});

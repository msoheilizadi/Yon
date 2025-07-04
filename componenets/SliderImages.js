import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const FadeImageSlider = ({ imageStyle }) => {
  const images = useRef([
    require('../assets/images/img1.jpg'),
    require('../assets/images/img2.jpg'),
    require('../assets/images/img3.jpg'),
    require('../assets/images/img4.jpg'),
  ]).current;

  const opacities = useRef(images.map(() => new Animated.Value(0))).current;
  const currentIndex = useRef(0);

  const VISIBLE_DURATION = 10000;
  const FADE_DURATION = 1000;

  useEffect(() => {
    let isMounted = true;

    // Start by showing the first image
    opacities[0].setValue(1);

    const loop = () => {
      const nextIndex = (currentIndex.current + 1) % images.length;

      // Fade out current
      Animated.timing(opacities[currentIndex.current], {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();

      // Fade in next
      Animated.timing(opacities[nextIndex], {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start(() => {
        currentIndex.current = nextIndex;
        if (isMounted) setTimeout(loop, VISIBLE_DURATION);
      });
    };

    const timer = setTimeout(loop, VISIBLE_DURATION);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      {images.map((src, i) => (
        <Animated.Image
          key={i}
          source={src}
          style={[
            styles.image,
            imageStyle,
            { opacity: opacities[i] },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height: "100%",
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default FadeImageSlider;

// import React, { useEffect, useRef } from 'react';
// import { View, Animated, StyleSheet, Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const IMAGES = [
//   require('../assets/images/img1.jpg'),
//   require('../assets/images/img2.jpg'),
//   require('../assets/images/img3.jpg'),
//   require('../assets/images/img4.jpg'),
//   require('../assets/images/img1.jpg'),
//   require('../assets/images/img2.jpg'),
//   require('../assets/images/img3.jpg'),
//   require('../assets/images/img4.jpg'),
//   require('../assets/images/img1.jpg'),
//   require('../assets/images/img2.jpg'),
//   require('../assets/images/img3.jpg'),
//   require('../assets/images/img4.jpg'),
// ];

// const StackFadeInImages = ({
//   fadeDuration = 4000,
//   delayBetween = 2000,
//   pauseBeforeRestart = 1000,
// }) => {
//   const opacities = useRef(IMAGES.map(() => new Animated.Value(0))).current;
//   const currentIndex = useRef(0);

//   const startFadeInSequence = () => {
//     const showNext = () => {
//       if (currentIndex.current >= IMAGES.length) {
//         // All images shown, start reset after a pause
//         setTimeout(() => resetFade(), pauseBeforeRestart);
//         return;
//       }

//       Animated.timing(opacities[currentIndex.current], {
//         toValue: 1,
//         duration: fadeDuration,
//         useNativeDriver: true,
//       }).start(() => {
//         currentIndex.current++;
//         setTimeout(showNext, delayBetween);
//       });
//     };

//     currentIndex.current = 0;
//     showNext();
//   };

//   const resetFade = () => {
//     // Fade all out in parallel
//     Animated.parallel(
//       opacities.map((opacity) =>
//         Animated.timing(opacity, {
//           toValue: 0,
//           duration: fadeDuration,
//           useNativeDriver: true,
//         })
//       )
//     ).start(() => {
//       startFadeInSequence();
//     });
//   };

//   useEffect(() => {
//     startFadeInSequence();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {IMAGES.map((img, i) => (
//         <Animated.Image
//           key={i}
//           source={img}
//           style={[styles.image, { opacity: opacities[i] }]}
//           resizeMode="cover"
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     width,
//     height,
//     position: 'absolute',
//   },
// });

// export default StackFadeInImages;

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const FadeImageSlider = () => {
  // List of image sources (replace with your own images or URIs)
  const images = [
    require('../assets/images/img1.jpg'),
    require('../assets/images/img2.jpg'),
    require('../assets/images/img3.jpg'),
    require('../assets/images/img4.jpg'),
  ];

  // State to keep track of current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Animated value for image opacity (1 = fully visible, 0 = invisible)
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Durations (hardcoded): visible time and fade time in milliseconds
  const VISIBLE_DURATION = 5000;
  const FADE_DURATION = 1000;

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    // Function to perform one fade-out / fade-in cycle
    const fadeOutIn = () => {
      // Fade out current image to opacity 0
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true, // use native driver for smoother animation
      }).start(() => {
        if (!isMounted) return; // prevent state update if unmounted

        // Update to next image index (looping back to 0)
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);

        // Fade in new image to opacity 1
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }).start(() => {
          if (!isMounted) return;

          // After fade-in completes, wait and then start next cycle
          timeoutId = setTimeout(fadeOutIn, VISIBLE_DURATION);
        });
      });
    };

    // Start the first cycle after the image has been fully visible for VISIBLE_DURATION
    timeoutId = setTimeout(fadeOutIn, VISIBLE_DURATION);

    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [fadeAnim, images.length]);

  return (
    <View style={styles.container}>
      {/* Animated.Image allows animating the opacity */}
      <Animated.Image
        source={images[currentIndex]}
        style={[ { opacity: fadeAnim }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FadeImageSlider;

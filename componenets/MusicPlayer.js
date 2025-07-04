import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-assets/slider';
import { Audio } from 'expo-av';

export default function SingleMusicPlayer() {
  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    loadAudio();

    return () => {
      unloadAudio();
    };
  }, []);
  const loadAudio = async () => {
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      require('../assets/musics/TameImpala.mp3'),
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    sound.current = playbackObject;
  };

  const unloadAudio = async () => {
    if (sound.current) {
      await sound.current.unloadAsync();
    }
  };

  const onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayPause = async () => {
    if (!sound.current) return;
    const status = await sound.current.getStatusAsync();
    if (status.isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
  };

  const onSeek = async value => {
    if (sound.current) {
      await sound.current.setPositionAsync(value);
    }
  };

  return (
    <View style={styles.container}>

    <Slider
        style={{width: "100%"}}
        value={position}
        minimumValue={0}
        maximumValue={100}
        onSlidingComplete={onSeek}
        onValueChange={setPosition}
        thumbSize={24}
        trackHeight={6}
        thumbStyle={{ backgroundColor: 'white', borderWidth: 2, borderColor: '#1DB954' }}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#444"
    />

      <Text style={styles.time}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>

      <Pressable onPress={togglePlayPause} >
        <Text>⏯️</Text>
      </Pressable>
    </View>
  );
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 10,
  },
  time: {
    marginVertical: 10,
    fontSize: 16,
  },
});

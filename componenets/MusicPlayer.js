import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-assets/slider';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

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
    <View style={styles.playerCard}>

      <View style={styles.controlsRow}>
        <Ionicons name="play-skip-back" size={18} color="#fff" />
        
        <Pressable onPress={togglePlayPause} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={20}
            color="#fff"
          />
        </Pressable>

        <Ionicons name="play-skip-forward" size={18} color="#fff" />
      </View>

    <Slider
      value={position}
      minimumValue={0}
      maximumValue={duration}
      onSlidingComplete={onSeek}
      onValueChange={setPosition}
      trackHeight={4}
      thumbSize={0} // invisible thumb
      minimumTrackTintColor="#fff"
      maximumTrackTintColor="#ccc"
      style={styles.slider}
    />
{/* 
      <Text style={styles.time}>
        {formatTime(position)} / {formatTime(duration)}
      </Text> */}

    </View>
  );
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const styles = StyleSheet.create({
  playerCard: {
    backgroundColor: '#dcd6cd', // match your image background
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 5
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#a99f95',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
  },
});

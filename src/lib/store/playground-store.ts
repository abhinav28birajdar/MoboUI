import { create } from 'zustand';

interface PlaygroundState {
  code: string;
  framework: 'react-native' | 'expo' | 'flutter';
  platform: 'react-native' | 'expo' | 'flutter';
  device: 'iphone' | 'android';
  template: 'blank' | 'button' | 'form' | 'list';
  setCode: (code: string) => void;
  setFramework: (framework: 'react-native' | 'expo' | 'flutter') => void;
  setPlatform: (platform: 'react-native' | 'expo' | 'flutter') => void;
  setDevice: (device: 'iphone' | 'android') => void;
  setTemplate: (template: 'blank' | 'button' | 'form' | 'list') => void;
  resetCode: () => void;
  reset: () => void;
}

const DEFAULT_CODE = `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PremiumCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>MOBOUI Premium</Text>
      <Text style={styles.description}>
        An enterprise-grade component library built for React Native, Expo, and Flutter.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Explore Docs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111113',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(39,39,42,0.5)',
    padding: 24,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#FFCA03',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    color: '#FFCA03',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFCA03',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#0A0A0B',
    fontWeight: 'bold',
    fontSize: 14,
  },
});`;

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  code: DEFAULT_CODE,
  framework: 'react-native',
  platform: 'react-native',
  device: 'iphone',
  template: 'blank',
  setCode: (code) => set({ code }),
  setFramework: (framework) => set({ framework, platform: framework }),
  setPlatform: (platform) => set({ platform, framework: platform }),
  setDevice: (device) => set({ device }),
  setTemplate: (template) => set({ template }),
  resetCode: () => set({ code: DEFAULT_CODE, template: 'blank' }),
  reset: () => set({ code: DEFAULT_CODE, template: 'blank', framework: 'react-native', platform: 'react-native', device: 'iphone' }),
}));

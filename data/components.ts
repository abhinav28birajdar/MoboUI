import { ComponentDefinition } from '@/types'

export const components: ComponentDefinition[] = [
  {
    slug: 'primary-button',
    name: 'PrimaryButton',
    description: 'The main call to action button for your app.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    isNew: true,
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final bool isLoading;
  final IconData? icon;

  const PrimaryButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.isLoading = false,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: isLoading ? null : onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFc026d3),
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: 0,
      ),
      child: isLoading
          ? const SizedBox(width: 20, height: 20,
              child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
          : Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (icon != null) ...[Icon(icon, size: 18), const SizedBox(width: 8)],
                Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
              ],
            ),
    );
  }
}`,
      reactNative: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label, onPress, isLoading = false, disabled = false
}) => (
  <TouchableOpacity
    style={[styles.button, (disabled || isLoading) && styles.disabled]}
    onPress={onPress}
    disabled={disabled || isLoading}
    activeOpacity={0.85}
  >
    {isLoading
      ? <ActivityIndicator color="#fff" size="small" />
      : <Text style={styles.label}>{label}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#c026d3',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: { opacity: 0.5 },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
});`,
      expo: `import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';

interface Props {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
}

export function PrimaryButton({ label, onPress, isLoading = false }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={handlePress}
      disabled={isLoading}
    >
      {isLoading
        ? <ActivityIndicator color="#fff" />
        : <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#c026d3', paddingHorizontal: 24,
    paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
});`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'secondary-button',
    name: 'SecondaryButton',
    description: 'A subtle button for secondary actions.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SecondaryButton extends StatelessWidget {
  const SecondaryButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SecondaryButton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SecondaryButton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SecondaryButton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SecondaryButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SecondaryButton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'icon-button',
    name: 'IconButton',
    description: 'A button that only contains an icon.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class IconButton extends StatelessWidget {
  const IconButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('IconButton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const IconButton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>IconButton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function IconButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>IconButton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'floating-action-button',
    name: 'FloatingActionButton',
    description: 'A prominent floating button for the primary screen action.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class FloatingActionButton extends StatelessWidget {
  const FloatingActionButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('FloatingActionButton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FloatingActionButton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>FloatingActionButton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function FloatingActionButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FloatingActionButton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'loading-button',
    name: 'LoadingButton',
    description: 'A button with a built-in loading spinner state.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class LoadingButton extends StatelessWidget {
  const LoadingButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('LoadingButton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LoadingButton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>LoadingButton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function LoadingButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoadingButton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'gradient-button',
    name: 'GradientButton',
    description: 'A visually striking button with a gradient background.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class GradientButton extends StatelessWidget {
  const GradientButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('GradientButton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GradientButton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>GradientButton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function GradientButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GradientButton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'ghost-button',
    name: 'GhostButton',
    description: 'A transparent button that only shows background on hover/press.',
    category: 'buttons',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['buttons', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class GhostButton extends StatelessWidget {
  const GhostButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('GhostButton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GhostButton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>GhostButton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function GhostButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GhostButton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'basic-card',
    name: 'BasicCard',
    description: 'A standard card container for grouping related content.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class BasicCard extends StatelessWidget {
  const BasicCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('BasicCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BasicCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>BasicCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function BasicCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BasicCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'profile-card',
    name: 'ProfileCard',
    description: 'A card specifically designed to show user profile information.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  const ProfileCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ProfileCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProfileCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ProfileCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ProfileCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'media-card',
    name: 'MediaCard',
    description: 'A card with a prominent header image area.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class MediaCard extends StatelessWidget {
  const MediaCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('MediaCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MediaCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>MediaCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function MediaCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MediaCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'stat-card',
    name: 'StatCard',
    description: 'A card for displaying numerical statistics and trends.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class StatCard extends StatelessWidget {
  const StatCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('StatCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>StatCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function StatCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StatCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'pricing-card',
    name: 'PricingCard',
    description: 'A card to display subscription tiers and pricing.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class PricingCard extends StatelessWidget {
  const PricingCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('PricingCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PricingCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>PricingCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function PricingCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PricingCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'horizontal-card',
    name: 'HorizontalCard',
    description: 'A wide card with image on the left and text on the right.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class HorizontalCard extends StatelessWidget {
  const HorizontalCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('HorizontalCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HorizontalCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>HorizontalCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HorizontalCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HorizontalCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'glass-card',
    name: 'GlassCard',
    description: 'A card with a frosted glass visual effect.',
    category: 'cards',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['cards', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class GlassCard extends StatelessWidget {
  const GlassCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('GlassCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GlassCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>GlassCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function GlassCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GlassCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'text-input',
    name: 'TextInput',
    description: 'A standard text input field with label and error states.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class TextInput extends StatelessWidget {
  const TextInput({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('TextInput Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TextInput = () => (
  <View style={styles.container}>
    <Text style={styles.text}>TextInput Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function TextInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TextInput Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'text-area',
    name: 'TextArea',
    description: 'A multi-line text input field.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class TextArea extends StatelessWidget {
  const TextArea({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('TextArea Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TextArea = () => (
  <View style={styles.container}>
    <Text style={styles.text}>TextArea Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function TextArea() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TextArea Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'A toggleable checkbox control.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Checkbox extends StatelessWidget {
  const Checkbox({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Checkbox Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Checkbox = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Checkbox Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Checkbox() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Checkbox Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    description: 'A set of mutually exclusive radio buttons.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class RadioGroup extends StatelessWidget {
  const RadioGroup({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('RadioGroup Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RadioGroup = () => (
  <View style={styles.container}>
    <Text style={styles.text}>RadioGroup Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function RadioGroup() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>RadioGroup Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'switch',
    name: 'Switch',
    description: 'A toggle switch for binary options.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Switch extends StatelessWidget {
  const Switch({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Switch Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Switch = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Switch Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Switch() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Switch Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'slider',
    name: 'Slider',
    description: 'A draggable slider for selecting a value from a range.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Slider extends StatelessWidget {
  const Slider({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Slider Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Slider = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Slider Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Slider() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slider Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    description: 'A field for selecting calendar dates.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class DatePicker extends StatelessWidget {
  const DatePicker({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('DatePicker Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DatePicker = () => (
  <View style={styles.container}>
    <Text style={styles.text}>DatePicker Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function DatePicker() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DatePicker Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'otp-input',
    name: 'OTPInput',
    description: 'A segmented input for One Time Passwords.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class OTPInput extends StatelessWidget {
  const OTPInput({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('OTPInput Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const OTPInput = () => (
  <View style={styles.container}>
    <Text style={styles.text}>OTPInput Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function OTPInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OTPInput Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'search-input',
    name: 'SearchInput',
    description: 'A specialized input with search icon and clear button.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SearchInput extends StatelessWidget {
  const SearchInput({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SearchInput Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SearchInput = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SearchInput Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SearchInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SearchInput Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'dropdown-select',
    name: 'DropdownSelect',
    description: 'A standard dropdown picker menu.',
    category: 'forms',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['forms', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class DropdownSelect extends StatelessWidget {
  const DropdownSelect({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('DropdownSelect Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DropdownSelect = () => (
  <View style={styles.container}>
    <Text style={styles.text}>DropdownSelect Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function DropdownSelect() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DropdownSelect Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'bottom-tab-bar',
    name: 'BottomTabBar',
    description: 'A bottom navigation bar with icons and labels.',
    category: 'navigation',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['navigation', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class BottomTabBar extends StatelessWidget {
  const BottomTabBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('BottomTabBar Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BottomTabBar = () => (
  <View style={styles.container}>
    <Text style={styles.text}>BottomTabBar Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function BottomTabBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BottomTabBar Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'top-navigation-bar',
    name: 'TopNavigationBar',
    description: 'A standard top app bar or header.',
    category: 'navigation',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['navigation', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class TopNavigationBar extends StatelessWidget {
  const TopNavigationBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('TopNavigationBar Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TopNavigationBar = () => (
  <View style={styles.container}>
    <Text style={styles.text}>TopNavigationBar Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function TopNavigationBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TopNavigationBar Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'drawer-menu',
    name: 'DrawerMenu',
    description: 'A slide-out drawer navigation menu.',
    category: 'navigation',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['navigation', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class DrawerMenu extends StatelessWidget {
  const DrawerMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('DrawerMenu Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DrawerMenu = () => (
  <View style={styles.container}>
    <Text style={styles.text}>DrawerMenu Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function DrawerMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DrawerMenu Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'bread-crumb',
    name: 'BreadCrumb',
    description: 'A trail of links showing the current page location.',
    category: 'navigation',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['navigation', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class BreadCrumb extends StatelessWidget {
  const BreadCrumb({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('BreadCrumb Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BreadCrumb = () => (
  <View style={styles.container}>
    <Text style={styles.text}>BreadCrumb Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function BreadCrumb() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BreadCrumb Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'side-nav',
    name: 'SideNav',
    description: 'A vertical side navigation for larger screens.',
    category: 'navigation',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['navigation', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SideNav extends StatelessWidget {
  const SideNav({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SideNav Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SideNav = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SideNav Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SideNav() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SideNav Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'step-indicator',
    name: 'StepIndicator',
    description: 'A visual indicator for multi-step processes.',
    category: 'navigation',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['navigation', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class StepIndicator extends StatelessWidget {
  const StepIndicator({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('StepIndicator Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StepIndicator = () => (
  <View style={styles.container}>
    <Text style={styles.text}>StepIndicator Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function StepIndicator() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StepIndicator Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'alert-dialog',
    name: 'AlertDialog',
    description: 'A dialog that interrupts the user for important decisions.',
    category: 'modals',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['modals', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class AlertDialog extends StatelessWidget {
  const AlertDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('AlertDialog Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AlertDialog = () => (
  <View style={styles.container}>
    <Text style={styles.text}>AlertDialog Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function AlertDialog() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AlertDialog Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'bottom-sheet',
    name: 'BottomSheet',
    description: 'A modal panel that slides up from the bottom of the screen.',
    category: 'modals',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['modals', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class BottomSheet extends StatelessWidget {
  const BottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('BottomSheet Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BottomSheet = () => (
  <View style={styles.container}>
    <Text style={styles.text}>BottomSheet Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function BottomSheet() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BottomSheet Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'fullscreen-modal',
    name: 'FullscreenModal',
    description: 'A modal that covers the entire screen.',
    category: 'modals',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['modals', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class FullscreenModal extends StatelessWidget {
  const FullscreenModal({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('FullscreenModal Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const FullscreenModal = () => (
  <View style={styles.container}>
    <Text style={styles.text}>FullscreenModal Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function FullscreenModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FullscreenModal Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'confirm-dialog',
    name: 'ConfirmDialog',
    description: 'A simple Yes/No confirmation dialog.',
    category: 'modals',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['modals', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ConfirmDialog extends StatelessWidget {
  const ConfirmDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ConfirmDialog Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ConfirmDialog = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ConfirmDialog Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ConfirmDialog() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ConfirmDialog Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'tooltip-popover',
    name: 'TooltipPopover',
    description: 'A small popover containing helpful context.',
    category: 'modals',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['modals', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class TooltipPopover extends StatelessWidget {
  const TooltipPopover({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('TooltipPopover Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TooltipPopover = () => (
  <View style={styles.container}>
    <Text style={styles.text}>TooltipPopover Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function TooltipPopover() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TooltipPopover Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'heading',
    name: 'Heading',
    description: 'Standardized heading text styles.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    isNew: true,
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Heading extends StatelessWidget {
  const Heading({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Heading Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Heading = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Heading Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Heading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Heading Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'body-text',
    name: 'BodyText',
    description: 'Standard paragraph and body text styles.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class BodyText extends StatelessWidget {
  const BodyText({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('BodyText Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BodyText = () => (
  <View style={styles.container}>
    <Text style={styles.text}>BodyText Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function BodyText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>BodyText Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'caption',
    name: 'Caption',
    description: 'Small text for metadata and hints.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Caption extends StatelessWidget {
  const Caption({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Caption Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Caption = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Caption Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Caption() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Caption Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'code-text',
    name: 'CodeText',
    description: 'Monospaced text for code snippets.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class CodeText extends StatelessWidget {
  const CodeText({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('CodeText Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CodeText = () => (
  <View style={styles.container}>
    <Text style={styles.text}>CodeText Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function CodeText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CodeText Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'badge',
    name: 'Badge',
    description: 'A small label for categorizing items.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Badge extends StatelessWidget {
  const Badge({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Badge Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Badge = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Badge Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Badge() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Badge Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'tag',
    name: 'Tag',
    description: 'A pill-shaped interactive label.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Tag extends StatelessWidget {
  const Tag({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Tag Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Tag = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Tag Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Tag() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tag Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'chip',
    name: 'Chip',
    description: 'A compact element representing an attribute or action.',
    category: 'typography',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['typography', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Chip extends StatelessWidget {
  const Chip({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Chip Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Chip = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Chip Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Chip() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chip Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'toast',
    name: 'Toast',
    description: 'A brief, auto-dismissing notification message.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Toast extends StatelessWidget {
  const Toast({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Toast Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Toast = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Toast Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Toast() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toast Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'snackbar',
    name: 'Snackbar',
    description: 'A message bar shown at the bottom of the screen with an action.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Snackbar extends StatelessWidget {
  const Snackbar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Snackbar Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Snackbar = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Snackbar Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Snackbar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Snackbar Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'progress-bar',
    name: 'ProgressBar',
    description: 'A horizontal bar showing progress of an operation.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ProgressBar extends StatelessWidget {
  const ProgressBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ProgressBar Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProgressBar = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ProgressBar Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ProgressBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProgressBar Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'loading-skeleton',
    name: 'LoadingSkeleton',
    description: 'A placeholder shown while content is loading.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class LoadingSkeleton extends StatelessWidget {
  const LoadingSkeleton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('LoadingSkeleton Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LoadingSkeleton = () => (
  <View style={styles.container}>
    <Text style={styles.text}>LoadingSkeleton Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function LoadingSkeleton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoadingSkeleton Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'empty-state',
    name: 'EmptyState',
    description: 'A friendly graphic shown when there is no data.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class EmptyState extends StatelessWidget {
  const EmptyState({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('EmptyState Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EmptyState = () => (
  <View style={styles.container}>
    <Text style={styles.text}>EmptyState Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EmptyState Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'error-state',
    name: 'ErrorState',
    description: 'A visual state for when something goes wrong.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ErrorState extends StatelessWidget {
  const ErrorState({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ErrorState Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ErrorState = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ErrorState Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ErrorState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ErrorState Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'success-state',
    name: 'SuccessState',
    description: 'A visual confirmation of a successful action.',
    category: 'feedback',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['feedback', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SuccessState extends StatelessWidget {
  const SuccessState({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SuccessState Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SuccessState = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SuccessState Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SuccessState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SuccessState Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'data-table',
    name: 'DataTable',
    description: 'A structured table for displaying tabular data.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class DataTable extends StatelessWidget {
  const DataTable({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('DataTable Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DataTable = () => (
  <View style={styles.container}>
    <Text style={styles.text}>DataTable Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function DataTable() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DataTable Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'list-item',
    name: 'ListItem',
    description: 'A standard row for lists.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ListItem extends StatelessWidget {
  const ListItem({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ListItem Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ListItem = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ListItem Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ListItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ListItem Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'avatar-group',
    name: 'AvatarGroup',
    description: 'A stacked group of user avatars.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class AvatarGroup extends StatelessWidget {
  const AvatarGroup({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('AvatarGroup Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AvatarGroup = () => (
  <View style={styles.container}>
    <Text style={styles.text}>AvatarGroup Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function AvatarGroup() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AvatarGroup Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    description: 'A chronological list of events.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Timeline extends StatelessWidget {
  const Timeline({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Timeline Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Timeline = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Timeline Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Timeline() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Timeline Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'stat-banner',
    name: 'StatBanner',
    description: 'A horizontal strip of statistics.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class StatBanner extends StatelessWidget {
  const StatBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('StatBanner Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatBanner = () => (
  <View style={styles.container}>
    <Text style={styles.text}>StatBanner Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function StatBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>StatBanner Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Accordion extends StatelessWidget {
  const Accordion({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Accordion Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Accordion = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Accordion Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Accordion() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accordion Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    description: 'A component that expands/collapses content.',
    category: 'data-display',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['data-display', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Collapsible extends StatelessWidget {
  const Collapsible({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Collapsible Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Collapsible = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Collapsible Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Collapsible() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Collapsible Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'image-viewer',
    name: 'ImageViewer',
    description: 'A zoomable image viewer with pinch gestures.',
    category: 'media',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['media', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ImageViewer extends StatelessWidget {
  const ImageViewer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ImageViewer Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ImageViewer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ImageViewer Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ImageViewer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ImageViewer Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'video-player',
    name: 'VideoPlayer',
    description: 'A custom video player UI.',
    category: 'media',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['media', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class VideoPlayer extends StatelessWidget {
  const VideoPlayer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('VideoPlayer Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const VideoPlayer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>VideoPlayer Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function VideoPlayer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>VideoPlayer Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'audio-player',
    name: 'AudioPlayer',
    description: 'A minimal audio player with waveform.',
    category: 'media',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['media', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class AudioPlayer extends StatelessWidget {
  const AudioPlayer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('AudioPlayer Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AudioPlayer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>AudioPlayer Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function AudioPlayer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AudioPlayer Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    description: 'A horizontally scrolling list of items.',
    category: 'media',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['media', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Carousel extends StatelessWidget {
  const Carousel({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Carousel Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Carousel = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Carousel Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Carousel() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Carousel Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'grid-gallery',
    name: 'GridGallery',
    description: 'A masonry or standard grid of images.',
    category: 'media',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['media', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class GridGallery extends StatelessWidget {
  const GridGallery({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('GridGallery Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GridGallery = () => (
  <View style={styles.container}>
    <Text style={styles.text}>GridGallery Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function GridGallery() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GridGallery Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'backdrop',
    name: 'Backdrop',
    description: 'A dimming overlay behind modals.',
    category: 'overlays',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['overlays', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Backdrop extends StatelessWidget {
  const Backdrop({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Backdrop Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Backdrop = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Backdrop Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Backdrop() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Backdrop Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'action-sheet',
    name: 'ActionSheet',
    description: 'An iOS-style menu that slides up from the bottom.',
    category: 'overlays',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['overlays', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ActionSheet extends StatelessWidget {
  const ActionSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ActionSheet Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ActionSheet = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ActionSheet Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ActionSheet() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ActionSheet Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'context-menu',
    name: 'ContextMenu',
    description: 'A menu that appears on long-press or right-click.',
    category: 'overlays',
    frameworks: ['flutter', 'react-native', 'expo'],
    isNew: true,
    tags: ['overlays', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ContextMenu extends StatelessWidget {
  const ContextMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ContextMenu Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ContextMenu = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ContextMenu Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ContextMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ContextMenu Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'swipe-card',
    name: 'SwipeCard',
    description: 'Tinder-style swipeable cards.',
    category: 'gestures',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['gestures', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SwipeCard extends StatelessWidget {
  const SwipeCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SwipeCard Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SwipeCard = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SwipeCard Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SwipeCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SwipeCard Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'pull-to-refresh',
    name: 'PullToRefresh',
    description: 'A drag-down gesture to reload data.',
    category: 'gestures',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    tags: ['gestures', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class PullToRefresh extends StatelessWidget {
  const PullToRefresh({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('PullToRefresh Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const PullToRefresh = () => (
  <View style={styles.container}>
    <Text style={styles.text}>PullToRefresh Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function PullToRefresh() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PullToRefresh Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'drag-handle',
    name: 'DragHandle',
    description: 'A visual indicator that an item can be dragged.',
    category: 'gestures',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['gestures', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class DragHandle extends StatelessWidget {
  const DragHandle({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('DragHandle Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DragHandle = () => (
  <View style={styles.container}>
    <Text style={styles.text}>DragHandle Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function DragHandle() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DragHandle Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'long-press-menu',
    name: 'LongPressMenu',
    description: 'A hidden menu revealed by pressing and holding.',
    category: 'gestures',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['gestures', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class LongPressMenu extends StatelessWidget {
  const LongPressMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('LongPressMenu Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LongPressMenu = () => (
  <View style={styles.container}>
    <Text style={styles.text}>LongPressMenu Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function LongPressMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LongPressMenu Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'safe-area-view',
    name: 'SafeAreaView',
    description: 'A view that respects device notches and safe areas.',
    category: 'layout',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['layout', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SafeAreaView extends StatelessWidget {
  const SafeAreaView({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SafeAreaView Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SafeAreaView = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SafeAreaView Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SafeAreaView() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SafeAreaView Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'scroll-view',
    name: 'ScrollView',
    description: 'A scrollable container with custom indicators.',
    category: 'layout',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['layout', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class ScrollView extends StatelessWidget {
  const ScrollView({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('ScrollView Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ScrollView = () => (
  <View style={styles.container}>
    <Text style={styles.text}>ScrollView Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function ScrollView() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ScrollView Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'split-view',
    name: 'SplitView',
    description: 'A side-by-side layout for large screens.',
    category: 'layout',
    frameworks: ['flutter', 'react-native', 'expo'],
    isPopular: true,
    isNew: true,
    tags: ['layout', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class SplitView extends StatelessWidget {
  const SplitView({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('SplitView Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SplitView = () => (
  <View style={styles.container}>
    <Text style={styles.text}>SplitView Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function SplitView() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SplitView Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'grid-layout',
    name: 'GridLayout',
    description: 'A responsive grid system.',
    category: 'layout',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['layout', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class GridLayout extends StatelessWidget {
  const GridLayout({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('GridLayout Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const GridLayout = () => (
  <View style={styles.container}>
    <Text style={styles.text}>GridLayout Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function GridLayout() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>GridLayout Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
  {
    slug: 'spacer',
    name: 'Spacer',
    description: 'An invisible element for adding flexible spacing.',
    category: 'layout',
    frameworks: ['flutter', 'react-native', 'expo'],
    tags: ['layout', 'ui'],
    code: {
      flutter: `import 'package:flutter/material.dart';

class Spacer extends StatelessWidget {
  const Spacer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: const Text('Spacer Component'),
    );
  }
}
`,
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Spacer = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Spacer Component</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`,
      expo: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function Spacer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Spacer Component (Expo)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#111113', borderRadius: 12 },
  text: { color: '#fafafa' }
});
`
    },
    props: [
      { name: 'style', type: 'object', required: false, description: 'Custom styles.' }
    ],
    relatedSlugs: []
  },
]

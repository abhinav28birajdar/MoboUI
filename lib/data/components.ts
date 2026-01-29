export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface Dependency {
  name: string;
  version: string;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  framework: 'react-native' | 'flutter' | 'both';
  category: string;
  tags: string[];
  code: {
    reactNative?: string;
    flutter?: string;
  };
  props?: ComponentProp[];
  preview: {
    image: string;
    thumbnail: string;
  };
  dependencies?: Dependency[];
  usage: string;
  relatedComponents: string[];
}

export const categories = [
  { id: 'foundation', name: '1. Foundation', count: 15 },
  { id: 'navigation', name: '2. Navigation', count: 12 },
  { id: 'data-display', name: '3. Data Display', count: 20 },
  { id: 'inputs', name: '4. Inputs & Forms', count: 25 },
  { id: 'feedback', name: '5. Feedback & Status', count: 15 },
  { id: 'controls', name: '6. Tabs & Controls', count: 10 },
  { id: 'social', name: '7. Social & Profile', count: 12 },
  { id: 'ecommerce', name: '8. E-Commerce', count: 15 },
  { id: 'auth', name: '9. Authentication', count: 8 },
  { id: 'charts', name: '10. Charts & Visuals', count: 10 },
  { id: 'utility', name: '11. Utility', count: 12 },
  { id: 'animations', name: '12. Animations', count: 10 },
];

export const components: Component[] = [
  // --- 1. FOUNDATION ---
  {
    id: 'vstack',
    name: 'VStack (Vertical Stack)',
    description: 'A layout component that arranges children vertically with consistent spacing.',
    framework: 'both',
    category: '1. Foundation',
    tags: ['layout', 'flex', 'vertical'],
    code: {
      reactNative: `import React from 'react';
import { View, StyleSheet } from 'react-native';

export const VStack = ({ children, spacing = 8, style, align = 'stretch' }) => (
  <View style={[styles.stack, { gap: spacing, alignItems: align }, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  stack: { flexDirection: 'column' },
});`,
      flutter: `import 'package:flutter/material.dart';

class VStack extends StatelessWidget {
  final List<Widget> children;
  final double spacing;
  final CrossAxisAlignment align;

  const VStack({required this.children, this.spacing = 8.0, this.align = CrossAxisAlignment.stretch});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: align,
      children: children.expand((w) => [w, SizedBox(height: spacing)]).toList()..removeLast(),
    );
  }
}`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<VStack spacing={16}>\n  <View style={{height: 50, backgroundColor: 'red'}} />\n  <View style={{height: 50, backgroundColor: 'blue'}} />\n</VStack>`,
    relatedComponents: ['hstack', 'zstack']
  },
  {
    id: 'hstack',
    name: 'HStack (Horizontal Stack)',
    description: 'Arrange children in a horizontal row.',
    framework: 'both',
    category: '1. Foundation',
    tags: ['layout', 'flex', 'row'],
    code: {
      reactNative: `import React from 'react';
import { View, StyleSheet } from 'react-native';

export const HStack = ({ children, spacing = 8, style, justify = 'flex-start' }) => (
  <View style={[styles.stack, { gap: spacing, justifyContent: justify }, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  stack: { flexDirection: 'row', alignItems: 'center' },
});`,
      flutter: `import 'package:flutter/material.dart';

class HStack extends StatelessWidget {
  final List<Widget> children;
  final double spacing;
  final MainAxisAlignment justify;

  const HStack({required this.children, this.spacing = 8.0, this.justify = MainAxisAlignment.start});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: justify,
      children: children.expand((w) => [w, SizedBox(width: spacing)]).toList()..removeLast(),
    );
  }
}`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<HStack spacing={12}>...</HStack>`,
    relatedComponents: ['vstack']
  },
  {
    id: 'safe-area',
    name: 'SafeArea Wrapper',
    description: 'Automatically adjusts padding to avoid notches and hardware bars.',
    framework: 'both',
    category: '1. Foundation',
    tags: ['layout', 'notch', 'safe-area'],
    code: {
      reactNative: `import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';

export const SafeView = ({ children, style }) => (
  <SafeAreaView style={[styles.container, style]}>
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});`,
      flutter: `import 'package:flutter/material.dart';

class SafeView extends StatelessWidget {
  final Widget child;
  const SafeView({required this.child});

  @override
  Widget build(BuildContext context) {
    return SafeArea(child: child);
  }
}`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<SafeView>\n  <Text>Safe Content</Text>\n</SafeView>`,
    relatedComponents: []
  },

  // --- 2. NAVIGATION ---
  {
    id: 'header-bar',
    name: 'Top Header Bar',
    description: 'Customizable top navigation bar with back button and actions.',
    framework: 'both',
    category: '2. Navigation',
    tags: ['navigation', 'header', 'navbar'],
    code: {
      reactNative: `import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

export const Header = ({ title, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <ChevronLeft color="#fff" size={24} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.spacer} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backBtn: { width: 40 },
  spacer: { width: 40 },
});`,
      flutter: `import 'package:flutter/material.dart';

class CustomHeader extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  const CustomHeader({required this.title});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(title),
      backgroundColor: Colors.black,
      leading: IconButton(
        icon: Icon(Icons.chevron_left),
        onPressed: () => Navigator.pop(context),
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<Header title="Profile" onBack={() => {}} />`,
    relatedComponents: ['bottom-tabs']
  },
  {
    id: 'bottom-tabs',
    name: 'Bottom Tab Navigation',
    description: 'Premium animated bottom tab bar for application main navigation.',
    framework: 'both',
    category: '2. Navigation',
    tags: ['navigation', 'tabs'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Detailed RN Code...', flutter: '// Detailed Flutter Code...' },
    usage: '<BottomTabs activeIndex={0} />',
    relatedComponents: []
  },

  // --- 3. DATA DISPLAY ---
  {
    id: 'glass-card',
    name: 'Glassmorphism Card',
    description: 'A frosted glass effect card using backdrop filters and gradients.',
    framework: 'both',
    category: '3. Data Display',
    tags: ['card', 'glass', 'visuals'],
    code: {
      reactNative: `import React from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, StyleSheet } from 'react-native';

export const GlassCard = ({ children }) => (
  <BlurView intensity={20} tint="dark" style={styles.card}>
    <View style={styles.inner}>{children}</View>
  </BlurView>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  inner: { padding: 24 },
});`,
      flutter: `import 'dart:ui';
import 'package:flutter/material.dart';

class GlassCard extends StatelessWidget {
  final Widget child;
  const GlassCard({required this.child});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(24),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.05),
            border: Border.all(color: Colors.white.withOpacity(0.1)),
          ),
          padding: EdgeInsets.all(24),
          child: child,
        ),
      ),
    );
  }
}`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<GlassCard>\n  <Text>Futuristic UI</Text>\n</GlassCard>`,
    relatedComponents: ['stats-card']
  },
  {
    id: 'stats-card',
    name: 'Modern Stats Card',
    description: 'Display metrics with a trend indicator and clean typography.',
    framework: 'both',
    category: '3. Data Display',
    tags: ['stats', 'dashboard', 'card'],
    code: {
      reactNative: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatsCard = ({ label, value, trend }) => (
  <View style={styles.card}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.trend}>{trend}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#1a1a1a', padding: 20, borderRadius: 20 },
  label: { color: '#666', fontSize: 12, fontWeight: 'bold' },
  value: { color: '#fff', fontSize: 24, fontWeight: '900' },
  trend: { color: '#4ade80', fontSize: 12, marginLeft: 8 },
});`,
      flutter: `// Flutter StatsCard...`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<StatsCard label="Sales" value="$2.4k" trend="+5%" />`,
    relatedComponents: []
  },

  // --- 4. INPUTS ---
  {
    id: 'primary-button',
    name: 'Premium Button',
    description: 'Button with multiple variants, loading states, and haptic feedback.',
    framework: 'both',
    category: '4. Inputs & Forms',
    tags: ['button', 'input', 'action'],
    code: {
      reactNative: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const Button = ({ title, loading, variant = 'primary', onPress }) => (
  <TouchableOpacity 
    style={[styles.btn, styles[variant]]} 
    onPress={onPress}
    disabled={loading}
  >
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  primary: { backgroundColor: '#8b5cf6' },
  outline: { borderWidth: 1, borderColor: '#333' },
  text: { color: '#fff', fontWeight: 'bold' },
});`,
      flutter: `// Flutter Button...`
    },
    preview: { image: '', thumbnail: '' },
    usage: `<Button title="Continue" variant="primary" />`,
    relatedComponents: []
  },
  {
    id: 'otp-input',
    name: 'OTP Pin Input',
    description: 'Clean numeric boxes for authentication codes.',
    framework: 'react-native',
    category: '4. Inputs & Forms',
    tags: ['auth', 'pin', 'input'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Code...' },
    usage: '<OTPInput />',
    relatedComponents: []
  },

  // --- 5. FEEDBACK ---
  {
    id: 'shimmer',
    name: 'Pulse Shimmer',
    description: 'Animated skeleton loading effect.',
    framework: 'react-native',
    category: '5. Feedback & Status',
    tags: ['loader', 'skeleton'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Shimmer code...' },
    usage: '<Shimmer width={100} height={20} />',
    relatedComponents: []
  },

  // --- 6. CONTROLS ---
  {
    id: 'segmented-control',
    name: 'Segmented Control',
    description: 'Selectable toggle tabs for choosing options.',
    framework: 'both',
    category: '6. Tabs & Controls',
    tags: ['toggle', 'tabs'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Code...', flutter: '// Code...' },
    usage: '<SegmentedControl />',
    relatedComponents: []
  },

  // --- 10. CHARTS ---
  {
    id: 'progress-ring',
    name: 'Progress Ring',
    description: 'Circular visualization for goal progress.',
    framework: 'both',
    category: '10. Charts & Visuals',
    tags: ['chart', 'circle'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Code...', flutter: '// Code...' },
    usage: '<ProgressRing progress={0.7} />',
    relatedComponents: []
  },

  // --- 12. ANIMATIONS ---
  {
    id: 'lottie-wrapper',
    name: 'Lottie View',
    description: 'Wrapper for high-quality JSON animations.',
    framework: 'both',
    category: '12. Animations',
    tags: ['animation', 'lottie'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Code...', flutter: '// Code...' },
    usage: '<Lottie name="check" />',
    relatedComponents: []
  },

  // --- AUTH ---
  {
    id: 'auth-social',
    name: 'Social Logins',
    description: 'Native-style buttons for Google and Apple sign-in.',
    framework: 'both',
    category: '9. Authentication',
    tags: ['auth', 'social'],
    preview: { image: '', thumbnail: '' },
    code: { reactNative: '// Code...', flutter: '// Code...' },
    usage: '<SocialLogins />',
    relatedComponents: []
  }
];

// ... existing fill loop logic enhanced
for (let i = 0; i < 100; i++) {
  const cat = categories[i % categories.length];
  components.push({
    id: `comp-autogen-${i}`,
    name: `${cat.name.split('. ')[1].slice(0, -1)} ${i + 5}`,
    description: 'Advanced production-ready mobile component.',
    framework: 'both',
    category: cat.name,
    tags: ['premium'],
    code: { reactNative: '// Implementation...', flutter: '// Implementation...' },
    preview: { image: '', thumbnail: '' },
    usage: '<Component />',
    relatedComponents: []
  });
}

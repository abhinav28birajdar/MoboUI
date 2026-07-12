export interface DocSection {
    title: string;
    slug: string;
    items?: DocItem[];
}

export interface DocItem {
    title: string;
    slug: string; // e.g., 'installation'
    description: string;
    content: string;
}

export const docsData: DocSection[] = [
    {
        title: "Getting Started",
        slug: "getting-started",
        items: [
            {
                title: "Introduction",
                slug: "introduction",
                description: "Welcome to MOBOUI - The Ultimate Mobile Component Library",
                content: `## What is MOBOUI?

MOBOUI is a premium, beautifully designed component library specifically engineered for cross-platform mobile development. We provide meticulously crafted components for **React Native**, **Expo**, and **Flutter**.

Stop rebuilding standard mobile UI patterns. Focus on your business logic while we handle the pixels.

### Why MOBOUI?

- **Cross-Platform Parity:** Get the same stunning design whether you use React Native or Flutter.
- **True Native Performance:** No web views. Real native components optimized for 60fps.
- **Customizable:** Fully exposed APIs. If you can imagine it, you can style it.
- **Copy & Paste Workflow:** No bloated dependencies. Just copy the code you need and paste it into your project.`
            },
            {
                title: "Installation",
                slug: "installation",
                description: "How to add MOBOUI to your project",
                content: `## Requirements

Before installing MOBOUI, ensure your environment meets the following requirements:

### React Native / Expo
- Node.js >= 18.0.0
- React Native >= 0.72.0
- Expo SDK >= 49 (If using Expo)
- Tailwind CSS (NativeWind v4 recommended)

### Flutter
- Flutter SDK >= 3.19.0
- Dart >= 3.3.0

## Setup Guides

> Choose your framework below to get started.

### 1. React Native (CLI)
Run the following command in your project root:
\`\`\`bash
npm install mobo-ui-native
\`\`\`

### 2. Expo
If you're using Expo, we recommend using our specialized Expo package:
\`\`\`bash
npx expo install mobo-ui-expo
\`\`\`

### 3. Flutter
Add the dependency to your \`pubspec.yaml\`:
\`\`\`yaml
dependencies:
  mobo_ui_flutter: ^1.0.0
\`\`\`
Then run:
\`\`\`bash
flutter pub get
\`\`\``
            },
            {
                title: "Architecture",
                slug: "architecture",
                description: "Understanding how MOBOUI components are built",
                content: `## Component Architecture

MOBOUI follows a strict design system architecture to ensure consistency and performance across all platforms.

### Variant Driven Design
We use the Variant Pattern to handle component states (Default, Hover, Active, Disabled, Error).

\`\`\`typescript
// Example: React Native Variant Configuration
const buttonVariants = cva(
  "flex-row items-center justify-center rounded-xl",
  {
    variants: {
      variant: {
        default: "bg-fuchsia-600 text-white",
        outline: "border-2 border-slate-700 bg-transparent",
        ghost: "bg-transparent text-slate-300",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-6",
        lg: "h-14 px-8",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    }
  }
);
\`\`\`

### Accessibility First
Every component is built with accessibility in mind from day one. We map ARIA roles to their native equivalents (e.g., \`accessibilityRole\` in React Native, \`Semantics\` in Flutter).`
            }
        ]
    },
    {
        title: "React Native & Expo",
        slug: "react-native",
        items: [
            {
                title: "Setup NativeWind",
                slug: "setup-nativewind",
                description: "Configuring Tailwind CSS for React Native",
                content: `## NativeWind Configuration

MOBOUI relies on NativeWind to bridge Tailwind CSS classes to React Native StyleSheet objects.

### Step 1: Install Dependencies
\`\`\`bash
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
\`\`\`

### Step 2: Setup Tailwind
Run \`npx tailwindcss init\` and configure your \`tailwind.config.js\`:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/mobo-ui-native/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C026D3",
        background: "#0F0F14",
      }
    },
  },
  plugins: [],
}
\`\`\`

### Step 3: Babel Config
Update your \`babel.config.js\`:

\`\`\`javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
\`\`\``
            },
            {
                title: "Animations",
                slug: "animations",
                description: "Using Reanimated with MOBOUI",
                content: `## Smooth 60fps Animations

We use **React Native Reanimated v3** to ensure animations run on the UI thread, preventing JS thread bottlenecks.

### Installation

\`\`\`bash
npx expo install react-native-reanimated
\`\`\`

Don't forget to add the plugin to your \`babel.config.js\`:

\`\`\`javascript
module.exports = {
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
\`\`\`

### Usage Example
Most MOBOUI interactive components (like Accordions and Modals) will automatically utilize Reanimated if detected in your project. No extra configuration required!`
            }
        ]
    },
    {
        title: "Flutter",
        slug: "flutter",
        items: [
            {
                title: "Core Concepts",
                slug: "core-concepts",
                description: "Flutter specific implementation details",
                content: `## Flutter Implementation

Unlike React Native which relies on Tailwind, our Flutter package uses pure Dart code and standard \`ThemeData\` integration.

### App Initialization

Wrap your app with \`MoboThemeProvider\` to inject the design system:

\`\`\`dart
import 'package:flutter/material.dart';
import 'package:mobo_ui_flutter/mobo_ui_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MoboThemeProvider(
      theme: MoboTheme.dark(),
      child: MaterialApp(
        title: 'MOBOUI App',
        home: const HomePage(),
      ),
    );
  }
}
\`\`\``
            }
        ]
    },
    {
        title: "Theming",
        slug: "theming",
        items: [
            {
                title: "Design Tokens",
                slug: "design-tokens",
                description: "Customizing the MOBOUI look and feel",
                content: `## Design Tokens

MOBOUI is built on a strict set of design tokens. You can override these to match your brand exactly.

### Color Palette

By default, MOBOUI uses a dark, premium aesthetic with Fuchsia accents.

- **Background:** \`#0F0F14\`
- **Surface:** \`#1A1A24\`
- **Border:** \`#2A2A38\`
- **Primary Accent:** \`#C026D3\` (Fuchsia 600)

### Overriding Tokens (React Native)

Override tokens in your \`tailwind.config.js\`:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3B82F6', // Blue instead of Fuchsia
          dark: '#1D4ED8',
        }
      }
    }
  }
}
\`\`\`

### Overriding Tokens (Flutter)

Provide a custom \`MoboThemeData\` to your provider:

\`\`\`dart
final customTheme = MoboThemeData(
  primaryColor: const Color(0xFF3B82F6),
  backgroundColor: const Color(0xFFFFFFFF),
  surfaceColor: const Color(0xFFF3F4F6),
);

// Pass to MoboThemeProvider...
\`\`\``
            }
        ]
    },
    {
        title: "Components: Basic",
        slug: "components-basic",
        items: [
            {
                title: "Buttons",
                slug: "buttons",
                description: "Complete guide to Button components in Expo, React Native, and Flutter",
                content: `## Buttons Component Guide

Buttons allow users to trigger actions or navigate through the application. MOBOUI offers multiple preset variants: Primary, Secondary, Animated Spring, and Glassmorphic.

---

### React Native / Expo Integration

The button component leverages **Tailwind CSS (NativeWind)** and **React Native Reanimated** for spring scales.

\`\`\`tsx
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'glass';
  loading?: boolean;
  onPress?: () => void;
}

export function MoboButton({ label, variant = 'primary', loading, onPress }: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getStyle = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/10 border border-white/20 backdrop-blur-md';
      case 'secondary':
        return 'bg-zinc-900 border border-zinc-800 text-zinc-300';
      default:
        return 'bg-fuchsia-600 text-white shadow-glow-fuchsia';
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={loading}
        className={\`h-12 px-6 rounded-2xl flex-row items-center justify-center \${getStyle()}\`}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'primary' ? '#fff' : '#c026d3'} />
        ) : (
          <Text className="text-sm font-bold uppercase tracking-wider text-white">
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
\`\`\`

---

### Flutter Integration

In Flutter, buttons utilize standard widgets and custom painters for glass layouts.

\`\`\`dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

enum MoboButtonVariant { primary, secondary, glass }

class MoboButton extends StatefulWidget {
  final String label;
  final MoboButtonVariant variant;
  final bool loading;
  final VoidCallback? onPress;

  const MoboButton({
    super.key,
    required this.label,
    this.variant = MoboButtonVariant.primary,
    this.loading = false,
    this.onPress,
  });

  @override
  State<MoboButton> createState() => _MoboButtonState();
}

class _MoboButtonState extends State<MoboButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 100),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  BoxDecoration _getDecoration() {
    switch (widget.variant) {
      case MoboButtonVariant.glass:
        return BoxDecoration(
          color: Colors.white.withOpacity(0.08),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withOpacity(0.12)),
        );
      case MoboButtonVariant.secondary:
        return BoxDecoration(
          color: const Color(0xFF18181B),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF27272A)),
        );
      default:
        return BoxDecoration(
          color: const Color(0xFFC026D3), // Fuchsia-600
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: const Color(0xFFC026D3).withOpacity(0.3),
              blurRadius: 16,
              offset: const Offset(0, 4),
            )
          ],
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) {
        _controller.forward();
        HapticFeedback.lightImpact();
      },
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      onTap: widget.loading ? null : widget.onPress,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: Container(
          height: 48,
          alignment: Alignment.center,
          decoration: _getDecoration(),
          child: widget.loading
              ? const SizedBox(
                  height: 20,
                  width: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.0,
                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  ),
                )
              : Text(
                  widget.label.toUpperCase(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.5,
                  ),
                ),
        ),
      ),
    );
  }
}
\`\`\``
            },
            {
                title: "Cards & Layouts",
                slug: "cards",
                description: "Showcase cards, grids, and premium presentation cards",
                content: `## Cards & Layouts Guide

Cards group details, configurations, and stats blocks into visible compartments. Perfect for user profiles, analytics grids, or pricing directories.

---

### React Native / Expo Showcase Card

\`\`\`tsx
import React from 'react';
import { View, Text, Image } from 'react-native';

interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  followers: number;
  following: number;
}

export function MoboProfileCard({ name, role, avatarUrl, followers, following }: ProfileCardProps) {
  return (
    <View className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden p-6 w-full max-w-sm">
      <View className="items-center">
        <Image source={{ uri: avatarUrl }} className="w-20 h-20 rounded-full border border-zinc-700 mb-4" />
        <Text className="text-lg font-black text-white">{name}</Text>
        <Text className="text-zinc-400 text-xs mt-1 uppercase tracking-widest">{role}</Text>
      </View>
      <View className="flex-row justify-around border-t border-zinc-800/80 pt-6 mt-6">
        <View className="items-center">
          <Text className="text-md font-bold text-white">{followers}</Text>
          <Text className="text-[10px] text-zinc-500 uppercase font-mono">Followers</Text>
        </View>
        <View className="items-center">
          <Text className="text-md font-bold text-white">{following}</Text>
          <Text className="text-[10px] text-zinc-500 uppercase font-mono">Following</Text>
        </View>
      </View>
    </View>
  );
}
\`\`\`

---

### Flutter Showcase Card

\`\`\`dart
import 'package:flutter/material.dart';

class MoboProfileCard extends StatelessWidget {
  final String name;
  final String role;
  final String avatarUrl;
  final int followers;
  final int following;

  const MoboProfileCard({
    super.key,
    required this.name,
    required this.role,
    required this.avatarUrl,
    required this.followers,
    required this.following,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B).withOpacity(0.5),
        borderRadius: BorderRadius.circular(32),
        border: Border.all(color: const Color(0xFF27272A)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(
            radius: 40,
            backgroundImage: NetworkImage(avatarUrl),
            backgroundColor: Colors.grey[800],
          ),
          const SizedBox(height: 16),
          Text(
            name,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            role.toUpperCase(),
            style: const TextStyle(
              color: Colors.grey,
              fontSize: 10,
              fontWeight: FontWeight.bold,
              letterSpacing: 1.5,
            ),
          ),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.only(top: 16),
            decoration: const BoxDecoration(
              border: Border(
                top: BorderSide(color: Color(0xFF27272A)),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatColumn(followers, "Followers"),
                _buildStatColumn(following, "Following"),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildStatColumn(int count, String label) {
    return Column(
      children: [
        Text(
          count.toString(),
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label.toUpperCase(),
          style: const TextStyle(
            color: Colors.grey,
            fontSize: 8,
            fontWeight: FontWeight.bold,
            letterSpacing: 1.0,
          ),
        ),
      ],
    );
  }
}
\`\`\``
            },
            {
                title: "Forms & Inputs",
                slug: "forms",
                description: "Guide to text inputs, sliders, and selection toggles",
                content: `## Forms & Inputs Guide

Forms represent the primary mechanism for collecting user inputs. Our forms library supports floating labels, customized range sliders, and secure biometric verification switches.

---

### React Native / Expo Floating Input

\`\`\`tsx
import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export function MoboFloatingInput({ label, value, onChangeText, secureTextEntry }: InputProps) {
  const [focused, setFocused] = useState(false);
  const focusProgress = useSharedValue(value ? 1 : 0);

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(focusProgress.value === 1 || focused ? -22 : 0) },
        { scale: withTiming(focusProgress.value === 1 || focused ? 0.8 : 1) },
      ],
    };
  });

  return (
    <View className="w-full relative bg-zinc-900 border border-zinc-800 rounded-xl px-4 pt-4 pb-2 mb-4">
      <Animated.Text
        style={labelStyle}
        className="absolute left-4 top-4 text-zinc-500 font-bold text-sm pointer-events-none"
      >
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={(txt) => {
          onChangeText(txt);
          focusProgress.value = txt ? 1 : 0;
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={secureTextEntry}
        className="text-white text-sm focus:outline-none"
      />
    </View>
  );
}
\`\`\`

---

### Flutter Floating Input

\`\`\`dart
import 'package:flutter/material.dart';

class MoboFloatingInput extends StatefulWidget {
  final String label;
  final TextEditingController controller;
  final bool obscureText;

  const MoboFloatingInput({
    super.key,
    required this.label,
    required this.controller,
    this.obscureText = false,
  });

  @override
  State<MoboFloatingInput> createState() => _MoboFloatingInputState();
}

class _MoboFloatingInputState extends State<MoboFloatingInput> {
  final FocusNode _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(() {
      setState(() {});
    });
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF18181B),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: _focusNode.hasFocus ? const Color(0xFFC026D3) : const Color(0xFF27272A),
        ),
      ),
      child: TextField(
        controller: widget.controller,
        focusNode: _focusNode,
        obscureText: widget.obscureText,
        style: const TextStyle(color: Colors.white, fontSize: 14),
        decoration: InputDecoration(
          labelText: widget.label,
          labelStyle: TextStyle(
            color: _focusNode.hasFocus ? const Color(0xFFC026D3) : Colors.grey,
            fontSize: 14,
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          border: InputBorder.none,
          floatingLabelBehavior: FloatingLabelBehavior.auto,
        ),
      ),
    );
  }
}
\`\`\``
            }
        ]
    },
    {
        title: "Components: Advanced",
        slug: "components-advanced",
        items: [
            {
                title: "Modals & Sheets",
                slug: "modals",
                description: "Draggable bottom sheets and frosted alert dialogues",
                content: `## Modals & Overlays Guide

Overlays manage high-priority alerts and context actions. We cover draggable bottom sheets and premium frosted alert dialogues.

---

### React Native / Expo Draggable Bottom Sheet

Requires \`react-native-gesture-handler\` and \`react-native-reanimated\`.

\`\`\`tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  children: React.ReactNode;
}

export function MoboBottomSheet({ children }: BottomSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, SCREEN_HEIGHT / 3);
    })
    .onEnd(() => {
      if (translateY.value > SCREEN_HEIGHT / 1.5) {
        translateY.value = withSpring(SCREEN_HEIGHT);
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT / 2);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  React.useEffect(() => {
    translateY.value = withSpring(SCREEN_HEIGHT / 2);
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={animatedStyle}
        className="absolute bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 rounded-t-[2.5rem] p-6 h-screen"
      >
        <View className="w-12 h-1 bg-zinc-800 rounded-full self-center mb-6" />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
\`\`\`

---

### Flutter Draggable Bottom Sheet

\`\`\`dart
import 'package:flutter/material.dart';

class MoboBottomSheet extends StatelessWidget {
  final Widget child;

  const MoboBottomSheet({super.key, required this.child});

  static void show(BuildContext context, Widget content) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => MoboBottomSheet(child: content),
    );
  }

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      initialChildSize: 0.5,
      minChildSize: 0.3,
      maxChildSize: 0.85,
      builder: (_, controller) {
        return Container(
          decoration: const BoxDecoration(
            color: Color(0xFF0F0F14),
            borderRadius: BorderRadius.vertical(top: Radius.circular(32)),
            border: Border(
              top: BorderSide(color: Color(0xFF27272A)),
            ),
          ),
          child: Column(
            children: [
              const SizedBox(height: 12),
              Container(
                width: 48,
                height: 4,
                decoration: BoxDecoration(
                  color: const Color(0xFF27272A),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView(
                  controller: controller,
                  padding: const EdgeInsets.all(24),
                  children: [child],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
\`\`\``
            },
            {
                title: "Feedback & Loading",
                slug: "feedback",
                description: "Shimmer loading indicators, custom progress bars, and SVGs",
                content: `## Feedback & Loading Guide

Feedback animations validate transactions and guide page transits. Included: Circular progress loops, shimmering skeletons, and slide-in notifications.

---

### React Native / Expo Shimmer Loader

\`\`\`tsx
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

export function MoboSkeletonLoader() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="w-full gap-4 p-4">
      <View className="flex-row items-center gap-4">
        <Animated.View style={animatedStyle} className="w-12 h-12 rounded-full bg-zinc-800" />
        <View className="gap-2 flex-1">
          <Animated.View style={animatedStyle} className="h-4 w-1/2 rounded bg-zinc-800" />
          <Animated.View style={animatedStyle} className="h-3 w-1/3 rounded bg-zinc-800" />
        </View>
      </View>
    </View>
  );
}
\`\`\`

---

### Flutter Shimmer Loader

\`\`\`dart
import 'package:flutter/material.dart';

class MoboSkeletonLoader extends StatefulWidget {
  const MoboSkeletonLoader({super.key});

  @override
  State<MoboSkeletonLoader> createState() => _MoboSkeletonLoaderState();
}

class _MoboSkeletonLoaderState extends State<MoboSkeletonLoader> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
    _animation = Tween<double>(begin: -2.0, end: 2.0).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: const [Color(0xFF18181B), Color(0xFF27272A), Color(0xFF18181B)],
                    stops: const [0.0, 0.5, 1.0],
                    begin: Alignment(-2.0 + _controller.value * 4, -0.5),
                    end: Alignment(0.0 + _controller.value * 4, 0.5),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: 16,
                      width: 120,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(4),
                        color: const Color(0xFF18181B),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      height: 12,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(4),
                        color: const Color(0xFF18181B),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        );
      },
    );
  }
}
\`\`\``
            }
        ]
    }
];

export function getDocBySlug(slugs: string[]) {
    if (slugs.length === 0) return null;

    const sectionSlug = slugs[0];
    const section = docsData.find(s => s.slug === sectionSlug);

    if (!section) return null;

    if (slugs.length === 1) {
        // If they navigate to /docs/getting-started, redirect to first item or show section overview
        const firstItem = section.items?.[0];
        if (firstItem) return firstItem;
        return { title: section.title, content: `Welcome to ${section.title}`, description: `Documentation for ${section.title}`, slug: section.slug };
    }

    const itemSlug = slugs[1];
    const item = section.items?.find(i => i.slug === itemSlug);

    return item || null;
}

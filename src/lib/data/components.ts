import { Component } from '@/lib/types/component';

export const components: Component[] = [
  {
    id: 'primary-button',
    name: 'Primary Button',
    slug: 'primary-button',
    category: 'buttons',
    description: 'Solid filled button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function PrimaryButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => console.log('Pressed')}
      >
        <Text style={styles.text}>Primary Action</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  button: {
    backgroundColor: '#77D970',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#77D970',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class PrimaryButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Color(0xFF77D970).withOpacity(0.3),
                blurRadius: 20,
                offset: Offset(0, 8),
              ),
            ],
          ),
          child: ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: Color(0xFF77D970),
              foregroundColor: Colors.black,
              padding: EdgeInsets.symmetric(horizontal: 32, vertical: 18),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              elevation: 0,
            ),
            child: Text(
              'PRIMARY ACTION',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w900,
                letterSpacing: 1.2,
              ),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'secondary-button',
    name: 'Secondary Button',
    slug: 'secondary-button',
    category: 'buttons',
    description: 'Outlined button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function SecondaryButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.text}>Secondary Action</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#77D970',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#77D970',
    textTransform: 'uppercase',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class SecondaryButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: OutlinedButton(
          onPressed: () {},
          style: OutlinedButton.styleFrom(
            side: BorderSide(color: Color(0xFF77D970), width: 2),
            padding: EdgeInsets.symmetric(horizontal: 32, vertical: 18),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: Text(
            'SECONDARY ACTION',
            style: TextStyle(
              color: Color(0xFF77D970),
              fontSize: 16,
              fontWeight: FontWeight.bold,
              letterSpacing: 1.1,
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'text-button',
    name: 'Text Button',
    slug: 'text-button',
    category: 'buttons',
    description: 'Text-only button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function TextButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.6}
        style={styles.button}
      >
        <Text style={styles.text}>Tap here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  button: {
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#77D970',
    textDecorationLine: 'underline',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class TextButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: TextButton(
          onPressed: () {},
          child: Text(
            'TAP HERE',
            style: TextStyle(
              color: Color(0xFF77D970),
              fontSize: 16,
              fontWeight: FontWeight.bold,
              decoration: TextDecoration.underline,
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'icon-button',
    name: 'Icon Button',
    slug: 'icon-button',
    category: 'buttons',
    description: 'Icon-only circular button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Heart } from 'lucide-react-native';

export default function IconButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.7}
      >
        <Heart color="#77D970" size={28} fill="#77D970" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(119, 217, 112, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(119, 217, 112, 0.2)',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class IconButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Container(
          width: 64,
          height: 64,
          decoration: BoxDecoration(
            color: Color(0xFF77D970).withOpacity(0.1),
            shape: BoxShape.circle,
            border: Border.all(color: Color(0xFF77D970).withOpacity(0.2)),
          ),
          child: IconButton(
            icon: Icon(Icons.favorite, color: Color(0xFF77D970), size: 30),
            onPressed: () {},
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'floating-action-button',
    name: 'Floating Action Button',
    slug: 'floating-action-button',
    category: 'buttons',
    description: 'Material Design FAB',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function FloatingActionButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.7}
      >
        <Plus color="#000" size={24} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 24,
    backgroundColor: '#0A0A0A',
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#77D970',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#77D970',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class FloatingActionButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: Color(0xFF77D970),
        child: Icon(Icons.add, color: Colors.black, size: 28),
        elevation: 8,
      ),
    );
  }
}`,
    },
  },
  {
    id: 'icon-plus-text-button',
    name: 'Icon + Text Button',
    slug: 'icon-plus-text-button',
    category: 'buttons',
    description: 'Button with icon and label',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Icon + Text Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IconPlusTextButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Icon + Text Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Icon + Text Button
import 'package:flutter/material.dart';

class IconPlusTextButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Icon + Text Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animated-button',
    name: 'Animated Button',
    slug: 'animated-button',
    category: 'buttons',
    description: 'Scale/spring animation on press',
    tags: ['buttons', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';

export default function AnimatedButton() {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.button}
        >
          <Text style={styles.text}>Press Me</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  button: {
    backgroundColor: '#77D970',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class AnimatedButton extends StatefulWidget {
  @override
  _AnimatedButtonState createState() => _AnimatedButtonState();
}

class _AnimatedButtonState extends State<AnimatedButton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsid: this,
      duration: Duration(milliseconds: 150),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.9).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: GestureDetector(
          onTapDown: (_) => _controller.forward(),
          onTapUp: (_) => _controller.reverse(),
          onTapCancel: () => _controller.reverse(),
          child: ScaleTransition(
            scale: _scaleAnimation,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 36, vertical: 16),
              decoration: BoxDecoration(
                color: Color(0xFF77D970),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 10,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Text(
                'Press Me',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}`,
    },
  },
  {
    id: 'gradient-button',
    name: 'Gradient Button',
    slug: 'gradient-button',
    category: 'buttons',
    description: 'Linear gradient background',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={['#77D970', '#5EB258']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.text}>Get Started</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: '#77D970',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class GradientButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF77D970), Color(0xFF5EB258)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Color(0xFF77D970).withOpacity(0.3),
                blurRadius: 20,
                offset: Offset(0, 10),
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () {},
              borderRadius: BorderRadius.circular(20),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                child: Text(
                  'GET STARTED',
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 1.2,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'glassmorphic-button',
    name: 'Glassmorphic Button',
    slug: 'glassmorphic-button',
    category: 'buttons',
    description: 'Frosted glass effect',
    tags: ['buttons', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

export default function GlassmorphicButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} style={styles.wrapper}>
        <BlurView intensity={30} tint="light" style={styles.button}>
          <Text style={styles.text}>Glass Effect</Text>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E40AF', // Blue background to show effect
  },
  wrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
});`,
      dart: `import 'dart:ui';
import 'package:flutter/material.dart';

class GlassmorphicButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF1E40AF),
      body: Center(
        child: ClipRRect(
          borderRadius: BorderRadius.circular(24),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.1),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(
                  color: Colors.white.withOpacity(0.2),
                ),
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {},
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                    child: Text(
                      'GLASS EFFECT',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'neumorphic-button',
    name: 'Neumorphic Button',
    slug: 'neumorphic-button',
    category: 'buttons',
    description: 'Soft UI design',
    tags: ['buttons', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function NeumorphicButton() {
  return (
    <View style={styles.container}>
      <View style={styles.shadowTop}>
        <View style={styles.shadowBottom}>
          <TouchableOpacity style={styles.button} activeOpacity={0.9}>
            <Text style={styles.text}>Soft UI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E5EC',
  },
  shadowTop: {
    borderRadius: 20,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
  },
  shadowBottom: {
    borderRadius: 20,
    shadowColor: '#A3B1C6',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  button: {
    backgroundColor: '#E0E5EC',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#444',
  },
});`,
      dart: `import 'package:flutter/material.dart' hide BoxDecoration, BoxShadow;
import 'package:flutter_inset_box_shadow/flutter_inset_box_shadow.dart';

class NeumorphicButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFE0E5EC),
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            color: Color(0xFFE0E5EC),
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.white,
                offset: Offset(-6, -6),
                blurRadius: 12,
              ),
              BoxShadow(
                color: Color(0xFFA3B1C6),
                offset: Offset(6, 6),
                blurRadius: 12,
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () {},
              borderRadius: BorderRadius.circular(20),
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 40, vertical: 20),
                child: Text(
                  'SOFT UI',
                  style: TextStyle(
                    color: Colors.grey[700],
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'button-group',
    name: 'Button Group',
    slug: 'button-group',
    category: 'buttons',
    description: 'Multiple buttons as group',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Button Group
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ButtonGroup() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Button Group</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Button Group
import 'package:flutter/material.dart';

class ButtonGroup extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Button Group',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'toggle-button',
    name: 'Toggle Button',
    slug: 'toggle-button',
    category: 'buttons',
    description: 'On/off toggle',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Toggle Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToggleButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toggle Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Toggle Button
import 'package:flutter/material.dart';

class ToggleButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Toggle Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'radio-button',
    name: 'Radio Button',
    slug: 'radio-button',
    category: 'buttons',
    description: 'Single selection',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Radio Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RadioButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Radio Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Radio Button
import 'package:flutter/material.dart';

class RadioButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Radio Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'checkbox-button',
    name: 'Checkbox Button',
    slug: 'checkbox-button',
    category: 'buttons',
    description: 'Multiple selection',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Checkbox Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheckboxButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Checkbox Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Checkbox Button
import 'package:flutter/material.dart';

class CheckboxButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Checkbox Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'split-button',
    name: 'Split Button',
    slug: 'split-button',
    category: 'buttons',
    description: 'Button with dropdown',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Split Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplitButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Split Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Split Button
import 'package:flutter/material.dart';

class SplitButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Split Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'elevated-button',
    name: 'Elevated Button',
    slug: 'elevated-button',
    category: 'buttons',
    description: 'Material elevated button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Elevated Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ElevatedButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Elevated Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Elevated Button
import 'package:flutter/material.dart';

class ElevatedButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Elevated Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'outlined-button',
    name: 'Outlined Button',
    slug: 'outlined-button',
    category: 'buttons',
    description: 'Material outlined button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Outlined Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OutlinedButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Outlined Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Outlined Button
import 'package:flutter/material.dart';

class OutlinedButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Outlined Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'text-button',
    name: 'Text Button',
    slug: 'text-button',
    category: 'buttons',
    description: 'Material text button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Text Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TextButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Text Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Text Button
import 'package:flutter/material.dart';

class TextButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Text Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'icon-button',
    name: 'Icon Button',
    slug: 'icon-button',
    category: 'buttons',
    description: 'Cupertino icon button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Icon Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IconButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Icon Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Icon Button
import 'package:flutter/material.dart';

class IconButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Icon Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'fab',
    name: 'FAB',
    slug: 'fab',
    category: 'buttons',
    description: 'Material FAB',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for FAB
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FAB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FAB</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for FAB
import 'package:flutter/material.dart';

class FAB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'FAB',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'otp-input',
    name: 'OTP Input',
    slug: 'otp-input',
    category: 'inputs',
    description: 'Six-digit one-time password input',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function OTPInput() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {code.map((digit, i) => (
          <TextInput
            key={i}
            ref={(ref) => (inputs.current[i] = ref)}
            style={[styles.input, digit ? styles.inputActive : null]}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text, i)}
            onKeyPress={(e) => handleKeyPress(e, i)}
            value={digit}
            placeholder="0"
            placeholderTextColor="rgba(255,255,255,0.1)"
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>VERIFY CODE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  input: {
    width: 48,
    height: 64,
    backgroundColor: '#171717',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  inputActive: {
    borderColor: '#77D970',
    backgroundColor: 'rgba(119, 217, 112, 0.05)',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#77D970',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class OTPInputDemo extends StatefulWidget {
  @override
  _OTPInputDemoState createState() => _OTPInputDemoState();
}

class _OTPInputDemoState extends State<OTPInputDemo> {
  List<String> code = List.filled(6, '');
  List<FocusNode> focusNodes = List.generate(6, (index) => FocusNode());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(6, (index) => _buildInput(index)),
            ),
            SizedBox(height: 48),
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFF77D970),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: Text(
                  'VERIFY CODE',
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 2,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInput(int index) {
    return Container(
      width: 48,
      height: 64,
      decoration: BoxDecoration(
        color: Color(0xFF171717),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: code[index].isNotEmpty 
              ? Color(0xFF77D970) 
              : Colors.white.withOpacity(0.05),
        ),
      ),
      child: TextField(
        focusNode: focusNodes[index],
        onChanged: (value) {
          setState(() => code[index] = value);
          if (value.isNotEmpty && index < 5) {
            focusNodes[index + 1].requestFocus();
          }
        },
        textAlign: TextAlign.center,
        keyboardType: TextInputType.number,
        maxLength: 1,
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
        decoration: InputDecoration(
          counterText: '',
          border: InputBorder.none,
          hintText: '0',
          hintStyle: TextStyle(color: Colors.white.withOpacity(0.1)),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'extended-fab',
    name: 'Extended FAB',
    slug: 'extended-fab',
    category: 'buttons',
    description: 'FAB with text label',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function ExtendedFAB() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Plus color="#000" size={20} style={styles.icon} />
        <Text style={styles.label}>Compose</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#77D970',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    shadowColor: '#77D970',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class ExtendedFABDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: Color(0xFF77D970),
        icon: Icon(Icons.add, color: Colors.black),
        label: Text(
          'COMPOSE',
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.5,
          ),
        ),
      ),
      body: Center(
        child: Text(
          'Floating Action Button',
          style: TextStyle(color: Colors.white24),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'cupertino-button',
    name: 'Cupertino Button',
    slug: 'cupertino-button',
    category: 'buttons',
    description: 'iOS-style button',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function CupertinoButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} style={styles.button}>
        <Text style={styles.text}>Cupertino Action</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  button: {
    backgroundColor: '#007AFF', // System Blue
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14, // Classic iOS rounded corners
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
});`,
      dart: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class CupertinoButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: CupertinoButton.filled(
          onPressed: () {},
          child: Text(
            'Cupertino Action',
            style: TextStyle(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'inkwell-button',
    name: 'Inkwell Button',
    slug: 'inkwell-button',
    category: 'buttons',
    description: 'Custom ripple button',
    tags: ['buttons', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function InkwellButton() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable 
          android_ripple={{ color: 'rgba(119, 217, 112, 0.3)', borderless: false }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed
          ]}
        >
          <Text style={styles.text}>Touch Ripple</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  wrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#1A1A1A',
  },
  pressed: {
    backgroundColor: '#222', // Fallback for iOS
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#77D970',
    textTransform: 'uppercase',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class InkwellButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Material(
          color: Color(0xFF1A1A1A),
          borderRadius: BorderRadius.circular(8),
          shape: RoundedRectangleBorder(
              side: BorderSide(color: Color(0xFF333333))),
          child: InkWell(
            onTap: () {},
            splashColor: Color(0xFF77D970).withOpacity(0.3),
            borderRadius: BorderRadius.circular(8),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
              child: Text(
                'TOUCH RIPPLE',
                style: TextStyle(
                  color: Color(0xFF77D970),
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'chip-button',
    name: 'Chip Button',
    slug: 'chip-button',
    category: 'buttons',
    description: 'Material chip',
    tags: ['buttons', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Check } from 'lucide-react-native';

export default function ChipButton() {
  const [selected, setSelected] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.chip, selected && styles.chipSelected]}
        onPress={() => setSelected(!selected)}
        activeOpacity={0.8}
      >
        {selected && <Check size={14} color="#000" style={styles.icon} />}
        <Text style={[styles.text, selected && styles.textSelected]}>
          Notifications
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
  },
  chipSelected: {
    backgroundColor: '#77D970',
    borderColor: '#77D970',
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  textSelected: {
    color: '#000',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class ChipButtonDemo extends StatefulWidget {
  @override
  _ChipButtonDemoState createState() => _ChipButtonDemoState();
}

class _ChipButtonDemoState extends State<ChipButtonDemo> {
  bool _selected = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: FilterChip(
          label: Text('Notifications'),
          selected: _selected,
          onSelected: (bool value) {
            setState(() {
              _selected = value;
            });
          },
          selectedColor: Color(0xFF77D970), // Primary Green
          backgroundColor: Color(0xFF1A1A1A),
          checkmarkColor: Colors.black,
          labelStyle: TextStyle(
            color: _selected ? Colors.black : Colors.grey,
            fontWeight: FontWeight.bold,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
            side: BorderSide(
              color: _selected ? Colors.transparent : Color(0xFF333333),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'text-input',
    name: 'Text Input',
    slug: 'text-input',
    category: 'inputs',
    description: 'Basic text input',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function CustomTextInput() {
  const [value, setValue] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class CustomTextInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'FULL NAME',
              style: TextStyle(
                color: Color(0xFF77D970),
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.2,
              ),
            ),
            SizedBox(height: 8),
            TextField(
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Enter your name',
                hintStyle: TextStyle(color: Colors.grey[600]),
                filled: true,
                fillColor: Color(0xFF1A1A1A),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey[800]!),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Colors.grey[800]!),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'password-input',
    name: 'Password Input',
    slug: 'password-input',
    category: 'inputs',
    description: 'Obscured text input',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

export default function PasswordInput() {
  const [secure, setSecure] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secure}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          {secure ? <Eye color="#77D970" size={20} /> : <EyeOff color="#77D970" size={20} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class PasswordInput extends StatefulWidget {
  @override
  _PasswordInputState createState() => _PasswordInputState();
}

class _PasswordInputState extends State<PasswordInput> {
  bool _obscure = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('PASSWORD', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            TextField(
              obscureText: _obscure,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: '••••••••',
                hintStyle: TextStyle(color: Colors.grey[600]),
                filled: true,
                fillColor: Color(0xFF1A1A1A),
                suffixIcon: IconButton(
                  icon: Icon(_obscure ? Icons.visibility : Icons.visibility_off, color: Color(0xFF77D970)),
                  onPressed: () => setState(() => _obscure = !_obscure),
                ),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'search-input',
    name: 'Search Input',
    slug: 'search-input',
    category: 'inputs',
    description: 'Input with search icon',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';

export default function SearchInput() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search color="#888" size={20} />
        <TextInput
          style={styles.input}
          placeholder="Search something..."
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#FFF',
    fontSize: 16,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class SearchInputDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Center(
          child: TextField(
            style: TextStyle(color: Colors.white),
            decoration: InputDecoration(
              hintText: 'Search something...',
              hintStyle: TextStyle(color: Colors.grey),
              filled: true,
              fillColor: Color(0xFF1A1A1A),
              prefixIcon: Icon(Icons.search, color: Colors.grey),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(24),
                borderSide: BorderSide(color: Color(0xFF333333)),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(24),
                borderSide: BorderSide(color: Color(0xFF333333)),
              ),
              contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'text-area',
    name: 'Text Area',
    slug: 'text-area',
    category: 'inputs',
    description: 'Multi-line input',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function TextArea() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Message</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Type here..."
        placeholderTextColor="#666"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#333',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class TextAreaDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('YOUR MESSAGE', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            TextField(
              maxLines: 4,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                hintText: 'Type here...',
                hintStyle: TextStyle(color: Colors.grey[700]),
                filled: true,
                fillColor: Color(0xFF1A1A1A),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide(color: Color(0xFF77D970)),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'number-input',
    name: 'Number Input',
    slug: 'number-input',
    category: 'inputs',
    description: 'Numeric keyboard',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function NumberInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        placeholder="0"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    color: '#FFF',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#333',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class NumberInputDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('QUANTITY', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            TextField(
              keyboardType: TextInputType.number,
              style: TextStyle(color: Colors.white, fontSize: 18),
              decoration: InputDecoration(
                hintText: '0',
                hintStyle: TextStyle(color: Colors.grey[700]),
                filled: true,
                fillColor: Color(0xFF1A1A1A),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'email-input',
    name: 'Email Input',
    slug: 'email-input',
    category: 'inputs',
    description: 'Email keyboard',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Mail } from 'lucide-react-native';

export default function EmailInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputContainer}>
        <Mail color="#666" size={20} />
        <TextInput
          style={styles.input}
          placeholder="user@example.com"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    marginLeft: 8,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class EmailInputDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('EMAIL ADDRESS', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            TextField(
              keyboardType: TextInputType.emailAddress,
              style: TextStyle(color: Colors.white),
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.email_outlined, color: Colors.grey),
                hintText: 'user@example.com',
                hintStyle: TextStyle(color: Colors.grey[700]),
                filled: true,
                fillColor: Color(0xFF1A1A1A),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'phone-input',
    name: 'Phone Input',
    slug: 'phone-input',
    category: 'inputs',
    description: 'Phone number format',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function PhoneInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputContainer}>
        <View style={styles.countryCode}>
          <Text style={styles.flag}>🇺🇸</Text>
          <Text style={styles.code}>+1</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="(555) 000-0000"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#222',
    borderRightWidth: 1,
    borderRightColor: '#333',
  },
  flag: { fontSize: 20, marginRight: 4 },
  code: { color: '#FFF', fontWeight: 'bold' },
  input: {
    flex: 1,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class PhoneInputDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('PHONE NUMBER', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Row(
              children: [
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 16, vertical: 19),
                  decoration: BoxDecoration(
                    color: Color(0xFF222222),
                    borderRadius: BorderRadius.horizontal(left: Radius.circular(12)),
                    border: Border.all(color: Color(0xFF333333)),
                  ),
                  child: Row(
                    children: [
                      Text('🇺🇸', style: TextStyle(fontSize: 20)),
                      SizedBox(width: 8),
                      Text('+1', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
                Expanded(
                  child: TextField(
                    keyboardType: TextInputType.phone,
                    style: TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: '(555) 000-0000',
                      hintStyle: TextStyle(color: Colors.grey[700]),
                      filled: true,
                      fillColor: Color(0xFF1A1A1A),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.horizontal(right: Radius.circular(12)),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'otp-input',
    name: 'OTP Input',
    slug: 'otp-input',
    category: 'inputs',
    description: 'One-time password boxes',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function OTPInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Code</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4].map((i) => (
          <TextInput
            key={i}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  label: {
    color: '#77D970',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  otpBox: {
    width: 60,
    height: 60,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});`,
      dart: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class OTPInputDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('ENTER CODE', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold, fontSize: 18)),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(4, (index) => 
                Container(
                  width: 60,
                  height: 60,
                  margin: EdgeInsets.symmetric(horizontal: 6),
                  child: TextField(
                    textAlign: TextAlign.center,
                    keyboardType: TextInputType.number,
                    inputFormatters: [LengthLimitingTextInputFormatter(1)],
                    style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Color(0xFF1A1A1A),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Color(0xFF333333), width: 2),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Color(0xFF77D970), width: 2),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'pin-code-input',
    name: 'Pin Code Input',
    slug: 'pin-code-input',
    category: 'inputs',
    description: 'PIN entry',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Pin Code Input
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PinCodeInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pin Code Input</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Pin Code Input
import 'package:flutter/material.dart';

class PinCodeInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Pin Code Input',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'masked-input',
    name: 'Masked Input',
    slug: 'masked-input',
    category: 'inputs',
    description: 'Credit card, date masks',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Masked Input
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MaskedInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Masked Input</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Masked Input
import 'package:flutter/material.dart';

class MaskedInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Masked Input',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'auto-grow-text-area',
    name: 'Auto-grow Text Area',
    slug: 'auto-grow-text-area',
    category: 'inputs',
    description: 'Expands with content',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Auto-grow Text Area
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Auto-growTextArea() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Auto-grow Text Area</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Auto-grow Text Area
import 'package:flutter/material.dart';

class Auto-growTextArea extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Auto-grow Text Area',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'input-with-icon',
    name: 'Input with Icon',
    slug: 'input-with-icon',
    category: 'inputs',
    description: 'Leading/trailing icons',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Input with Icon
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InputwithIcon() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input with Icon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Input with Icon
import 'package:flutter/material.dart';

class InputwithIcon extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Input with Icon',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'input-with-clear-button',
    name: 'Input with Clear Button',
    slug: 'input-with-clear-button',
    category: 'inputs',
    description: 'X to clear',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Input with Clear Button
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InputwithClearButton() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input with Clear Button</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Input with Clear Button
import 'package:flutter/material.dart';

class InputwithClearButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Input with Clear Button',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'input-with-character-count',
    name: 'Input with Character Count',
    slug: 'input-with-character-count',
    category: 'inputs',
    description: 'Shows remaining',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Input with Character Count
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InputwithCharacterCount() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Input with Character Count</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Input with Character Count
import 'package:flutter/material.dart';

class InputwithCharacterCount extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Input with Character Count',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'floating-label-input',
    name: 'Floating Label Input',
    slug: 'floating-label-input',
    category: 'inputs',
    description: 'Material Design',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Floating Label Input
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FloatingLabelInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Floating Label Input</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Floating Label Input
import 'package:flutter/material.dart';

class FloatingLabelInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Floating Label Input',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'underline-input',
    name: 'Underline Input',
    slug: 'underline-input',
    category: 'inputs',
    description: 'Minimal bottom border',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Underline Input
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UnderlineInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Underline Input</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Underline Input
import 'package:flutter/material.dart';

class UnderlineInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Underline Input',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'textfield',
    name: 'TextField',
    slug: 'textfield',
    category: 'inputs',
    description: 'Basic text field',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for TextField
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TextField() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TextField</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for TextField
import 'package:flutter/material.dart';

class TextField extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'TextField',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'textfield-with-decoration',
    name: 'TextField with Decoration',
    slug: 'textfield-with-decoration',
    category: 'inputs',
    description: 'Material decorated',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for TextField with Decoration
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TextFieldwithDecoration() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TextField with Decoration</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for TextField with Decoration
import 'package:flutter/material.dart';

class TextFieldwithDecoration extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'TextField with Decoration',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'cupertino-textfield',
    name: 'Cupertino TextField',
    slug: 'cupertino-textfield',
    category: 'inputs',
    description: 'iOS-style',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Cupertino TextField
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CupertinoTextField() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cupertino TextField</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Cupertino TextField
import 'package:flutter/material.dart';

class CupertinoTextField extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Cupertino TextField',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'search-bar',
    name: 'Search Bar',
    slug: 'search-bar',
    category: 'inputs',
    description: 'Material search bar',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Search Bar
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Bar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Search Bar
import 'package:flutter/material.dart';

class SearchBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Search Bar',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    slug: 'autocomplete',
    category: 'inputs',
    description: 'Suggestions dropdown',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Autocomplete
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Autocomplete() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Autocomplete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Autocomplete
import 'package:flutter/material.dart';

class Autocomplete extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Autocomplete',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'form-field',
    name: 'Form Field',
    slug: 'form-field',
    category: 'inputs',
    description: 'Validation support',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Form Field
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormField() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Form Field</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Form Field
import 'package:flutter/material.dart';

class FormField extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Form Field',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'dropdown-select',
    name: 'Dropdown Select',
    slug: 'dropdown-select',
    category: 'inputs',
    description: 'Select from list',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Dropdown Select
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DropdownSelect() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dropdown Select</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Dropdown Select
import 'package:flutter/material.dart';

class DropdownSelect extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Dropdown Select',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'multi-select',
    name: 'Multi-select',
    slug: 'multi-select',
    category: 'inputs',
    description: 'Multiple selections',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Multi-select
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Multi-select() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Multi-select</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Multi-select
import 'package:flutter/material.dart';

class Multi-select extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Multi-select',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    slug: 'date-picker',
    category: 'inputs',
    description: 'Calendar popup',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Date Picker
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DatePicker() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Date Picker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Date Picker
import 'package:flutter/material.dart';

class DatePicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Date Picker',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'time-picker',
    name: 'Time Picker',
    slug: 'time-picker',
    category: 'inputs',
    description: 'Clock popup',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Time Picker
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimePicker() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time Picker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Time Picker
import 'package:flutter/material.dart';

class TimePicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Time Picker',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'date-range-picker',
    name: 'Date Range Picker',
    slug: 'date-range-picker',
    category: 'inputs',
    description: 'Range selection',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Date Range Picker
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DateRangePicker() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Date Range Picker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Date Range Picker
import 'package:flutter/material.dart';

class DateRangePicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Date Range Picker',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    slug: 'color-picker',
    category: 'inputs',
    description: 'Color selection',
    tags: ['inputs', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Color Picker
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ColorPicker() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Color Picker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Color Picker
import 'package:flutter/material.dart';

class ColorPicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Color Picker',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'slider-input',
    name: 'Slider Input',
    slug: 'slider-input',
    category: 'inputs',
    description: 'Range slider',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Slider Input
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SliderInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Slider Input</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Slider Input
import 'package:flutter/material.dart';

class SliderInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Slider Input',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'range-slider',
    name: 'Range Slider',
    slug: 'range-slider',
    category: 'inputs',
    description: 'Dual thumb slider',
    tags: ['inputs', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Range Slider
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RangeSlider() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Range Slider</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Range Slider
import 'package:flutter/material.dart';

class RangeSlider extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Range Slider',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'switch-toggle',
    name: 'Switch Toggle',
    slug: 'switch-toggle',
    category: 'inputs',
    description: 'On/off switch',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Switch Toggle
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SwitchToggle() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Switch Toggle</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Switch Toggle
import 'package:flutter/material.dart';

class SwitchToggle extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Switch Toggle',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    slug: 'checkbox',
    category: 'inputs',
    description: 'Single checkbox',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Checkbox
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Checkbox() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Checkbox</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Checkbox
import 'package:flutter/material.dart';

class Checkbox extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Checkbox',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'basic-card',
    name: 'Basic Card',
    slug: 'basic-card',
    category: 'cards',
    description: 'Simple container',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Basic Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BasicCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Basic Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Basic Card
import 'package:flutter/material.dart';

class BasicCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Basic Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'image-card',
    name: 'Image Card',
    slug: 'image-card',
    category: 'cards',
    description: 'Card with image header',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Image Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ImageCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Image Card
import 'package:flutter/material.dart';

class ImageCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Image Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'horizontal-card',
    name: 'Horizontal Card',
    slug: 'horizontal-card',
    category: 'cards',
    description: 'Image left, content right',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Horizontal Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HorizontalCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Horizontal Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Horizontal Card
import 'package:flutter/material.dart';

class HorizontalCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Horizontal Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'product-card',
    name: 'Product Card',
    slug: 'product-card',
    category: 'cards',
    description: 'E-commerce product',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Product Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Product Card
import 'package:flutter/material.dart';

class ProductCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Product Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-card',
    name: 'Profile Card',
    slug: 'profile-card',
    category: 'cards',
    description: 'User profile display',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Card
import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'stats-card',
    name: 'Stats Card',
    slug: 'stats-card',
    category: 'cards',
    description: 'Statistics display',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Stats Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatsCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stats Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Stats Card
import 'package:flutter/material.dart';

class StatsCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Stats Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'pricing-card',
    name: 'Pricing Card',
    slug: 'pricing-card',
    category: 'cards',
    description: 'Pricing table item',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Pricing Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PricingCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pricing Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Pricing Card
import 'package:flutter/material.dart';

class PricingCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Pricing Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'article-card',
    name: 'Article Card',
    slug: 'article-card',
    category: 'cards',
    description: 'Blog/news article',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Article Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ArticleCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Article Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Article Card
import 'package:flutter/material.dart';

class ArticleCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Article Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-card',
    name: 'Media Card',
    slug: 'media-card',
    category: 'cards',
    description: 'Video/audio card',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Card
import 'package:flutter/material.dart';

class MediaCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'interactive-card',
    name: 'Interactive Card',
    slug: 'interactive-card',
    category: 'cards',
    description: 'Swipeable/tappable',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Interactive Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InteractiveCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Interactive Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Interactive Card
import 'package:flutter/material.dart';

class InteractiveCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Interactive Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'expandable-card',
    name: 'Expandable Card',
    slug: 'expandable-card',
    category: 'cards',
    description: 'Collapsible content',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Expandable Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpandableCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expandable Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Expandable Card
import 'package:flutter/material.dart';

class ExpandableCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Expandable Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'flip-card',
    name: 'Flip Card',
    slug: 'flip-card',
    category: 'cards',
    description: 'Front/back flip animation',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Flip Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FlipCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Flip Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Flip Card
import 'package:flutter/material.dart';

class FlipCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Flip Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'material-card',
    name: 'Material Card',
    slug: 'material-card',
    category: 'cards',
    description: 'Standard card',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Material Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MaterialCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Material Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Material Card
import 'package:flutter/material.dart';

class MaterialCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Material Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'elevated-card',
    name: 'Elevated Card',
    slug: 'elevated-card',
    category: 'cards',
    description: 'With shadow',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Elevated Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ElevatedCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Elevated Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Elevated Card
import 'package:flutter/material.dart';

class ElevatedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Elevated Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'outlined-card',
    name: 'Outlined Card',
    slug: 'outlined-card',
    category: 'cards',
    description: 'Border only',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Outlined Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OutlinedCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Outlined Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Outlined Card
import 'package:flutter/material.dart';

class OutlinedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Outlined Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'interactive-card',
    name: 'Interactive Card',
    slug: 'interactive-card',
    category: 'cards',
    description: 'Gesture handlers',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Interactive Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InteractiveCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Interactive Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Interactive Card
import 'package:flutter/material.dart';

class InteractiveCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Interactive Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'glassmorphic-card',
    name: 'Glassmorphic Card',
    slug: 'glassmorphic-card',
    category: 'cards',
    description: 'Frosted glass',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Glassmorphic Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GlassmorphicCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Glassmorphic Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Glassmorphic Card
import 'package:flutter/material.dart';

class GlassmorphicCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Glassmorphic Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'neumorphic-card',
    name: 'Neumorphic Card',
    slug: 'neumorphic-card',
    category: 'cards',
    description: 'Soft UI',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Neumorphic Card
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NeumorphicCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Neumorphic Card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Neumorphic Card
import 'package:flutter/material.dart';

class NeumorphicCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Neumorphic Card',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    slug: 'alert-dialog',
    category: 'modals',
    description: 'Simple alert',
    tags: ['modals', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Alert Dialog
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlertDialog() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alert Dialog</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Alert Dialog
import 'package:flutter/material.dart';

class AlertDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Alert Dialog',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'confirm-dialog',
    name: 'Confirm Dialog',
    slug: 'confirm-dialog',
    category: 'modals',
    description: 'Yes/No confirmation',
    tags: ['modals', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Confirm Dialog
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConfirmDialog() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Confirm Dialog</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Confirm Dialog
import 'package:flutter/material.dart';

class ConfirmDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Confirm Dialog',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'bottom-sheet',
    name: 'Bottom Sheet',
    slug: 'bottom-sheet',
    category: 'modals',
    description: 'Slides from bottom',
    tags: ['modals', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Bottom Sheet
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BottomSheet() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bottom Sheet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Bottom Sheet
import 'package:flutter/material.dart';

class BottomSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Bottom Sheet',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'action-sheet',
    name: 'Action Sheet',
    slug: 'action-sheet',
    category: 'modals',
    description: 'iOS-style actions',
    tags: ['modals', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Action Sheet
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActionSheet() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Action Sheet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Action Sheet
import 'package:flutter/material.dart';

class ActionSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Action Sheet',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'modal',
    name: 'Modal',
    slug: 'modal',
    category: 'modals',
    description: 'Full/partial screen overlay',
    tags: ['modals', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Modal
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Modal() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Modal
import 'package:flutter/material.dart';

class Modal extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Modal',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'popup',
    name: 'Popup',
    slug: 'popup',
    category: 'modals',
    description: 'Centered dialog',
    tags: ['modals', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Popup
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Popup() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Popup</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Popup
import 'package:flutter/material.dart';

class Popup extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Popup',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'drawer',
    name: 'Drawer',
    slug: 'drawer',
    category: 'modals',
    description: 'Side menu',
    tags: ['modals', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Drawer
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Drawer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Drawer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Drawer
import 'package:flutter/material.dart';

class Drawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Drawer',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'toast-snackbar',
    name: 'Toast/Snackbar',
    slug: 'toast-snackbar',
    category: 'modals',
    description: 'Brief message',
    tags: ['modals', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Toast/Snackbar
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToastOrSnackbar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Toast/Snackbar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Toast/Snackbar
import 'package:flutter/material.dart';

class ToastOrSnackbar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Toast/Snackbar',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'custom-modal',
    name: 'Custom Modal',
    slug: 'custom-modal',
    category: 'modals',
    description: 'Fully customizable',
    tags: ['modals', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Custom Modal
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CustomModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Custom Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Custom Modal
import 'package:flutter/material.dart';

class CustomModal extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Custom Modal',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-1',
    name: 'Navigation Widget 1',
    slug: 'navigation-widget-1',
    category: 'navigation',
    description: 'A beautiful navigation widget 1 for mobile apps.',
    tags: ['navigation', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Navigation Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 1
import 'package:flutter/material.dart';

class NavigationWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-2',
    name: 'Navigation Widget 2',
    slug: 'navigation-widget-2',
    category: 'navigation',
    description: 'A beautiful navigation widget 2 for mobile apps.',
    tags: ['navigation', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Navigation Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 2
import 'package:flutter/material.dart';

class NavigationWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-3',
    name: 'Navigation Widget 3',
    slug: 'navigation-widget-3',
    category: 'navigation',
    description: 'A beautiful navigation widget 3 for mobile apps.',
    tags: ['navigation', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Navigation Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 3
import 'package:flutter/material.dart';

class NavigationWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-4',
    name: 'Navigation Widget 4',
    slug: 'navigation-widget-4',
    category: 'navigation',
    description: 'A beautiful navigation widget 4 for mobile apps.',
    tags: ['navigation', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Navigation Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 4
import 'package:flutter/material.dart';

class NavigationWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-5',
    name: 'Navigation Widget 5',
    slug: 'navigation-widget-5',
    category: 'navigation',
    description: 'A beautiful navigation widget 5 for mobile apps.',
    tags: ['navigation', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Navigation Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 5
import 'package:flutter/material.dart';

class NavigationWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-6',
    name: 'Navigation Widget 6',
    slug: 'navigation-widget-6',
    category: 'navigation',
    description: 'A beautiful navigation widget 6 for mobile apps.',
    tags: ['navigation', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Navigation Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 6
import 'package:flutter/material.dart';

class NavigationWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-7',
    name: 'Navigation Widget 7',
    slug: 'navigation-widget-7',
    category: 'navigation',
    description: 'A beautiful navigation widget 7 for mobile apps.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Navigation Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 7
import 'package:flutter/material.dart';

class NavigationWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-8',
    name: 'Navigation Widget 8',
    slug: 'navigation-widget-8',
    category: 'navigation',
    description: 'A beautiful navigation widget 8 for mobile apps.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Navigation Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 8
import 'package:flutter/material.dart';

class NavigationWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-9',
    name: 'Navigation Widget 9',
    slug: 'navigation-widget-9',
    category: 'navigation',
    description: 'A beautiful navigation widget 9 for mobile apps.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Navigation Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 9
import 'package:flutter/material.dart';

class NavigationWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-10',
    name: 'Navigation Widget 10',
    slug: 'navigation-widget-10',
    category: 'navigation',
    description: 'A beautiful navigation widget 10 for mobile apps.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Navigation Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 10
import 'package:flutter/material.dart';

class NavigationWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-11',
    name: 'Navigation Widget 11',
    slug: 'navigation-widget-11',
    category: 'navigation',
    description: 'A beautiful navigation widget 11 for mobile apps.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Navigation Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 11
import 'package:flutter/material.dart';

class NavigationWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-12',
    name: 'Navigation Widget 12',
    slug: 'navigation-widget-12',
    category: 'navigation',
    description: 'A beautiful navigation widget 12 for mobile apps.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Navigation Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 12
import 'package:flutter/material.dart';

class NavigationWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-13',
    name: 'Navigation Widget 13',
    slug: 'navigation-widget-13',
    category: 'navigation',
    description: 'A beautiful navigation widget 13 for mobile apps.',
    tags: ['navigation', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Navigation Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 13
import 'package:flutter/material.dart';

class NavigationWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-14',
    name: 'Navigation Widget 14',
    slug: 'navigation-widget-14',
    category: 'navigation',
    description: 'A beautiful navigation widget 14 for mobile apps.',
    tags: ['navigation', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Navigation Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 14
import 'package:flutter/material.dart';

class NavigationWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-15',
    name: 'Navigation Widget 15',
    slug: 'navigation-widget-15',
    category: 'navigation',
    description: 'A beautiful navigation widget 15 for mobile apps.',
    tags: ['navigation', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Navigation Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 15
import 'package:flutter/material.dart';

class NavigationWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-16',
    name: 'Navigation Widget 16',
    slug: 'navigation-widget-16',
    category: 'navigation',
    description: 'A beautiful navigation widget 16 for mobile apps.',
    tags: ['navigation', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Navigation Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 16
import 'package:flutter/material.dart';

class NavigationWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-17',
    name: 'Navigation Widget 17',
    slug: 'navigation-widget-17',
    category: 'navigation',
    description: 'A beautiful navigation widget 17 for mobile apps.',
    tags: ['navigation', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Navigation Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 17
import 'package:flutter/material.dart';

class NavigationWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'navigation-widget-18',
    name: 'Navigation Widget 18',
    slug: 'navigation-widget-18',
    category: 'navigation',
    description: 'A beautiful navigation widget 18 for mobile apps.',
    tags: ['navigation', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Navigation Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavigationWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Navigation Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Navigation Widget 18
import 'package:flutter/material.dart';

class NavigationWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Navigation Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-1',
    name: 'Animations Widget 1',
    slug: 'animations-widget-1',
    category: 'animations',
    description: 'A beautiful animations widget 1 for mobile apps.',
    tags: ['animations', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Animations Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 1
import 'package:flutter/material.dart';

class AnimationsWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-2',
    name: 'Animations Widget 2',
    slug: 'animations-widget-2',
    category: 'animations',
    description: 'A beautiful animations widget 2 for mobile apps.',
    tags: ['animations', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Animations Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 2
import 'package:flutter/material.dart';

class AnimationsWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-3',
    name: 'Animations Widget 3',
    slug: 'animations-widget-3',
    category: 'animations',
    description: 'A beautiful animations widget 3 for mobile apps.',
    tags: ['animations', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Animations Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 3
import 'package:flutter/material.dart';

class AnimationsWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-4',
    name: 'Animations Widget 4',
    slug: 'animations-widget-4',
    category: 'animations',
    description: 'A beautiful animations widget 4 for mobile apps.',
    tags: ['animations', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Animations Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 4
import 'package:flutter/material.dart';

class AnimationsWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-5',
    name: 'Animations Widget 5',
    slug: 'animations-widget-5',
    category: 'animations',
    description: 'A beautiful animations widget 5 for mobile apps.',
    tags: ['animations', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Animations Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 5
import 'package:flutter/material.dart';

class AnimationsWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-6',
    name: 'Animations Widget 6',
    slug: 'animations-widget-6',
    category: 'animations',
    description: 'A beautiful animations widget 6 for mobile apps.',
    tags: ['animations', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Animations Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 6
import 'package:flutter/material.dart';

class AnimationsWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-7',
    name: 'Animations Widget 7',
    slug: 'animations-widget-7',
    category: 'animations',
    description: 'A beautiful animations widget 7 for mobile apps.',
    tags: ['animations', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Animations Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 7
import 'package:flutter/material.dart';

class AnimationsWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-8',
    name: 'Animations Widget 8',
    slug: 'animations-widget-8',
    category: 'animations',
    description: 'A beautiful animations widget 8 for mobile apps.',
    tags: ['animations', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Animations Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 8
import 'package:flutter/material.dart';

class AnimationsWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-9',
    name: 'Animations Widget 9',
    slug: 'animations-widget-9',
    category: 'animations',
    description: 'A beautiful animations widget 9 for mobile apps.',
    tags: ['animations', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Animations Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 9
import 'package:flutter/material.dart';

class AnimationsWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-10',
    name: 'Animations Widget 10',
    slug: 'animations-widget-10',
    category: 'animations',
    description: 'A beautiful animations widget 10 for mobile apps.',
    tags: ['animations', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Animations Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 10
import 'package:flutter/material.dart';

class AnimationsWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-11',
    name: 'Animations Widget 11',
    slug: 'animations-widget-11',
    category: 'animations',
    description: 'A beautiful animations widget 11 for mobile apps.',
    tags: ['animations', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Animations Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 11
import 'package:flutter/material.dart';

class AnimationsWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-12',
    name: 'Animations Widget 12',
    slug: 'animations-widget-12',
    category: 'animations',
    description: 'A beautiful animations widget 12 for mobile apps.',
    tags: ['animations', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Animations Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 12
import 'package:flutter/material.dart';

class AnimationsWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-13',
    name: 'Animations Widget 13',
    slug: 'animations-widget-13',
    category: 'animations',
    description: 'A beautiful animations widget 13 for mobile apps.',
    tags: ['animations', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Animations Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 13
import 'package:flutter/material.dart';

class AnimationsWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-14',
    name: 'Animations Widget 14',
    slug: 'animations-widget-14',
    category: 'animations',
    description: 'A beautiful animations widget 14 for mobile apps.',
    tags: ['animations', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Animations Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 14
import 'package:flutter/material.dart';

class AnimationsWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-15',
    name: 'Animations Widget 15',
    slug: 'animations-widget-15',
    category: 'animations',
    description: 'A beautiful animations widget 15 for mobile apps.',
    tags: ['animations', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Animations Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 15
import 'package:flutter/material.dart';

class AnimationsWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-16',
    name: 'Animations Widget 16',
    slug: 'animations-widget-16',
    category: 'animations',
    description: 'A beautiful animations widget 16 for mobile apps.',
    tags: ['animations', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Animations Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 16
import 'package:flutter/material.dart';

class AnimationsWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-17',
    name: 'Animations Widget 17',
    slug: 'animations-widget-17',
    category: 'animations',
    description: 'A beautiful animations widget 17 for mobile apps.',
    tags: ['animations', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Animations Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 17
import 'package:flutter/material.dart';

class AnimationsWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'animations-widget-18',
    name: 'Animations Widget 18',
    slug: 'animations-widget-18',
    category: 'animations',
    description: 'A beautiful animations widget 18 for mobile apps.',
    tags: ['animations', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Animations Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnimationsWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Animations Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Animations Widget 18
import 'package:flutter/material.dart';

class AnimationsWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Animations Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-1',
    name: 'Forms Widget 1',
    slug: 'forms-widget-1',
    category: 'forms',
    description: 'A beautiful forms widget 1 for mobile apps.',
    tags: ['forms', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Forms Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 1
import 'package:flutter/material.dart';

class FormsWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-2',
    name: 'Forms Widget 2',
    slug: 'forms-widget-2',
    category: 'forms',
    description: 'A beautiful forms widget 2 for mobile apps.',
    tags: ['forms', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Forms Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 2
import 'package:flutter/material.dart';

class FormsWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-3',
    name: 'Forms Widget 3',
    slug: 'forms-widget-3',
    category: 'forms',
    description: 'A beautiful forms widget 3 for mobile apps.',
    tags: ['forms', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Forms Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 3
import 'package:flutter/material.dart';

class FormsWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-4',
    name: 'Forms Widget 4',
    slug: 'forms-widget-4',
    category: 'forms',
    description: 'A beautiful forms widget 4 for mobile apps.',
    tags: ['forms', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Forms Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 4
import 'package:flutter/material.dart';

class FormsWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-5',
    name: 'Forms Widget 5',
    slug: 'forms-widget-5',
    category: 'forms',
    description: 'A beautiful forms widget 5 for mobile apps.',
    tags: ['forms', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Forms Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 5
import 'package:flutter/material.dart';

class FormsWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-6',
    name: 'Forms Widget 6',
    slug: 'forms-widget-6',
    category: 'forms',
    description: 'A beautiful forms widget 6 for mobile apps.',
    tags: ['forms', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Forms Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 6
import 'package:flutter/material.dart';

class FormsWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-7',
    name: 'Forms Widget 7',
    slug: 'forms-widget-7',
    category: 'forms',
    description: 'A beautiful forms widget 7 for mobile apps.',
    tags: ['forms', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Forms Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 7
import 'package:flutter/material.dart';

class FormsWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-8',
    name: 'Forms Widget 8',
    slug: 'forms-widget-8',
    category: 'forms',
    description: 'A beautiful forms widget 8 for mobile apps.',
    tags: ['forms', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Forms Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 8
import 'package:flutter/material.dart';

class FormsWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-9',
    name: 'Forms Widget 9',
    slug: 'forms-widget-9',
    category: 'forms',
    description: 'A beautiful forms widget 9 for mobile apps.',
    tags: ['forms', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Forms Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 9
import 'package:flutter/material.dart';

class FormsWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-10',
    name: 'Forms Widget 10',
    slug: 'forms-widget-10',
    category: 'forms',
    description: 'A beautiful forms widget 10 for mobile apps.',
    tags: ['forms', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Forms Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 10
import 'package:flutter/material.dart';

class FormsWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-11',
    name: 'Forms Widget 11',
    slug: 'forms-widget-11',
    category: 'forms',
    description: 'A beautiful forms widget 11 for mobile apps.',
    tags: ['forms', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Forms Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 11
import 'package:flutter/material.dart';

class FormsWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-12',
    name: 'Forms Widget 12',
    slug: 'forms-widget-12',
    category: 'forms',
    description: 'A beautiful forms widget 12 for mobile apps.',
    tags: ['forms', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Forms Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 12
import 'package:flutter/material.dart';

class FormsWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-13',
    name: 'Forms Widget 13',
    slug: 'forms-widget-13',
    category: 'forms',
    description: 'A beautiful forms widget 13 for mobile apps.',
    tags: ['forms', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Forms Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 13
import 'package:flutter/material.dart';

class FormsWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-14',
    name: 'Forms Widget 14',
    slug: 'forms-widget-14',
    category: 'forms',
    description: 'A beautiful forms widget 14 for mobile apps.',
    tags: ['forms', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Forms Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 14
import 'package:flutter/material.dart';

class FormsWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-15',
    name: 'Forms Widget 15',
    slug: 'forms-widget-15',
    category: 'forms',
    description: 'A beautiful forms widget 15 for mobile apps.',
    tags: ['forms', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Forms Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 15
import 'package:flutter/material.dart';

class FormsWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-16',
    name: 'Forms Widget 16',
    slug: 'forms-widget-16',
    category: 'forms',
    description: 'A beautiful forms widget 16 for mobile apps.',
    tags: ['forms', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Forms Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 16
import 'package:flutter/material.dart';

class FormsWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-17',
    name: 'Forms Widget 17',
    slug: 'forms-widget-17',
    category: 'forms',
    description: 'A beautiful forms widget 17 for mobile apps.',
    tags: ['forms', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Forms Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 17
import 'package:flutter/material.dart';

class FormsWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'forms-widget-18',
    name: 'Forms Widget 18',
    slug: 'forms-widget-18',
    category: 'forms',
    description: 'A beautiful forms widget 18 for mobile apps.',
    tags: ['forms', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Forms Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FormsWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Forms Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Forms Widget 18
import 'package:flutter/material.dart';

class FormsWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Forms Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-1',
    name: 'Charts Widget 1',
    slug: 'charts-widget-1',
    category: 'charts',
    description: 'A beautiful charts widget 1 for mobile apps.',
    tags: ['charts', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Charts Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 1
import 'package:flutter/material.dart';

class ChartsWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-2',
    name: 'Charts Widget 2',
    slug: 'charts-widget-2',
    category: 'charts',
    description: 'A beautiful charts widget 2 for mobile apps.',
    tags: ['charts', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Charts Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 2
import 'package:flutter/material.dart';

class ChartsWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-3',
    name: 'Charts Widget 3',
    slug: 'charts-widget-3',
    category: 'charts',
    description: 'A beautiful charts widget 3 for mobile apps.',
    tags: ['charts', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Charts Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 3
import 'package:flutter/material.dart';

class ChartsWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-4',
    name: 'Charts Widget 4',
    slug: 'charts-widget-4',
    category: 'charts',
    description: 'A beautiful charts widget 4 for mobile apps.',
    tags: ['charts', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Charts Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 4
import 'package:flutter/material.dart';

class ChartsWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-5',
    name: 'Charts Widget 5',
    slug: 'charts-widget-5',
    category: 'charts',
    description: 'A beautiful charts widget 5 for mobile apps.',
    tags: ['charts', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Charts Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 5
import 'package:flutter/material.dart';

class ChartsWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-6',
    name: 'Charts Widget 6',
    slug: 'charts-widget-6',
    category: 'charts',
    description: 'A beautiful charts widget 6 for mobile apps.',
    tags: ['charts', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Charts Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 6
import 'package:flutter/material.dart';

class ChartsWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-7',
    name: 'Charts Widget 7',
    slug: 'charts-widget-7',
    category: 'charts',
    description: 'A beautiful charts widget 7 for mobile apps.',
    tags: ['charts', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Charts Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 7
import 'package:flutter/material.dart';

class ChartsWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-8',
    name: 'Charts Widget 8',
    slug: 'charts-widget-8',
    category: 'charts',
    description: 'A beautiful charts widget 8 for mobile apps.',
    tags: ['charts', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Charts Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 8
import 'package:flutter/material.dart';

class ChartsWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-9',
    name: 'Charts Widget 9',
    slug: 'charts-widget-9',
    category: 'charts',
    description: 'A beautiful charts widget 9 for mobile apps.',
    tags: ['charts', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Charts Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 9
import 'package:flutter/material.dart';

class ChartsWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-10',
    name: 'Charts Widget 10',
    slug: 'charts-widget-10',
    category: 'charts',
    description: 'A beautiful charts widget 10 for mobile apps.',
    tags: ['charts', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Charts Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 10
import 'package:flutter/material.dart';

class ChartsWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-11',
    name: 'Charts Widget 11',
    slug: 'charts-widget-11',
    category: 'charts',
    description: 'A beautiful charts widget 11 for mobile apps.',
    tags: ['charts', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Charts Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 11
import 'package:flutter/material.dart';

class ChartsWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-12',
    name: 'Charts Widget 12',
    slug: 'charts-widget-12',
    category: 'charts',
    description: 'A beautiful charts widget 12 for mobile apps.',
    tags: ['charts', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Charts Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 12
import 'package:flutter/material.dart';

class ChartsWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-13',
    name: 'Charts Widget 13',
    slug: 'charts-widget-13',
    category: 'charts',
    description: 'A beautiful charts widget 13 for mobile apps.',
    tags: ['charts', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Charts Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 13
import 'package:flutter/material.dart';

class ChartsWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-14',
    name: 'Charts Widget 14',
    slug: 'charts-widget-14',
    category: 'charts',
    description: 'A beautiful charts widget 14 for mobile apps.',
    tags: ['charts', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Charts Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 14
import 'package:flutter/material.dart';

class ChartsWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-15',
    name: 'Charts Widget 15',
    slug: 'charts-widget-15',
    category: 'charts',
    description: 'A beautiful charts widget 15 for mobile apps.',
    tags: ['charts', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Charts Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 15
import 'package:flutter/material.dart';

class ChartsWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-16',
    name: 'Charts Widget 16',
    slug: 'charts-widget-16',
    category: 'charts',
    description: 'A beautiful charts widget 16 for mobile apps.',
    tags: ['charts', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Charts Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 16
import 'package:flutter/material.dart';

class ChartsWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-17',
    name: 'Charts Widget 17',
    slug: 'charts-widget-17',
    category: 'charts',
    description: 'A beautiful charts widget 17 for mobile apps.',
    tags: ['charts', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Charts Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 17
import 'package:flutter/material.dart';

class ChartsWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'charts-widget-18',
    name: 'Charts Widget 18',
    slug: 'charts-widget-18',
    category: 'charts',
    description: 'A beautiful charts widget 18 for mobile apps.',
    tags: ['charts', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Charts Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChartsWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Charts Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Charts Widget 18
import 'package:flutter/material.dart';

class ChartsWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Charts Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-1',
    name: 'Media Widget 1',
    slug: 'media-widget-1',
    category: 'media',
    description: 'A beautiful media widget 1 for mobile apps.',
    tags: ['media', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Media Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 1
import 'package:flutter/material.dart';

class MediaWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-2',
    name: 'Media Widget 2',
    slug: 'media-widget-2',
    category: 'media',
    description: 'A beautiful media widget 2 for mobile apps.',
    tags: ['media', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Media Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 2
import 'package:flutter/material.dart';

class MediaWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-3',
    name: 'Media Widget 3',
    slug: 'media-widget-3',
    category: 'media',
    description: 'A beautiful media widget 3 for mobile apps.',
    tags: ['media', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Media Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 3
import 'package:flutter/material.dart';

class MediaWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-4',
    name: 'Media Widget 4',
    slug: 'media-widget-4',
    category: 'media',
    description: 'A beautiful media widget 4 for mobile apps.',
    tags: ['media', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Media Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 4
import 'package:flutter/material.dart';

class MediaWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-5',
    name: 'Media Widget 5',
    slug: 'media-widget-5',
    category: 'media',
    description: 'A beautiful media widget 5 for mobile apps.',
    tags: ['media', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Media Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 5
import 'package:flutter/material.dart';

class MediaWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-6',
    name: 'Media Widget 6',
    slug: 'media-widget-6',
    category: 'media',
    description: 'A beautiful media widget 6 for mobile apps.',
    tags: ['media', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Media Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 6
import 'package:flutter/material.dart';

class MediaWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-7',
    name: 'Media Widget 7',
    slug: 'media-widget-7',
    category: 'media',
    description: 'A beautiful media widget 7 for mobile apps.',
    tags: ['media', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 7
import 'package:flutter/material.dart';

class MediaWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-8',
    name: 'Media Widget 8',
    slug: 'media-widget-8',
    category: 'media',
    description: 'A beautiful media widget 8 for mobile apps.',
    tags: ['media', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 8
import 'package:flutter/material.dart';

class MediaWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-9',
    name: 'Media Widget 9',
    slug: 'media-widget-9',
    category: 'media',
    description: 'A beautiful media widget 9 for mobile apps.',
    tags: ['media', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 9
import 'package:flutter/material.dart';

class MediaWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-10',
    name: 'Media Widget 10',
    slug: 'media-widget-10',
    category: 'media',
    description: 'A beautiful media widget 10 for mobile apps.',
    tags: ['media', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 10
import 'package:flutter/material.dart';

class MediaWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-11',
    name: 'Media Widget 11',
    slug: 'media-widget-11',
    category: 'media',
    description: 'A beautiful media widget 11 for mobile apps.',
    tags: ['media', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 11
import 'package:flutter/material.dart';

class MediaWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-12',
    name: 'Media Widget 12',
    slug: 'media-widget-12',
    category: 'media',
    description: 'A beautiful media widget 12 for mobile apps.',
    tags: ['media', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Media Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 12
import 'package:flutter/material.dart';

class MediaWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-13',
    name: 'Media Widget 13',
    slug: 'media-widget-13',
    category: 'media',
    description: 'A beautiful media widget 13 for mobile apps.',
    tags: ['media', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Media Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 13
import 'package:flutter/material.dart';

class MediaWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-14',
    name: 'Media Widget 14',
    slug: 'media-widget-14',
    category: 'media',
    description: 'A beautiful media widget 14 for mobile apps.',
    tags: ['media', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Media Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 14
import 'package:flutter/material.dart';

class MediaWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-15',
    name: 'Media Widget 15',
    slug: 'media-widget-15',
    category: 'media',
    description: 'A beautiful media widget 15 for mobile apps.',
    tags: ['media', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Media Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 15
import 'package:flutter/material.dart';

class MediaWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-16',
    name: 'Media Widget 16',
    slug: 'media-widget-16',
    category: 'media',
    description: 'A beautiful media widget 16 for mobile apps.',
    tags: ['media', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Media Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 16
import 'package:flutter/material.dart';

class MediaWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-17',
    name: 'Media Widget 17',
    slug: 'media-widget-17',
    category: 'media',
    description: 'A beautiful media widget 17 for mobile apps.',
    tags: ['media', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Media Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 17
import 'package:flutter/material.dart';

class MediaWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'media-widget-18',
    name: 'Media Widget 18',
    slug: 'media-widget-18',
    category: 'media',
    description: 'A beautiful media widget 18 for mobile apps.',
    tags: ['media', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Media Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MediaWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Media Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Media Widget 18
import 'package:flutter/material.dart';

class MediaWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Media Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-1',
    name: 'Social Widget 1',
    slug: 'social-widget-1',
    category: 'social',
    description: 'A beautiful social widget 1 for mobile apps.',
    tags: ['social', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Social Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 1
import 'package:flutter/material.dart';

class SocialWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-2',
    name: 'Social Widget 2',
    slug: 'social-widget-2',
    category: 'social',
    description: 'A beautiful social widget 2 for mobile apps.',
    tags: ['social', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Social Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 2
import 'package:flutter/material.dart';

class SocialWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-3',
    name: 'Social Widget 3',
    slug: 'social-widget-3',
    category: 'social',
    description: 'A beautiful social widget 3 for mobile apps.',
    tags: ['social', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Social Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 3
import 'package:flutter/material.dart';

class SocialWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-4',
    name: 'Social Widget 4',
    slug: 'social-widget-4',
    category: 'social',
    description: 'A beautiful social widget 4 for mobile apps.',
    tags: ['social', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Social Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 4
import 'package:flutter/material.dart';

class SocialWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-5',
    name: 'Social Widget 5',
    slug: 'social-widget-5',
    category: 'social',
    description: 'A beautiful social widget 5 for mobile apps.',
    tags: ['social', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Social Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 5
import 'package:flutter/material.dart';

class SocialWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-6',
    name: 'Social Widget 6',
    slug: 'social-widget-6',
    category: 'social',
    description: 'A beautiful social widget 6 for mobile apps.',
    tags: ['social', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Social Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 6
import 'package:flutter/material.dart';

class SocialWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-7',
    name: 'Social Widget 7',
    slug: 'social-widget-7',
    category: 'social',
    description: 'A beautiful social widget 7 for mobile apps.',
    tags: ['social', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Social Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 7
import 'package:flutter/material.dart';

class SocialWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-8',
    name: 'Social Widget 8',
    slug: 'social-widget-8',
    category: 'social',
    description: 'A beautiful social widget 8 for mobile apps.',
    tags: ['social', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Social Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 8
import 'package:flutter/material.dart';

class SocialWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-9',
    name: 'Social Widget 9',
    slug: 'social-widget-9',
    category: 'social',
    description: 'A beautiful social widget 9 for mobile apps.',
    tags: ['social', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Social Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 9
import 'package:flutter/material.dart';

class SocialWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-10',
    name: 'Social Widget 10',
    slug: 'social-widget-10',
    category: 'social',
    description: 'A beautiful social widget 10 for mobile apps.',
    tags: ['social', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Social Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 10
import 'package:flutter/material.dart';

class SocialWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-11',
    name: 'Social Widget 11',
    slug: 'social-widget-11',
    category: 'social',
    description: 'A beautiful social widget 11 for mobile apps.',
    tags: ['social', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Social Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 11
import 'package:flutter/material.dart';

class SocialWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-12',
    name: 'Social Widget 12',
    slug: 'social-widget-12',
    category: 'social',
    description: 'A beautiful social widget 12 for mobile apps.',
    tags: ['social', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Social Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 12
import 'package:flutter/material.dart';

class SocialWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-13',
    name: 'Social Widget 13',
    slug: 'social-widget-13',
    category: 'social',
    description: 'A beautiful social widget 13 for mobile apps.',
    tags: ['social', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Social Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 13
import 'package:flutter/material.dart';

class SocialWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-14',
    name: 'Social Widget 14',
    slug: 'social-widget-14',
    category: 'social',
    description: 'A beautiful social widget 14 for mobile apps.',
    tags: ['social', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Social Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 14
import 'package:flutter/material.dart';

class SocialWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-15',
    name: 'Social Widget 15',
    slug: 'social-widget-15',
    category: 'social',
    description: 'A beautiful social widget 15 for mobile apps.',
    tags: ['social', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Social Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 15
import 'package:flutter/material.dart';

class SocialWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-16',
    name: 'Social Widget 16',
    slug: 'social-widget-16',
    category: 'social',
    description: 'A beautiful social widget 16 for mobile apps.',
    tags: ['social', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Social Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 16
import 'package:flutter/material.dart';

class SocialWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-17',
    name: 'Social Widget 17',
    slug: 'social-widget-17',
    category: 'social',
    description: 'A beautiful social widget 17 for mobile apps.',
    tags: ['social', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Social Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 17
import 'package:flutter/material.dart';

class SocialWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'social-widget-18',
    name: 'Social Widget 18',
    slug: 'social-widget-18',
    category: 'social',
    description: 'A beautiful social widget 18 for mobile apps.',
    tags: ['social', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Social Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SocialWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Social Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Social Widget 18
import 'package:flutter/material.dart';

class SocialWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Social Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-1',
    name: 'Ecommerce Widget 1',
    slug: 'ecommerce-widget-1',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 1 for mobile apps.',
    tags: ['ecommerce', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 1
import 'package:flutter/material.dart';

class EcommerceWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-2',
    name: 'Ecommerce Widget 2',
    slug: 'ecommerce-widget-2',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 2 for mobile apps.',
    tags: ['ecommerce', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 2
import 'package:flutter/material.dart';

class EcommerceWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-3',
    name: 'Ecommerce Widget 3',
    slug: 'ecommerce-widget-3',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 3 for mobile apps.',
    tags: ['ecommerce', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 3
import 'package:flutter/material.dart';

class EcommerceWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-4',
    name: 'Ecommerce Widget 4',
    slug: 'ecommerce-widget-4',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 4 for mobile apps.',
    tags: ['ecommerce', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 4
import 'package:flutter/material.dart';

class EcommerceWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-5',
    name: 'Ecommerce Widget 5',
    slug: 'ecommerce-widget-5',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 5 for mobile apps.',
    tags: ['ecommerce', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 5
import 'package:flutter/material.dart';

class EcommerceWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-6',
    name: 'Ecommerce Widget 6',
    slug: 'ecommerce-widget-6',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 6 for mobile apps.',
    tags: ['ecommerce', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 6
import 'package:flutter/material.dart';

class EcommerceWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-7',
    name: 'Ecommerce Widget 7',
    slug: 'ecommerce-widget-7',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 7 for mobile apps.',
    tags: ['ecommerce', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 7
import 'package:flutter/material.dart';

class EcommerceWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-8',
    name: 'Ecommerce Widget 8',
    slug: 'ecommerce-widget-8',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 8 for mobile apps.',
    tags: ['ecommerce', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 8
import 'package:flutter/material.dart';

class EcommerceWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-9',
    name: 'Ecommerce Widget 9',
    slug: 'ecommerce-widget-9',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 9 for mobile apps.',
    tags: ['ecommerce', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 9
import 'package:flutter/material.dart';

class EcommerceWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-10',
    name: 'Ecommerce Widget 10',
    slug: 'ecommerce-widget-10',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 10 for mobile apps.',
    tags: ['ecommerce', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 10
import 'package:flutter/material.dart';

class EcommerceWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-11',
    name: 'Ecommerce Widget 11',
    slug: 'ecommerce-widget-11',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 11 for mobile apps.',
    tags: ['ecommerce', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 11
import 'package:flutter/material.dart';

class EcommerceWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-12',
    name: 'Ecommerce Widget 12',
    slug: 'ecommerce-widget-12',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 12 for mobile apps.',
    tags: ['ecommerce', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 12
import 'package:flutter/material.dart';

class EcommerceWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-13',
    name: 'Ecommerce Widget 13',
    slug: 'ecommerce-widget-13',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 13 for mobile apps.',
    tags: ['ecommerce', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 13
import 'package:flutter/material.dart';

class EcommerceWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-14',
    name: 'Ecommerce Widget 14',
    slug: 'ecommerce-widget-14',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 14 for mobile apps.',
    tags: ['ecommerce', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 14
import 'package:flutter/material.dart';

class EcommerceWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-15',
    name: 'Ecommerce Widget 15',
    slug: 'ecommerce-widget-15',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 15 for mobile apps.',
    tags: ['ecommerce', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 15
import 'package:flutter/material.dart';

class EcommerceWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-16',
    name: 'Ecommerce Widget 16',
    slug: 'ecommerce-widget-16',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 16 for mobile apps.',
    tags: ['ecommerce', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 16
import 'package:flutter/material.dart';

class EcommerceWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-17',
    name: 'Ecommerce Widget 17',
    slug: 'ecommerce-widget-17',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 17 for mobile apps.',
    tags: ['ecommerce', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 17
import 'package:flutter/material.dart';

class EcommerceWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'ecommerce-widget-18',
    name: 'Ecommerce Widget 18',
    slug: 'ecommerce-widget-18',
    category: 'ecommerce',
    description: 'A beautiful ecommerce widget 18 for mobile apps.',
    tags: ['ecommerce', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Ecommerce Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EcommerceWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ecommerce Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Ecommerce Widget 18
import 'package:flutter/material.dart';

class EcommerceWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Ecommerce Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-1',
    name: 'Profile Widget 1',
    slug: 'profile-widget-1',
    category: 'profile',
    description: 'A beautiful profile widget 1 for mobile apps.',
    tags: ['profile', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Profile Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 1
import 'package:flutter/material.dart';

class ProfileWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-2',
    name: 'Profile Widget 2',
    slug: 'profile-widget-2',
    category: 'profile',
    description: 'A beautiful profile widget 2 for mobile apps.',
    tags: ['profile', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Profile Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 2
import 'package:flutter/material.dart';

class ProfileWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-3',
    name: 'Profile Widget 3',
    slug: 'profile-widget-3',
    category: 'profile',
    description: 'A beautiful profile widget 3 for mobile apps.',
    tags: ['profile', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Profile Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 3
import 'package:flutter/material.dart';

class ProfileWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-4',
    name: 'Profile Widget 4',
    slug: 'profile-widget-4',
    category: 'profile',
    description: 'A beautiful profile widget 4 for mobile apps.',
    tags: ['profile', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Profile Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 4
import 'package:flutter/material.dart';

class ProfileWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-5',
    name: 'Profile Widget 5',
    slug: 'profile-widget-5',
    category: 'profile',
    description: 'A beautiful profile widget 5 for mobile apps.',
    tags: ['profile', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Profile Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 5
import 'package:flutter/material.dart';

class ProfileWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-6',
    name: 'Profile Widget 6',
    slug: 'profile-widget-6',
    category: 'profile',
    description: 'A beautiful profile widget 6 for mobile apps.',
    tags: ['profile', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Profile Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 6
import 'package:flutter/material.dart';

class ProfileWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-7',
    name: 'Profile Widget 7',
    slug: 'profile-widget-7',
    category: 'profile',
    description: 'A beautiful profile widget 7 for mobile apps.',
    tags: ['profile', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 7
import 'package:flutter/material.dart';

class ProfileWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-8',
    name: 'Profile Widget 8',
    slug: 'profile-widget-8',
    category: 'profile',
    description: 'A beautiful profile widget 8 for mobile apps.',
    tags: ['profile', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 8
import 'package:flutter/material.dart';

class ProfileWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-9',
    name: 'Profile Widget 9',
    slug: 'profile-widget-9',
    category: 'profile',
    description: 'A beautiful profile widget 9 for mobile apps.',
    tags: ['profile', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 9
import 'package:flutter/material.dart';

class ProfileWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-10',
    name: 'Profile Widget 10',
    slug: 'profile-widget-10',
    category: 'profile',
    description: 'A beautiful profile widget 10 for mobile apps.',
    tags: ['profile', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 10
import 'package:flutter/material.dart';

class ProfileWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-11',
    name: 'Profile Widget 11',
    slug: 'profile-widget-11',
    category: 'profile',
    description: 'A beautiful profile widget 11 for mobile apps.',
    tags: ['profile', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 11
import 'package:flutter/material.dart';

class ProfileWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-12',
    name: 'Profile Widget 12',
    slug: 'profile-widget-12',
    category: 'profile',
    description: 'A beautiful profile widget 12 for mobile apps.',
    tags: ['profile', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Profile Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 12
import 'package:flutter/material.dart';

class ProfileWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-13',
    name: 'Profile Widget 13',
    slug: 'profile-widget-13',
    category: 'profile',
    description: 'A beautiful profile widget 13 for mobile apps.',
    tags: ['profile', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Profile Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 13
import 'package:flutter/material.dart';

class ProfileWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-14',
    name: 'Profile Widget 14',
    slug: 'profile-widget-14',
    category: 'profile',
    description: 'A beautiful profile widget 14 for mobile apps.',
    tags: ['profile', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Profile Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 14
import 'package:flutter/material.dart';

class ProfileWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-15',
    name: 'Profile Widget 15',
    slug: 'profile-widget-15',
    category: 'profile',
    description: 'A beautiful profile widget 15 for mobile apps.',
    tags: ['profile', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Profile Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 15
import 'package:flutter/material.dart';

class ProfileWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-16',
    name: 'Profile Widget 16',
    slug: 'profile-widget-16',
    category: 'profile',
    description: 'A beautiful profile widget 16 for mobile apps.',
    tags: ['profile', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Profile Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 16
import 'package:flutter/material.dart';

class ProfileWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-17',
    name: 'Profile Widget 17',
    slug: 'profile-widget-17',
    category: 'profile',
    description: 'A beautiful profile widget 17 for mobile apps.',
    tags: ['profile', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Profile Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 17
import 'package:flutter/material.dart';

class ProfileWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-widget-18',
    name: 'Profile Widget 18',
    slug: 'profile-widget-18',
    category: 'profile',
    description: 'A beautiful profile widget 18 for mobile apps.',
    tags: ['profile', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Profile Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Profile Widget 18
import 'package:flutter/material.dart';

class ProfileWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Profile Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-1',
    name: 'Notifications Widget 1',
    slug: 'notifications-widget-1',
    category: 'notifications',
    description: 'A beautiful notifications widget 1 for mobile apps.',
    tags: ['notifications', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Notifications Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 1
import 'package:flutter/material.dart';

class NotificationsWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-2',
    name: 'Notifications Widget 2',
    slug: 'notifications-widget-2',
    category: 'notifications',
    description: 'A beautiful notifications widget 2 for mobile apps.',
    tags: ['notifications', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Notifications Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 2
import 'package:flutter/material.dart';

class NotificationsWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-3',
    name: 'Notifications Widget 3',
    slug: 'notifications-widget-3',
    category: 'notifications',
    description: 'A beautiful notifications widget 3 for mobile apps.',
    tags: ['notifications', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Notifications Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 3
import 'package:flutter/material.dart';

class NotificationsWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-4',
    name: 'Notifications Widget 4',
    slug: 'notifications-widget-4',
    category: 'notifications',
    description: 'A beautiful notifications widget 4 for mobile apps.',
    tags: ['notifications', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Notifications Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 4
import 'package:flutter/material.dart';

class NotificationsWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-5',
    name: 'Notifications Widget 5',
    slug: 'notifications-widget-5',
    category: 'notifications',
    description: 'A beautiful notifications widget 5 for mobile apps.',
    tags: ['notifications', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Notifications Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 5
import 'package:flutter/material.dart';

class NotificationsWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-6',
    name: 'Notifications Widget 6',
    slug: 'notifications-widget-6',
    category: 'notifications',
    description: 'A beautiful notifications widget 6 for mobile apps.',
    tags: ['notifications', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Notifications Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 6
import 'package:flutter/material.dart';

class NotificationsWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-7',
    name: 'Notifications Widget 7',
    slug: 'notifications-widget-7',
    category: 'notifications',
    description: 'A beautiful notifications widget 7 for mobile apps.',
    tags: ['notifications', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Notifications Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 7
import 'package:flutter/material.dart';

class NotificationsWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-8',
    name: 'Notifications Widget 8',
    slug: 'notifications-widget-8',
    category: 'notifications',
    description: 'A beautiful notifications widget 8 for mobile apps.',
    tags: ['notifications', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Notifications Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 8
import 'package:flutter/material.dart';

class NotificationsWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-9',
    name: 'Notifications Widget 9',
    slug: 'notifications-widget-9',
    category: 'notifications',
    description: 'A beautiful notifications widget 9 for mobile apps.',
    tags: ['notifications', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Notifications Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 9
import 'package:flutter/material.dart';

class NotificationsWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-10',
    name: 'Notifications Widget 10',
    slug: 'notifications-widget-10',
    category: 'notifications',
    description: 'A beautiful notifications widget 10 for mobile apps.',
    tags: ['notifications', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Notifications Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 10
import 'package:flutter/material.dart';

class NotificationsWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-11',
    name: 'Notifications Widget 11',
    slug: 'notifications-widget-11',
    category: 'notifications',
    description: 'A beautiful notifications widget 11 for mobile apps.',
    tags: ['notifications', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Notifications Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 11
import 'package:flutter/material.dart';

class NotificationsWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-12',
    name: 'Notifications Widget 12',
    slug: 'notifications-widget-12',
    category: 'notifications',
    description: 'A beautiful notifications widget 12 for mobile apps.',
    tags: ['notifications', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Notifications Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 12
import 'package:flutter/material.dart';

class NotificationsWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-13',
    name: 'Notifications Widget 13',
    slug: 'notifications-widget-13',
    category: 'notifications',
    description: 'A beautiful notifications widget 13 for mobile apps.',
    tags: ['notifications', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Notifications Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 13
import 'package:flutter/material.dart';

class NotificationsWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-14',
    name: 'Notifications Widget 14',
    slug: 'notifications-widget-14',
    category: 'notifications',
    description: 'A beautiful notifications widget 14 for mobile apps.',
    tags: ['notifications', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Notifications Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 14
import 'package:flutter/material.dart';

class NotificationsWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-15',
    name: 'Notifications Widget 15',
    slug: 'notifications-widget-15',
    category: 'notifications',
    description: 'A beautiful notifications widget 15 for mobile apps.',
    tags: ['notifications', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Notifications Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 15
import 'package:flutter/material.dart';

class NotificationsWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-16',
    name: 'Notifications Widget 16',
    slug: 'notifications-widget-16',
    category: 'notifications',
    description: 'A beautiful notifications widget 16 for mobile apps.',
    tags: ['notifications', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Notifications Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 16
import 'package:flutter/material.dart';

class NotificationsWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-17',
    name: 'Notifications Widget 17',
    slug: 'notifications-widget-17',
    category: 'notifications',
    description: 'A beautiful notifications widget 17 for mobile apps.',
    tags: ['notifications', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Notifications Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 17
import 'package:flutter/material.dart';

class NotificationsWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'notifications-widget-18',
    name: 'Notifications Widget 18',
    slug: 'notifications-widget-18',
    category: 'notifications',
    description: 'A beautiful notifications widget 18 for mobile apps.',
    tags: ['notifications', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Notifications Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Notifications Widget 18
import 'package:flutter/material.dart';

class NotificationsWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Notifications Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-1',
    name: 'Loading Widget 1',
    slug: 'loading-widget-1',
    category: 'loading',
    description: 'A beautiful loading widget 1 for mobile apps.',
    tags: ['loading', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Loading Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 1
import 'package:flutter/material.dart';

class LoadingWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-2',
    name: 'Loading Widget 2',
    slug: 'loading-widget-2',
    category: 'loading',
    description: 'A beautiful loading widget 2 for mobile apps.',
    tags: ['loading', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Loading Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 2
import 'package:flutter/material.dart';

class LoadingWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-3',
    name: 'Loading Widget 3',
    slug: 'loading-widget-3',
    category: 'loading',
    description: 'A beautiful loading widget 3 for mobile apps.',
    tags: ['loading', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Loading Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 3
import 'package:flutter/material.dart';

class LoadingWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-4',
    name: 'Loading Widget 4',
    slug: 'loading-widget-4',
    category: 'loading',
    description: 'A beautiful loading widget 4 for mobile apps.',
    tags: ['loading', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Loading Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 4
import 'package:flutter/material.dart';

class LoadingWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-5',
    name: 'Loading Widget 5',
    slug: 'loading-widget-5',
    category: 'loading',
    description: 'A beautiful loading widget 5 for mobile apps.',
    tags: ['loading', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Loading Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 5
import 'package:flutter/material.dart';

class LoadingWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-6',
    name: 'Loading Widget 6',
    slug: 'loading-widget-6',
    category: 'loading',
    description: 'A beautiful loading widget 6 for mobile apps.',
    tags: ['loading', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Loading Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 6
import 'package:flutter/material.dart';

class LoadingWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-7',
    name: 'Loading Widget 7',
    slug: 'loading-widget-7',
    category: 'loading',
    description: 'A beautiful loading widget 7 for mobile apps.',
    tags: ['loading', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Loading Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 7
import 'package:flutter/material.dart';

class LoadingWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-8',
    name: 'Loading Widget 8',
    slug: 'loading-widget-8',
    category: 'loading',
    description: 'A beautiful loading widget 8 for mobile apps.',
    tags: ['loading', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Loading Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 8
import 'package:flutter/material.dart';

class LoadingWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-9',
    name: 'Loading Widget 9',
    slug: 'loading-widget-9',
    category: 'loading',
    description: 'A beautiful loading widget 9 for mobile apps.',
    tags: ['loading', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Loading Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 9
import 'package:flutter/material.dart';

class LoadingWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-10',
    name: 'Loading Widget 10',
    slug: 'loading-widget-10',
    category: 'loading',
    description: 'A beautiful loading widget 10 for mobile apps.',
    tags: ['loading', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Loading Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 10
import 'package:flutter/material.dart';

class LoadingWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-11',
    name: 'Loading Widget 11',
    slug: 'loading-widget-11',
    category: 'loading',
    description: 'A beautiful loading widget 11 for mobile apps.',
    tags: ['loading', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Loading Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 11
import 'package:flutter/material.dart';

class LoadingWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-12',
    name: 'Loading Widget 12',
    slug: 'loading-widget-12',
    category: 'loading',
    description: 'A beautiful loading widget 12 for mobile apps.',
    tags: ['loading', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Loading Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 12
import 'package:flutter/material.dart';

class LoadingWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-13',
    name: 'Loading Widget 13',
    slug: 'loading-widget-13',
    category: 'loading',
    description: 'A beautiful loading widget 13 for mobile apps.',
    tags: ['loading', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Loading Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 13
import 'package:flutter/material.dart';

class LoadingWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-14',
    name: 'Loading Widget 14',
    slug: 'loading-widget-14',
    category: 'loading',
    description: 'A beautiful loading widget 14 for mobile apps.',
    tags: ['loading', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Loading Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 14
import 'package:flutter/material.dart';

class LoadingWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-15',
    name: 'Loading Widget 15',
    slug: 'loading-widget-15',
    category: 'loading',
    description: 'A beautiful loading widget 15 for mobile apps.',
    tags: ['loading', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Loading Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 15
import 'package:flutter/material.dart';

class LoadingWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-16',
    name: 'Loading Widget 16',
    slug: 'loading-widget-16',
    category: 'loading',
    description: 'A beautiful loading widget 16 for mobile apps.',
    tags: ['loading', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Loading Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 16
import 'package:flutter/material.dart';

class LoadingWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-17',
    name: 'Loading Widget 17',
    slug: 'loading-widget-17',
    category: 'loading',
    description: 'A beautiful loading widget 17 for mobile apps.',
    tags: ['loading', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Loading Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 17
import 'package:flutter/material.dart';

class LoadingWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'loading-widget-18',
    name: 'Loading Widget 18',
    slug: 'loading-widget-18',
    category: 'loading',
    description: 'A beautiful loading widget 18 for mobile apps.',
    tags: ['loading', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Loading Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LoadingWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Loading Widget 18
import 'package:flutter/material.dart';

class LoadingWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Loading Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-1',
    name: 'Empty States Widget 1',
    slug: 'empty-states-widget-1',
    category: 'empty_states',
    description: 'A beautiful empty states widget 1 for mobile apps.',
    tags: ['empty_states', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Empty States Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 1
import 'package:flutter/material.dart';

class EmptyStatesWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-2',
    name: 'Empty States Widget 2',
    slug: 'empty-states-widget-2',
    category: 'empty_states',
    description: 'A beautiful empty states widget 2 for mobile apps.',
    tags: ['empty_states', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Empty States Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 2
import 'package:flutter/material.dart';

class EmptyStatesWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-3',
    name: 'Empty States Widget 3',
    slug: 'empty-states-widget-3',
    category: 'empty_states',
    description: 'A beautiful empty states widget 3 for mobile apps.',
    tags: ['empty_states', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Empty States Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 3
import 'package:flutter/material.dart';

class EmptyStatesWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-4',
    name: 'Empty States Widget 4',
    slug: 'empty-states-widget-4',
    category: 'empty_states',
    description: 'A beautiful empty states widget 4 for mobile apps.',
    tags: ['empty_states', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Empty States Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 4
import 'package:flutter/material.dart';

class EmptyStatesWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-5',
    name: 'Empty States Widget 5',
    slug: 'empty-states-widget-5',
    category: 'empty_states',
    description: 'A beautiful empty states widget 5 for mobile apps.',
    tags: ['empty_states', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Empty States Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 5
import 'package:flutter/material.dart';

class EmptyStatesWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-6',
    name: 'Empty States Widget 6',
    slug: 'empty-states-widget-6',
    category: 'empty_states',
    description: 'A beautiful empty states widget 6 for mobile apps.',
    tags: ['empty_states', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Empty States Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 6
import 'package:flutter/material.dart';

class EmptyStatesWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-7',
    name: 'Empty States Widget 7',
    slug: 'empty-states-widget-7',
    category: 'empty_states',
    description: 'A beautiful empty states widget 7 for mobile apps.',
    tags: ['empty_states', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Empty States Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 7
import 'package:flutter/material.dart';

class EmptyStatesWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-8',
    name: 'Empty States Widget 8',
    slug: 'empty-states-widget-8',
    category: 'empty_states',
    description: 'A beautiful empty states widget 8 for mobile apps.',
    tags: ['empty_states', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Empty States Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 8
import 'package:flutter/material.dart';

class EmptyStatesWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-9',
    name: 'Empty States Widget 9',
    slug: 'empty-states-widget-9',
    category: 'empty_states',
    description: 'A beautiful empty states widget 9 for mobile apps.',
    tags: ['empty_states', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Empty States Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 9
import 'package:flutter/material.dart';

class EmptyStatesWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-10',
    name: 'Empty States Widget 10',
    slug: 'empty-states-widget-10',
    category: 'empty_states',
    description: 'A beautiful empty states widget 10 for mobile apps.',
    tags: ['empty_states', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Empty States Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 10
import 'package:flutter/material.dart';

class EmptyStatesWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-11',
    name: 'Empty States Widget 11',
    slug: 'empty-states-widget-11',
    category: 'empty_states',
    description: 'A beautiful empty states widget 11 for mobile apps.',
    tags: ['empty_states', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Empty States Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 11
import 'package:flutter/material.dart';

class EmptyStatesWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-12',
    name: 'Empty States Widget 12',
    slug: 'empty-states-widget-12',
    category: 'empty_states',
    description: 'A beautiful empty states widget 12 for mobile apps.',
    tags: ['empty_states', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Empty States Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 12
import 'package:flutter/material.dart';

class EmptyStatesWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-13',
    name: 'Empty States Widget 13',
    slug: 'empty-states-widget-13',
    category: 'empty_states',
    description: 'A beautiful empty states widget 13 for mobile apps.',
    tags: ['empty_states', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Empty States Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 13
import 'package:flutter/material.dart';

class EmptyStatesWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-14',
    name: 'Empty States Widget 14',
    slug: 'empty-states-widget-14',
    category: 'empty_states',
    description: 'A beautiful empty states widget 14 for mobile apps.',
    tags: ['empty_states', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Empty States Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 14
import 'package:flutter/material.dart';

class EmptyStatesWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-15',
    name: 'Empty States Widget 15',
    slug: 'empty-states-widget-15',
    category: 'empty_states',
    description: 'A beautiful empty states widget 15 for mobile apps.',
    tags: ['empty_states', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Empty States Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 15
import 'package:flutter/material.dart';

class EmptyStatesWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-16',
    name: 'Empty States Widget 16',
    slug: 'empty-states-widget-16',
    category: 'empty_states',
    description: 'A beautiful empty states widget 16 for mobile apps.',
    tags: ['empty_states', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Empty States Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 16
import 'package:flutter/material.dart';

class EmptyStatesWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-17',
    name: 'Empty States Widget 17',
    slug: 'empty-states-widget-17',
    category: 'empty_states',
    description: 'A beautiful empty states widget 17 for mobile apps.',
    tags: ['empty_states', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Empty States Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 17
import 'package:flutter/material.dart';

class EmptyStatesWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'empty-states-widget-18',
    name: 'Empty States Widget 18',
    slug: 'empty-states-widget-18',
    category: 'empty_states',
    description: 'A beautiful empty states widget 18 for mobile apps.',
    tags: ['empty_states', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Empty States Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyStatesWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empty States Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Empty States Widget 18
import 'package:flutter/material.dart';

class EmptyStatesWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Empty States Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-1',
    name: 'Errors Widget 1',
    slug: 'errors-widget-1',
    category: 'errors',
    description: 'A beautiful errors widget 1 for mobile apps.',
    tags: ['errors', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Errors Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 1
import 'package:flutter/material.dart';

class ErrorsWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-2',
    name: 'Errors Widget 2',
    slug: 'errors-widget-2',
    category: 'errors',
    description: 'A beautiful errors widget 2 for mobile apps.',
    tags: ['errors', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Errors Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 2
import 'package:flutter/material.dart';

class ErrorsWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-3',
    name: 'Errors Widget 3',
    slug: 'errors-widget-3',
    category: 'errors',
    description: 'A beautiful errors widget 3 for mobile apps.',
    tags: ['errors', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Errors Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 3
import 'package:flutter/material.dart';

class ErrorsWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-4',
    name: 'Errors Widget 4',
    slug: 'errors-widget-4',
    category: 'errors',
    description: 'A beautiful errors widget 4 for mobile apps.',
    tags: ['errors', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Errors Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 4
import 'package:flutter/material.dart';

class ErrorsWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-5',
    name: 'Errors Widget 5',
    slug: 'errors-widget-5',
    category: 'errors',
    description: 'A beautiful errors widget 5 for mobile apps.',
    tags: ['errors', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Errors Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 5
import 'package:flutter/material.dart';

class ErrorsWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-6',
    name: 'Errors Widget 6',
    slug: 'errors-widget-6',
    category: 'errors',
    description: 'A beautiful errors widget 6 for mobile apps.',
    tags: ['errors', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Errors Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 6
import 'package:flutter/material.dart';

class ErrorsWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-7',
    name: 'Errors Widget 7',
    slug: 'errors-widget-7',
    category: 'errors',
    description: 'A beautiful errors widget 7 for mobile apps.',
    tags: ['errors', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Errors Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 7
import 'package:flutter/material.dart';

class ErrorsWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-8',
    name: 'Errors Widget 8',
    slug: 'errors-widget-8',
    category: 'errors',
    description: 'A beautiful errors widget 8 for mobile apps.',
    tags: ['errors', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Errors Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 8
import 'package:flutter/material.dart';

class ErrorsWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-9',
    name: 'Errors Widget 9',
    slug: 'errors-widget-9',
    category: 'errors',
    description: 'A beautiful errors widget 9 for mobile apps.',
    tags: ['errors', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Errors Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 9
import 'package:flutter/material.dart';

class ErrorsWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-10',
    name: 'Errors Widget 10',
    slug: 'errors-widget-10',
    category: 'errors',
    description: 'A beautiful errors widget 10 for mobile apps.',
    tags: ['errors', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Errors Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 10
import 'package:flutter/material.dart';

class ErrorsWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-11',
    name: 'Errors Widget 11',
    slug: 'errors-widget-11',
    category: 'errors',
    description: 'A beautiful errors widget 11 for mobile apps.',
    tags: ['errors', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Errors Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 11
import 'package:flutter/material.dart';

class ErrorsWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-12',
    name: 'Errors Widget 12',
    slug: 'errors-widget-12',
    category: 'errors',
    description: 'A beautiful errors widget 12 for mobile apps.',
    tags: ['errors', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Errors Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 12
import 'package:flutter/material.dart';

class ErrorsWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-13',
    name: 'Errors Widget 13',
    slug: 'errors-widget-13',
    category: 'errors',
    description: 'A beautiful errors widget 13 for mobile apps.',
    tags: ['errors', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Errors Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 13
import 'package:flutter/material.dart';

class ErrorsWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-14',
    name: 'Errors Widget 14',
    slug: 'errors-widget-14',
    category: 'errors',
    description: 'A beautiful errors widget 14 for mobile apps.',
    tags: ['errors', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Errors Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 14
import 'package:flutter/material.dart';

class ErrorsWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-15',
    name: 'Errors Widget 15',
    slug: 'errors-widget-15',
    category: 'errors',
    description: 'A beautiful errors widget 15 for mobile apps.',
    tags: ['errors', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Errors Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 15
import 'package:flutter/material.dart';

class ErrorsWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-16',
    name: 'Errors Widget 16',
    slug: 'errors-widget-16',
    category: 'errors',
    description: 'A beautiful errors widget 16 for mobile apps.',
    tags: ['errors', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Errors Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 16
import 'package:flutter/material.dart';

class ErrorsWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-17',
    name: 'Errors Widget 17',
    slug: 'errors-widget-17',
    category: 'errors',
    description: 'A beautiful errors widget 17 for mobile apps.',
    tags: ['errors', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Errors Widget 17
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget17() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 17</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 17
import 'package:flutter/material.dart';

class ErrorsWidget17 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 17',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'errors-widget-18',
    name: 'Errors Widget 18',
    slug: 'errors-widget-18',
    category: 'errors',
    description: 'A beautiful errors widget 18 for mobile apps.',
    tags: ['errors', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Errors Widget 18
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorsWidget18() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Errors Widget 18</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Errors Widget 18
import 'package:flutter/material.dart';

class ErrorsWidget18 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Errors Widget 18',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-1',
    name: 'Success Widget 1',
    slug: 'success-widget-1',
    category: 'success',
    description: 'A beautiful success widget 1 for mobile apps.',
    tags: ['success', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Success Widget 1
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 1
import 'package:flutter/material.dart';

class SuccessWidget1 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 1',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-2',
    name: 'Success Widget 2',
    slug: 'success-widget-2',
    category: 'success',
    description: 'A beautiful success widget 2 for mobile apps.',
    tags: ['success', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Success Widget 2
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 2
import 'package:flutter/material.dart';

class SuccessWidget2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 2',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-3',
    name: 'Success Widget 3',
    slug: 'success-widget-3',
    category: 'success',
    description: 'A beautiful success widget 3 for mobile apps.',
    tags: ['success', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Success Widget 3
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget3() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 3
import 'package:flutter/material.dart';

class SuccessWidget3 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 3',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-4',
    name: 'Success Widget 4',
    slug: 'success-widget-4',
    category: 'success',
    description: 'A beautiful success widget 4 for mobile apps.',
    tags: ['success', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Success Widget 4
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget4() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 4</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 4
import 'package:flutter/material.dart';

class SuccessWidget4 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 4',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-5',
    name: 'Success Widget 5',
    slug: 'success-widget-5',
    category: 'success',
    description: 'A beautiful success widget 5 for mobile apps.',
    tags: ['success', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Success Widget 5
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget5() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 5
import 'package:flutter/material.dart';

class SuccessWidget5 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 5',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-6',
    name: 'Success Widget 6',
    slug: 'success-widget-6',
    category: 'success',
    description: 'A beautiful success widget 6 for mobile apps.',
    tags: ['success', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `// React Native Code for Success Widget 6
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget6() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 6</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 6
import 'package:flutter/material.dart';

class SuccessWidget6 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 6',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-7',
    name: 'Success Widget 7',
    slug: 'success-widget-7',
    category: 'success',
    description: 'A beautiful success widget 7 for mobile apps.',
    tags: ['success', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Success Widget 7
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 7</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 7
import 'package:flutter/material.dart';

class SuccessWidget7 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 7',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-8',
    name: 'Success Widget 8',
    slug: 'success-widget-8',
    category: 'success',
    description: 'A beautiful success widget 8 for mobile apps.',
    tags: ['success', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Success Widget 8
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget8() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 8
import 'package:flutter/material.dart';

class SuccessWidget8 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 8',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-9',
    name: 'Success Widget 9',
    slug: 'success-widget-9',
    category: 'success',
    description: 'A beautiful success widget 9 for mobile apps.',
    tags: ['success', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Success Widget 9
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget9() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 9
import 'package:flutter/material.dart';

class SuccessWidget9 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 9',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-10',
    name: 'Success Widget 10',
    slug: 'success-widget-10',
    category: 'success',
    description: 'A beautiful success widget 10 for mobile apps.',
    tags: ['success', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Success Widget 10
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget10() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 10</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 10
import 'package:flutter/material.dart';

class SuccessWidget10 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 10',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-11',
    name: 'Success Widget 11',
    slug: 'success-widget-11',
    category: 'success',
    description: 'A beautiful success widget 11 for mobile apps.',
    tags: ['success', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Success Widget 11
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget11() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 11</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 11
import 'package:flutter/material.dart';

class SuccessWidget11 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 11',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-12',
    name: 'Success Widget 12',
    slug: 'success-widget-12',
    category: 'success',
    description: 'A beautiful success widget 12 for mobile apps.',
    tags: ['success', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `// React Native Code for Success Widget 12
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget12() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 12</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 12
import 'package:flutter/material.dart';

class SuccessWidget12 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 12',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-13',
    name: 'Success Widget 13',
    slug: 'success-widget-13',
    category: 'success',
    description: 'A beautiful success widget 13 for mobile apps.',
    tags: ['success', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Success Widget 13
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget13() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 13</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 13
import 'package:flutter/material.dart';

class SuccessWidget13 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 13',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-14',
    name: 'Success Widget 14',
    slug: 'success-widget-14',
    category: 'success',
    description: 'A beautiful success widget 14 for mobile apps.',
    tags: ['success', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Success Widget 14
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget14() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 14</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 14
import 'package:flutter/material.dart';

class SuccessWidget14 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 14',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-15',
    name: 'Success Widget 15',
    slug: 'success-widget-15',
    category: 'success',
    description: 'A beautiful success widget 15 for mobile apps.',
    tags: ['success', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Success Widget 15
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget15() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 15
import 'package:flutter/material.dart';

class SuccessWidget15 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 15',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'success-widget-16',
    name: 'Success Widget 16',
    slug: 'success-widget-16',
    category: 'success',
    description: 'A beautiful success widget 16 for mobile apps.',
    tags: ['success', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `// React Native Code for Success Widget 16
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessWidget16() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success Widget 16</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});`,
      dart: `// Flutter Code for Success Widget 16
import 'package:flutter/material.dart';

class SuccessWidget16 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          'Success Widget 16',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'product-card',
    name: 'Product Card',
    slug: 'product-card',
    category: 'cards',
    description: 'E-commerce product card with image, rating, and add-to-cart.',
    tags: ['cards', 'advanced', 'ecommerce'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ShoppingBag, Star } from 'lucide-react-native';

export default function ProductCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.image} 
          />
          <View style={styles.rating}>
            <Star size={12} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Nike Air Max</Text>
          <Text style={styles.category}>Men's Running</Text>
          
          <View style={styles.footer}>
            <Text style={styles.price}>$129.00</Text>
            <TouchableOpacity style={styles.addButton}>
              <ShoppingBag size={18} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  card: {
    width: 280,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  rating: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    color: '#888',
    fontSize: 14,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  addButton: {
    backgroundColor: '#77D970',
    padding: 10,
    borderRadius: 12,
  },
});`,
      dart: `import 'package:flutter/material.dart';

class ProductCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Container(
          width: 280,
          decoration: BoxDecoration(
            color: Color(0xFF1A1A1A),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Color(0xFF333333)),
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  Image.network(
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    height: 180,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Positioned(
                    top: 12,
                    right: 12,
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.7),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.star, color: Colors.amber, size: 12),
                          SizedBox(width: 4),
                          Text(
                            '4.8',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              Padding(
                padding: EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Nike Air Max',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      "Men's Running",
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 14,
                      ),
                    ),
                    SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          '\$129.00',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        Container(
                          decoration: BoxDecoration(
                            color: Color(0xFF77D970),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: IconButton(
                            icon: Icon(Icons.shopping_bag_outlined, color: Colors.black, size: 20),
                            onPressed: () {},
                            padding: EdgeInsets.all(8),
                            constraints: BoxConstraints(),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'profile-card',
    name: 'Profile Card',
    slug: 'profile-card',
    category: 'cards',
    description: 'Detailed user profile card with stats and avatar.',
    tags: ['cards', 'intermediate', 'social'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MapPin, Mail, Phone } from 'lucide-react-native';

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header} />
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }} 
            style={styles.avatar} 
          />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.role}>Senior Developer</Text>
          
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>450</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>Projects</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
  },
  card: {
    width: 300,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    height: 80,
    backgroundColor: '#77D970',
  },
  avatarContainer: {
    marginTop: -40,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#1A1A1A',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  role: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#333',
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#77D970',
    alignItems: 'center',
  },
  buttonText: {
    color: '#77D970',
    fontWeight: 'bold',
  },
});`,
      dart: `import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Container(
          width: 300,
          decoration: BoxDecoration(
            color: Color(0xFF1A1A1A),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: Color(0xFF333333)),
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(height: 80, color: Color(0xFF77D970)),
              Transform.translate(
                offset: Offset(0, -40),
                child: Column(
                  children: [
                    Container(
                      padding: EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Color(0xFF1A1A1A),
                        shape: BoxShape.circle,
                      ),
                      child: CircleAvatar(
                        radius: 38, // Total 80 with border
                        backgroundImage: NetworkImage('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Alex Johnson',
                      style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 4),
                    Text(
                      'Senior Developer',
                      style: TextStyle(color: Colors.grey, fontSize: 14),
                    ),
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildStat('1.2k', 'Followers'),
                        Container(width: 1, height: 24, color: Color(0xFF333333)),
                        _buildStat('450', 'Following'),
                        Container(width: 1, height: 24, color: Color(0xFF333333)),
                        _buildStat('89', 'Projects'),
                      ],
                    ),
                    SizedBox(height: 24),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: OutlinedButton(
                        onPressed: () {},
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: Color(0xFF77D970)),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          padding: EdgeInsets.symmetric(vertical: 12),
                          minimumSize: Size(double.infinity, 0),
                        ),
                        child: Text('Edit Profile', style: TextStyle(color: Color(0xFF77D970), fontWeight: FontWeight.bold)),
                      ),
                    ),
                    SizedBox(height: 20),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(
      children: [
        Text(value, style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
        Text(label, style: TextStyle(color: Colors.grey, fontSize: 12)),
      ],
    );
  }
}`,
    },
  },
  {
    id: 'glass-card-premium',
    name: 'Glass Card Premium',
    slug: 'glass-card-premium',
    category: 'cards',
    description: 'High-end glassmorphic card with gradient borders.',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function GlassCard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#77D970', '#50C878']}
        style={styles.cardWrapper}
      >
        <BlurView intensity={40} tint="dark" style={styles.glass}>
          <Text style={styles.title}>Premium Access</Text>
          <Text style={styles.content}>
            Unlock all components and premium support today.
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PRO</Text>
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  cardWrapper: {
    padding: 2, // Border width
    borderRadius: 24,
  },
  glass: {
    padding: 24,
    borderRadius: 22,
    width: 300,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  content: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#77D970',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 10,
  },
});`,
      dart: `import 'dart:ui';
import 'package:flutter/material.dart';

class PremiumGlassCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Color(0xFF77D970), Color(0xFF50C878)],
            ),
            borderRadius: BorderRadius.circular(24),
          ),
          padding: EdgeInsets.all(2),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(22),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
              child: Container(
                width: 300,
                padding: EdgeInsets.all(24),
                color: Colors.black.withOpacity(0.4),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Premium Access',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Unlock all components and premium support today.',
                      style: TextStyle(
                        color: Colors.white70,
                        fontSize: 14,
                      ),
                    ),
                    SizedBox(height: 20),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        color: Color(0xFF77D970),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        'PRO',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'modern-login',
    name: 'Modern Login',
    slug: 'modern-login',
    category: 'auth',
    description: 'Minimalist login screen with large typography.',
    tags: ['auth', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ModernLogin() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <View style={styles.form}>
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#666" />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry placeholderTextColor="#666" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 30, justifyContent: 'center' },
  header: { color: '#fff', fontSize: 42, fontWeight: '900', marginBottom: 50 },
  input: { borderBottomWidth: 1, borderBottomColor: '#333', paddingVertical: 15, color: '#fff', marginBottom: 20 },
  button: { backgroundColor: '#77D970', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  buttonText: { fontWeight: '900', fontSize: 16 }
});`,
      dart: `// Flutter Modern Login...`
    }
  },
  {
    id: 'crypto-wallet',
    name: 'Crypto Wallet',
    slug: 'crypto-wallet',
    category: 'cards',
    description: 'Wallet interface with balance and chart.',
    tags: ['cards', 'advanced'],
    framework: 'react-native',
    complexity: 'advanced',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Wallet() {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Total Balance</Text>
      <Text style={styles.balance}>$12,450.80</Text>
      <View style={styles.pill}>
        <Text style={styles.pillText}>+4.5% TODAY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#111', padding: 25, borderRadius: 30, borderWidth: 1, borderColor: '#222' },
  label: { color: '#888', fontSize: 14, fontWeight: '600' },
  balance: { color: '#fff', fontSize: 32, fontWeight: '900', marginVertical: 10 },
  pill: { backgroundColor: '#77D97022', padding: 8, borderRadius: 10, alignSelf: 'flex-start' },
  pillText: { color: '#77D970', fontWeight: 'bold', fontSize: 12 }
});`,
      dart: `// Flutter Crypto Wallet...`
    }
  },
  {
    id: 'social-feed-card',
    name: 'Social Feed Card',
    slug: 'social-feed-card',
    category: 'cards',
    description: 'Clean post card for social apps.',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SocialCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <Text style={styles.user}>@designer_x</Text>
      </View>
      <Image source={{uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'}} style={styles.img} />
      <Text style={styles.caption}>Designing the future of mobile experiences.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#111', borderRadius: 24, overflow: 'hidden' },
  header: { padding: 15, flexDirection: 'row', alignItems: 'center' },
  avatar: { w: 32, h: 32, borderRadius: 16, backgroundColor: '#333' },
  user: { color: '#fff', marginLeft: 10, fontWeight: '700' },
  img: { width: '100%', height: 300 },
  caption: { padding: 15, color: '#aaa' }
});`,
      dart: `// Flutter Social Card...`
    }
  },
  {
    id: 'pricing-card',
    name: 'Pricing Card',
    slug: 'pricing-card',
    category: 'cards',
    description: 'Tiered pricing card with glass effects.',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PricingCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.tier}>ULTIMATE</Text>
      <Text style={styles.price}>$99<Text style={styles.period}>/mo</Text></Text>
      <View style={styles.line} />
      <Text style={styles.feature}>✓ Unlimited Components</Text>
      <Text style={styles.feature}>✓ Priority Support</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#77D970', padding: 30, borderRadius: 32 },
  tier: { color: '#000', fontWeight: '900', letterSpacing: 2, fontSize: 12 },
  price: { color: '#000', fontSize: 48, fontWeight: '900', marginVertical: 10 },
  period: { fontSize: 18, fontWeight: '600' },
  line: { height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 20 },
  feature: { color: '#000', fontWeight: '600', marginBottom: 10 }
});`,
      dart: `// Flutter Pricing Card...`
    }
  },
  {
    id: 'stat-grid-modern',
    name: 'Stat Grid',
    slug: 'stat-grid-modern',
    category: 'cards',
    description: 'Dynamic grid of statistics.',
    tags: ['cards', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatGrid() {
  return (
    <View style={styles.grid}>
       <View style={styles.item}><Text style={styles.val}>2.4k</Text><Text style={styles.lab}>VIEWS</Text></View>
       <View style={styles.item}><Text style={styles.val}>850</Text><Text style={styles.lab}>SALES</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', gap: 15 },
  item: { flex: 1, backgroundColor: '#111', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#222' },
  val: { color: '#fff', fontSize: 24, fontWeight: '900' },
  lab: { color: '#555', fontSize: 10, fontWeight: 'bold', marginTop: 5 }
});`,
      dart: `// Flutter Stat Grid...`
    }
  },
  {
    id: 'chip-group-neon',
    name: 'Chip Group',
    slug: 'chip-group-neon',
    category: 'inputs',
    description: 'Selectable neon chips.',
    tags: ['inputs', 'beginner'],
    framework: 'react-native',
    complexity: 'beginner',
    code: {
      typescript: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChipGroup() {
  return (
    <View style={styles.container}>
      <View style={styles.chipActive}><Text style={styles.activeTxt}>Design</Text></View>
      <View style={styles.chip}><Text style={styles.txt}>Code</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 10 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: '#333' },
  chipActive: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, backgroundColor: '#77D970' },
  txt: { color: '#666', fontWeight: '700' },
  activeTxt: { color: '#000', fontWeight: '900' }
});`,
      dart: `// Flutter Chip Group...`
    },
  },
  {
    id: 'carousel-hero',
    name: 'Carousel Hero',
    slug: 'carousel-hero',
    category: 'cards',
    description: 'Horizontal snapping cards with pagination dots.',
    tags: ['cards', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';

export default function Carousel() {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {[1, 2, 3].map(i => (
        <View key={i} style={[styles.card, {backgroundColor: i % 2 === 0 ? '#77D970' : '#111'}]}>
          <Text style={[styles.txt, {color: i % 2 === 0 ? '#000' : '#fff'}]}>Feature {i}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: { width: Dimensions.get('window').width - 40, height: 200, margin: 20, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  txt: { fontSize: 32, fontWeight: '900' }
});`,
      dart: `// Flutter Carousel...`
    }
  },
  {
    id: 'glass-navbar-floating',
    name: 'Glass Navbar',
    slug: 'glass-navbar-floating',
    category: 'navigation',
    description: 'Floating glassmorphic bottom navigation.',
    tags: ['navigation', 'intermediate'],
    framework: 'react-native',
    complexity: 'intermediate',
    code: {
      typescript: `import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Search, Bell, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function GlassNav() {
  return (
    <BlurView intensity={30} tint="dark" style={styles.nav}>
       <Home color="#77D970" size={24} />
       <Search color="#666" size={24} />
       <Bell color="#666" size={24} />
       <User color="#666" size={24} />
    </BlurView>
  );
}
const styles = StyleSheet.create({
  nav: { position: 'absolute', bottom: 30, left: 20, right: 20, height: 70, borderRadius: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden', paddingHorizontal: 10 }
});`,
      dart: `// Flutter Glass Nav...`
    }
  },
];

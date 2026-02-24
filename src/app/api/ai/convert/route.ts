import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { sourceCode, fromFramework, toFramework } = await req.json();

    if (!sourceCode) {
      return NextResponse.json({ error: 'Source code is required' }, { status: 400 });
    }

    // Simulate conversion delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    let convertedCode = '';

    if (fromFramework === 'react-native' && toFramework === 'flutter') {
      convertedCode = `// Converted from React Native to Flutter
import 'package:flutter/material.dart';

class ConvertedWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Note: Automatic conversion is an approximation.
    // Styled components were mapped to BoxDecoration.
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: [
          Text('Converted Content'),
        ],
      ),
    );
  }
}`;
    } else if (fromFramework === 'flutter' && toFramework === 'react-native') {
      convertedCode = `// Converted from Flutter to React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConvertedComponent() {
  return (
    <View style={styles.container}>
      <Text>Converted Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});`;
    } else {
      convertedCode = `// Conversion from ${fromFramework} to ${toFramework} is currently in beta.
// Original Code:
${sourceCode}`;
    }

    let diff = "// Logic to generate diff is simulated";
    if (fromFramework === 'react-native' && toFramework === 'flutter') {
      diff = `+++ Flutter\n--- React Native\n- <View style={{ padding: 16 }}>\n+ Container(padding: EdgeInsets.all(16))`;
    } else if (fromFramework === 'flutter' && toFramework === 'react-native') {
      diff = `+++ React Native\n--- Flutter\n- Container(padding: EdgeInsets.all(16))\n+ <View style={{ padding: 16 }}>`;
    }

    return NextResponse.json({
      code: convertedCode,
      diff: diff
    });

  } catch (error) {
    console.error('AI Conversion Error:', error);
    return NextResponse.json({ error: 'Failed to convert code' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { prompt, framework } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock generation logic based on keywords
        let generatedCode = '';
        const lowerPrompt = prompt.toLowerCase();

        if (framework === 'flutter') {
            if (lowerPrompt.includes('button')) {
                generatedCode = `import 'package:flutter/material.dart';

class GeneratedButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Color(0xFF77D970),
          padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
        child: Text('${prompt.split(' ').slice(0, 2).join(' ').toUpperCase()}'),
      ),
    );
  }
}`;
            } else if (lowerPrompt.includes('card')) {
                generatedCode = `import 'package:flutter/material.dart';

class GeneratedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('${prompt}', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Text('Auto-generated based on your prompt.'),
          ],
        ),
      ),
    );
  }
}`;
            } else {
                generatedCode = `// AI Generated code for: ${prompt}
import 'package:flutter/material.dart';

class AISuggestedWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(child: Text('Preview for: ${prompt}')),
    );
  }
}`;
            }
        } else {
            // React Native / Expo
            if (lowerPrompt.includes('button')) {
                generatedCode = `import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function GeneratedButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>${prompt.split(' ').slice(0, 2).join(' ').toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#77D970',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: { color: '#000', fontWeight: 'bold' }
});`;
            } else {
                generatedCode = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AISuggestedComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Generated: ${prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: 'bold' }
});`;
            }
        }

        return NextResponse.json({
            code: generatedCode,
            explanation: `I've generated a custom ${lowerPrompt.includes('button') ? 'button' : 'component'} for you using ${framework === 'flutter' ? 'Flutter widgets' : 'React Native components'}.`
        });

    } catch (error) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: 'Failed to generate code' }, { status: 500 });
    }
}

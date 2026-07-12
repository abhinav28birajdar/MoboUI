export const TEMPLATES_DATA: Record<string, any> = {
  calculator: {
    flutter: {
      "lib/main.dart": `import 'package:flutter/material.dart';

void main() => runApp(CalculatorApp());

class CalculatorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: CalculatorHome(),
    );
  }
}

class CalculatorHome extends StatefulWidget {
  @override
  _CalculatorHomeState createState() => _CalculatorHomeState();
}

class _CalculatorHomeState extends State<CalculatorHome> {
  String display = '0';
  double numOne = 0;
  double numTwo = 0;
  String result = '0';
  String operator = '';

  void btnPressed(String text) {
    if (text == 'C') {
      display = '0';
      numOne = 0;
      numTwo = 0;
      result = '0';
      operator = '';
    } else if (text == '+' || text == '-' || text == '*' || text == '/') {
      numOne = double.parse(display);
      operator = text;
      result = '0';
    } else if (text == '=') {
      numTwo = double.parse(display);
      if (operator == '+') result = (numOne + numTwo).toString();
      if (operator == '-') result = (numOne - numTwo).toString();
      if (operator == '*') result = (numOne * numTwo).toString();
      if (operator == '/') result = (numOne / numTwo).toString();
      
      // Format double to int if possible
      if (result.endsWith('.0')) {
        result = result.substring(0, result.length - 2);
      }
      display = result;
    } else {
      if (display == '0' || result == display) {
        display = text;
      } else {
        display += text;
      }
    }
    setState(() {});
  }

  Widget calcButton(String btnText, Color bg, Color fg) {
    return Container(
      margin: EdgeInsets.all(8),
      child: ElevatedButton(
        onPressed: () => btnPressed(btnText),
        child: Text(
          btnText,
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        style: ElevatedButton.styleFrom(
          shape: CircleBorder(),
          padding: EdgeInsets.all(20),
          backgroundColor: bg,
          foregroundColor: fg,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Container(
            padding: EdgeInsets.symmetric(horizontal: 24, vertical: 32),
            alignment: Alignment.centerRight,
            child: Text(
              display,
              style: TextStyle(color: Colors.white, fontSize: 64, fontWeight: FontWeight.w300),
            ),
          ),
          Divider(color: Colors.grey[900]),
          Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  calcButton('7', Colors.grey[850]!, Colors.white),
                  calcButton('8', Colors.grey[850]!, Colors.white),
                  calcButton('9', Colors.grey[850]!, Colors.white),
                  calcButton('/', Colors.amber[700]!, Colors.white),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  calcButton('4', Colors.grey[850]!, Colors.white),
                  calcButton('5', Colors.grey[850]!, Colors.white),
                  calcButton('6', Colors.grey[850]!, Colors.white),
                  calcButton('*', Colors.amber[700]!, Colors.white),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  calcButton('1', Colors.grey[850]!, Colors.white),
                  calcButton('2', Colors.grey[850]!, Colors.white),
                  calcButton('3', Colors.grey[850]!, Colors.white),
                  calcButton('-', Colors.amber[700]!, Colors.white),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  calcButton('C', Colors.red[950]!, Colors.redAccent),
                  calcButton('0', Colors.grey[850]!, Colors.white),
                  calcButton('=', Colors.amber[700]!, Colors.white),
                  calcButton('+', Colors.amber[700]!, Colors.white),
                ],
              ),
            ],
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}`
    },
    "react-native": {
      "App.js": `import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [numOne, setNumOne] = useState(0);
  const [operator, setOperator] = useState('');

  const handlePress = (text) => {
    if (text === 'C') {
      setDisplay('0');
      setNumOne(0);
      setOperator('');
    } else if (['+', '-', '*', '/'].includes(text)) {
      setNumOne(parseFloat(display));
      setOperator(text);
      setDisplay('0');
    } else if (text === '=') {
      const numTwo = parseFloat(display);
      let result = 0;
      if (operator === '+') result = numOne + numTwo;
      if (operator === '-') result = numOne - numTwo;
      if (operator === '*') result = numOne * numTwo;
      if (operator === '/') result = numOne / numTwo;
      setDisplay(String(result));
      setOperator('');
    } else {
      setDisplay(display === '0' ? text : display + text);
    }
  };

  const renderBtn = (text, isOrange = false, isClear = false) => (
    <TouchableOpacity
      onPress={() => handlePress(text)}
      style={[
        styles.btn,
        isOrange && styles.orangeBtn,
        isClear && styles.clearBtn
      ]}
    >
      <Text style={[styles.btnText, isClear && styles.clearBtnText]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.row}>
        {renderBtn('7')}
        {renderBtn('8')}
        {renderBtn('9')}
        {renderBtn('/', true)}
      </View>
      <View style={styles.row}>
        {renderBtn('4')}
        {renderBtn('5')}
        {renderBtn('6')}
        {renderBtn('*', true)}
      </View>
      <View style={styles.row}>
        {renderBtn('1')}
        {renderBtn('2')}
        {renderBtn('3')}
        {renderBtn('-', true)}
      </View>
      <View style={styles.row}>
        {renderBtn('C', false, true)}
        {renderBtn('0')}
        {renderBtn('=')}
        {renderBtn('+', true)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  displayText: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '300',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8,
  },
  btn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#27272A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  orangeBtn: {
    backgroundColor: '#C026D3',
  },
  clearBtn: {
    backgroundColor: '#2D0B0B',
  },
  clearBtnText: {
    color: '#FF8F8F',
  },
});`
    }
  },
  todo: {
    flutter: {
      "lib/main.dart": `import 'package:flutter/material.dart';

void main() => runApp(TodoApp());

class TodoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: TodoHome(),
    );
  }
}

class TodoHome extends StatefulWidget {
  @override
  _TodoHomeState createState() => _TodoHomeState();
}

class _TodoHomeState extends State<TodoHome> {
  final List<String> todos = ['Buy groceries', 'Complete portfolio UI', 'Read Flutter documents'];
  final TextEditingController controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0B),
      appBar: AppBar(
        title: Text('MoboUI Tasks'),
        backgroundColor: Color(0xFF111113),
        elevation: 0,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: controller,
                    decoration: InputDecoration(
                      hintText: 'Add new task...',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      contentPadding: EdgeInsets.symmetric(horizontal: 16),
                    ),
                  ),
                ),
                SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () {
                    if (controller.text.isNotEmpty) {
                      setState(() {
                        todos.add(controller.text);
                        controller.clear();
                      });
                    }
                  },
                  child: Icon(Icons.add),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFC026D3),
                    foregroundColor: Colors.black,
                    padding: EdgeInsets.all(16),
                    shape: CircleBorder(),
                  ),
                )
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: todos.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                  color: Color(0xFF18181B),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: ListTile(
                    title: Text(todos[index], style: TextStyle(color: Colors.white)),
                    trailing: IconButton(
                      icon: Icon(Icons.delete, color: Colors.redAccent),
                      onPressed: () {
                        setState(() {
                          todos.removeAt(index);
                        });
                      },
                    ),
                  ),
                );
              },
            ),
          )
        ],
      ),
    );
  }
}`
    },
    "react-native": {
      "App.js": `import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState(['Buy groceries', 'Complete UI components', 'Read React docs']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>MoboUI Tasks</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Add new task..."
          placeholderTextColor="#71717A"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.todoCard}>
            <Text style={styles.todoText}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTodo(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0B',
    padding: 16,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#18181B',
    borderWidth: 1,
    borderColor: '#27272A',
    borderRadius: 8,
    color: '#FAFAFA',
    paddingHorizontal: 16,
    height: 48,
  },
  addButton: {
    backgroundColor: '#C026D3',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  addButtonText: {
    color: '#0A0A0B',
    fontSize: 24,
    fontWeight: 'bold',
  },
  todoCard: {
    backgroundColor: '#18181B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272A',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    color: '#FAFAFA',
    fontSize: 15,
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: 'bold',
  },
});`
    }
  }
};

export const COMPONENT_LIBRARY = {
  flutter: [
    { name: "Container", code: "Container(\n  width: 100,\n  height: 100,\n  decoration: BoxDecoration(\n    color: Color(0xFFC026D3),\n    borderRadius: BorderRadius.circular(12),\n  ),\n  child: child,\n)" },
    { name: "Column", code: "Column(\n  mainAxisAlignment: MainAxisAlignment.center,\n  crossAxisAlignment: CrossAxisAlignment.center,\n  children: [\n    // widgets here\n  ],\n)" },
    { name: "Row", code: "Row(\n  mainAxisAlignment: MainAxisAlignment.spaceBetween,\n  children: [\n    // widgets here\n  ],\n)" },
    { name: "Text", code: "Text(\n  'MoboUI Styled Text',\n  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),\n)" },
    { name: "ElevatedButton", code: "ElevatedButton(\n  onPressed: () {},\n  style: ElevatedButton.styleFrom(backgroundColor: Color(0xFFC026D3)),\n  child: Text('Tap Actions', style: TextStyle(color: Colors.black)),\n)" },
    { name: "Icon", code: "Icon(Icons.star, color: Color(0xFFC026D3), size: 28)" },
    { name: "Padding", code: "Padding(\n  padding: EdgeInsets.all(16.0),\n  child: child,\n)" }
  ],
  "react-native": [
    { name: "View", code: "<View style={styles.box}>\n  {/* children here */}\n</View>" },
    { name: "Text", code: "<Text style={styles.text}>MoboUI Text Segment</Text>" },
    { name: "TouchableOpacity", code: "<TouchableOpacity \n  style={styles.button} \n  onPress={() => console.log('Tapped')}\n>\n  <Text style={styles.buttonText}>Click</Text>\n</TouchableOpacity>" },
    { name: "Image", code: "<Image \n  source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=150&h=150' }} \n  style={styles.avatar} \n/>" },
    { name: "ScrollView", code: "<ScrollView style={styles.scroll}>\n  {/* contents */}\n</ScrollView>" },
    { name: "TextInput", code: "<TextInput\n  placeholder=\"Enter data...\"\n  placeholderTextColor=\"#52525B\"\n  style={styles.input}\n  onChangeText={text => console.log(text)}\n/>" }
  ]
};

export const DOCS_DATA = {
  flutter: [
    { title: "StatelessWidget vs StatefulWidget", body: "StatelessWidget represents immutable UI, where configuration is read on creation. StatefulWidget maintains state fields and rebuilds whenever setState() is called, updating the AST widget tree." },
    { title: "Layout Basics: Columns & Rows", body: "Columns stack items vertically. Rows stack items horizontally. Use MainAxisAlignment to align items along their primary axis, and CrossAxisAlignment to align them perpendicular to their run direction." }
  ],
  "react-native": [
    { title: "StyleSheet Basics", body: "StyleSheet.create replaces standard CSS stylesheets. Supports flexbox layout mappings: flexDirection, justifyContent, alignItems. Flex layouts run vertically by default in React Native." },
    { title: "Event Responders: Pressables", body: "Pressable is a core responder wrapping child widgets. It provides hover, click, press, longPress, and blur state mappings via simple functional props." }
  ]
};

export const TUTORIALS = [
  { title: "Building layouts", desc: "Understand columns, rows, flex structures, and padding spacing.", xp: "20 XP" },
  { title: "State hooks", desc: "Master useState and stateful rebuild actions.", xp: "30 XP" },
  { title: "Network Integrations", desc: "Mock dynamic fetching, API mappings, and database queries.", xp: "50 XP" }
];

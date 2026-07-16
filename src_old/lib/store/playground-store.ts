import { create } from 'zustand';

export interface EditorSettings {
  fontSize: number;
  fontFamily: string;
  tabSize: number;
  wordWrap: 'on' | 'off';
  autoSave: boolean;
  autoFormat: boolean;
  lineNumbers: 'on' | 'off';
  minimap: boolean;
  cursorAnimation: 'blink' | 'smooth' | 'phase' | 'expand';
  theme: string;
}

export interface Project {
  id: string;
  name: string;
  framework: 'react-native' | 'expo' | 'flutter';
  files: Record<string, string>;
  activeFile: string;
  packages: string[];
}

interface PlaygroundState {
  // Original compat fields
  code: string;
  framework: 'react-native' | 'expo' | 'flutter';
  platform: 'react-native' | 'expo' | 'flutter';
  device: 'iphone' | 'android';
  template: 'blank' | 'button' | 'form' | 'list';

  // Rich IDE fields
  files: Record<string, string>;
  activeFile: string;
  openTabs: string[];
  activeSidebarTab: 'explorer' | 'components' | 'packages' | 'assistant' | 'templates' | 'collaboration' | 'docs' | 'learning' | 'settings';
  terminalLogs: string[];
  consoleLogs: Array<{ type: 'info' | 'error' | 'warn'; message: string; timestamp: string }>;
  editorSettings: EditorSettings;
  packages: string[];
  projects: Project[];
  activeProjectId: string | null;

  // Setters & Actions
  setCode: (code: string) => void;
  setFramework: (framework: 'react-native' | 'expo' | 'flutter') => void;
  setPlatform: (platform: 'react-native' | 'expo' | 'flutter') => void;
  setDevice: (device: 'iphone' | 'android') => void;
  setTemplate: (template: 'blank' | 'button' | 'form' | 'list') => void;

  // IDE Actions
  setFiles: (files: Record<string, string>) => void;
  updateFile: (path: string, content: string) => void;
  setActiveFile: (path: string) => void;
  openFileInTab: (path: string) => void;
  closeFileTab: (path: string) => void;
  setActiveSidebarTab: (tab: 'explorer' | 'components' | 'packages' | 'assistant' | 'templates' | 'collaboration' | 'docs' | 'learning' | 'settings') => void;
  addTerminalLog: (log: string) => void;
  clearTerminalLogs: () => void;
  addConsoleLog: (message: string, type?: 'info' | 'error' | 'warn') => void;
  clearConsoleLogs: () => void;
  updateEditorSettings: (settings: Partial<EditorSettings>) => void;
  installPackage: (name: string) => void;
  removePackage: (name: string) => void;
  
  // Projects Management
  createProject: (name: string, framework: 'react-native' | 'expo' | 'flutter') => void;
  deleteProject: (id: string) => void;
  loadProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  renameProject: (id: string, newName: string) => void;

  resetCode: () => void;
  reset: () => void;
}

const FLUTTER_DEFAULT_FILES = {
  "lib/main.dart": `import 'package:flutter/material.dart';
import 'home.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: HomePage(),
    );
  }
}`,
  "lib/home.dart": `import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF0A0A0A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Hello Flutter! 🐦',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Click the button below',
              style: TextStyle(
                fontSize: 16,
                color: Color(0xFF9CA3AF),
              ),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  count++;
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFFC026D3),
                foregroundColor: Color(0xFF0A0A0B),
                padding: EdgeInsets.symmetric(
                  vertical: 16,
                  horizontal: 32,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                elevation: 0,
              ),
              child: Text(
                'Clicked $count times',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`,
  "pubspec.yaml": `name: moboui_playground_app
description: A new Flutter playground project.
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2`,
  "README.md": `# Flutter MoboUI App

Welcome to your inline Flutter IDE playground! 

## Getting Started
- Edit \`lib/main.dart\` or \`lib/home.dart\`.
- Click **Run** on the toolbar or run \`flutter run\` in the terminal.
- Use the **Component Library** in the sidebar to drag-and-drop or click-to-insert items.
`
};

const RN_DEFAULT_FILES = {
  "App.js": `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native! 🚀</Text>
      <Text style={styles.subtitle}>Click the button below</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setCount(count + 1)}
      >
        <Text style={styles.buttonText}>
          Clicked {count} times
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
    backgroundColor: '#0A0A0B',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#C026D3',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: '#0A0A0B',
    fontSize: 16,
    fontWeight: '600',
  },
});`,
  "package.json": `{
  "name": "moboui-playground-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.72.3",
    "expo-linear-gradient": "*",
    "lucide-react-native": "*"
  }
}`,
  "README.md": `# React Native Playground

Welcome to your React Native / Expo Playground!

- Edit \`App.js\` or components.
- Click **Run** or run \`expo start\` in the terminal.
- Browse the component catalog to insert pre-built templates.
`
};

const DEFAULT_SETTINGS: EditorSettings = {
  fontSize: 14,
  fontFamily: "'JetBrains Mono', monospace",
  tabSize: 2,
  wordWrap: 'off',
  autoSave: true,
  autoFormat: false,
  lineNumbers: 'on',
  minimap: false,
  cursorAnimation: 'smooth',
  theme: 'vs-dark',
};

const getInitialFiles = (framework: string) => {
  return framework === 'flutter' ? { ...FLUTTER_DEFAULT_FILES } : { ...RN_DEFAULT_FILES };
};

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  // Original compat fields
  code: RN_DEFAULT_FILES["App.js"],
  framework: 'react-native',
  platform: 'react-native',
  device: 'iphone',
  template: 'blank',

  // Rich IDE fields
  files: RN_DEFAULT_FILES,
  activeFile: "App.js",
  openTabs: ["App.js", "package.json", "README.md"],
  activeSidebarTab: 'explorer',
  terminalLogs: [
    "Welcome to MoboUI Cloud IDE v1.0.0",
    "Type 'help' to see list of available commands.",
    "Ready for compilation."
  ],
  consoleLogs: [
    { type: 'info', message: 'Metro Bundler started.', timestamp: new Date().toLocaleTimeString() }
  ],
  editorSettings: DEFAULT_SETTINGS,
  packages: ["react", "react-native", "expo-linear-gradient", "lucide-react-native"],
  projects: [],
  activeProjectId: null,

  // Setters
  setCode: (code) => {
    const { activeFile, files } = get();
    const updatedFiles = { ...files, [activeFile]: code };
    set({ code, files: updatedFiles });
  },

  setFramework: (framework) => {
    const initialFiles = getInitialFiles(framework);
    const mainFile = framework === 'flutter' ? 'lib/main.dart' : 'App.js';
    const initialTabs = framework === 'flutter' ? ['lib/main.dart', 'lib/home.dart', 'pubspec.yaml'] : ['App.js', 'package.json', 'README.md'];
    const initialPackages = framework === 'flutter' ? ['flutter', 'cupertino_icons'] : ['react', 'react-native', 'expo-linear-gradient', 'lucide-react-native'];
    const initialCode = initialFiles[mainFile as keyof typeof initialFiles] || "";
    
    set({
      framework,
      platform: framework,
      files: initialFiles,
      activeFile: mainFile,
      openTabs: initialTabs,
      code: initialCode,
      packages: initialPackages,
      terminalLogs: [
        `Switched framework environment to ${framework.toUpperCase()}`,
        "Ready."
      ]
    });
  },

  setPlatform: (platform) => get().setFramework(platform),
  setDevice: (device) => set({ device }),
  setTemplate: (template) => set({ template }),

  // Rich IDE Actions
  setFiles: (files) => set({ files }),
  updateFile: (path, content) => {
    const { files, activeFile } = get();
    const updated = { ...files, [path]: content };
    const codeUpdate = path === activeFile ? content : get().code;
    set({ files: updated, code: codeUpdate });
  },

  setActiveFile: (path) => {
    const { files, openTabs } = get();
    const fileContent = files[path] || "";
    const updatedTabs = openTabs.includes(path) ? openTabs : [...openTabs, path];
    set({ activeFile: path, code: fileContent, openTabs: updatedTabs });
  },

  openFileInTab: (path) => {
    const { openTabs } = get();
    if (!openTabs.includes(path)) {
      set({ openTabs: [...openTabs, path] });
    }
    get().setActiveFile(path);
  },

  closeFileTab: (path) => {
    const { openTabs, activeFile } = get();
    const index = openTabs.indexOf(path);
    const newTabs = openTabs.filter(t => t !== path);
    let newActive = activeFile;
    if (activeFile === path && newTabs.length > 0) {
      // Set to next tab or previous tab
      newActive = newTabs[Math.max(0, index - 1)];
    }
    
    set({ openTabs: newTabs });
    if (newTabs.length > 0) {
      get().setActiveFile(newActive);
    } else {
      set({ activeFile: '', code: '' });
    }
  },

  setActiveSidebarTab: (activeSidebarTab) => set({ activeSidebarTab }),
  
  addTerminalLog: (log) => set((state) => ({ terminalLogs: [...state.terminalLogs, log] })),
  clearTerminalLogs: () => set({ terminalLogs: [] }),
  
  addConsoleLog: (message, type = 'info') => set((state) => ({
    consoleLogs: [...state.consoleLogs, { type, message, timestamp: new Date().toLocaleTimeString() }]
  })),
  clearConsoleLogs: () => set({ consoleLogs: [] }),
  
  updateEditorSettings: (settings) => set((state) => ({
    editorSettings: { ...state.editorSettings, ...settings }
  })),

  installPackage: (name) => set((state) => {
    const updatedPackages = state.packages.includes(name) ? state.packages : [...state.packages, name];
    // Also mock modify config files
    const updatedFiles = { ...state.files };
    if (state.framework === 'flutter') {
      const pubspec = updatedFiles["pubspec.yaml"] || "";
      if (!pubspec.includes(name)) {
        updatedFiles["pubspec.yaml"] = pubspec + `\n  ${name}: ^1.0.0`;
      }
    } else {
      const pkgJsonStr = updatedFiles["package.json"];
      if (pkgJsonStr) {
        try {
          const pkg = JSON.parse(pkgJsonStr);
          if (pkg.dependencies) {
            pkg.dependencies[name] = "*";
            updatedFiles["package.json"] = JSON.stringify(pkg, null, 2);
          }
        } catch (e) {
          // Ignore invalid package JSON parser errors
        }
      }
    }
    return {
      packages: updatedPackages,
      files: updatedFiles,
      terminalLogs: [
        ...state.terminalLogs,
        `Installing package ${name}...`,
        `Package ${name} successfully installed.`
      ]
    };
  }),

  removePackage: (name) => set((state) => {
    const updatedPackages = state.packages.filter(p => p !== name);
    // Remove from configs
    const updatedFiles = { ...state.files };
    if (state.framework === 'flutter') {
      const lines = (updatedFiles["pubspec.yaml"] || "").split("\n");
      const filteredLines = lines.filter(l => !l.trim().startsWith(`${name}:`));
      updatedFiles["pubspec.yaml"] = filteredLines.join("\n");
    } else {
      const pkgJsonStr = updatedFiles["package.json"];
      if (pkgJsonStr) {
        try {
          const pkg = JSON.parse(pkgJsonStr);
          if (pkg.dependencies) {
            delete pkg.dependencies[name];
            updatedFiles["package.json"] = JSON.stringify(pkg, null, 2);
          }
        } catch (e) {
          // Ignore invalid package JSON parser errors
        }
      }
    }
    return {
      packages: updatedPackages,
      files: updatedFiles,
      terminalLogs: [
        ...state.terminalLogs,
        `Removing package ${name}...`,
        `Package ${name} removed.`
      ]
    };
  }),

  // Projects Management
  createProject: (name, framework) => set((state) => {
    const newProj: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || `Playground Project ${state.projects.length + 1}`,
      framework,
      files: framework === 'flutter' ? { ...FLUTTER_DEFAULT_FILES } : { ...RN_DEFAULT_FILES },
      activeFile: framework === 'flutter' ? 'lib/main.dart' : 'App.js',
      packages: framework === 'flutter' ? ['flutter', 'cupertino_icons'] : ['react', 'react-native', 'expo-linear-gradient', 'lucide-react-native']
    };
    return {
      projects: [...state.projects, newProj],
      activeProjectId: newProj.id,
      framework: newProj.framework,
      files: newProj.files,
      activeFile: newProj.activeFile,
      openTabs: newProj.framework === 'flutter' ? ['lib/main.dart', 'lib/home.dart', 'pubspec.yaml'] : ['App.js', 'package.json', 'README.md'],
      code: newProj.files[newProj.activeFile],
      packages: newProj.packages,
      terminalLogs: [
        `Created new ${framework.toUpperCase()} project: ${newProj.name}`,
        "Ready."
      ]
    };
  }),

  deleteProject: (id) => set((state) => {
    const updatedProjects = state.projects.filter(p => p.id !== id);
    const newActiveId = state.activeProjectId === id ? (updatedProjects[0]?.id || null) : state.activeProjectId;
    
    if (newActiveId) {
      const nextProj = updatedProjects.find(p => p.id === newActiveId)!;
      return {
        projects: updatedProjects,
        activeProjectId: newActiveId,
        framework: nextProj.framework,
        files: nextProj.files,
        activeFile: nextProj.activeFile,
        code: nextProj.files[nextProj.activeFile],
        packages: nextProj.packages,
        openTabs: Object.keys(nextProj.files)
      };
    } else {
      // Fallback to RN default
      return {
        projects: updatedProjects,
        activeProjectId: null,
        files: RN_DEFAULT_FILES,
        activeFile: 'App.js',
        framework: 'react-native',
        code: RN_DEFAULT_FILES['App.js'],
        openTabs: ['App.js', 'package.json', 'README.md']
      };
    }
  }),

  loadProject: (id) => {
    const { projects } = get();
    const proj = projects.find(p => p.id === id);
    if (!proj) return;
    
    set({
      activeProjectId: id,
      framework: proj.framework,
      files: proj.files,
      activeFile: proj.activeFile,
      code: proj.files[proj.activeFile],
      packages: proj.packages,
      openTabs: Object.keys(proj.files).slice(0, 3)
    });
  },

  duplicateProject: (id) => set((state) => {
    const orig = state.projects.find(p => p.id === id);
    if (!orig) return {};
    
    const dupe: Project = {
      ...orig,
      id: Math.random().toString(36).substr(2, 9),
      name: `${orig.name} (Copy)`
    };
    return {
      projects: [...state.projects, dupe]
    };
  }),

  renameProject: (id, newName) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, name: newName } : p)
  })),

  resetCode: () => {
    const { framework } = get();
    const defaultFiles = getInitialFiles(framework);
    const mainFile = framework === 'flutter' ? 'lib/main.dart' : 'App.js';
    set({
      files: defaultFiles,
      activeFile: mainFile,
      code: defaultFiles[mainFile as keyof typeof defaultFiles] || ""
    });
  },

  reset: () => {
    set({
      code: RN_DEFAULT_FILES["App.js"],
      framework: 'react-native',
      platform: 'react-native',
      device: 'iphone',
      template: 'blank',
      files: RN_DEFAULT_FILES,
      activeFile: "App.js",
      openTabs: ["App.js", "package.json", "README.md"],
      activeSidebarTab: 'explorer',
      terminalLogs: [
        "Welcome to MoboUI Cloud IDE v1.0.0",
        "Type 'help' to see list of available commands.",
        "Ready."
      ],
      consoleLogs: [],
      editorSettings: DEFAULT_SETTINGS,
      packages: ["react", "react-native", "expo-linear-gradient", "lucide-react-native"],
      activeProjectId: null
    });
  }
}));


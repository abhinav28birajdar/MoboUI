const fs = require('fs');

let content = fs.readFileSync('src/components/playground/PlaygroundIDE.tsx', 'utf8');

// 1. Add imports
content = content.replace(
  'import { usePlaygroundStore, EditorSettings } from "@/lib/store/playground-store";',
  'import { usePlaygroundStore, EditorSettings } from "@/lib/store/playground-store";\nimport { TEMPLATES_DATA, COMPONENT_LIBRARY, DOCS_DATA, TUTORIALS } from "@/lib/data/playground-templates";\nimport { FileExplorer } from "./file-explorer";\nimport { PlaygroundToolbar } from "./playground-toolbar";\nimport { MonacoEditorWrapper } from "./monaco-editor";\nimport { BottomPanel } from "./bottom-panel";\nimport { EmulatorPanel } from "./emulator-panel";'
);

// 2. Remove massive data constants (from '// Pre-defined template file replacements' to '];')
const dataRegex = /\/\/\s*Pre-defined template file replacements[\s\S]*?const TUTORIALS = \[[\s\S]*?\];/;
content = content.replace(dataRegex, '');

// 3. Remove handleTerminalSubmit
const terminalRegex = /\/\/\s*Run terminal commands[\s\S]*?handleTerminalSubmit[\s\S]*?},\s*100\);\r?\n\s*};/;
content = content.replace(terminalRegex, '');

// 4. Remove handleExportZIP and handleScreenshot
const exportRegex = /\/\/\s*Export current workspace as ZIP simulator[\s\S]*?toast\.success\("Device preview snapshot captured!"\);\r?\n\s*};/;
content = content.replace(exportRegex, '');

// 5. Replace Toolbar
const toolbarRegex = /\{\/\*\s*IDE CONTROL HEADER BAR\s*\*\/\}[\s\S]*?\{\/\*\s*WORKSPACE DIVIDER CONTAINER\s*\*\/\}/;
content = content.replace(toolbarRegex, '<PlaygroundToolbar />\n\n      {/* WORKSPACE DIVIDER CONTAINER */}');

// 6. Replace File Explorer Block
const explorerRegex = /\{\/\*\s*FILE EXPLORER VIEW\s*\*\/\}[\s\S]*?\{\/\*\s*COMPONENT LIBRARY PANEL\s*\*\/\}/;
content = content.replace(explorerRegex, '{/* FILE EXPLORER VIEW */}\n            {activeSidebarTab === \'explorer\' && (\n              <FileExplorer />\n            )}\n\n            {/* COMPONENT LIBRARY PANEL */}');

// 7. Replace Monaco Editor Block
const editorRegex = /\{\/\*\s*MONACO CODE EDITOR CANVAS\s*\*\/\}[\s\S]*?\{\/\*\s*RESIZABLE LOGS \/ TERMINAL LOWER CONTAINER\s*\*\/\}/;
content = content.replace(editorRegex, '{/* MONACO CODE EDITOR CANVAS */}\n          <MonacoEditorWrapper onMount={handleEditorDidMount} />\n\n          {/* RESIZABLE LOGS / TERMINAL LOWER CONTAINER */}');

// 8. Replace Bottom Panel
const bottomRegex = /\{\/\*\s*RESIZABLE LOGS \/ TERMINAL LOWER CONTAINER\s*\*\/\}[\s\S]*?\{\/\*\s*LIVE MOBILE PREVIEW COLUMN \(RIGHT SPLIT\)\s*\*\/\}/;
content = content.replace(bottomRegex, '{/* RESIZABLE LOGS / TERMINAL LOWER CONTAINER */}\n          <BottomPanel />\n        </div>\n\n        {/* LIVE MOBILE PREVIEW COLUMN (RIGHT SPLIT) */}');

// 9. Replace Emulator Panel
const emulatorRegex = /\{\/\*\s*LIVE MOBILE PREVIEW COLUMN \(RIGHT SPLIT\)\s*\*\/\}[\s\S]*?\{\/\*\s*FOOTER STATUS BAR\s*\*\/\}/;
content = content.replace(emulatorRegex, '{/* LIVE MOBILE PREVIEW COLUMN (RIGHT SPLIT) */}\n        <EmulatorPanel />\n\n      </div>\n\n      {/* FOOTER STATUS BAR */}');

// Also need to remove the unused state variables that were extracted
const unusedStatesRegex = /const \[deviceRotate[\s\S]*?const \[consoleTab[^;]*;/;
content = content.replace(unusedStatesRegex, '');

fs.writeFileSync('src/components/playground/PlaygroundIDE.tsx', content, 'utf8');
console.log('Refactoring complete!');

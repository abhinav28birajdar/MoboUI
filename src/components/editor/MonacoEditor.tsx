'use client';

import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface MonacoEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: 'javascript' | 'typescript' | 'dart';
}

export function MonacoEditor({ value, onChange, language }: MonacoEditorProps) {
    const { theme } = useTheme();

    return (
        <Editor
            height="100%"
            language={language}
            value={value}
            onChange={(newValue) => onChange(newValue || '')}
            theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
            options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                formatOnPaste: true,
                formatOnType: true,
            }}
        />
    );
}

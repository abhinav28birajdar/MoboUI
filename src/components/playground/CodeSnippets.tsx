"use client";

import { File, Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";


const SNIPPETS = [
    { id: "basic", label: "Basic View", code: `<View style={styles.container}><Text>Hello</Text></View>` },
    { id: "image", label: "Image", code: `<Image source={{uri: '...'}} style={{width: 100, height: 100}} />` },
    { id: "list", label: "FlatList", code: `<FlatList data={data} renderItem={render} />` },
    { id: "input", label: "TextInput", code: `<TextInput placeholder="Type here" style={styles.input} />` },
];

export function CodeSnippets() {
    /* Hook removed as no state is used yet */

    const handleApply = (snippet: string) => {
        // Basic append logic or replace?
        // Let's replace for now or append to end of return statement (hard to parse without AST).
        // Just replace for simplicity or copy to clipboard.
        navigator.clipboard.writeText(snippet);
        // Maybe show toast "Copied to clipboard"
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/5 w-64">
            <div className="h-10 flex items-center justify-between px-4 bg-muted/5 border-b border-white/5">
                <span className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Snippets</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus size={14} />
                </Button>
            </div>
            <ScrollArea className="flex-1">
                <div className="flex flex-col p-2 gap-1">
                    {SNIPPETS.map((snippet) => (
                        <div
                            key={snippet.id}
                            className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                            onClick={() => handleApply(snippet.code)}
                        >
                            <div className="flex items-center gap-3">
                                <File size={14} className="text-muted-foreground" />
                                <span className="text-sm font-medium">{snippet.label}</span>
                            </div>
                            <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

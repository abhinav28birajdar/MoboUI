"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

interface PlaygroundSplitViewProps {
    sidebarContent: React.ReactNode;
    editorContent: React.ReactNode;
    previewContent: React.ReactNode;
    consoleContent: React.ReactNode;
    toolbarContent?: React.ReactNode;
}

export function PlaygroundSplitView({
    sidebarContent,
    editorContent,
    previewContent,
    consoleContent,
    toolbarContent,
}: PlaygroundSplitViewProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
            {/* Toolbar */}
            {toolbarContent && (
                <div className="flex-none h-14 border-b border-white/5 bg-background z-10 px-4">
                    {toolbarContent}
                </div>
            )}

            {/* Main Content Area */}
            <ResizablePanelGroup direction="horizontal" className="flex-1">

                {/* Sidebar */}
                <ResizablePanel
                    defaultSize={15}
                    minSize={10}
                    maxSize={20}
                    collapsible={true}
                    onCollapse={() => setIsSidebarCollapsed(true)}
                    onExpand={() => setIsSidebarCollapsed(false)}
                    className={cn(isSidebarCollapsed && "min-w-[40px] transition-all duration-300 ease-in-out border-r border-white/5")}
                >
                    {isSidebarCollapsed ? (
                        <div className="flex h-full flex-col items-center py-4 bg-muted/5">
                            {/* Collapsed state icons could go here */}
                            <div className="w-1 h-full bg-border/50" />
                        </div>
                    ) : (
                        sidebarContent
                    )}
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Editor & Console Column */}
                <ResizablePanel defaultSize={50} minSize={30}>
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel defaultSize={75} minSize={20}>
                            <div className="h-full w-full relative">
                                {editorContent}
                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        <ResizablePanel
                            defaultSize={25}
                            minSize={5}
                            collapsible={true}
                            onCollapse={() => setIsConsoleCollapsed(true)}
                            onExpand={() => setIsConsoleCollapsed(false)}
                            className={cn("bg-black", isConsoleCollapsed && "min-h-[30px]")}
                        >
                            {isConsoleCollapsed ? (
                                <div className="h-8 flex items-center px-4 bg-muted/10 text-xs text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => setIsConsoleCollapsed(false)}>
                                    Show Console
                                </div>
                            ) : (
                                consoleContent
                            )}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Preview Panel */}
                <ResizablePanel defaultSize={35} minSize={20} className="bg-muted/5">
                    <div className="h-full w-full flex flex-col">
                        {previewContent}
                    </div>
                </ResizablePanel>

            </ResizablePanelGroup>
        </div>
    );
}

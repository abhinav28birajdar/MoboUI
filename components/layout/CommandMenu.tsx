"use client"

import * as React from "react"
import {
    Settings,
    Layout,
    Smartphone,
    BookOpen,
    Palette,
    Monitor
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { components } from "@/lib/data/components"
import { useRouter } from "next/navigation"

export default function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search components..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => runCommand(() => router.push("/components"))}>
                        <Layout className="mr-2 h-4 w-4" />
                        <span>Browse Library</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/playground"))}>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>Open Playground</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/themes"))}>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Theme Gallery</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Components">
                    {components.map((component) => (
                        <CommandItem
                            key={component.id}
                            value={component.name}
                            onSelect={() => runCommand(() => router.push(`/components/${component.framework === 'both' ? 'react-native' : component.framework}/${component.id}`))}
                        >
                            <Smartphone className="mr-2 h-4 w-4" />
                            <span>{component.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem onSelect={() => runCommand(() => router.push("/docs"))}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Documentation</span>
                        <CommandShortcut>⌘D</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}

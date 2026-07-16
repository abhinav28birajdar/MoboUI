'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Share2, RefreshCw } from 'lucide-react';
import { usePlaygroundStore } from '@/lib/store/playground-store';
import { toast } from 'sonner';

export function EditorToolbar() {
    const { platform, setPlatform, template, setTemplate, code } = usePlaygroundStore();

    const handleShare = () => {
        // Generate share URL
        const encoded = btoa(code);
        const url = `${window.location.origin}/playground?code=${encoded}&platform=${platform}`;
        navigator.clipboard.writeText(url);
        toast.success('Share link copied to clipboard!');
    };

    return (
        <div className="flex items-center justify-between border-b px-4 py-2 bg-muted/20">
            <div className="flex items-center space-x-2">
                <Select value={platform} onValueChange={(val: string) => setPlatform(val as 'react-native' | 'expo' | 'flutter')}>
                    <SelectTrigger className="w-[140px] h-8">
                        <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="react-native">React Native</SelectItem>
                        <SelectItem value="expo">Expo</SelectItem>
                        <SelectItem value="flutter">Flutter</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={template} onValueChange={(val: string) => setTemplate(val as 'blank' | 'button' | 'form' | 'list')}>
                    <SelectTrigger className="w-[140px] h-8">
                        <SelectValue placeholder="Template" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blank">Blank</SelectItem>
                        <SelectItem value="button">Button Example</SelectItem>
                        <SelectItem value="form">Form Example</SelectItem>
                        <SelectItem value="list">List Example</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => usePlaygroundStore.getState().reset()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                </Button>
            </div>
        </div>
    );
}

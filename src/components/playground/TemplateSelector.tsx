'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { usePlaygroundStore } from '@/lib/store/playground-store';

export function TemplateSelector() {
    const { template, setTemplate } = usePlaygroundStore();

    return (
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
    );
}

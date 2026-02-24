'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'; // Assuming shadcn table

interface Prop {
    name: string;
    type: string;
    default?: string;
    required: boolean;
    description: string;
}

interface PropsTableProps {
    props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
    if (!props.length) return <div>No props documented.</div>;

    return (
        <div className="my-6 border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.map((prop) => (
                        <TableRow key={prop.name}>
                            <TableCell className="font-mono font-medium">
                                {prop.name}{prop.required && <span className="text-red-500">*</span>}
                            </TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">{prop.type}</TableCell>
                            <TableCell className="font-mono text-xs">{prop.default || '-'}</TableCell>
                            <TableCell>{prop.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

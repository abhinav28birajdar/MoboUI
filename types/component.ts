export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
}

export interface Component {
    id: string;
    name: string;
    description: string;
    framework: 'react-native' | 'flutter' | 'both';
    category: string;
    tags: string[];
    code: {
        reactNative?: string;
        flutter?: string;
    };
    props?: ComponentProp[];
    preview: {
        image: string;
        thumbnail: string;
    };
    usage: string;
    relatedComponents: string[];
}

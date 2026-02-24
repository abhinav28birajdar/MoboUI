export interface Component {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    tags: string[];
    framework: 'react-native' | 'expo' | 'flutter';
    previewImage?: string;
    complexity: 'beginner' | 'intermediate' | 'advanced';
    code: {
        typescript?: string;
        javascript?: string;
        dart?: string;
    };
    props?: ComponentProp[];
    examples?: ComponentExample[];
    dependencies?: string[];
    installation?: string;
    usage?: string;
}

export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    default?: string;
    description: string;
}

export interface ComponentExample {
    title: string;
    description: string;
    code: string;
    preview?: string;
}

export interface ComponentCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    count: number;
}

export interface ComponentFilter {
    category?: string;
    framework?: 'react-native' | 'expo' | 'flutter';
    complexity?: 'beginner' | 'intermediate' | 'advanced';
    search?: string;
    tags?: string[];
}

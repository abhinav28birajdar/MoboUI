export interface Theme {
    id: string;
    name: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
    };
    borderRadius: number;
}

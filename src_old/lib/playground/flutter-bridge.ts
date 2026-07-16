export function encodeFlutterCode(code: string): string {
    try {
        return btoa(code);
    } catch (e) {
        console.error("Failed to encode Flutter code", e);
        return '';
    }
}

export const DARTPAD_URL = 'https://dartpad.dev/embed-flutter.html';

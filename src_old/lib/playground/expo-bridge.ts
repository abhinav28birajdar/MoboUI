// Utility to bridge communication between Editor and Expo Snack

export const SNACK_URL = 'https://snack.expo.dev/embedded';

export interface SnackMessage {
    type: 'updateCode';
    code: string;
    files: Record<string, string>;
}

export function sendToSnack(iframe: HTMLIFrameElement, code: string) {
    if (!iframe.contentWindow) return;

    iframe.contentWindow.postMessage({
        type: 'updateCode',
        code: code,
        files: {
            'App.js': code
        }
    }, '*'); // In production, specify exact origin
}

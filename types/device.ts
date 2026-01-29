export interface DeviceSpec {
    name: string;
    width: number;
    height: number;
    frame: 'ios' | 'android';
    statusBar: boolean;
    notch: boolean;
}

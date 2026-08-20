declare module 'lenis' {
    export default class Lenis {
        constructor(options?: Record<string, unknown>);
        raf(time: number): void;
        scrollTo(target: string | number, options?: Record<string, unknown>): void;
        destroy(): void;
    }
}

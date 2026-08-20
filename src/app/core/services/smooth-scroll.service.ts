import { Injectable, NgZone, OnDestroy } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService implements OnDestroy {
    private lenis: any = null;
    private rafId: number | null = null;
    private reducedMotion = false;

    constructor(private zone: NgZone) { }

    async init(): Promise<void> {
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (this.reducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
            return;
        }

        try {
            const mod = await import('lenis');
            const Lenis = mod.default;
            this.zone.runOutsideAngular(() => {
                this.lenis = new Lenis({
                    duration: 1.15,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true
                });

                const raf = (time: number) => {
                    this.lenis?.raf(time);
                    this.rafId = requestAnimationFrame(raf);
                };
                this.rafId = requestAnimationFrame(raf);
                document.documentElement.classList.add('lenis', 'lenis-smooth');
            });
        } catch {
            // Package missing / failed — keep native CSS smooth scroll
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    scrollTo(target: string | number, offset = 0): void {
        if (this.lenis) {
            this.lenis.scrollTo(target, { offset });
            return;
        }
        if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: this.reducedMotion ? 'auto' : 'smooth' });
            return;
        }
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: this.reducedMotion ? 'auto' : 'smooth' });
    }

    ngOnDestroy(): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }
        this.lenis?.destroy?.();
        this.lenis = null;
    }
}

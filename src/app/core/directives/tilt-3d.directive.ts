import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTilt3d]',
    standalone: true
})
export class Tilt3dDirective implements OnDestroy {
    @Input() tiltMax = 14;
    @Input() tiltScale = 1.04;

    private rafId: number | null = null;
    private reduced = false;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)');
    }

    @HostListener('mousemove', ['$event'])
    onMove(event: MouseEvent): void {
        if (this.reduced) return;
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);

        this.rafId = requestAnimationFrame(() => {
            const rect = this.el.nativeElement.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            const rotateY = (x - 0.5) * this.tiltMax * 2;
            const rotateX = (0.5 - y) * this.tiltMax * 2;
            this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
            this.renderer.setStyle(
                this.el.nativeElement,
                'transform',
                `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.tiltScale}, ${this.tiltScale}, 1)`
            );
        });
    }

    @HostListener('mouseleave')
    onLeave(): void {
        this.renderer.setStyle(
            this.el.nativeElement,
            'transform',
            'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
        );
        const clear = () => {
            this.renderer.removeStyle(this.el.nativeElement, 'will-change');
            this.el.nativeElement.removeEventListener('transitionend', clear);
        };
        this.el.nativeElement.addEventListener('transitionend', clear);
    }

    ngOnDestroy(): void {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    }
}

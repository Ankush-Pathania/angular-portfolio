import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appMagnet]',
    standalone: true
})
export class MagnetDirective implements OnDestroy {
    @Input() magnetPadding = 150;
    @Input() magnetStrength = 3;
    @Input() activeTransition = 'transform 0.3s ease-out';
    @Input() inactiveTransition = 'transform 0.6s ease-in-out';

    private active = false;
    private rafId: number | null = null;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) {
        this.renderer.setStyle(this.el.nativeElement, 'will-change', 'transform');
        this.renderer.setStyle(this.el.nativeElement, 'transition', this.inactiveTransition);
        this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }

        this.rafId = requestAnimationFrame(() => {
            const rect = this.el.nativeElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const offsetX = event.clientX - centerX;
            const offsetY = event.clientY - centerY;

            const near =
                event.clientX >= rect.left - this.magnetPadding &&
                event.clientX <= rect.right + this.magnetPadding &&
                event.clientY >= rect.top - this.magnetPadding &&
                event.clientY <= rect.bottom + this.magnetPadding;

            if (near) {
                if (!this.active) {
                    this.active = true;
                    this.renderer.setStyle(this.el.nativeElement, 'transition', this.activeTransition);
                }
                const x = offsetX / this.magnetStrength;
                const y = offsetY / this.magnetStrength;
                this.renderer.setStyle(
                    this.el.nativeElement,
                    'transform',
                    `translate3d(${x}px, ${y}px, 0)`
                );
            } else if (this.active) {
                this.active = false;
                this.renderer.setStyle(this.el.nativeElement, 'transition', this.inactiveTransition);
                this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(0, 0, 0)');
            }
        });
    }

    ngOnDestroy(): void {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }
    }
}

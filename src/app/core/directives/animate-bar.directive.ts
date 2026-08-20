import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAnimateBar]',
    standalone: true
})
export class AnimateBarDirective implements AfterViewInit, OnDestroy {
    @Input('appAnimateBar') targetLevel = 0;

    private observer?: IntersectionObserver;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        const node = this.el.nativeElement;
        this.renderer.setStyle(node, 'width', '0%');
        this.renderer.setStyle(node, 'transition', 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1)');

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.renderer.setStyle(node, 'width', `${this.targetLevel}%`);
            return;
        }

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        this.renderer.setStyle(node, 'width', `${this.targetLevel}%`);
                    });
                    this.observer?.disconnect();
                }
            },
            { threshold: 0.35 }
        );
        this.observer.observe(node);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}

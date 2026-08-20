import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appAnimateRing]',
    standalone: true
})
export class AnimateRingDirective implements AfterViewInit, OnDestroy {
    @Input('appAnimateRing') level = 0;
    @Input() ringCircumference = 283; // 2 * PI * 45

    private observer?: IntersectionObserver;

    constructor(
        private el: ElementRef<SVGCircleElement>,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        const node = this.el.nativeElement;
        const offset = this.ringCircumference;
        this.renderer.setStyle(node, 'stroke-dasharray', `${this.ringCircumference}`);
        this.renderer.setStyle(node, 'stroke-dashoffset', `${offset}`);
        this.renderer.setStyle(
            node,
            'transition',
            'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
        );

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.renderer.setStyle(
                node,
                'stroke-dashoffset',
                `${this.ringCircumference * (1 - this.level / 100)}`
            );
            return;
        }

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        this.renderer.setStyle(
                            node,
                            'stroke-dashoffset',
                            `${this.ringCircumference * (1 - this.level / 100)}`
                        );
                    });
                    this.observer?.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        this.observer.observe(node);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}

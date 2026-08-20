import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appFadeIn]',
    standalone: true
})
export class FadeInDirective implements AfterViewInit, OnDestroy {
    @Input() fadeDelay = 0;
    @Input() fadeDuration = 0.7;
    @Input() fadeX = 0;
    @Input() fadeY = 24;

    private observer?: IntersectionObserver;

    constructor(
        private el: ElementRef<HTMLElement>,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        const node = this.el.nativeElement;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.renderer.setStyle(node, 'opacity', '1');
            this.renderer.setStyle(node, 'transform', 'none');
            return;
        }

        this.renderer.setStyle(node, 'opacity', '0');
        this.renderer.setStyle(node, 'transform', `translate3d(${this.fadeX}px, ${this.fadeY}px, 0)`);
        this.renderer.setStyle(
            node,
            'transition',
            `opacity ${this.fadeDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${this.fadeDelay}s, transform ${this.fadeDuration}s cubic-bezier(0.22, 1, 0.36, 1) ${this.fadeDelay}s`
        );

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.renderer.setStyle(node, 'will-change', 'transform, opacity');
                    this.renderer.setStyle(node, 'opacity', '1');
                    this.renderer.setStyle(node, 'transform', 'translate3d(0, 0, 0)');
                    const clear = () => {
                        this.renderer.removeStyle(node, 'will-change');
                        node.removeEventListener('transitionend', clear);
                    };
                    node.addEventListener('transitionend', clear);
                    this.observer?.disconnect();
                }
            },
            { rootMargin: '50px', threshold: 0 }
        );

        this.observer.observe(node);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}

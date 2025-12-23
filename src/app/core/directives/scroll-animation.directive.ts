import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appScrollAnimation]',
    standalone: true
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
    private observer?: IntersectionObserver;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // Create IntersectionObserver to watch when element enters viewport
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add 'visible' class when element enters viewport
                        this.renderer.addClass(this.el.nativeElement, 'visible');
                        // Optional: Stop observing after animation triggers (one-time animation)
                        this.observer?.unobserve(this.el.nativeElement);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before element fully enters viewport
            }
        );

        // Start observing the element
        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy(): void {
        // Clean up observer when directive is destroyed
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

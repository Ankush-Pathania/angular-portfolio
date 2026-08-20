import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    Renderer2
} from '@angular/core';

/**
 * Reusable sticky-stack enhancer.
 *
 * Markup expected:
 *   .sticky-stack-slot          (full-height scroll range + z-index)
 *     .sticky-stack-card        (position: sticky — no transforms)
 *       .sticky-stack-inner     (scale/opacity applied here)
 *
 * Later cards get higher z-index so each one slides up and covers the
 * previous. Scale/dim runs on the inner layer only — never on the sticky
 * shell — so stacking contexts stay reliable.
 */
@Directive({
    selector: '[appStickyStack]',
    standalone: true
})
export class StickyStackDirective implements AfterViewInit, OnDestroy {
    /** Max scale-down when a card is being replaced (0.04–0.06). */
    @Input() stackScaleAmount = 0.05;
    /** Opacity drop when fully replaced (0–1). */
    @Input() stackDimAmount = 0.18;
    @Input() stackSlotSelector = '.sticky-stack-slot';
    @Input() stackCardSelector = '.sticky-stack-card';
    @Input() stackInnerSelector = '.sticky-stack-inner';

    private slots: HTMLElement[] = [];
    private cards: HTMLElement[] = [];
    private inners: HTMLElement[] = [];
    private rafId: number | null = null;
    private ticking = false;
    private enabled = true;
    private mqMobile?: MediaQueryList;
    private mqMotion?: MediaQueryList;

    private onScroll = (): void => {
        if (!this.enabled || this.ticking) return;
        this.ticking = true;
        this.rafId = requestAnimationFrame(() => {
            this.update();
            this.ticking = false;
        });
    };

    private onBreakpointChange = (): void => {
        this.refreshMode();
        this.update();
    };

    constructor(
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private zone: NgZone
    ) { }

    ngAfterViewInit(): void {
        this.mqMobile = window.matchMedia('(max-width: 767px)');
        this.mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.mqMobile.addEventListener('change', this.onBreakpointChange);
        this.mqMotion.addEventListener('change', this.onBreakpointChange);

        requestAnimationFrame(() => {
            this.collect();
            this.refreshMode();
            this.zone.runOutsideAngular(() => {
                window.addEventListener('scroll', this.onScroll, { passive: true });
                window.addEventListener('resize', this.onScroll, { passive: true });
            });
            this.update();
        });
    }

    refresh(): void {
        this.collect();
        this.refreshMode();
        this.update();
    }

    private collect(): void {
        const root = this.host.nativeElement;
        this.slots = Array.from(root.querySelectorAll<HTMLElement>(this.stackSlotSelector));
        this.cards = this.slots.map(
            (slot) => slot.querySelector<HTMLElement>(this.stackCardSelector) ?? slot
        );
        this.inners = this.slots.map((slot, i) => {
            return (
                slot.querySelector<HTMLElement>(this.stackInnerSelector) ??
                this.cards[i]
            );
        });

        // Later cards paint above earlier ones (cover stack)
        this.slots.forEach((slot, index) => {
            const z = index + 1;
            this.renderer.setStyle(slot, 'z-index', `${z}`);
            this.renderer.setStyle(this.cards[index], 'z-index', `${z}`);
        });
    }

    private refreshMode(): void {
        const mobile = this.mqMobile?.matches ?? false;
        const reduce = this.mqMotion?.matches ?? false;
        this.enabled = !mobile && !reduce;

        this.host.nativeElement.classList.toggle('sticky-stack--active', this.enabled);
        this.host.nativeElement.classList.toggle('sticky-stack--mobile', mobile);
        this.host.nativeElement.classList.toggle('sticky-stack--reduced', reduce);

        if (!this.enabled) {
            this.inners.forEach((inner) => {
                this.renderer.setStyle(inner, 'transform', 'none');
                this.renderer.setStyle(inner, 'opacity', '1');
                this.renderer.removeStyle(inner, 'will-change');
            });
        }
    }

    private update(): void {
        if (!this.enabled || !this.slots.length) return;

        this.slots.forEach((slot, index) => {
            const inner = this.inners[index];
            if (!inner) return;

            // How far this card's slot has scrolled past the stick point —
            // used to scale/dim the front card as the next one replaces it.
            const rect = slot.getBoundingClientRect();
            const progress = Math.min(
                1,
                Math.max(0, -rect.top / Math.max(rect.height * 0.65, 1))
            );

            const scale = 1 - progress * this.stackScaleAmount;
            const opacity = 1 - progress * this.stackDimAmount;

            this.renderer.setStyle(inner, 'will-change', 'transform, opacity');
            this.renderer.setStyle(inner, 'transformOrigin', 'top center');
            this.renderer.setStyle(inner, 'transform', `scale(${scale})`);
            this.renderer.setStyle(inner, 'opacity', `${opacity}`);
        });
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
        this.mqMobile?.removeEventListener('change', this.onBreakpointChange);
        this.mqMotion?.removeEventListener('change', this.onBreakpointChange);
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    }
}

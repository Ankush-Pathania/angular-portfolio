import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-marquee',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './marquee.component.html',
    styleUrl: './marquee.component.scss'
})
export class MarqueeComponent implements AfterViewInit, OnDestroy {
    @ViewChild('section', { static: true }) sectionRef!: ElementRef<HTMLElement>;

    row1Offset = -200;
    row2Offset = 200;

    readonly images = [
        'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
        'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
        'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
        'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
        'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
        'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
        'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
        'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
        'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
        'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
        'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
        'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
        'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
        'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
        'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
        'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
        'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
        'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
        'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
        'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
        'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
    ];

    row1: string[] = [];
    row2: string[] = [];

    private rafId: number | null = null;
    private ticking = false;
    private onScroll = (): void => {
        if (this.ticking) return;
        this.ticking = true;
        this.rafId = requestAnimationFrame(() => {
            this.updateOffsets();
            this.ticking = false;
        });
    };

    ngAfterViewInit(): void {
        const first = this.images.slice(0, 11);
        const second = this.images.slice(11);
        this.row1 = [...first, ...first, ...first];
        this.row2 = [...second, ...second, ...second];
        this.updateOffsets();
        window.addEventListener('scroll', this.onScroll, { passive: true });
    }

    private updateOffsets(): void {
        const section = this.sectionRef?.nativeElement;
        if (!section) return;
        const sectionTop = section.offsetTop;
        const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        this.row1Offset = offset - 200;
        this.row2Offset = -(offset - 200);
    }

    trackByIndex(index: number): number {
        return index;
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.onScroll);
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }
    }
}

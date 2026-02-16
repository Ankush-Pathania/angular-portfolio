import { Injectable, signal } from '@angular/core';
import { Profile, Skill, Experience, Project, Education, SocialLink } from '../models/portfolio.model';

@Injectable({
    providedIn: 'root'
})
export class PortfolioDataService {
    // Profile Information
    profile = signal<Profile>({
        name: 'Ankush Pathania',
        role: 'Web Designer & Frontend Developer',
        tagline: 'Crafting exceptional digital experiences with modern web technologies',
        email: 'apathania611@gmail.com',
        phone: '6286603909',
        location: 'TDI Green Enclave, Mohali, Punjab',
        summary: 'Experienced Web Designer and Frontend Developer with 3+ years of expertise in creating responsive, user-friendly websites and applications. Skilled in React, Angular, HTML, CSS, SCSS, JavaScript, jQuery, and modern development tools. Proven track record of delivering 50+ successful projects with 100% client satisfaction. Strong communication skills and experience collaborating with cross-functional teams across different time zones.'
    });

    // Skills organized by category
    skills = signal<Skill[]>([
        // Frontend Development
        { name: 'HTML', level: 95, category: 'frontend' },
        { name: 'CSS', level: 90, category: 'frontend' },
        { name: 'SCSS', level: 88, category: 'frontend' },
        { name: 'JavaScript', level: 40, category: 'frontend' },
        { name: 'jQuery', level: 40, category: 'frontend' },
        { name: 'React', level: 60, category: 'frontend' },
        { name: 'Angular', level: 40, category: 'frontend' },
        { name: 'Wordpress', level: 70, category: 'frontend' },
        { name: 'Elementor', level: 70, category: 'frontend' },
        { name: 'Bootstrap', level: 88, category: 'tools' },

        // Tools & Technologies
        { name: 'Figma', level: 85, category: 'tools' },
        { name: 'GitHub', level: 85, category: 'tools' },
        { name: 'GIMP', level: 75, category: 'tools' },
        { name: 'Photoshop', level: 50, category: 'tools' },
        { name: 'ClickUp', level: 80, category: 'tools' },

        // Performance & SEO Tools
        { name: 'PageSpeed Insights', level: 90, category: 'tools' },
        { name: 'Lighthouse', level: 88, category: 'tools' },
        { name: 'Google Analytics', level: 82, category: 'tools' },

        // Coding Tools & IDEs
        { name: 'VS Code', level: 95, category: 'tools' },
        { name: 'Cursor', level: 85, category: 'tools' },
        { name: 'Sublime Text', level: 80, category: 'tools' },
        { name: 'Antigravity', level: 90, category: 'tools' },

        // AI Tools & Search Engines
        { name: 'ChatGPT', level: 90, category: 'tools' },
        { name: 'DeepSeek', level: 85, category: 'tools' },
        { name: 'Google Gemini', level: 88, category: 'tools' },
        { name: 'Perplexity AI', level: 82, category: 'tools' },

        // Professional Skills
        { name: 'Responsive Design', level: 95, category: 'professional' },
        { name: 'UI/UX Design', level: 90, category: 'professional' },
        { name: 'Performance Optimization', level: 85, category: 'professional' },
        { name: 'Speed Optimization', level: 88, category: 'professional' },
        { name: 'SEO', level: 85, category: 'professional' },
        { name: 'Cross-browser Compatibility', level: 90, category: 'professional' },
        { name: 'Version Control (Git)', level: 85, category: 'professional' },
        { name: 'Team Collaboration', level: 90, category: 'professional' },
    ]);

    // Professional Experience
    experience = signal<Experience[]>([
        {
            company: 'Meander Software - WONDRFLY',
            role: 'Web Designer / UI Developer',
            period: '2023 - Present',
            location: '',
            description: 'Working on WONDRFLY platform (www.wondrfly.com), a comprehensive kids\' activities platform connecting parents with local providers.',
            technologies: ['Angular', 'HTML', 'CSS', 'SCSS', 'Bootstrap', 'GitHub', 'Figma'],
            achievements: [
                'Improved website performance by 40% through optimization techniques',
                'Redesigned interface components for enhanced user experience',
                'Collaborated with international teams across different time zones',
                'Implemented responsive designs using advanced media queries',
                'Maintained code quality using GitHub workflows and SCSS best practices'
            ]
        },
        {
            company: 'Aarvik Infotech',
            role: 'Web Designer',
            period: '2022 - 2023',
            location: 'Punjab, India',
            description: 'Designed and developed websites for various clients with a focus on international client relationships and custom web solutions.',
            technologies: ['HTML', 'CSS', 'SCSS', 'Bootstrap', 'Angular', 'GitHub', 'GIMP'],
            achievements: [
                'Delivered 20+ successful projects for international clients',
                'Maintained 100% client satisfaction through clear communication',
                'Reduced client development time by 30% through efficient workflows',
                'Built responsive websites using advanced media query techniques',
                'Managed client relationships across different cultural backgrounds'
            ]
        },
        {
            company: 'Tech Mahindra Institution',
            role: 'Frontend Development (Contract)',
            period: '2021 - 2022',
            location: 'India',
            description: 'Entry-level position focused on web development fundamentals and industry best practices.',
            technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'jQuery'],
            achievements: [
                'Successfully completed comprehensive web development training',
                'Built first commercial website following industry standards',
                'Learned responsive design principles and implementation'
            ]
        }
    ]);

    // Featured Projects
    projects = signal<Project[]>([
        {
            title: 'WONDRFLY Platform',
            description: 'Comprehensive kids\' activities platform connecting parents with local providers. Features advanced search, filtering, and booking capabilities with a focus on user experience and performance.',
            technologies: ['Angular', 'CSS', 'SCSS', 'Bootstrap', 'GitHub', 'Figma'],
            url: 'https://www.wondrfly.com',
            features: [
                'Advanced search and filtering system',
                'Responsive design for all devices',
                'Real-time booking capabilities',
                'Performance optimized (40% improvement)',
                'Collaborative development through GitHub'
            ]
        },
        {
            title: 'Meander Software - Corporate Website',
            description: 'Professional corporate website for Meander Software, a leading app development company. Features modern design, service showcases, and client portfolio displays.',
            technologies: ['Vue.js', 'HTML', 'CSS', 'JavaScript', 'Google Analytics'],
            url: 'https://meander.software',
            features: [
                'Modern, professional UI/UX design',
                'Interactive service demonstrations',
                'Client portfolio showcase',
                'Multi-page architecture with smooth navigation',
                'SEO optimization and analytics integration'
            ]
        },
        {
            title: 'CRM Dashboard (HTML + BOOTSTRAP)',
            description: 'This project is a responsive admin dashboard interface built entirely using HTML and Bootstrap, focusing on clean layout structure, usability, and modern UI patterns.',
            technologies: ['HTML','Bootstrap'],
           url: 'https://assignment-rudra.netlify.app/',
            features: [
                 'Sidebar navigation with structured dashboard layout',
    'Analytics cards displaying key business metrics',
    'Responsive grid system for all screen sizes',
    'Clean admin UI with Bootstrap components',
    'Consistent spacing and typography system'
            ]
        },
        {
            title: 'Pet Services Landing Page',
            description: 'This project is a modern pet services landing page that I first designed in Figma and then developed into a fully responsive website. The goal was to maintain pixel-perfect accuracy while translating the design into clean, structured front-end code.',
            technologies: ['HTML', 'SCSS', 'JavaScript', 'Bootstrap'],
            url: 'https://wuffet.netlify.app/',
            features: [
                  'Pixel-perfect Figma-to-code implementation',
    'Fully responsive layout across devices',
    'Modern hero section with strong visual hierarchy',
    'Clean typography and structured spacing system',
    'Reusable UI components and Bootstrap grid layout'
            ]
        },
        {
            title: 'GTG Perfumes landing page',
            description: 'The GTG Perfumes landing page is a modern, visually engaging website built using HTML, CSS, and JavaScript. The project focuses on elegant presentation, smooth user interaction, and a premium aesthetic that reflects a fragrance brand identity.',
            technologies: ['HTML', 'Bootstrap', 'CSS', 'JavaScript'],
            url: 'https://assignment-frontend-ankush.netlify.app/',
            features: [
                'JavaScript-powered animated counter for dynamic statistics',
  'Interactive carousel where selected thumbnails expand into a main preview image',
  'Scroll reveal animations for engaging content transitions',
  'Sticky header for smooth navigation and better usability',
  'Modern UI interactions to enhance user experience'
            ]
        },
        {
            title: 'Health & Nutrition Landing Page',
            description: 'This project is a modern health and nutrition landing page that was first designed in Figma and then developed using HTML, CSS, and Bootstrap.',
            technologies: ['Angular', 'Bootstrap', 'Chart.js'],
            url: 'https://amrit-deol.netlify.app/',
            features: [
  'Pixel-perfect Figma-to-code implementation',
  'Modern hero section with strong visual hierarchy',
  'Sticky navigation for smooth browsing',
  'Optimized layout for cross-device compatibility',
  'Brand-focused visual styling and layout consistency'
]
        },
        {
            title: 'International Client Portfolio Websites',
            description: 'Collection of 20+ responsive portfolio websites for various international clients in different industries including photography, design, and business services.',
            technologies: ['HTML', 'CSS', 'SCSS', 'Bootstrap', 'JavaScript', 'jQuery'],
            features: [
                'Custom designs tailored to client needs',
                'Fully responsive across all devices',
                'SEO-optimized structure',
                'Cross-browser compatibility',
                'Performance-optimized loading'
            ]
        },
        {
            title: 'E-commerce Product Management',
            description: 'Modern e-commerce platform with product catalog, shopping cart, checkout system, and comprehensive admin dashboard for inventory and order management.',
            technologies: ['HTML', 'CSS', 'SCSS', 'Bootstrap', 'JavaScript', 'jQuery'],
            features: [
                'Product catalog with advanced filtering',
                'Shopping cart and checkout flow',
                'Inventory management system',
                'Order tracking and fulfillment',
                'Sales analytics and reporting',
                'Mobile-responsive design'
            ]
        }
    ]);

    // Education
    education = signal<Education[]>([
        {
            degree: 'Bachelor of Arts',
            institution: 'Guru Nanak Dev University, Amritsar',
            period: '2017 - 2020',
            description: 'Completed undergraduate studies with focus on liberal arts and general education. Developed strong analytical and communication skills essential for client interactions.'
        },
        {
            degree: 'Computer Science Diploma',
            institution: 'BSF IT Bangalore',
            period: '2012 - 2015',
            description: 'Specialized in computer science and information technology. Gained fundamental knowledge in programming, web development, and computer systems.'
        }
    ]);

    // Social Links
    socialLinks = signal<SocialLink[]>([
        {
            platform: 'LinkedIn',
            url: 'https://www.linkedin.com/in/ankush-pathania',
            icon: 'linkedin'
        },
        {
            platform: 'GitHub',
            url: 'https://github.com/Ankush-Pathania',
            icon: 'github'
        },
        {
            platform: 'Email',
            url: 'mailto:apathania611@gmail.com',
            icon: 'email'
        },
        {
            platform: 'Phone',
            url: 'tel:+916286603909',
            icon: 'phone'
        }
    ]);

    constructor() { }

    // Getter methods for categorized skills
    getFrontendSkills(): Skill[] {
        return this.skills().filter(skill => skill.category === 'frontend');
    }

    getToolsSkills(): Skill[] {
        return this.skills().filter(skill => skill.category === 'tools');
    }

    getProfessionalSkills(): Skill[] {
        return this.skills().filter(skill => skill.category === 'professional');
    }
}

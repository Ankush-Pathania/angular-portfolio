// Portfolio Data Models
export interface Profile {
    name: string;
    role: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
}

export interface Skill {
    name: string;
    level: number; // 0-100
    category: 'frontend' | 'tools' | 'professional';
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    technologies: string[];
    achievements: string[];
}

export interface ProjectGallery {
    leftTop: string;
    leftBottom: string;
    right: string;
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    features?: string[];
    image?: string;
    /** Optional flat image list (leftTop, leftBottom, right). Prefer gallery when both exist. */
    images?: string[];
    url?: string;
    category?: string;
    gallery?: ProjectGallery;
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
    description: string;
    type?: 'degree' | 'diploma' | 'internship';
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

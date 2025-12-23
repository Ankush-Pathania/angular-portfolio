# Ankush Pathania - Premium Angular Portfolio

A top-1% personal portfolio website built with Angular 17 and Three.js, featuring exceptional modern design and high-quality 3D animations.

## 🚀 Features

- **Modern Angular Architecture**: Standalone components, Signals, strict TypeScript
- **Three.js Animations**: Particle systems, floating geometries, mouse interactions (60 FPS optimized)
- **Premium Design**: Glassmorphism, smooth gradients, vibrant colors, modern typography
- **Dark/Light Mode**: Seamless theme switching with CSS variables
- **Fully Responsive**: Mobile-first design with smooth animations
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠 Tech Stack

- **Angular 17** - Modern web framework
- **Three.js** - 3D graphics and animations
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with CSS variables
- **Tailwind CSS** - Utility-first CSS framework

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## 🎨 Project Structure

```
angular-portfolio/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/          # Portfolio data, Three.js, Theme services
│   │   │   └── models/            # TypeScript interfaces
│   │   ├── components/
│   │   │   ├── hero/              # Hero section with Three.js
│   │   │   ├── about/             # About section
│   │   │   ├── skills/            # Skills with progress bars
│   │   │   ├── experience/        # Work experience timeline
│   │   │   ├── projects/          # Featured projects
│   │   │   ├── resume/            # Education & download CV
│   │   │   ├── contact/           # Contact form
│   │   │   └── shared/            # Navigation, theme toggle
│   │   ├── app.component.ts       # Main app component
│   │   └── app.config.ts          # App configuration
│   ├── styles/
│   │   ├── _variables.scss        # Design tokens & CSS variables
│   │   ├── _animations.scss       # Keyframe animations
│   │   └── styles.scss            # Global styles
│   └── assets/                    # Static assets
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies
```

## 🎯 Sections

1. **Hero** - Full-screen with Three.js particle background
2. **About** - Professional summary and highlights
3. **Skills** - Categorized skills with animated progress bars
4. **Experience** - Work history with timeline
5. **Projects** - Featured projects with hover effects
6. **Resume** - Education and CV download
7. **Contact** - Contact form and social links

## 🎨 Design System

### Colors
- **Primary Accent**: Purple (`hsl(260, 80%, 65%)`)
- **Secondary Accent**: Cyan (`hsl(200, 90%, 60%)`)
- **Dark Mode**: Dark backgrounds with high contrast
- **Light Mode**: Clean, bright interface

### Typography
- **Headings**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Fluid sizing**: Responsive with `clamp()`

### Animations
- Smooth scroll animations
- Hover effects with depth
- Three.js particle systems
- Glassmorphism effects

## 🚀 Development

```bash
# Start development server
npm start

# Open browser
# Navigate to http://localhost:4200
```

## 📝 Customization

### Update Portfolio Data
Edit `src/app/core/services/portfolio-data.service.ts` to update:
- Personal information
- Skills and proficiency levels
- Work experience
- Projects
- Education

### Modify Theme
Edit `src/styles/_variables.scss` to customize:
- Colors
- Spacing
- Typography
- Shadows and effects

### Adjust Three.js Scene
Edit `src/app/core/services/three.service.ts` to modify:
- Particle count and colors
- Geometric shapes
- Animation speeds
- Mouse interaction sensitivity

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

© 2024 Ankush Pathania. All rights reserved.

## 🙏 Acknowledgments

- Design inspired by Apple, Stripe, Linear, and Vercel
- Three.js for 3D graphics
- Angular team for the amazing framework

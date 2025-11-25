# ClubVerse Site

A modern, Apple-style website built with Next.js 14, TypeScript, Tailwind CSS, and MDX support.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS with dark theme
- 📝 MDX page support
- 🎯 TypeScript for type safety
- 🚀 Optimized for AWS deployment
- 📱 Responsive design
- 🎭 Apple-style minimal aesthetic

## Project Structure

```
clubverse-site/
├── app/
│   ├── components/
│   │   └── Hero.tsx          # Hero component
│   ├── pricing/
│   │   ├── layout.tsx        # Pricing page layout
│   │   └── page.mdx          # Pricing page content
│   ├── features/
│   │   ├── layout.tsx        # Features page layout
│   │   └── page.mdx          # Features page content
│   ├── contact/
│   │   ├── layout.tsx        # Contact page layout
│   │   └── page.mdx          # Contact page content
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global styles
│   └── mdx-components.tsx    # MDX component configuration
├── styles/                   # Additional styles (if needed)
├── public/                   # Static assets
├── next.config.ts            # Next.js configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Deployment to AWS Amplify

AWS Amplify is the recommended deployment method for this Next.js application. It provides automatic builds, CI/CD, and optimized hosting.

### Option 1: Deploy via AWS Amplify Console (Recommended)

1. **Prepare your repository**
   - Push your code to a Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)

2. **Connect to AWS Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Select your Git provider and repository
   - Choose the branch to deploy (usually `main` or `master`)

3. **Configure Build Settings**
   - AWS Amplify will auto-detect Next.js and use these build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
   - If auto-detection doesn't work, manually add an `amplify.yml` file (see below)

4. **Review and Deploy**
   - Review the settings and click "Save and deploy"
   - Amplify will build and deploy your application
   - Your site will be available at `https://<app-id>.amplifyapp.com`

5. **Custom Domain (Optional)**
   - In the Amplify console, go to "Domain management"
   - Add your custom domain and follow the DNS configuration steps

### Option 2: Create amplify.yml Configuration File

Create an `amplify.yml` file in the root of your project:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Environment Variables

If you need environment variables:

1. In AWS Amplify Console, go to your app
2. Navigate to "Environment variables"
3. Add your variables (e.g., `NEXT_PUBLIC_API_URL`)
4. Redeploy your app

### Build Optimization

The project is configured with:
- `output: "standalone"` - Optimized for server-side rendering
- Image optimization enabled
- Compression enabled
- SWC minification enabled

### Alternative: Static Export for S3 + CloudFront

If you prefer static hosting on S3 + CloudFront:

1. Update `next.config.ts`:
   ```typescript
   output: "export", // Change from "standalone" to "export"
   ```

2. Build the static export:
   ```bash
   npm run build
   ```

3. Upload the `out` directory to S3 and configure CloudFront

**Note:** Static export has limitations (no API routes, no server-side features). AWS Amplify is recommended for full Next.js features.

## Development

### Adding New MDX Pages

1. Create a new folder in `app/` (e.g., `app/about/`)
2. Add a `layout.tsx` file for the page layout
3. Add a `page.mdx` file for the content
4. The route will be available at `/about`

### Styling

- Tailwind CSS is configured with dark theme by default
- Custom styles can be added to `app/globals.css`
- Use Tailwind utility classes for styling
- Inter font is loaded via Google Fonts

### Components

Reusable components are in `app/components/`. Import them in your pages:

```tsx
import Hero from "./components/Hero";
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **MDX** - Markdown with JSX support
- **Inter Font** - Modern sans-serif typography

## License

Private project - All rights reserved

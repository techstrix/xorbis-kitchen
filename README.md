# xbori's kitchen - Sanity CMS Blog

A beautiful, modern blog frontend built with React, TypeScript, and Sanity CMS. Features a warm, inviting design with orange and cream tones perfect for a culinary blog.

## Features

- **Modern Design**: Clean, responsive layout with smooth animations and hover effects
- **Sanity CMS Integration**: Fetches blog posts using GROQ queries
- **Portable Text Rendering**: Rich text content with proper formatting
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **TypeScript**: Full type safety throughout the application
- **Framer Motion**: Smooth animations and micro-interactions
- **Shadcn/ui Components**: Beautiful, accessible UI components

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible React components
- **Framer Motion** - Animation library for React
- **React Router** - Client-side routing
- **Sanity Client** - Official Sanity JavaScript client
- **Portable Text** - Rich text rendering for Sanity content

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Sanity CMS project with blog posts

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd xbori-kitchen-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Sanity configuration:
   ```env
   VITE_SANITY_PROJECT_ID=your_sanity_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_TOKEN=your_sanity_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Sanity CMS Setup

Your Sanity CMS should have a `post` document type with the following fields:

```javascript
{
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ]
          }
        }
      ]
    }
  ]
}
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn/ui components
│   ├── Header.tsx       # Blog header with title
│   ├── PostCard.tsx     # Individual post card component
│   ├── PostDetail.tsx   # Full post view component
│   ├── Footer.tsx       # Footer with Sanity attribution
│   └── theme-provider.tsx
├── lib/
│   ├── sanity.ts        # Sanity client and queries
│   └── utils.ts         # Utility functions
├── pages/
│   └── HomePage.tsx     # Main blog page
├── types/
│   └── sanity.ts        # TypeScript types
└── App.tsx              # Main app component with routing
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Colors
The design uses a warm color palette defined in `tailwind.config.js`:
- Orange: Custom orange shades from 50 to 900
- Cream: Custom cream shades from 50 to 900

### Typography
The blog uses the Inter font family for clean, readable text.

### Animations
Framer Motion powers the smooth animations throughout the app, including:
- Staggered card animations on the homepage
- Page transitions
- Hover effects
- Loading states

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
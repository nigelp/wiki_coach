# Wiki Coach

A web application that helps users create and format Wikipedia articles with a guided process.

## Features

- Interactive article editor with real-time preview
- Wikipedia-style formatting
- Dark mode support
- Local storage for work in progress
- Save and load functionality for drafts
- Preview in Wikipedia format

## Development

1. Clone the repository:
```bash
git clone https://github.com/nigelp/wiki_coach.git
cd wiki_coach
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Building for Production

To create a production build:

```bash
npm run build
```

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file contains the necessary build settings and redirect rules for the Single Page Application.

To deploy:

1. Push your changes to the GitHub repository
2. Connect your repository to Netlify
3. Netlify will automatically build and deploy your site

## License

MIT
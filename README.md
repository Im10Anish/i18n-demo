# Next.js i18n Demo Application

A production-grade Next.js application demonstrating internationalization (i18n) with component-based translations, DeepL integration, and smooth language transitions.

## Features

- **Component-based translation organization** - Each UI component has its own translation files
- **URL remains unchanged during language switching** - Language preferences stored in cookies
- **Smooth text transitions** - Animated text changes using Framer Motion
- **Automated translation** - Integration with DeepL API for professional-quality translations
- **Developer-friendly workflow** - Only English content needs to be managed, other languages are auto-translated

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- DeepL API key (free tier available) - [Get a key here](https://www.deepl.com/pro-api)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-i18n-demo.git
   cd nextjs-i18n-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your DeepL API key:

   ```
   DEEPL_API_KEY=your-deepl-api-key
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/app                    # Next.js app directory
  /components           # React components
  /hooks                # Custom React hooks
  /i18n                 # i18n configuration
  /utils                # Utility functions
/locales                # Translation files
  /en-US                # English translations
    /HomePage.json      # Component-specific translations
    /Features.json
    /LanguageSelector.json
  /es-MX                # Spanish translations
  /fr-FR                # French translations
/scripts                # Utility scripts
  /translate.ts         # Translation script
```

## Translation Workflow

1. Define new content in English in the appropriate component translation file (e.g., `/locales/en-US/HomePage.json`)
2. Run the translation script to generate translations for all other languages:
   ```bash
   npm run translate
   # or
   yarn translate
   ```
3. Review and adjust generated translations if needed

## Extending the Application

### Adding a New Component with Translations

1. Create your component in `/app/components/`
2. Create a translation file in `/locales/en-US/YourComponent.json`
3. Use the `useComponentTranslation` hook to access translations:
   ```tsx
   const { translations } = useComponentTranslation("YourComponent");
   ```
4. Run the translation script to generate translations for other languages

### Adding a New Language

1. Add the new locale code to the `i18n.locales` array in `/app/i18n/settings.ts` . Supported Locale supported by DeepL listed [here](https://developers.deepl.com/docs/resources/supported-languages)
2. Run the translation script to generate translations for the new language

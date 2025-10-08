# Modern ECommerce Store

A fully modernized, production-ready ecommerce site built with Next.js 12, React 18, Tailwind CSS, Framer Motion, and Stripe. Features smooth animations, modern UI design, and best practices for 2025.

## ✨ Features

- 🛍️ Full shopping cart functionality with localStorage persistence
- 💳 Stripe payment integration
- 📱 Responsive mobile-first design
- 🎨 Modern UI with glassmorphism and gradient effects
- ✨ Smooth page transitions and animations with Framer Motion
- 📦 Category-based product organization
- 🔐 Admin panel (authentication ready)
- ⚡ Fast static site generation with Next.js
- 🔒 Security headers and best practices
- 🎯 SEO optimized with proper meta tags
- 🚀 Deployment ready for Vercel and Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Stripe account for payment processing

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd jamstack-ecommerce
```

2. **Install dependencies**

```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Modern ECommerce Store"
```

Get your Stripe keys from: https://dashboard.stripe.com/apikeys

4. **Run the development server**

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── components/          # Reusable UI components
│   ├── ErrorBoundary.js # Error handling component
│   ├── Image.js        # Optimized image component
│   ├── CartLink.js     # Floating cart button
│   └── ...
├── context/            # React Context for global state
│   └── mainContext.js  # Modern hooks-based cart context
├── layouts/            # Page layout wrapper
├── lib/                # Utility libraries
│   └── env.js         # Environment variable validation
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.js        # App wrapper with ErrorBoundary
│   ├── _error.js      # Custom error page
│   ├── 404.js         # Custom 404 page
│   └── ...
├── public/             # Static assets
│   └── robots.txt     # SEO robots configuration
├── styles/             # Global styles
├── utils/              # Helper functions and data providers
├── .env.example        # Environment variables template
├── .eslintrc.json     # ESLint configuration
├── .prettierrc        # Prettier configuration
├── next.config.js     # Next.js configuration with security headers
├── vercel.json        # Vercel deployment config
├── netlify.toml       # Netlify deployment config
└── CLAUDE.md          # AI assistant documentation
```

## 🔧 Configuration

### Inventory Data

Update `utils/inventoryProvider.js` to connect to your own inventory API or database. The default setup uses static data from `utils/inventory.js`.

Product schema:
```javascript
{
  id: string,
  name: string,
  price: number,
  image: string,
  description: string,
  categories: string[],
  currentInventory: number,
  brand?: string,
  sku?: string
}
```

### Stripe Integration

1. Get your Stripe keys from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Add them to `.env.local`
3. The checkout page will automatically use these keys

### Styling

This project uses Tailwind CSS 2. Customize the theme in:
- `tailwind.config.js` - Tailwind configuration
- `theme.js` - Color palette and gradients
- `styles/globals.css` - Global styles

### Navigation

Control the number of categories shown in navigation by updating `navItemLength` in `ecommerce.config.js`.

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

3. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`

[!![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/your-repo)

## 🔒 Security

This project implements security best practices:

- ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.)
- ✅ Environment variable validation
- ✅ Error boundary for graceful error handling
- ✅ Input sanitization
- ✅ HTTPS enforcement in production

## 🎨 Modernization Features

This project has been modernized from the original 2015 codebase with:

- ✅ **Modern React Patterns**: Hooks-based context with `useReducer` and `useCallback`
- ✅ **Type Safety**: PropTypes for runtime type checking
- ✅ **Code Quality**: ESLint and Prettier configuration
- ✅ **Image Optimization**: Next.js Image component integration
- ✅ **Error Handling**: ErrorBoundary and custom error pages
- ✅ **Security**: Comprehensive security headers
- ✅ **Environment Management**: Validated environment variables
- ✅ **Deployment**: Ready-to-deploy configurations for Vercel and Netlify
- ✅ **Performance**: Optimized bundles and lazy loading

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

This project is based on [Jamstack ECommerce Next](https://github.com/jamstack-cms/jamstack-ecommerce) and has been modernized with current best practices for 2025.

## 🐛 Issues & Support

For issues, questions, or contributions, please open an issue on GitHub.

# BuyMeACoffee - Image Sales Platform

A modern image marketplace where creators can sell high-resolution images to buyers, built with React, TypeScript, and MongoDB.

## Features

- 🎨 **Creator Dashboard**: Upload and manage images for sale
- 🛒 **Marketplace**: Browse and purchase high-quality images
- 💰 **Monetization**: Secure payment processing with Stripe integration
- 🔐 **Authentication**: User registration and login system
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🌙 **Modern UI**: Built with Tailwind CSS and Lucide icons

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Database**: MongoDB Atlas (cloud-hosted)
- **Deployment**: Vercel (frontend) + Vercel serverless functions (API)
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Vercel account (for deployment)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd buymeacoffee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buymeacoffee?retryWrites=true&w=majority
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server** (in a separate terminal)
   ```bash
   node database/server.js
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

## Deployment to Vercel

### 1. Prepare MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" section

### 2. Deploy to Vercel

1. **Install Vercel CLI** (optional, but recommended)
   ```bash
   npm i -g vercel
   ```

2. **Deploy the project**
   ```bash
   vercel
   ```

3. **Configure environment variables in Vercel**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: `production`

4. **Update CORS settings**
   - In `database/server.js`, replace `https://your-vercel-app.vercel.app` with your actual Vercel domain

5. **Redeploy**
   ```bash
   vercel --prod
   ```

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, etc.)
│   ├── lib/           # Utilities and API client
│   ├── pages/         # Page components
│   └── vite-env.d.ts  # TypeScript declarations
├── database/
│   ├── models.js      # MongoDB schemas
│   ├── connection.js  # Database connection
│   ├── server.js      # Express server
│   └── seed.js        # Database seeding
├── dist/              # Built frontend (generated)
├── vercel.json        # Vercel deployment config
└── package.json
```

## API Endpoints

- `GET /api/profiles` - Get all user profiles
- `GET /api/profiles/:id` - Get profile by ID
- `POST /api/profiles` - Create new profile
- `PUT /api/profiles/:id` - Update profile
- `GET /api/images` - Get all images
- `POST /api/images` - Upload new image
- `DELETE /api/images/:id` - Delete image
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `GET /api/download-tokens/validate/:token` - Validate download token

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `VITE_API_BASE_URL` | API base URL (set by Vercel) | No |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

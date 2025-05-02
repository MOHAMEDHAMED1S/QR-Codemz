# QR-Codemz

QR-Codemz is a customizable QR code generator built with React, TypeScript, and Vite. It allows users to generate, preview, and download QR codes with various shapes, colors, and content types.

## Features

- Generate QR codes for URLs, text, and more
- Customize QR code colors and shapes
- Upload logos to embed in QR codes
- Preview QR codes in real-time
- Download QR codes in multiple formats (SVG, PNG)
- Responsive and modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [bun](https://bun.sh/) (if using bun for package management)

### Installation

Clone the repository:

```bash
git clone https://github.com/MOHAMEDHAMED1S/QR-Codemz.git
cd QR-Codemz
```

Install dependencies:

```bash
npm install
# or
bun install
```

### Running the App

Start the development server:

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### Building for Production

```bash
npm run build
# or
bun run build
```

## Project Structure

- `src/` - Main source code
  - `components/` - React components for customization and UI
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `pages/` - Page components (e.g., Index, NotFound)
  - `utils/` - QR code types and utilities
- `public/` - Static assets

## Customization

- Edit `tailwind.config.ts` for Tailwind CSS customization.
- Add or modify components in `src/components/` to extend functionality.

## License

This project is licensed under the MIT License.

---

Made with ❤️ by Mohamed Hamed

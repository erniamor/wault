# Wault

This is a [Next.js](https://nextjs.org/) project to save notes and links in your personal online vault.

## Features

- User accounts
- Private notes and links
- Folder structure
- Search page

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/erniamor/wault.git
```

2. Copy .env.default file, rename it to .env and fill database variables inside:

```env
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contribute

Feel free to contribute if you want to fix a bug, add a feature or make some improvements.

## License

Wault is licensed under a [MIT License](./LICENSE).

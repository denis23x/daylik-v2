This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3100](http://localhost:3100) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development Workflow

### Code Quality

This project uses ESLint and Prettier for code quality and formatting. Before committing, the following checks are automatically run:

- ESLint check (`pnpm lint`)
- Prettier format check (`pnpm format:check`)

To manually format your code, run:

```bash
pnpm format
```

### Commit Rules

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Each commit message must follow this format:

```
type(scope): subject

[optional body]

[optional footer]
```

Where `type` must be one of:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks
- `build`: Build system or external dependency changes
- `ci`: CI configuration changes
- `perf`: Performance improvements
- `revert`: Reverting changes

Example of a valid commit message:

```
feat(auth): add login functionality

- Add login form component
- Implement authentication logic
- Add error handling

Closes #123
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

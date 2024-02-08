# [Profolio](https://www.salimi.my) &middot; [![Author Salimi](https://img.shields.io/badge/Author-Salimi-%3C%3E)](https://www.linkedin.com/in/mohamad-salimi/)

Profolio is a dynamic personal portfolio website built with Next.js. This fullstack app allow easy customization of portfolio details and project listings. All the informations, skills and projects can be updated effortlessly, ensuring them stays up to date.

## Dynamic portfolio site

- Dynamic infomations, skills & project listings
- Light / dark / system mode
- NextAuth.js v5 / Auth.js for authentication
- MySQL & Prisma for database
- Zustand for state management
- EdgeStore for file uploading
- React Email for email templating
- Resend for sending email

## Tech/framework used

- Next.js 14
- Shadcn/ui
- NextAuth.js v5 / Auth.js
- Tailwind CSS
- TypeScript
- MySQL
- Prisma
- Zustand
- EdgeStore
- React Email
- Resend

## Starting the project

Open the [.env.example](/.env.example) and fill in your Database URL, Auth, Resend & EdgeStore Configurations then save it as .env the run the following command:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
# or
pnpm install
pnpm dlx prisma generate
pnpm dlx prisma db push
pnpm dev
```

## Demo

Hosted privately on personal DigitalOcean Droplet. [Click here](https://www.salimi.my) to visit.
<br>
Direct link: `https://www.salimi.my`

## Screenshots

#### Homepage

![Homepage](/screenshots/screenshot-1.png)

#### About

![About](/screenshots/screenshot-2.png)

#### Portfolio

![Portfolio](/screenshots/screenshot-3.png)

#### Contact

![Contact](/screenshots/screenshot-4.png)

#### Sign in

![Sign in](/screenshots/screenshot-5.png)

#### Admin dashboard

![Admin dashboard](/screenshots/screenshot-6.png)

#### Portfolio list

![Portfolio list](/screenshots/screenshot-7.png)

#### Create portfolio

![Create portfolio](/screenshots/screenshot-8.png)

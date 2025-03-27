
# Just Varbs

A demonstration of using the URL as state management with mixtures as the minute framework. This project leverages latest features which include actions and server components. It uses a hybrid approach of both client side components and service side components. Client side components will use the new use hook and leverage the suspense. So in turn. The page will then provide the components with the default props. This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Assets

- [Production deploy](https://just-varbs.vercel.app/)
- [Staging deploy](http://staging-just-varbs.vercel.app)
- [Storybook | Component Library](#TODO:@Mo)
- [Storybook | Component Library via github pages](#TODO:@Mo)
- [Storybook | Deployment dashboard](#TODO:@Mo)
- [Comms Channel](#TODO:@Mo Discord)
- [Deployment Dashboard](https://vercel.com/seak/just-varbs)
- [Design Doc](#TODO:@Mo)
- [Lo-Fi Design Spec](#TODO:@Mo)
- [Hi-Fi Design Spec](#TODO:@Mo)
- [API URL](#TODO:@Mo)
- [Analytics dashboard (PostHog)](#TODO:@Mo)
- [Payment integration](#TODO:@Mo)

## Getting Started

<details>
  <summary>Terminal Instructions</summary>
  
    Open project in IDE/ Code editor (VSCode base).

    1 Install all the dependencies:

    ```bash
    npm install
    ```

    2 Checkout from staging to a new branch:

    ```bash
    git checkout -b feature/your-name-feature
    ```

    3 run the development server:

    ```bash
    npm run dev
    ```

    4 Open up cypress to see that you have not broken anything:

    ```bash
    npm run test:e2e:open
    ```

    5 Open up storybook to start developing your component:

    ```bash
    npm run storybook
    ```

    6. Obtain .env.local file from Mo.
</details>

### QuickStart

- open using Cursor/WindSurf
- press *F1* and type `git:clone`
- press *F1* and type `run task` and hit enter.
- type `npm` and hit enter.
- type `install` and hit enter.
- press *F5*
- then run: `npm run test:e2e:open` in terminal
- Create new branch: `git checkout -b feature/your-name-feature`
- Obtain .env.local file from Mo.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/match/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

You will need to have a .env.local file in the root of the project. This will contain the following variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SPOTIFY_CLIENT_ID
- SPOTIFY_CLIENT_SECRET
- SPOTIFY_REFRESH_TOKEN
- SPOTIFY_TOKEN

## Tech Stack

- [Next.js](https://nextjs.org/) - React Metaframework for Server Side Rendering & Client Side Rendering a Hybrid Web application.
- [TypeScript](https://www.typescriptlang.org/) - Type safe Javascript
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Storybook](https://storybook.js.org/) - Design System Components
- [Cypress](https://www.cypress.io/) - e2e testing framework.
- [Luxon](https://moment.github.io/luxon/#/) - Time Utiliy library.
- [React Hook Form](https://react-hook-form.com/) - Dope UX for forms.
- [Zod](https://zod.dev/) - Create schemas for validation with React Hook Form
- [React Icons](https://react-icons.github.io/react-icons/) - Icons
- [Aceternity UI](https://ui.aceternity.com/) - UI Components
- [AutoAnimate](https://auto-animate.formkit.com/) - Animated Transitions
- [Superbase](https://supabase.com/) - BaaS
- [Zustand](https://zustand-demo.pmnd.rs/) - Client Side state management
- [Prettier](https://prettier.io/) - An opinionated code formatter
- [Eslint](https://eslint.org/) - Find and fix problems in your JavaScript code

## Resources

- [Typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/)

## Project leads

- Monde Sineke

## Features

- Build components in isolation with Hot Module Replacement
- SEO friendly #TODO
- Responsive #TODO
- Easy animations #TODO
- Prebuilt components #TODO
- Easy validation with Hook Form & Zod #TODO
- Easy backend integration with Superbase #TODO
- E2E testing with every pull request #TODO
- Simple State management with Zustand #TODO
- Easy Icons with React Icons #TODO
- Client form management with React Hook Form #TODO
- Easy backend integration with Superbase #TODO
- Schema Validation.

## Enviroments

There are two enviroments;

### production

Production is the enviromewnt the end-user experience. This is the final product that will be deployed to the public. This enviroment is hosted on Vercel.

### staging

Staging is the enviroment where the team can test the latest features and bug fixes. This enviroment is hosted on Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Gotchas

To use [recharts](https://ui.shadcn.com/docs/react-19) with React 19, you will need to override the react-is dependency.

# Project Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). To use this project, you need to have Node.js version 20.5.1 installed using nvm version 1.1.11 and npm version 10.4.0 installed on your machine. To install the required versions of Node.js you can visit the [official Node.js website](https://nodejs.org/en/) and download the required version. To install nvm you can visit the [official nvm windows github repo](https://github.com/coreybutler/nvm-windows#installation--upgrades)


## Initial Setup

To create a project similar to this from scratch, you can follow the steps below:

1. Initialize a git repository:

```bash
    git init
```

2. Use Nvm version 1.1.11:

```bash
    nvm use v1.1.11
```

3. Use Node version 20.5.1:
    
```bash
    nvm install v20.5.1
```

4. Install npm version 10.4.0 globally:

```bash
    npm install -g npm@10.4.0
```

5. Create a Next.js app:
  
 ```bash
    npx create-next-app@latest ./
    npx shadcn-ui@latest init
 ```

## Git Setup

6. Add all files to the git repository:

 ```bash
    git add .
```

7. Commit the changes with a message:
 
```bash
    git commit -m "first commit"
```

9. Update your remote repository:

```bash
    git remote add origin https://github.com/[yourname]/[gitreponame].git

```

10. Push your changes to the remote repository:

```bash
    git push -u origin master
```

## Project Setup


10. Run the development server:

```bash
    yarn dev or pnpm dev or bun dev OR npm run dev
```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

    You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Additional Resources

- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

- To learn more about Next.js, take a look at the following resources:
  - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
  - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

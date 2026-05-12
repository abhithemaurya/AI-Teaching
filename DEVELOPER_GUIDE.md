

follow RSC 

Request → Route → Controller → Service → Repository → DB



  1. repository
  2. Services
  3. Controller 
  4. Route





i have this folder structure 

└───src
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    │   │   page.js
    │   │
    │   ├───(auth)
    │   │   ├───login
    │   │   │       page.jsx
    │   │   │
    │   │   ├───services
    │   │   │       auth.service.js
    │   │   │
    │   │   └───signup
    │   │           page.jsx
    │   │
    │   └───api
    │       ├───auth
    │       │   ├───controllers
    │       │   │       auth.controller.js
    │       │   │
    │       │   ├───repositories
    │       │   │       auth.repositories.js
    │       │   │
    |       |   ├───services
    │       │       auth.service.js
    │       │   └───route
    │       │           route.js
    │       │
    │       └───test
    │               route.js
    │
    ├───features
    │   └───auth
    │       ├───api
    │       ├───components
    │       │       LoginForm.jsx
    │       │       SignupForm.jsx
    │       │
    │       ├───hooks
    │       ├───stores
    │       └───styles
    └───lib
            prisma.js










src/
 ├── app/
 │   ├── (dashboard)/                # route group (keeps URL clean)
 │   │   ├── layout.jsx              # 🔥 main layout (sidebar + header)
 │   │   ├── dashboard/
 │   │   │   └── page.jsx
 │   │   ├── worksheets/
 │   │   │   └── page.jsx
 │   │   ├── questions/
 │   │   │   └── page.jsx
 │   │   ├── lessons/
 │   │   │   └── page.jsx
 │   │
 │   ├── auth/
 │   │   └── page.jsx
 │   │
 │   └── layout.js                  # global layout (html, body)
 │
 ├── components/
 │   ├── layout/
 │   │   ├── Sidebar.jsx
 │   │   ├── Header.jsx
 │   │   ├── Footer.jsx
 │
 ├── features/
 │   ├── dashboard/
 │   ├── worksheets/
 │   ├── questions/
 │   ├── lessons/












src/
 ├── app/
 │   ├── (dashboard)/
 │   │   ├── layout.jsx
 │   │   ├── dashboard/
 │   │   │   └── page.jsx   👈 MAIN CONTENT
 │
 ├── components/
 │   ├── layout/
 │   │   ├── Sidebar.jsx
 │   │   ├── Header.jsx
 │   │   ├── Footer.jsx
 │
 ├── features/
 │   ├── dashboard/
 │   │   └── DashboardContent.jsx 👈 UI moved here






















=> Global.css old code 


@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

/* body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
} */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
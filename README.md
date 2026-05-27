
 


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










1. fetch recent added Admin and recent added teacher on superdain dashboard
2. make a UI for teacher List and adding a teacher 
3. write a api for adding a techer, update, delete, 
4. update dashboard page change static data to dynamic data  








1. create a Configuration page UI 
2. work on backend to give a access to superadmin for give approval for accept and reject teacher account create 
3. create a table on database 




1. work on config page at aiPrompt write backend 
2. fetch with frontend 
3. write a code for grok api 
4.  
















1. update code in teacher list 
2. write a api for profile section for update,
   get,
3. add row for teacher approval and reject and also fetch with     backend 


1. add a function teachaer can edit a question
2. send question as a pdf
3. save question in library
4. work on lession page UI  






1. add a function in teacher approval section on chagne any status teacher will find a email update 
2. work on weekly planner UI 
3. allow all route to access role module





1. work on question librery page UI 
2. add a function only clicking on save to librery then data will save in librery 
3. when teacher will download pdf then automatically qus will same in librery 
4. add a toggle button for allow download pdf also and deactive it.






26-05-2026
1. add function if teacher is rejecter by superadmin then can again teacher can retry with same nmber or email
2. status and approval section fixed in single row and it will show according to the condition.
3. work on filter and search function




trash
some change in question librery
 

1. fix sidebar for chile dropdown on full screen view
2. add new table in Db 
3. add 2 more option in question generater for genearting a question 
   by adding a class and question type 
4. buile a function for add multipe select for question type.
5. fix question libery UI 




change a prompt generater page UI

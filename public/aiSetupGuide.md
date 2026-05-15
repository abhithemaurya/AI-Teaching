SUPER ADMIN
   ↓
Create AI Prompt
Create AI Configuration
(API Key + Model)
   ↓
Saved in Database

TEACHER LOGIN
   ↓
Enter Topic + Difficulty + Type
   ↓
Backend fetches:
- active AI config
- active AI prompt
   ↓
AI API called
   ↓
Questions Generated
   ↓
Saved in DB
   ↓
Teacher sees only own questions



SUPERADMIN
   ↓
Create AI Prompt
Create AI Configuration
   ↓
Stored in DB

TEACHER
   ↓
Generate Questions
   ↓
Backend fetches:
- Active Prompt
- Active AI Config
   ↓
AI Generates Questions
   ↓
Questions Saved in DB




src
│
├── app
│   └── api
│       └── admins
│           └── ai
│               ├── configuration
│               │   └── route.js
│               │
│               ├── generate
│               │   └── route.js
│               │
│               └── prompts
│                   └── route.js
│
├── controllers
│   ├── ai.controller.js
│   └── configuration.controller.js
│
├── services
│   ├── ai.service.js
│   └── configuration.service.js
│
├── repositories
│   ├── ai.repository.js
│   └── configuration.repository.js
│
├── validators
│   ├── aiValidator.js
│   └── configurationValidator.js
│
├── lib
│   ├── prisma.js
│   └── auth.js
│
└── features
    └── ai
        ├── stores
        │   └── configurationStore.js
        │
        └── components
            └── ConfigurationForm.jsx






 src/
│
├── app/
│   └── api/
│       └── ai/
│           └── generate/
│               └── route.js
│
├── controllers/
│   └── aiController.js
│
├── services/
│   └── aiService.js
│
├── repositories/
│   ├── aiConfigRepository.js
│   ├── aiPromptRepository.js
│   └── questionRepository.js
│
├── lib/
│   ├── prisma.js
│   └── auth.js
│
└── utils/
    └── aiProvider.js






    
## SETUP
### STEPS
- check for node.js
- check for npm
- install next.js?
- create a new project
  > npx create-next-app@latest --typescript [project-name]
  > say yes to Typescript, ESLint, Tailwind CSS, src directory, App Router, and import alias
  > added "baseUrl": ".", to tsconfig.json
- cd [project-name]
- clean 'globals.css' file
- clean home 'page.tsx' file, put a 'Hello World!'
- create a .env file

- npx shadcn-ui@latest init (não precisa dos componentes, já estou copiando)
  > npx shadcn-ui@latest add table
  > npx shadcn-ui@latest add button
- npm install -D tailwindcss postcss autoprefixer


### json-server
- npm i json-server
- update package.json to add the script section
- use the db.json file to create the database
- run some tests on Postman

## DEVELOPMENT

### STEPS BACKEND
- create src/backend folder
- create src/domain and src/infra folders
- create src/domain/entities, src/domain/usecases, src/domain/repositories folders
- create src/infra folder
- create src/infra/repositories/jsonapi folder
- create src/infra/usecases folder

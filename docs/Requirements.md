# Requirements: 

## Page requirements:
- [x]  Landing / Home Page 
	- Introduction or entry point.
	- Navbar
	- Services(Check Balance, Due , Quick Pay, Share Account) 
	- Accounts (For each bank account)
- [ ]  Dashboard Page – with at least one chart or visualization.
	- Settings, Help, Transactions
- [x]  List/Overview Page 
	- browse or view all items (transactions).
- [x]  Detail Page 
	- display details of a single item.
- [ ]  Form Page
	- to add/edit data (e.g., add expense, recipe, or movie).
- [ ]  Authentication Pages 
	- Login and Register.
- [x] Profile page
	- shows your name
	- shows your profile picture
	- allow to change password
	- allow to switch theme
- [ ] Send Money Page
	- Send to a user by their id
---
## Feature: 
- ### Landing / Home Page:
	- View Introduction or entry point. (if not signed in)
	- Services (Check Balance, Due , Quick Pay, Share Account) 
	- Accounts (For each bank account)
- ### Dashboard Page:
	- Pie chart: Spending by category.
	- Bar chart: Monthly income vs expenses.
	- Line chart: Monthly income vs expenses.
	- Heatmap: Displays intensity spending by day of week vs time of day, or month vs category.
	- Include 2 Interactive charts (filters, drill-down, real-time updates using public API).
- ### List/Overview Page:
	- browse or view all transactions
- ### Detail Page:
	- View each transaction and its details (date, amount, where, category)
- ### Form page:
	- Add new transaction with its details
- ### Auth pages:
	- JWT for backend
	- login and signup forms 
	- maybe we could add oAuth?
- ### Profile page:
	- shows your name
	- shows your profile picture
	- allow to change password
	- allow to switch theme
- ### Send money page:
	- Allows user to send money to specific user with their id
---
## DevOps reqs: 
- ### Testing Coverage:
	- Automated unit testing for at least 3 React components (e.g., form validation, button clicks, API rendering).
	- Optional integration testing for routing and page rendering.
	- Use tools like Jest + React Testing Library.
- ### Deployment:
	- Deploy project to a hosting service like Vercel or Netlify.
	- Add CI/CD pipeline (e.g., GitHub Actions) to automate build and testing before deployment.

[[Project]]
## Cover Page

**Project Title:**  FloosFlow
**Course Code & Name:** SW302 – User Interface Development  
**Instructor:** Dr. Mohamed Sami Rakha  

**Team Members:**  
- Ali Ashraf – 202301812  
- Ahmed Mohammady – 202301826  
- Abdalluh Ayman – 202301731
- Momen Sanad - 202300971

---

## Abstract

FloosFlow is a simple finance tracker application designed to help users monitor their income and expenses in an organized and efficient way. The application focuses on providing an intuitive user interface that allows users to quickly understand and interact with the system without requiring prior technical knowledge.

The user interface is designed to be clean, minimal, and easy to use, ensuring a smooth user experience across different devices. By using clear navigation, well-structured layouts, and meaningful visual feedback, FloosFlow enables users to manage their financial data with minimal effort. The application emphasizes usability and accessibility, making it suitable for everyday personal finance tracking.

Overall, FloosFlow aims to simplify financial management by offering essential features in a straightforward manner, allowing users to focus on their financial insights rather than the complexity of the interface.


---

## 1. Introduction

### 1.1 Project Background
Managing personal finances can be challenging for many users, especially when financial data is scattered across different tools or recorded manually. Many existing finance applications are either too complex or include unnecessary features that make basic expense tracking difficult for everyday users. This project was motivated by the need for a simple and user-friendly solution that focuses on essential financial tracking without overwhelming the user.

FloosFlow was developed to address this problem by providing a straightforward finance tracker that allows users to record, view, and analyze their income and expenses in one place. The application emphasizes clarity, ease of use, and visual feedback, helping users gain better insight into their financial habits through an intuitive interface.


### 1.2 Project Objectives
The main objectives of this project include:
- Designing a responsive and accessible user interface that works smoothly across desktop and mobile devices
- Implementing reusable React components to ensure consistency and maintainability throughout the application
- Integrating dynamic data using APIs or mock data to simulate real-world data handling
- Visualizing financial data using charts and dashboards to help users easily understand their spending patterns

### 1.3 Project Scope
The scope of the FloosFlow project includes core personal finance tracking features such as adding, editing, and deleting income and expense records, viewing summarized financial data, and displaying visual insights through charts. The application focuses on frontend functionality and user experience, demonstrating modern UI development practices using React and Tailwind CSS.

---

## 2. Project Description

### 2.1 Selected Project Idea
Personal finance tracker

### 2.2 Target Users
FloosFlow is intended for individuals who want a simple and efficient way to track their personal finances. The application is designed for users with little to no technical background who prefer an easy-to-use interface for managing their income and expenses.

The primary target users include students, young professionals, and individuals managing personal budgets who need a lightweight finance tracking tool without complex features. FloosFlow is especially suitable for users who want quick insights into their spending habits through clear dashboards and visual summaries.

By focusing on usability, clarity, and responsive design, the application ensures that users can comfortably access and use the system across different devices, making it practical for everyday financial tracking.


---

## 3. UI/UX Design

### 3.1 Design Approach
The UI/UX design of FloosFlow focuses on simplicity, clarity, and ease of use. The main goal was to create an interface that allows users to quickly understand and interact with the application without unnecessary complexity. A clean layout and consistent visual elements were used across all pages to ensure a smooth and predictable user experience.

A green and blue gradient color scheme was chosen to represent growth, stability, and financial clarity. This gradient is used subtly across the interface to enhance visual appeal without distracting the user. Content is primarily displayed using card-based components with a glassy, semi-transparent appearance placed over light gray or white backgrounds, creating a modern and visually balanced design.

The design follows a mobile-first approach, ensuring that the interface is usable and visually consistent on smaller screens before scaling up to larger devices.

### 3.2 Wireframes and Mockups
Wireframes and mockups were created to plan the overall layout using Figma, navigation flow, and content structure of the application. The design includes multiple key pages such as the dashboard, transactions list, transaction details, forms for adding and editing data, and authentication pages.

Each page was designed with both desktop and mobile views in mind to ensure consistency across different screen sizes. The wireframes helped validate the placement of components and interactions before moving to the implementation phase, reducing development complexity and improving design accuracy.

### 3.3 Responsiveness and Accessibility
Responsiveness was achieved using Tailwind CSS utility classes and responsive breakpoints to adapt layouts for mobile, tablet, and desktop devices. Flexible grid systems and spacing utilities were used to ensure that content remains readable and well-organized across all screen sizes.

Accessibility was considered throughout the design and implementation process. ARIA labels were added to interactive elements such as buttons, forms, and navigation components to improve support for screen readers. Color contrast, clear typography, and keyboard-friendly navigation were also taken into account to ensure the application is accessible and usable for a wider range of users.


---

## 4. System Implementation

### 4.1 Technologies Used
The project was developed using the following technologies:
- React
- Tailwind CSS
- HTML5
- Charting Library (Recharts or Chart.js)
- Express.JS
- PostgreSQL

### 4.2 Application Structure
FloosFlow follows a component-based architecture using React, where the frontend is divided into small, reusable components. This approach improves code maintainability and ensures consistency across the application. Common UI elements such as buttons, input fields, and cards are implemented as shared components, while page-level components represent major views including the dashboard, transactions page, and forms for adding or editing data.

The project is organized into clearly defined folders that separate concerns between UI components, pages, services, and layout elements. API-related logic is isolated into service modules responsible for communicating with the backend. This structure allows the frontend to remain independent of backend implementation details while maintaining clean and readable code.

On the backend side, an Express.js server is used to handle API requests and business logic, while PostgreSQL serves as the relational database for storing financial data. This separation between frontend and backend supports scalability and aligns with modern full-stack development practices.

### 4.3 Routing and State Management
React Router is used to manage navigation between different pages within the application. Each major feature, such as viewing the dashboard, browsing transactions, and adding or editing financial records, is associated with a specific route. This enables smooth client-side navigation without full page reloads, providing a responsive single-page application experience.

State management in FloosFlow is handled using React’s built-in hooks, including `useState` and `useEffect`. Local component state is used for handling form inputs, UI interactions, and temporary data. Shared state, such as the list of transactions and summary values displayed across multiple components, is managed at higher-level components to ensure data consistency.

State updates are triggered by API responses from the backend, ensuring that the frontend always reflects the current data stored in the database.
### 4.4 Data Handling and CRUD Operations
FloosFlow communicates with a real backend implemented using Express.js, which exposes RESTful API endpoints for managing financial data. These endpoints handle all data-related operations and interact with a PostgreSQL database for persistent storage.

The frontend fetches data from the backend using HTTP requests to retrieve transaction records when the application loads or when updates occur. The system supports full CRUD operations, allowing users to create new transactions, read existing records, update transaction details, and delete transactions when necessary.

Form submissions trigger POST or PUT requests to the backend, while delete actions send DELETE requests to remove records from the database. After each operation, the frontend updates its state based on the API response, ensuring that the user interface remains synchronized with the database. Basic error handling is implemented to handle failed requests and improve system reliability.

---

## 5. Features and Functionality

FloosFlow provides a comprehensive set of features that cover all required pages and functionalities of a personal finance tracking application. The system is designed to offer clear navigation, secure access, and meaningful financial insights through interactive visualizations.

---

### 5.1 Landing / Home Page

The landing page serves as the main entry point of the application. For users who are not signed in, it provides a brief introduction to FloosFlow and its purpose. Once authenticated, the home page displays quick-access services and account information.

Key features include:
- Introduction and entry point for new users
- Navigation bar for accessing main sections of the application
- Services section including:
  - Check Balance
  - Due Payments
  - Quick Pay
  - Share Account
- Display of user bank accounts, with each account shown separately

---

### 5.2 Dashboard Page

The dashboard provides users with an overview of their financial activity through visual summaries and charts. It is designed to help users quickly understand their spending patterns and income trends.

Features include:
- Pie chart showing spending distribution by category
- Bar chart displaying monthly income versus expenses
- Interactive charts that support filtering, drill-down, and real-time updates
- Quick access to settings, help, and transaction history

---

### 5.3 Transactions List / Overview Page

This page allows users to browse and view all financial transactions in one place. Transactions are displayed in a clear and organized list format, making it easy to review past financial activity.

Key functionality includes:
- Viewing all transactions
- Organized and readable transaction listing
- Navigation to transaction detail pages

---

### 5.4 Transaction Detail Page

The detail page provides complete information about a single transaction. This allows users to review specific financial activities in depth.

Displayed information includes:
- Transaction date
- Amount
- Category
- Description or source of the transaction

---

### 5.5 Transaction Form Page

The form page enables users to add new transactions or edit existing ones. It is designed with validation to ensure data accuracy.

Features include:
- Add new income or expense transactions
- Edit existing transaction details
- Form validation for required fields and correct data formats
- Immediate updates reflected across the application after submission

---

### 5.6 Authentication Pages

Authentication is handled securely using a backend-based JWT mechanism. The system ensures that only authorized users can access financial data.

Authentication features include:
- Login and registration pages
- JWT-based authentication with the backend
- Secure session handling
- Potential support for future OAuth integration

---

### 5.7 Profile Page

The profile page allows users to manage their personal information and application preferences.

Features include:
- Display of user name
- Display of profile picture
- Ability to change account password
- Theme switching functionality (e.g., light and dark mode)

---

### 5.8 Send Money Page

This page allows users to transfer money to other users within the system.

Key functionality includes:
- Sending money to another user using their unique user ID
- Validation to ensure correct and secure transfers
- Backend integration to process transactions

---

### 5.9 Navigation Bar

The navigation bar provides consistent access to all major sections of the application.

Features include:
- Profile icon used to prompt login for unauthenticated users
- Profile picture displayed once logged in
- Navigation to profile and settings through the profile menu
- Clear and accessible navigation across pages

---

### 5.10 DevOps and Deployment Features

To ensure reliability and maintainability, several DevOps practices were applied.

These include:
- Automated unit testing for multiple React components using Jest and React Testing Library
- Deployment to a hosting platform called railway

---

## 6. Challenges and Solutions

During development, a lot of issues were faced, such as facing bugs like transactions being displayed with 1 less pound than it should. During deployment an issue was faced with connecting the frontend with the backend. these issues were solved

---

## 7. Testing and Validation
Jest, React-testing-library were used to write unit tests for the project.

---

## 8. Conclusion 
The FloosFlow project successfully implements a personal finance tracking web application that fulfills the objectives of the SW302 User Interface Development course. The system allows users to manage income and expenses, categorize transactions, and view financial summaries through interactive dashboards and charts.

The project demonstrates effective use of modern frontend technologies, including React, Tailwind CSS, and HTML5, along with component-based design, client-side routing, state management, and mock data integration. Overall, FloosFlow simulates a practical real-world application and reflects a solid understanding of UI/UX design principles and frontend development practices.

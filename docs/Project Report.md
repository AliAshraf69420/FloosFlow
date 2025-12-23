## 1. Project Overview

The objective of the course project was to design and implement a frontend web application that demonstrates modern UI development practices. For this project, we selected the **Personal Finance Tracker**. The application allows users to track their income and expenses, categorize them, and visualize their financial insights. The project integrates responsive, accessible design with data handling from a PostgreSQL database via a backend built with Express. Additionally, it includes advanced features such as dynamic charts and authentication.

### Project Selection:

FloosFlow enables users to manage their finances by tracking income and expenses, visualizing spending by category, and reviewing monthly financial trends. The app provides a user-friendly dashboard, transaction management, and dynamic data visualizations. 

---

## 2. Key Features

**FloosFlow** includes the following key features:

- **Dashboard**: 
  - Displays total income, total expenses, and current balance.
  - Includes a pie chart showing spending by category.
  - Provides a bar chart comparing monthly income vs expenses.
  
- **Transaction Management**: 
  - Users can add, edit, and delete transactions.
  - Transaction fields include type (income/expense), category, amount, date, and description.
  - Includes form validation to ensure data integrity.

- **Search & Filters**: 
  - Users can filter transactions by date range, type, and category.
  - A search bar allows users to quickly find specific transactions.

- **Responsive Design**: 
  - Mobile-first design with collapsible sidebar navigation for a seamless user experience on both desktop and mobile devices.
  - Accessible components with ARIA labels and keyboard shortcuts.

- **Data Integration**: 
  - FloosFlow connects to a backend built with **Express** and integrates with a **PostgreSQL** database for dynamic data handling. 
  - All transaction data is stored and managed in the PostgreSQL database, allowing users to perform CRUD operations.

- **User Authentication**: 
  - Users can log in, register, and manage their personal profiles.
  - Role-based UI displays different views based on user authentication.

- **Bonus Features**: 
  - **Dark Mode**: A theme switcher for users to toggle between light and dark modes.
  - **Advanced Animations**: Enhanced UI with animations and transitions using the Framer Motion library.
  - **Data Visualization**: Sophisticated dashboard with multiple charts, including interactive charts that allow users to filter and drill down into data.
  - **Testing**: Automated unit testing using Jest and React Testing Library for core components.
  - **Deployment**: The project is deployed on a **local server** with backend integration using Express, PostgreSQL, and CI/CD pipeline via GitHub Actions.

---

## 3. Technologies Used
The following technologies were used to implement the project:

- **React**: A JavaScript library for building user interfaces, particularly for creating reusable components and managing state.
- **TailwindCSS**: A utility-first CSS framework used for building responsive, customizable, and mobile-first designs.
- **HTML5**: Structured the web pages with semantic and accessible markup.
- **Express**: A backend framework for Node.js used to create the server and handle API requests.
- **PostgreSQL**: A relational database used to store transaction data and manage user authentication securely.
- **Framer Motion**: A library for adding animations and transitions to the UI.
- **Jest & React Testing Library**: Used for unit testing the React components to ensure functionality and reliability.
- **GitHub Actions**: Implemented for CI/CD to automate the testing and deployment process.
- **Local Server Deployment**: The project was deployed on a local server with the Express backend and PostgreSQL database.

---

## 4. Challenges Faced
During the development of **FloosFlow**, we faced several challenges:

- **Data Integration**: Ensuring seamless data fetching and handling from the backend using Express and PostgreSQL was initially challenging, particularly with managing CRUD operations for transactions and ensuring proper data storage and retrieval.
  
- **State Management**: Managing the global state across the application using React's Context API required careful design, especially for features like filtering and sorting transactions.

- **Responsive Design**: Creating a fully responsive layout that provided an optimal user experience on both desktop and mobile devices required fine-tuning with TailwindCSS.

- **Backend Deployment**: Setting up a local server for deployment and configuring Express with PostgreSQL required troubleshooting and fine-tuning to ensure smooth communication between the frontend and backend.

- **Time Management**: The complexity of integrating advanced features like dark mode, dynamic charts, and user authentication required effective task management to meet deadlines.

---

## 5. Conclusion
**FloosFlow** successfully meets the project requirements and includes all the bonus features. The project demonstrates a deep understanding of modern frontend and backend development techniques using React, Express, PostgreSQL, and TailwindCSS. Despite the challenges faced, the team was able to deliver a polished, fully functional application that is both user-friendly and visually appealing.


---
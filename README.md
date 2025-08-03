# IntelliDo - AI-Powered Task Manager

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![GSAP](https://img.shields.io/badge/gsap-88CE02?style=for-the-badge&logo=gsap&logoColor=white)](https://greensock.com/gsap/)

Revolutionize your task management with the power of AI. IntelliDo is an intelligent to-do list application that helps you break down complex goals, manage your tasks efficiently, and stay organized. Chat with our AI to get task suggestions, upload relevant files, and streamline your workflow.

**Live Demo:** **[https://abubakr-alsheikh.github.io/intellido/](https://abubakr-alsheikh.github.io/intellido/)**

 <!-- It's highly recommended to add a GIF or screenshot of your app here -->


## ✨ Key Features

-   **🤖 AI-Powered Chat:**
    -   Engage in a conversation with an AI assistant to brainstorm and plan.
    -   Receive intelligent task suggestions based on your chat history.
    -   Accept or reject AI-generated tasks to add them directly to your to-do list.
    -   Supports text, image, audio, and video file uploads with validation and progress tracking.

-   **📋 Comprehensive Task Management:**
    -   Full CRUD (Create, Read, Update, Delete) functionality for your tasks.
    -   Mark tasks as complete/incomplete with a satisfying UI update.
    -   View all your tasks in a clean, organized, and animated list.

-   **🔐 Secure Authentication:**
    -   User registration and login system.
    -   Secure sessions using JWT-based authentication with automated access and refresh token handling.
    -   Protected routes to ensure user data privacy.

-   **🎨 Modern & Responsive UI:**
    -   Sleek, modern interface built with **Material-UI**.
    -   Switch between **Light and Dark modes** to suit your preference.
    -   Smooth page transitions and component animations powered by **GSAP**.
    -   Fully responsive design for a seamless experience on desktop and mobile devices.


## 🛠️ Tech Stack

-   **Frontend:** React, Redux Toolkit
-   **UI Library:** Material-UI (MUI)
-   **Routing:** React Router
-   **Animations:** GSAP (GreenSock Animation Platform)
-   **HTTP Client:** Axios
-   **Deployment:** GitHub Pages


## 🏗️ Project Structure

The project follows a standard React application structure, organized for scalability and maintainability.

```
/src
├── components/       # Reusable React components
│   ├── AIChat/       # Components related to the AI chat feature
│   ├── Auth/         # Login and Signup form components
│   ├── Tasks/        # Components for task management (list, item, dialogs)
│   └── ...           # Shared components (Header, Footer, Transitions)
├── redux/            # Redux Toolkit setup
│   ├── slices/       # Slices for auth, chat, and tasks state
│   └── store.js      # The main Redux store
├── services/         # API service layer (Axios configuration, interceptors)
│   └── api.js
├── styles/           # Global styles
└── App.js            # Main application component with routing
└── index.js          # Entry point of the application
```


## 🔌 Backend

This is a frontend application that requires a corresponding backend server to handle user authentication, task management, and AI chat processing. The backend for this project is built with **Django** and the **Django Rest Framework**.

The live API is hosted on PythonAnywhere. For full functionality, ensure the backend server is running and accessible from the frontend application.

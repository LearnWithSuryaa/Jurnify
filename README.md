# Jurnify

## Executive Summary

Jurnify is a comprehensive personal workspace application designed to enhance productivity through structured task management, event scheduling, and habit tracking. The platform provides a unified interface for organizing daily activities, minimizing cognitive load for users seeking a streamlined digital environment. This documentation serves as the primary reference for developers and system administrators regarding the installation, configuration, and deployment of the Jurnify application.

## Key Capabilities

The application currently supports the following core functionalities:

1.  **Task Management**: Create, update, categorization, and status tracking of individual tasks.
2.  **Event Scheduling**: Calendar-based event organization with support for various categories (Meetings, Deadlines, Personal).
3.  **Authentication**: Secure user registration and login system utilizing personalized workspaces.
4.  **Profile Management**: User profile customization including avatar manageability and account security settings.
5.  **Responsive Interface**: Adaptive design ensuring functional parity across desktop and mobile viewports.

## Technical Architecture

The Jurnify platform is built upon a modern web stack designed for performance, scalability, and maintainability.

*   **Framework**: Next.js (React)
    *   Utilizes Server Side Rendering (SSR) and Static Site Generation (SSG) for optimal performance.
*   **Language**: TypeScript
    *   Ensures type safety and code reliability throughout the development lifecycle.
*   **Styling**: Tailwind CSS
    *   Implements a utility-first CSS framework for consistent and rapid UI development.
*   **Backend & Database**: Supabase
    *   Managed PostgreSQL database.
    *   Authentication and Authorization services.
    *   Object Storage for user assets.

## Getting Started

### Prerequisites

Ensure the following software is installed on the local development environment:

*   Node.js (Version 18.0.0 or higher)
*   npm (Node Package Manager)
*   Git

### Installation

1.  **Clone the Repository**

    Execute the following command to clone the project source code:

    ```bash
    git clone https://github.com/LearnWithSuryaa/Jurnify.git
    cd Jurnify
    ```

2.  **Install Dependencies**

    Install the required project dependencies:

    ```bash
    npm install
    ```

### Configuration

The application requires environment variables to connect to backend services. 

1.  Create a file named `.env.local` in the project root directory.
2.  Populate the file with the following Supabase configuration keys:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    
    *Note: Replace `your_supabase_project_url` and `your_supabase_anon_key` with actual values provided by the Supabase project dashboard.*

### Running the Application

To start the development server:

```bash
npm run dev
```

Access the application via a web browser at `http://localhost:3000`.

## Deployment

The application is optimized for deployment on platforms supporting Next.js, such as Vercel.

**Build Command:**
```bash
npm run build
```

**Start Command:**
```bash
npm start
```

Ensure all environment variables defined in the Configuration section are successfully propagated to the production environment.

## Project Structure

*   `/app`: Contains the application routes and page logic (App Router).
*   `/components`: Reusable UI components.
*   `/lib`: Utility libraries and client configurations (e.g., Supabase client).
*   `/public`: Static assets including images and icons.

## Governance

This project is proprietary software. Unauthorized reproduction, distribution, or use of the codebase without explicit permission is strictly prohibited. All rights reserved.

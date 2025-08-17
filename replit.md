# PeerLearn - Collaborative Learning Platform

## Overview

PeerLearn is a modern web application designed to facilitate peer-to-peer learning among students. The platform connects learners with complementary skills, enabling them to teach subjects they excel in while learning topics they need help with. The application features a comprehensive system including user matching, real-time chat, Q&A forums, study groups, and gamification elements like coins and reputation scoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built as a single-page application (SPA) using React 18 with TypeScript. The application uses a component-based architecture with the following key design decisions:

- **Routing**: Wouter is used for client-side routing, providing a lightweight alternative to React Router
- **State Management**: React Query (TanStack Query) handles server state management and caching, while React Context provides global state for authentication and theming
- **UI Framework**: Built on top of Radix UI primitives with shadcn/ui components for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

The frontend follows a feature-based directory structure with pages, components, contexts, and hooks organized by functionality. The application is responsive and includes mobile-first design patterns.

### Backend Architecture
The server is built with Express.js using TypeScript and follows a modular architecture:

- **Framework**: Express.js with custom middleware for logging and error handling
- **Development Setup**: Vite integration for hot module replacement during development
- **API Structure**: RESTful API design with routes prefixed under `/api`
- **Storage Interface**: Abstract storage interface (IStorage) allowing for different implementations (currently using in-memory storage with plans for database integration)
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

The server uses ES modules and includes middleware for request logging, JSON parsing, and development-specific features like Vite integration.

### Database Schema
The application uses Drizzle ORM with PostgreSQL, defining a comprehensive schema for the learning platform:

- **Users**: Stores student profiles including university, major, skills they can teach/want to learn, coins, reputation, and badges
- **Questions**: Forum questions with voting, views, coin rewards, and resolution status
- **Answers**: Responses to questions with voting and accepted answer functionality
- **Study Groups**: Subject-based collaborative learning groups
- **Messages/Conversations**: Real-time chat system for peer communication

The schema includes proper relationships between entities and uses JSON fields for arrays of skills and tags.

### Authentication & Authorization
Currently implements a mock authentication system for development:

- Context-based authentication state management
- Session simulation with local storage persistence
- Protected routes and role-based access patterns prepared for implementation
- User profile management with university and academic information

### Design System
The application uses a cohesive design system built on:

- **Component Library**: shadcn/ui components with Radix UI primitives
- **Theme System**: CSS custom properties for consistent theming with light/dark mode support
- **Typography**: Inter font family for modern, readable text
- **Color Palette**: Primary blue (#4285F4) with purple accents and semantic colors for success, warning, and error states
- **Spacing & Layout**: Consistent spacing scale and responsive grid system

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and concurrent features
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type safety across the entire application
- **Vite**: Build tool and development server with hot module replacement

### Database & ORM
- **Drizzle ORM**: Type-safe SQL database toolkit with schema management
- **@neondatabase/serverless**: Serverless PostgreSQL adapter for database connections
- **Drizzle Kit**: Database migration and schema management tools

### UI & Design
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component library built on Radix UI and Tailwind
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Component variant management for design systems

### State Management & Data Fetching
- **TanStack React Query**: Server state management, caching, and synchronization
- **React Hook Form**: Performant forms with minimal re-renders
- **Wouter**: Lightweight client-side routing library

### Development & Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **tsx**: TypeScript execution for Node.js development server
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment

### Validation & Utilities
- **Zod**: Runtime type validation and schema definition
- **clsx & tailwind-merge**: Utility functions for conditional CSS class composition
- **date-fns**: Date manipulation and formatting library
- **nanoid**: Secure URL-friendly unique string ID generator

The application is designed to be deployed on Replit with specific development tooling and error handling optimized for that environment.
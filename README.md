# CityFix - Municipal Service Request Portal

This is a frontend prototype for a Municipal Service Request Portal, built with React, Vite, and Tailwind CSS.

## Features

- **Public Dashboard**: View status of community requests (Pending, In Progress, Resolved).
- **Submit Request**: Streamlined form for citizens to report issues.
- **Request Details**: Timeline view to track specific reports.
- **Responsive Design**: Works on mobile and desktop.
- **Modern UI**: Clean, accessible design using Tailwind CSS and Radix UI primitives.

## Project Structure

- `client/src/pages`: Main view components (Home, Dashboard, Submit, Details).
- `client/src/components`: Reusable UI components (Layout, RequestCard).
- `client/src/lib/mock-data.ts`: Mock data for the prototype.
- `client/src/components/ui`: Shadcn/UI primitives.

## How to Run Locally

1. **Prerequisites**: Ensure you have Node.js installed (v18 or higher recommended).

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev:client
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5000`

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: wouter
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## Notes

This is a **frontend-only prototype**. Data is stored in memory and will reset when the page is reloaded. There is no backend database connected in this version.

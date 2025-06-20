# GRO Dashboard - NextGen CPGRAMS Grievance Management System

This dashboard application is developed as part of the CPGRAMS residency of 2025 to showcase the Grievance Redressal Officer (GRO) and departmental perspective of the NextGen CPGRAMS Grievance Management System.

## Overview

The GRO Dashboard provides a comprehensive interface for GROs and department personnel to manage, track, and resolve citizen grievances efficiently. It complements the citizen-facing grievance submission portal by offering tools and insights necessary for the internal handling of grievances.

## Features

*   **Grievance Management:** View, assign, and update the status of grievances.
*   **Dashboard Analytics:** Visualize grievance trends, resolution times, and departmental performance.
*   **Reporting Tools:** Generate reports on grievance handling and outcomes.
*   **Secure Access:** Role-based access control for GROs and department staff.
*   **AI-Powered Insights (Planned/Potential):** Leverage AI to assist GROs in identifying patterns, suggesting resolution paths, or summarizing complex grievances.

## Technical Stack

*   **Frontend:** Next.js with TypeScript
*   **UI Components:** React with modern styling
*   **Icons:** Lucide React
*   **API Integration:** Connects to the backend grievance handling API (e.g., `https://grm-api.vercel.app/grievances/` or a dedicated GRO endpoint).

## Getting Started

**Note:** Make sure you have `npm` installed.

1.  **Install packages** at the project root:
    ```bash
    npm i
    ```

2.  **Environment Variables:**
    Copy the `template.env` file to `.env` at the project root and define necessary environment variables. These will typically include API endpoints and any authentication keys required for the dashboard.

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```
    or
    ```bash
    pnpm dev
    ```
    or
    ```bash
    bun dev
    ```

4.  Open `http://localhost:3000` (or the configured port) with your browser to see the dashboard.

## Usage

This dashboard is designed for internal use by GROs and authorized department personnel.

*   **Login:** Access the dashboard using your assigned credentials.
*   **View Grievances:** Navigate the list of incoming and ongoing grievances.
*   **Process Grievances:** Update grievance status, add notes, assign to relevant officers, and mark for resolution.
*   **Monitor Performance:** Utilize analytics to track key performance indicators related to grievance redressal.

## Project Context

This GRO Dashboard is a component of the "NextGen CPGRAMS Grievance Management System," an initiative showcased during the CPGRAMS residency of 2025. It aims to demonstrate a modernized approach to public grievance handling from the perspective of the administrative and redressal authorities.
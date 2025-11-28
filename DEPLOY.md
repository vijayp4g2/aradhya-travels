# Deployment Guide for Aradhya Travels

This application is set up as a **Monorepo** (Single Repository) containing both the React Frontend and Node.js Backend.

## 🚀 Option 1: Deploy to Render (Recommended for Free Tier)

Render is excellent because it can detect the Node.js backend and serve the frontend static files we just configured.

### Steps:

1.  **Push to GitHub**:
    *   Create a new repository on GitHub.
    *   Push this entire project folder to GitHub.

2.  **Create Web Service on Render**:
    *   Go to [dashboard.render.com](https://dashboard.render.com/).
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.

3.  **Configure Settings**:
    *   **Name**: `aradhya-travels` (or similar)
    *   **Runtime**: `Node`
    *   **Build Command**: `npm run install:all && npm run build`
        *   *This installs dependencies for both folders and builds the React app.*
    *   **Start Command**: `npm start`
        *   *This runs the Node server which serves the API and the built React files.*
    *   **Environment Variables**:
        *   `NODE_VERSION`: `20` (or latest)
        *   `MONGODB_URI`: (Optional) Add your MongoDB Atlas connection string if you want a real database. If left empty, it will use the In-Memory Mock DB.

4.  **Deploy**:
    *   Click **Create Web Service**.
    *   Wait for the build to finish. Render will give you a URL (e.g., `https://aradhya-travels.onrender.com`).

---

## 🌐 Option 2: Deploy to Vercel (Frontend Only)

If you only want to host the frontend and use the mock backend (or a separate backend URL):

1.  Install Vercel CLI: `npm i -g vercel`
2.  Run `vercel` in the root directory.
3.  Set the `client` directory as the root of the project when asked.
4.  *Note: This might require changing API URLs in the frontend code to point to a deployed backend.*

---

## 🛠️ Local Production Test

To test the "production" build locally before deploying:

1.  **Build the Frontend**:
    ```bash
    npm run build
    ```

2.  **Start the Server**:
    ```bash
    npm start
    ```

3.  **Visit**: `http://localhost:5000`
    *   You should see the React app served by the Node server!


Below is the content for your documentation in Markdown format. You can copy this into a README.md file or any other appropriate file for your project.

markdown
Copy code
# Project Documentation

## 1. Setup Guide

### 1.1. Prerequisites
- **Node.js**: Ensure you have Node.js installed (v14 or higher recommended).
- **Package Manager**: Install npm or yarn (depending on what your project uses).
- **Database**: Set up the required database (e.g., PostgreSQL, MySQL, etc.) and configure it according to the project requirements.

### 1.2. Cloning the Repository
```bash
git clone <repository-url>
cd <project-directory>```

```
### 1.3. Installing Dependencies
```bash
npm install
# or
yarn install
```

### 1.4. Setting Up Environment Variables
Create a .env file in the root of your project.
Add the required environment variables:

1.5. Running the Project in Development Mode
```bash
npm run dev
# or
yarn dev
```
The project should now be running on http://localhost:<PORT>.


## 2. Code Structure

### 2.1. Folder Structure Overview
```bash

/src
  /components    # React components
  /pages         # Page components for routing
  /store         # State management setup (e.g., Redux or Zustand)
  /utils         # Utility functions
  /api           # API integration and services
  /hooks         # Custom hooks
  /styles        # Global styles and theming
/lib
  /store.js      # redux store
  /hook.ts       # hooks for redux store
```
 
###  2.2. Main Components and State Management
Components: Reusable UI components located in the components directory.
State Management: Managed with Redux toolkit. State-related files are located in the  ==lib/features== store directory.

### 2.3. Scalability and Maintainability
The project is organized to separate concerns, making it easy to scale by adding new features without cluttering the codebase.
Each directory has a specific responsibility, ensuring maintainability.


## 3. API Documentation

## 3.1. API Endpoints

GET /api/products: Fetches a list of products.
GET /api/products/{:id}: Fetches a list of products with this id.
GET /api/relatedProducts:  Fetches a list of products related to this id.
GET /api/reviews:  Fetches a list of reviews of this id.


3.2. Data Structure and TypeScript Interfaces
Product Interface:
```typescript

interface Product  {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  main_image: string;
 other_images: string[];
}

```
Review Interface:
```typescript
Copy code
interface Review  {
  id: number;
  reviewerName: string;
  reviewerImg: string;
  comment: string;
  date: Date
 review_images: string[];
}
```
## 3.3. API Request and Response Examples
Example Request:
```bash

curl -X GET http://localhost:<PORT>/api/products
```
Example Response:
```json

[
   {
        "name": "Smartphone X200",
        "description": "A high-end smartphone with a 6.5-inch display, 128GB storage, and a 48MP camera.",
        "price": 699.99,
        "stock": 25,
        "main_image": "https://m.media-amazon.com/images/I/518ogNYZebL._SX466_.jpg",
        "other_images": [
            "https://m.media-amazon.com/images/I/418ho8yASsL._SX38_SY50_CR,0,0,38,50_.jpg",
            "https://m.media-amazon.com/images/I/518ogNYZebL._SX466_.jpg",
            "https://m.media-amazon.com/images/I/51D7bicj2gL._SX466_.jpg"
        ],
        "id": "ac96d89ed4212006aaca"
    },
]

```
## 4. Testing Guide
### 4.1. Running Tests
```bash

npm run test
# or
yarn test
```

To generate coverage reports:
```bash

npm run test:coverage
```
### 4.2. Testing Strategy

Unit Tests: Located in the __tests__ or tests directory, focusing on individual functions or components.
Integration Tests: Ensures that different parts of the system work together correctly.
End-to-End Tests: Simulates user interactions and ensures the application behaves as expected.

### 4.3. Writing New Tests
Follow the existing structure when adding new tests.
Ensure each new feature or bug fix is accompanied by appropriate test cases.
## 5. Performance Optimization

### 5.1. Overview of Performance Optimizations
Code Splitting: Implemented to reduce the initial load time.
Lazy Loading: Components are loaded only when needed.
Memoization: Used to prevent unnecessary re-renders.



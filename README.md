# Password Generator App

A React-based application to generate secure, customizable passwords and manage them efficiently. Users can configure password complexity, length, and save generated passwords to a backend API.

## Features
- **Password Generation**
  - Customizable password length (1–100).
  - Options to include uppercase, lowercase, numbers, and symbols.
  - Multiple complexity modes:
    - **Easy to Say**: Avoids ambiguous characters.
    - **Easy to Read**: Excludes visually similar characters.
    - **All Characters**: Includes all character types.

- **Password Management**
  - Save generated passwords with a custom type.
  - View a list of saved passwords, including metadata (type, complexity mode, creation date).
  - Delete saved passwords.
  
- **Clipboard Integration**
  - Copy generated passwords to the clipboard with a single click.

## Tech Stack
- **Frontend**: React with functional components and hooks.
- **Backend**: API integration via Axios (API endpoints must be set in `.env` as `REACT_APP_API_URL`).
- **Styling**: CSS for responsive and user-friendly design.
- **Icons**: React Icons (e.g., `MdDelete`) for actions.
- **Notifications**: SweetAlert2 for alerts and feedback.

## Installation & Dependencies

### Prerequisites
- **Node.js** (v14 or later recommended)
- **npm** or **yarn** (for dependency management)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following:
   ```env
   REACT_APP_API_URL=<your-backend-url>
   ```

### Dependencies
#### Backend:
- **[colors](https://www.npmjs.com/package/colors)**: For terminal string styling.
- **[concurrently](https://www.npmjs.com/package/concurrently)**: To run multiple commands in parallel.
- **[cors](https://www.npmjs.com/package/cors)**: Middleware for enabling Cross-Origin Resource Sharing.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: For managing environment variables.
- **[express](https://www.npmjs.com/package/express)**: Web framework for building APIs.
- **[express-winston](https://www.npmjs.com/package/express-winston)**: Middleware for logging HTTP requests and errors.
- **[mongoose](https://www.npmjs.com/package/mongoose)**: MongoDB object modeling tool.
- **[mongoosejs-soft-delete](https://www.npmjs.com/package/mongoosejs-soft-delete)**: Plugin for soft deletion in MongoDB models.
- **[nodemon](https://www.npmjs.com/package/nodemon)**: Utility for automatically restarting the server during development.
- **[winston](https://www.npmjs.com/package/winston)**: Logging library for structured logging.

#### Frontend:
- **[axios](https://www.npmjs.com/package/axios)**: For making HTTP requests to the API.
- **[sweetalert2](https://www.npmjs.com/package/sweetalert2)**: For interactive alert dialogs.
- **[react-icons](https://www.npmjs.com/package/react-icons)**: For integrating icons into the React app.

### Run the Application
1. Start the backend server (if included in the same repository):
   ```bash
   npm run server
   ```

2. Start the frontend development server:
   ```bash
   npm start
   ```

3. Access the application at `http://localhost:3000` in your browser.

## API Endpoints
- **POST** `/api/v1/password`: Save a password.
- **GET** `/api/v1/passwords`: Retrieve all saved passwords.
- **DELETE** `/api/v1/password/:id`: Delete a saved password.

## Screenshots
### Password Generator
Displays password settings and allows users to generate and copy passwords.

### Password Management Table
Displays saved passwords with options to delete.

## Future Enhancements
- Add search and filter options for saved passwords.
- Include password strength indicators.
- Add export/import functionality for passwords.

## License
This project is open-source and available under the MIT License.


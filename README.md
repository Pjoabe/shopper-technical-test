# shopper-technical-test
---

The Shopper Technical Test is a back-end service developed to manage individualized readings of water and gas consumption. The service uses AI to obtain measurements through a photo of a meter. It includes endpoints for uploading images, confirming readings, and correcting read values. The project integrates with the Google Gemini API to process images and returns detailed information about the measurements.

---

**Technologies**

- **Node.js**: JavaScript runtime environment for server-side execution.
- **Express**: Web framework for Node.js.
- **Sequelize**: ORM for interacting with the MySQL database.
- **TypeScript**: Language that adds static typing to JavaScript.
- **Docker**: Containerization of the development environment and database.
- **MySQL**: Relational database management system.
- **Google Gemini API**: API for image processing and recognition.

---

**Installation**

**Prerequisites**
- Node.js (version 18.x or higher)
- Docker (for the development environment)
- Docker Compose (for orchestrating containers)

---

**Steps**

1. **Clone the repository**

    ```bash
    git clone git@github.com:Pjoabe/shopper-technical-test.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd shoppertechnicaltest
    ```

3. **Configure environment variables**

    Create a `.env` file at the root of the project with the following variables:

    ```makefile
    NODE_ENV=development
    GEMINI_API_KEY=YourGoogleGeminiApiKey
    DB_HOST=shopper_db
    DB_PORT=3306
    DB_NAME=shopper_db
    DB_USER=shopper_user
    DB_PASSWORD=shopper_password
    ```

4. **Build Docker containers**

    ```bash
    docker-compose build
    ```

5. **Start Docker containers**

    ```bash
    docker-compose up
    ```
---

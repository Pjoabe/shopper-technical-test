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
## Endpoints

### POST /upload

- **Description**: Uploads a base64 image and creates a measurement.
- **Request Body**:
  ```json
  {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" or "GAS"
  }
  ```
- **Responses**:
  - **200 OK**: Operation successful.
    ```json
    {
      "image_url": "string",
      "measure_value": "integer",
      "measure_uuid": "string"
    }
    ```
  - **400 Bad Request**: Invalid data provided in the request body.
    ```json
    {
      "error_code": "INVALID_DATA",
      "error_description": "<error description>"
    }
    ```
  - **409 Conflict**: A reading for this type already exists for the current month.
    ```json
    {
      "error_code": "DOUBLE_REPORT",
      "error_description": "Reading for the month already performed"
    }
    ```

### PATCH /confirm

- **Description**: Confirms or corrects the value read by the LLM.
- **Request Body**:
  ```json
  {
    "measure_uuid": "string",
    "confirmed_value": "integer"
  }
  ```
- **Responses**:
  - **200 OK**: Operation successful.
    ```json
    {
      "success": true
    }
    ```
  - **400 Bad Request**: Invalid data provided in the request body.
    ```json
    {
      "error_code": "INVALID_DATA",
      "error_description": "<error description>"
    }
    ```
  - **404 Not Found**: Reading not found.
    ```json
    {
      "error_code": "MEASURE_NOT_FOUND",
      "error_description": "Reading not found"
    }
    ```
  - **409 Conflict**: Reading already confirmed.
    ```json
    {
      "error_code": "CONFIRMATION_DUPLICATE",
      "error_description": "Reading already confirmed"
    }
    ```

### GET /<customer_code>/list

- **Description**: Lists measurements for a specific customer.
- **Query Parameters** (optional):
  - `measure_type`: Filter by measurement type, which must be either "WATER" or "GAS". The validation is case-insensitive.
- **Responses**:
  - **200 OK**: Successful operation. Returns a list of all readings.
    ```json
    {
      "customer_code": "string",
      "measures": [
        {
          "measure_uuid": "string",
          "measure_datetime": "datetime",
          "measure_type": "string",
          "has_confirmed": "boolean",
          "image_url": "string"
        },
        {
          "measure_uuid": "string",
          "measure_datetime": "datetime",
          "measure_type": "string",
          "has_confirmed": "boolean",
          "image_url": "string"
        }
      ]
    }
    ```
  - **400 Bad Request**: Invalid `measure_type` parameter.
    ```json
    {
      "error_code": "INVALID_TYPE",
      "error_description": "Measurement type not allowed"
    }
    ```
  - **404 Not Found**: No records found.
    ```json
    {
      "error_code": "MEASURES_NOT_FOUND",
      "error_description": "No readings found"
    }
    ```

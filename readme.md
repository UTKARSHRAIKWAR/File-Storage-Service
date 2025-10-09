# 📁 File Storage Service

A secure, scalable, and modern **File Storage & Management Service** built with **Node.js, Express, AWS S3, and MongoDB**.
It allows users to **upload, download, list, delete, and share files** using **AWS S3** with temporary signed URLs for secure access.

---

## 🌟 Features

- **User Authentication** (JWT-based)
- **Upload Files**: Supports any file type, temporarily stored via **Multer**
- **Secure Cloud Storage**: Files uploaded to **AWS S3**
- **Signed URLs**: Secure temporary access to files
- **File Management**: List, delete, and share files
- **Shareable Links**: Generate time-limited links for sharing
- **Responsive Design Ready**: Can be integrated with a modern frontend (React/Tailwind)

---

## 🧱 Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Backend     | Node.js, Express.js                    |
| Database    | MongoDB (Mongoose ORM)                 |
| Storage     | AWS S3 (signed URLs for secure access) |
| File Upload | Multer (temporary local storage)       |
| Security    | JWT authentication, signed URLs        |
| Environment | dotenv for configuration               |

---

## ⚡ Installation

1. **Clone the repository**

```bash
git clone https://github.com/UTKARSHRAIKWAR/file-storage-service.git
cd file-storage-service
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>

AWS_ACCESS_KEY_ID=<your_aws_access_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
AWS_REGION=<aws_region>
AWS_BUCKET_NAME=<bucket_name>
```

4. **Create temporary uploads folder**

```bash
mkdir temp
```

---

## 🚀 Running the Server

```bash
npm run dev
```

Server runs at: `http://localhost:3000`

---

## 🗂 API Endpoints

| Endpoint               | Method | Description                                                  |
| ---------------------- | ------ | ------------------------------------------------------------ |
| `/api/files/upload`    | POST   | Upload a single file (multipart/form-data with `file` field) |
| `/api/files/:id/url`   | GET    | Generate a temporary signed URL for a file                   |
| `/api/files`           | GET    | List all files for the authenticated user (metadata only)    |
| `/api/files/:id`       | DELETE | Delete a file from AWS S3 and MongoDB                        |
| `/api/files/:id/share` | POST   | Generate a shareable signed URL (custom expiry)              |

---

### 📤 Example: Upload File

**Request**:

```bash
POST /api/files/upload
Headers:
Authorization: Bearer <token>
Body:
file: <choose file>
```

**Response**:

```json
{
  "success": true,
  "file": {
    "_id": "64f5a1b23f1e9e1234567890",
    "ownerId": "64f59f8b3f1e9e1234567890",
    "fileName": "example.pdf",
    "key": "userId/1697034567890-example.pdf",
    "url": "<signed_url>",
    "size": 102400,
    "createdAt": "2025-10-09T11:29:27.123Z"
  }
}
```

---

### 🔐 Example: Get Signed URL

```bash
GET /api/files/:id/url
Headers:
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "url": "<temporary_signed_url>"
}
```

---

## 🛡 Security Notes

- Files are **private by default** on S3.
- **Signed URLs** expire after a short time (default 15 minutes).
- Ownership is verified before generating signed URLs or deleting files.
- JWT authentication required for all endpoints.

---

## ⚙️ Folder Structure

```
backend/
│
├── src/
│   ├── config/        # AWS S3 config
│   ├── controllers/   # API logic
│   ├── middleware/    # Multer, authentication
│   ├── models/        # MongoDB schemas
│   ├── routes/        # Express routes
│   └── index.js       # Entry point
├── uploads/           # Temp folder for multer
├── .env
├── package.json
└── README.md
```

---

## 📦 Deployment Recommendations

- **Node.js** backend: deploy to AWS EC2, Render, Railway, or Heroku.
- **MongoDB**: Use MongoDB Atlas.
- **AWS S3 Bucket**: Set bucket to private.
- Use **CloudFront + signed URLs** for high-scale, low-latency file delivery.
- Enable **CORS** on S3 for your frontend domain only.

---

## ⚡ Future Enhancements

- Integrate a **React + Tailwind frontend** for a modern dashboard UI.
- Add **user roles** and file access permissions.
- Add **versioning** for files.
- Enable **file preview** for images, videos, and PDFs.
- Implement **activity logging** and analytics for file usage.

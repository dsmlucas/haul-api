# 🚛 Inspections Management App

## 📖 Description

Based on the requirements from [Software Engineer Take Home](https://haulwith.notion.site/Software-Engineer-Take-Home-5e2ebed9c75b4bad8b04d2f7b880f4b7), this application provides a complete solution to **import FMCSA XML inspection files** and visualize the inspection data on a **frontend view**.

The system consists of a **NestJS backend** that handles XML parsing, database persistence, and API endpoints, and a **React frontend** that allows users to browse, filter, and inspect the imported data.

---

## ✨ Features

- 📂 **XML Import**: Upload and parse FMCSA inspection XML files.
- 🛠️ **Data Processing**: Extracts inspections, vehicles, and violations.
- 🗄️ **Database Storage**: Uses a relational schema with proper relationships.
- 🔎 **Search & Filters**: Query inspections by BASIC, vehicle license number, or violation code.
- 📊 **Frontend Dashboard**: View paginated inspections list and detailed inspection reports.

---

## 🏗️ Tech Stack

- **Backend**: [NestJS](https://nestjs.com/) + TypeORM + PostgreSQL
- **Frontend**: [React](https://react.dev/) + [Material UI](https://mui.com/)
- **Containerization**: Docker & Docker Compose
- **Data Source**: FMCSA XML Inspection files

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 20)
- Docker & Docker Compose
- Yarn

---

### 1. Clone the repository

```bash
git clone https://github.com/dsmlucas/inspections-app.git
cd inspections-app
```

### 2. Start with Docker

```bash
docker compose up --build
```

This will start:

- Backend at `http://localhost:5000`
- Frontend at `http://localhost:3000`
- PostgreSQL database

---

### 3. Backend Setup (NestJS)

If running locally without Docker:

```bash
cd backend
yarn install
docker compose up -d
```

Default server: `http://localhost:5000`

---

### 4. Frontend Setup (React)

```bash
cd frontend
yarn install
yarn start
```

Default app: `http://localhost:3000`

---

## 📂 Project Structure

```
.
├── backend/               # NestJS app
│   ├── src/
├── frontend/              # React app
│   ├── src/
└── docker-compose.yml
```

---

## 📊 Example Usage

### Import XML

Use the backend endpoint:

```bash
curl -X POST http://localhost:5000/import \
  -F "file=@USDOT_80806_All_BASICs_Public_08-29-2025-formatted.xml"
```

### Fetch Inspections (paginated)

```bash
curl "http://localhost:5000/inspections?page=1&limit=10"
```

### Decode VIN (via NHTSA API)

```bash
curl "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/1NNC05327PM192691?format=json"
```

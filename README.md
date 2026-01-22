# Portfolio Backend

A serverless backend for a personal portfolio website using the Notion API, designed to be deployed on Vercel.

## Features

- 🚀 Serverless architecture on Vercel
- 📝 Notion API integration for content management
- 🔄 RESTful API endpoints
- 🌐 CORS enabled for cross-origin requests
- ⚡ Fast and scalable

## Prerequisites

- Node.js (v14 or higher)
- A Notion account
- A Vercel account (for deployment)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ariashi15/portfolio-backend.git
cd portfolio-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Portfolio Backend")
4. Copy the "Internal Integration Token" - this is your `NOTION_API_KEY`

### 4. Create a Notion Database

1. Create a new database in Notion for your portfolio content
2. Share the database with your integration:
   - Click "Share" on your database
   - Invite your integration
3. Copy the database ID from the URL:
   - Format: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
   - The `database_id` is the long alphanumeric string

### 5. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

### 6. Run locally

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### GET /api/

Returns API information and available endpoints.

**Response:**
```json
{
  "success": true,
  "message": "Portfolio Backend API",
  "version": "1.0.0",
  "endpoints": {
    "/api/pages": "Get all pages from Notion database",
    "/api/page?id={page_id}": "Get specific page content"
  }
}
```

### GET /api/pages

Retrieves all pages from your Notion database.

**Response:**
```json
{
  "success": true,
  "pages": [
    {
      "id": "page-id",
      "created_time": "2024-01-01T00:00:00.000Z",
      "last_edited_time": "2024-01-01T00:00:00.000Z",
      "properties": { /* page properties */ }
    }
  ]
}
```

### GET /api/page?id={page_id}

Retrieves a specific page and its content blocks.

**Parameters:**
- `id` (required): The Notion page ID

**Response:**
```json
{
  "success": true,
  "page": { /* page metadata */ },
  "blocks": [ /* page content blocks */ ]
}
```

## Deployment to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `NOTION_API_KEY` and `NOTION_DATABASE_ID`

### Option 2: Deploy with GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables during setup
5. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NOTION_API_KEY` | Your Notion integration token | Yes |
| `NOTION_DATABASE_ID` | The ID of your Notion database | Yes |

## Project Structure

```
portfolio-backend/
├── api/
│   ├── index.js       # Main API endpoint
│   ├── pages.js       # Get all pages from Notion
│   └── page.js        # Get specific page content
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common error codes:
- `400`: Bad request (missing required parameters)
- `500`: Server error (Notion API issues, configuration problems)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
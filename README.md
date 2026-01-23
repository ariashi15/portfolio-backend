# Portfolio Backend

Serverless backend for personal portfolio using the Notion API, designed to be deployed on Vercel.

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

## License

MIT
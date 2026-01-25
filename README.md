# Portfolio Backend

Serverless backend for personal portfolio using the Notion API, designed to be deployed on Vercel.

### Notion Integration Configuration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name
4. Copy the "Internal Integration Token" - this is the `NOTION_API_KEY`
5. Copy Notion database ID from the URL:
   - Format: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
   - The `database_id` is the long alphanumeric string


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
   - Go to project settings
   - Navigate to "Environment Variables"
   - Add env variables

### Option 2: Deploy with GitHub Integration

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import GitHub repository
4. Add environment variables during setup
5. Deploy

## License

MIT
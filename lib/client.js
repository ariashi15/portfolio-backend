const { Client } = require('@notionhq/client');

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not configured');
}

// Shared Notion client instance
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Handle CORS
const defaultHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers':
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};

const applyCors = (res, extra = {}) => {
  const headers = { ...defaultHeaders, ...extra };
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
};

const handleOptions = (req, res) => {
  if (req.method === 'OPTIONS') {
    applyCors(res);
    res.status(200).end();
    return true;
  }
  return false;
};

module.exports = { notion, applyCors, handleOptions };
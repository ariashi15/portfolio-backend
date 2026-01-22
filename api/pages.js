const { Client } = require('@notionhq/client');

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) {
      return res.status(500).json({
        error: 'NOTION_DATABASE_ID is not configured',
      });
    }

    if (!process.env.NOTION_API_KEY) {
      return res.status(500).json({
        error: 'NOTION_API_KEY is not configured',
      });
    }

    // Query the database
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    // Format the results
    const pages = response.results.map((page) => ({
      id: page.id,
      created_time: page.created_time,
      last_edited_time: page.last_edited_time,
      properties: page.properties,
    }));

    res.status(200).json({
      success: true,
      pages,
    });
  } catch (error) {
    console.error('Error querying Notion database:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

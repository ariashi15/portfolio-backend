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
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Page ID is required',
      });
    }

    if (!process.env.NOTION_API_KEY) {
      return res.status(500).json({
        error: 'NOTION_API_KEY is not configured',
      });
    }

    // Get page content
    const page = await notion.pages.retrieve({ page_id: id });
    
    // Get page blocks (content)
    const blocks = await notion.blocks.children.list({
      block_id: id,
    });

    res.status(200).json({
      success: true,
      page,
      blocks: blocks.results,
    });
  } catch (error) {
    console.error('Error retrieving Notion page:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

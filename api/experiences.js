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
    });

    // Helper function to extract plaintext blocks from richtext
    const getText = (rich_text = []) => rich_text.map(text_block => text_block.plain_text).join('')

    // Format the results
    const pages = response.results.map((page) => {
      const props = page.properties;
      return {
        id: getText(props.id.title),
        company: getText(props.company.rich_text),
        dates: getText(props.dates.rich_text),
        title: getText(props.title.rich_text),
        description: getText(props.description.rich_text),
        tags: props.tags.multi_select.map((tag) => tag.name),
        link: props.link.url
      }
    });

    pages.sort((a, b) => {
      const id_a = parseInt(a.id);
      const id_b = parseInt(b.id);
      return id_a - id_b
    });

    res.status(200).json(pages);

  } catch (error) {
    console.error('Error querying Notion database:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

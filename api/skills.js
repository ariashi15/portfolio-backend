const { notion, applyCors, handleOptions } = require('../lib/client');
const { getText, sortById } = require('../lib/parse');

module.exports = async (req, res) => {
  applyCors(res);
  if (handleOptions(req, res)) return;

  try {
    const databaseId = process.env.SKILLS_DATABASE_ID;

    if (!databaseId) {
      return res.status(500).json({
        error: 'SKILLS_DATABASE_ID is not configured',
      });
    }

    // Query the database
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // Format the results
    const pages = response.results.map((page) => {
      const props = page.properties;
      return {
        id: getText(props.id.title),
        name: getText(props.name.rich_text),
        imgurl: props.imgurl.url
      }
    });

    pages.sort(sortById);

    res.status(200).json(pages);

  } catch (error) {
    console.error('Error querying Notion database:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

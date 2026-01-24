const { notion, applyCors, handleOptions } = require('../lib/client');
const { getText, sortById } = require('../lib/parse');

module.exports = async (req, res) => {
  applyCors(res);
  if (handleOptions(req, res)) return;

  try {
    const databaseId = process.env.EXPERIENCES_DATABASE_ID;

    if (!databaseId) {
      return res.status(500).json({
        error: 'EXPERIENCES_DATABASE_ID is not configured',
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
        company: getText(props.company.rich_text),
        dates: getText(props.dates.rich_text),
        title: getText(props.title.rich_text),
        description: getText(props.description.rich_text),
        tags: props.tags.multi_select.map((tag) => tag.name),
        link: props.link.url
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

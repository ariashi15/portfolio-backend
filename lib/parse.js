// Helper function to extract plaintext blocks from richtext
const getText = (rich_text = []) => rich_text.map(text_block => text_block.plain_text).join('');

module.exports = { getText };
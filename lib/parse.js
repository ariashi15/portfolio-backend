// Helper function to extract plaintext blocks from richtext
const getText = (rich_text = []) => rich_text.map(text_block => text_block.plain_text).join('');

const sortById = (a, b) => {
      const id_a = parseInt(a.id);
      const id_b = parseInt(b.id);
      return id_b - id_a
    }

module.exports = { getText, sortById };
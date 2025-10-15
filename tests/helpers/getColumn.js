function getColumn(page, columnName) {
  return page.locator('div', {
    has: page.getByRole('heading', { level: 2, name: columnName })
  });
}

module.exports = { getColumn };

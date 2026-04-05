window.addEventListener('DOMContentLoaded', () => {
  const keepIds = new Set(['root', 'chat-launcher', 'chat-panel']);
  const keepTags = new Set(['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT']);
  Array.from(document.body.children).forEach((node) => {
    if (keepIds.has(node.id) || keepTags.has(node.tagName)) return;
    if (node.hasAttribute('data-allow-injection')) return;
    node.remove();
  });
});

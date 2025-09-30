<script>
document.addEventListener('DOMContentLoaded', function() {
  const article = document.getElementById("single-article");
  const tocContainer = document.getElementById("toc");

  // Create the TOC
  const createTOC = () => {
    const headings = article.querySelectorAll("h2, h3, h4");
    const tocFragment = document.createDocumentFragment();

    headings.forEach((heading) => {
      const title = heading.textContent.trim();
      const anchorId = `toc-${title.toLowerCase().replace(/\s+/g, '-')}`;

      heading.id = anchorId;

      const li = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.textContent = title;
      anchor.href = `#${anchorId}`;
      li.appendChild(anchor);
      tocFragment.appendChild(li);
    });

    </script>

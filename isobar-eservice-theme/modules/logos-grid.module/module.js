$(".js-logos-grid-more").on('click', (e) => {
    e.preventDefault();
    const moreEl = $(e.currentTarget);
    const moduleId = moreEl.data('module');
    const gridEl = $(`.js-logos-grid[data-module="${moduleId}"]`);
    gridEl.addClass('logos-grid--expanded');
    moreEl.remove();
});

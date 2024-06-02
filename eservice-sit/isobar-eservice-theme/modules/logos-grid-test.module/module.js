$(".js-logos-grid-more").on('click', (e) => {
    e.preventDefault();
    const moreEl = $(e.currentTarget);
    const moduleId = moreEl.data('module');
    const gridEl = $(`.js-logos-grid[data-module="${moduleId}"]`);
    gridEl.addClass('logos-grid--expanded');
    moreEl.remove();
    randomImageSwap();
});

const randomImageSwap = () => {
    setInterval(() => {
        const images = document.querySelectorAll('.logos-grid__item-shuffle');
        let imgSrcArray = [];
        images.forEach(img => {
            imgSrcArray.push(img.src);
        });
        imgSrcArray = shuffle(imgSrcArray);
        images.forEach((img, index) => {
            img.src = imgSrcArray[index];
            return img;
        });
        imgSrcArray = [];
    }, 4000);
}
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}
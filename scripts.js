document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const searchOnScroll = document.getElementById('search-on-scroll');
    const searchInput = document.getElementById('searchInput');
    const searchBarScroll = document.getElementById('search-bar-scroll');
    const fixedSearchContainer = document.querySelector('.search-container');
    const fixedSearchHeight = fixedSearchContainer.offsetHeight;

    window.addEventListener('scroll', function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            searchOnScroll.style.top = "-80px";
        } else if (currentScroll < lastScrollTop && currentScroll > fixedSearchHeight) {
            searchOnScroll.style.top = "0";
        } else if (currentScroll <= fixedSearchHeight) {
            searchOnScroll.style.top = "-80px";
        }
        lastScrollTop = Math.max(0, currentScroll);
    });

    function filterProducts(query) {
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            let productName = product.querySelector('h3').innerText.toLowerCase();
            product.style.display = productName.includes(query) ? 'block' : 'none';
        });

        const noSearchElements = document.querySelectorAll('.no-search');
        noSearchElements.forEach(element => {
            element.style.display = query ? 'none' : 'block';
        });

        // Sicherstellen, dass das Produkt-Grid korrekt bleibt
        const productGrid = document.querySelectorAll('.product-grid');
        productGrid.forEach(grid => {
            grid.style.display = 'grid';
        });
    }

    function syncSearchInputs(sourceInput, targetInput) {
        targetInput.value = sourceInput.value;
        filterProducts(sourceInput.value.toLowerCase());
    }

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            syncSearchInputs(this, searchBarScroll);
        });
    }

    if (searchBarScroll) {
        searchBarScroll.addEventListener('input', function () {
            syncSearchInputs(this, searchInput);
        });
    }
});

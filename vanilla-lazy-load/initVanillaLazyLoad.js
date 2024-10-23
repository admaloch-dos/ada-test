document.addEventListener("DOMContentLoaded", function () {

    // Initialize Vanilla LazyLoad for all images
    const lazyLoadInstance = new LazyLoad({
        elements_selector: "img",
    });
     // Add error handling for all lazy-loaded images
     const images = document.querySelectorAll("img.lazyload");
     images.forEach(function (img) {
         img.onerror = function () {
             this.onerror = null; // Prevent infinite loop
             this.src = 'failed-to-load.jpg'; // Replace with your custom error image
             this.alt = 'Image failed to load'; // Update alt text
         };
     });
});

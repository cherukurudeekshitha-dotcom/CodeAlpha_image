// GET ELEMENTS

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");

const resultCount = document.getElementById("resultCount");

const emptyMessage = document.getElementById("emptyMessage");


// IMAGE FILTER FUNCTIONALITY

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        this.classList.add("active");

        const category = this.dataset.filter;

        let visibleCount = 0;

        galleryItems.forEach(item => {

            const itemCategory = item.dataset.category;

            if (
                category === "all" ||
                category === itemCategory
            ) {

                item.style.display = "";

                visibleCount++;

            } else {

                item.style.display = "none";

            }

        });

        // Update image count
        resultCount.textContent =
            "SHOWING " + visibleCount + " FRAMES";

        // Empty message
        emptyMessage.hidden = visibleCount !== 0;

    });

});


// LIGHTBOX ELEMENTS

const lightbox = document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxLocation =
    document.getElementById("lightboxLocation");

const imageCounter =
    document.getElementById("imageCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


// STORE IMAGE DATA

let currentIndex = 0;

const images = Array.from(galleryItems);


// OPEN LIGHTBOX

function openLightbox(index) {

    currentIndex = index;

    showImage();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


// DISPLAY SELECTED IMAGE

function showImage() {

    const item = images[currentIndex];

    const image = item.querySelector("img");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent =
        item.dataset.title;

    lightboxLocation.textContent =
        item.dataset.location;

    imageCounter.textContent =
        (currentIndex + 1) +
        " / " +
        images.length;

}


// CLICK IMAGE TO OPEN LIGHTBOX

images.forEach((item, index) => {

    item.addEventListener("click", function () {

        openLightbox(index);

    });

});


// CLOSE LIGHTBOX

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeLightbox);


// NEXT IMAGE

function nextImage() {

    currentIndex++;

    if (currentIndex >= images.length) {

        currentIndex = 0;

    }

    showImage();

}

nextBtn.addEventListener("click", nextImage);


// PREVIOUS IMAGE

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = images.length - 1;

    }

    showImage();

}

prevBtn.addEventListener("click", previousImage);


// KEYBOARD NAVIGATION

document.addEventListener("keydown", function(event) {

    if (!lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {

        closeLightbox();

    }

    if (event.key === "ArrowRight") {

        nextImage();

    }

    if (event.key === "ArrowLeft") {

        previousImage();

    }

});


// CLOSE WHEN CLICKING OUTSIDE IMAGE

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});
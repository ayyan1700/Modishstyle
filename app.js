
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 15) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const nav = document.getElementById("sidenav");
const mainContent = document.querySelector("main");
const search = document.querySelector(".searching");
const cards = document.querySelector(".cards");
const contain = document.querySelector(".contain");
const filter = document.querySelector(".filter");
const cardcontainer =  document.querySelector(".card-container");

document.getElementById("in-nav").addEventListener("click", function () {
  nav.style.right = "0%";
  document.body.style.overflow = "hidden";
  mainContent.style.pointerEvents = "none";
  search.style.pointerEvents = "none";
  cards.style.pointerEvents = "none";
  contain.style.pointerEvents = "none";
  filter.style.pointerEvents = "none";
  cardcontainer.style.pointerEvents = "none";
});

document.getElementById("out-nav").addEventListener("click", function () {
  nav.style.right = "-100%";
  document.body.style.overflow = "auto";
  mainContent.style.pointerEvents = "auto";
  search.style.pointerEvents = "auto";
  cards.style.pointerEvents = "auto";
  contain.style.pointerEvents = "auto";
  filter.style.pointerEvents = "auto";
  cardcontainer.style.pointerEvents = "auto";

});



function animateNumber(id, target, duration) {
    let start = 100;
    let end = target;
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));

    stepTime = stepTime > 0 ? stepTime : 0;

    let interval = setInterval(function () {
        current += increment;
        document.getElementById(id).textContent = current;
        if (current === end) {
            clearInterval(interval);
        }
    }, stepTime);
}


window.onload = function () {
    animateNumber("customers-count", 1500, 1000);
    animateNumber("orders-count", 2000, 1000);
    animateNumber("online-orders-count", 800, 1000);
};

const galleryContainer = document.querySelector(".gallery-container");
const gallerycontrolsContainer = document.querySelector(".gallery-controls");
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll(".galleryitem");

class Carousel {
  constructor(container, items, controls) {
    this.CarouselContainer = container;
    this.CarouselControls = controls;
    this.CarouselArray = [...items];
  }

  updateGallery() {
    this.CarouselArray.forEach((el) => {
      el.classList.remove(
        'gallery-item1',
        'gallery-item2',
        'gallery-item3',
        'gallery-item4',
        'gallery-item5'
      );
    });
    this.CarouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item${i + 1}`);
    });
  }

  setCurrentState(direction) {

    if (direction.classList.contains('gallery-controls-previous')) {
      this.CarouselArray.unshift(this.CarouselArray.pop()); 
    } else {
      this.CarouselArray.push(this.CarouselArray.shift());  
    }
    this.updateGallery(); 
  }

  setControls() {

    this.CarouselControls.forEach((control) => {
      const button = document.createElement("button");
      button.className = `gallery-controls-${control}`;
  
      const icon = document.createElement("i");
      icon.classList.add(control === "previous" ? "fas" : "fas", control === "previous" ? "fa-chevron-left" : "fa-chevron-right");
      
      button.appendChild(icon);
      gallerycontrolsContainer.appendChild(button);
    });
  }

  useControls() {
    const triggers = [...gallerycontrolsContainer.childNodes];
    triggers.forEach((control) => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        this.setCurrentState(control); 
      });
    });
  }
}


const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);


exampleCarousel.setControls();
exampleCarousel.useControls();
exampleCarousel.updateGallery();



const items = [
    { name: "girl", category: "Western", image: "img/2 (2)-min.jpg" },
    { name: "boy", category: "Western", image: "img/2 (3)-min.jpg" },
    { name: "girl", category: "Eastern", image: "img/1 (1)-min.jpg" },
    { name: "girl", category: "Eastern", image: "img/2 (6)-min.jpg" },
    {  name: "girl", category: "Western", image: "img/2 (7)-min.jpg" },
    { name: "boy", category: "Western", image: "img/2 (8)-min.jpg" },
    { name: "boy", category: "Eastern", image: "img/2 (11)-min.jpg" },
    { name: "boy", category: "Eastern", image: "img/2 (10)-min.jpg" },
    { name: "boy", category: "Eastern", image: "img/2 (11)-min.jpg" },
    { name: "girl", category: "Eastern", image: "img/1 (4)-min.jpg" },
    { name: "boy", category: "Eastern", image: "img/2 (11)-min.jpg" },
    { name: "girl", category: "Eastern", image: "img/1 (3)-min.jpg" }
    
];


function displayItems(filteredItems) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = item.image;
        card.appendChild(img);

        const title = document.createElement('h3');
        title.textContent = item.name;
        card.appendChild(title);

        const category = document.createElement('p');
        category.textContent = item.category;
        card.appendChild(category);

        cardContainer.appendChild(card);
    });
}

function filterSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
        return matchesSearch && matchesCategory;
    });

    displayItems(filteredItems);
}

displayItems(items);

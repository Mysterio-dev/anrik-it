
//  swiper slider
document.addEventListener('DOMContentLoaded', function () {
  let swiperProjects = new Swiper(".projects", {
    slidesPerView: 3,
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.selectornx2',
      prevEl: '.selectorpr2'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      }
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  var sidebar = function () {

    if (!Element.prototype.closest) {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      Element.prototype.closest = function (s) {
        var el = this;
        var ancestor = this;
        if (!document.documentElement.contains(el)) return null;
        do {
          if (ancestor.matches(s)) return ancestor;
          ancestor = ancestor.parentElement;
        } while (ancestor !== null);
        return null;
      };
    }


    //
    // Settings
    //
    var settings = {
      speedOpen: 50,
      speedClose: 350,
      activeClass: 'is-active',
      visibleClass: 'is-visible',
      selectorTarget: '[data-sidebar-target]',
      selectorTrigger: '[data-sidebar-trigger]',
      selectorClose: '[data-sidebar-close]',

    };


    //
    // Methods
    //

    // Toggle accessibility
    var toggleAccessibility = function (event) {
      if (event.getAttribute('aria-expanded') === 'true') {
        event.setAttribute('aria-expanded', false);
      } else {
        event.setAttribute('aria-expanded', true);
      }
    };

    // Open sidebar
    var opensidebar = function (trigger) {

      // Find target
      var target = document.getElementById(trigger.getAttribute('aria-controls'));

      // Make it active
      target.classList.add(settings.activeClass);

      // Make body overflow hidden so it's not scrollable
      document.documentElement.style.overflow = 'hidden';

      // Toggle accessibility
      toggleAccessibility(trigger);

      // Make it visible
      setTimeout(function () {
        target.classList.add(settings.visibleClass);
      }, settings.speedOpen);

    };

    // Close sidebar
    var closesidebar = function (event) {

      // Find target
      var closestParent = event.closest(settings.selectorTarget),
        childrenTrigger = document.querySelector('[aria-controls="' + closestParent.id + '"');

      // Make it not visible
      closestParent.classList.remove(settings.visibleClass);

      // Remove body overflow hidden
      document.documentElement.style.overflow = '';

      // Toggle accessibility
      toggleAccessibility(childrenTrigger);

      // Make it not active
      setTimeout(function () {
        closestParent.classList.remove(settings.activeClass);
      }, settings.speedClose);

    };

    // Click Handler
    var clickHandler = function (event) {

      // Find elements
      var toggle = event.target,
        open = toggle.closest(settings.selectorTrigger),
        close = toggle.closest(settings.selectorClose);

      // Open sidebar when the open button is clicked
      if (open) {
        opensidebar(open);
      }

      // Close sidebar when the close button (or overlay area) is clicked
      if (close) {
        closesidebar(close);
      }

      // Prevent default link behavior
      if (open || close) {
        event.preventDefault();
      }

    };

    // Keydown Handler, handle Escape button
    var keydownHandler = function (event) {

      if (event.key === 'Escape' || event.keyCode === 27) {

        // Find all possible sidebars
        var sidebars = document.querySelectorAll(settings.selectorTarget),
          i;

        // Find active sidebars and close them when escape is clicked
        for (i = 0; i < sidebars.length; ++i) {
          if (sidebars[i].classList.contains(settings.activeClass)) {
            closesidebar(sidebars[i]);
          }
        }

      }

    };

    //
    // Inits & Event Listeners
    //
    document.addEventListener('click', clickHandler, false);
    document.addEventListener('keydown', keydownHandler, false);
  };

  sidebar();
});


// leaflet map
$(function () {
  if (typeof(map) != 'undefined' && map != null) {
let map = L.map('map', { zoomControl:false }).setView([55.749679, 49.267123], 18);
var myIcon = L.icon({
  iconUrl: 'https://i.ibb.co/XCgr8Mq/mark.png',
  iconSize: [65, 65],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  subdomains:['mt0','mt1','mt2','mt3'],
  zoomControl: false,
  maxZoom: 25,
}).addTo(map);
L.marker([55.749679, 49.267123], {icon: myIcon}).addTo(map)
}
});


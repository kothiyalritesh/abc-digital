// Load Header and Footer Components
document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    loadComponent('header.html', 'header-placeholder', initializeNavigation);
    
    // Load Footer
    loadComponent('footer.html', 'footer-placeholder');
});

function loadComponent(file, placeholderId, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            placeholder.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            console.error(`Error loading ${file}:`, error);
            // Fallback: show error message
            placeholder.innerHTML = `<!-- ${file} failed to load. Please ensure you're running this through a web server. -->`;
        });
}

// Initialize navigation functionality after header loads
function initializeNavigation() {
    const header = document.getElementById("header");
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    // Set active nav link
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });

        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    }

    // Sticky header
    if (header) {
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
        window.addEventListener("scroll", handleScroll);
    }
}

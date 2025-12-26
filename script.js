// ===== DOM ELEMENTS =====
const header = document.getElementById("header")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

// ===== STICKY HEADER =====
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
}

window.addEventListener("scroll", handleScroll)

// ===== MOBILE MENU TOGGLE =====
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  const navLinks = navMenu.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove("active")
      navMenu.classList.remove("active")
    }
  })
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 90
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== SCROLL ANIMATIONS =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementTop < windowHeight - 100) {
      element.classList.add("animated")
    }
  })
}

window.addEventListener("scroll", animateOnScroll)
window.addEventListener("load", animateOnScroll)

// ===== PARALLAX EFFECT =====
const parallaxElements = document.querySelectorAll(".parallax")

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset

  parallaxElements.forEach((element) => {
    const speed = element.dataset.speed || 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)
  const suffix = element.dataset.suffix || ""

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target.toLocaleString() + suffix
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start).toLocaleString() + suffix
    }
  }, 16)
}

const statNumbers = document.querySelectorAll(".stat-number")
let statsAnimated = false

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.getAttribute("data-target") || stat.textContent.replace(/[^0-9]/g, ""))
          if (!isNaN(target)) {
            animateCounter(stat, target)
          }
        })
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".stats-section")
if (statsSection) {
  statsObserver.observe(statsSection)
}

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll(".filter-btn")
// support both legacy `.portfolio-item` and new `.our-work-item`
const portfolioItems = document.querySelectorAll(".portfolio-item, .our-work-item")

function applyFilter(filter) {
  portfolioItems.forEach((item) => {
    if (filter === "all" || item.getAttribute("data-category") === filter) {
      // show item
      item.style.display = ""
      // force reflow so transition runs reliably
      item.getBoundingClientRect()
      item.style.opacity = "1"
      item.style.transform = "scale(1)"
      item.setAttribute("aria-hidden", "false")
      item.classList.remove("hidden")
    } else {
      // hide with transition then remove from layout
      item.style.opacity = "0"
      item.style.transform = "scale(0.95)"
      item.setAttribute("aria-hidden", "true")
      setTimeout(() => {
        item.style.display = "none"
        item.classList.add("hidden")
      }, 300)
    }
  })
}

// initialize buttons: add ARIA roles, keyboard handling and arrow navigation
const filtersContainer = document.querySelector(".our-work-filters")
if (filtersContainer) {
  filtersContainer.setAttribute("role", "tablist")
}

filterBtns.forEach((btn, idx) => {
  // Set role and initial selection/tabindex
  btn.setAttribute("role", "tab")
  const isActive = btn.classList.contains("active")
  btn.setAttribute("aria-pressed", isActive ? "true" : "false")
  btn.setAttribute("aria-selected", isActive ? "true" : "false")
  btn.setAttribute("tabindex", isActive ? "0" : "-1")

  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active")
      b.setAttribute("aria-pressed", "false")
      b.setAttribute("aria-selected", "false")
      b.setAttribute("tabindex", "-1")
    })

    btn.classList.add("active")
    btn.setAttribute("aria-pressed", "true")
    btn.setAttribute("aria-selected", "true")
    btn.setAttribute("tabindex", "0")
    btn.focus()

    const filter = btn.getAttribute("data-filter")
    applyFilter(filter)
  })

  // keyboard handling: Space to activate, Arrow keys / Home / End to navigate
  btn.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault()
      btn.click()
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault()
      let newIndex = idx
      if (e.key === "Home") {
        newIndex = 0
      } else if (e.key === "End") {
        newIndex = filterBtns.length - 1
      } else {
        const dir = e.key === "ArrowRight" ? 1 : -1
        newIndex = (idx + dir + filterBtns.length) % filterBtns.length
      }

      const next = filterBtns[newIndex]
      if (next) {
        // update tabindexes for accessibility
        filterBtns.forEach((b, i) => b.setAttribute("tabindex", i === newIndex ? "0" : "-1"))
        next.focus()
      }
    }
  })
})

// initialize current filter on load and ensure ARIA states/tabindex are correct
const activeBtn = document.querySelector(".filter-btn.active") || filterBtns[0]
if (activeBtn) {
  const initialFilter = activeBtn.getAttribute("data-filter") || "all"
  filterBtns.forEach((b) => {
    b.setAttribute("aria-pressed", b === activeBtn ? "true" : "false")
    b.setAttribute("aria-selected", b === activeBtn ? "true" : "false")
    b.setAttribute("tabindex", b === activeBtn ? "0" : "-1")
  })
  applyFilter(initialFilter)
}

// ===== FORM VALIDATION =====
const contactForm = document.getElementById("contact-form")

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    let isValid = true
    const formData = new FormData(this)

    this.querySelectorAll(".error-message").forEach((el) => el.remove())
    this.querySelectorAll(".form-group input, .form-group textarea").forEach((el) => {
      el.style.borderColor = "#eee"
    })

    formData.forEach((value, key) => {
      const input = this.querySelector(`[name="${key}"]`)
      if (input && input.hasAttribute("required") && !value.trim()) {
        isValid = false
        showError(input, "This field is required")
      }

      if (key === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          isValid = false
          showError(input, "Please enter a valid email address")
        }
      }
    })

    if (isValid) {
      const successMessage = document.createElement("div")
      successMessage.className = "success-message"
      successMessage.style.cssText =
        "background: #c41e3a; color: white; padding: 15px; margin-top: 20px; text-align: center;"
      successMessage.textContent = "Thank you! Your message has been sent successfully."
      this.appendChild(successMessage)

      this.reset()

      setTimeout(() => {
        successMessage.remove()
      }, 5000)
    }
  })
}

function showError(input, message) {
  input.style.borderColor = "#c41e3a"
  const errorEl = document.createElement("span")
  errorEl.className = "error-message"
  errorEl.style.cssText = "color: #c41e3a; font-size: 0.85rem; margin-top: 5px; display: block;"
  errorEl.textContent = message
  input.parentElement.appendChild(errorEl)
}

// ===== ACTIVE NAV LINK =====
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })
}

setActiveNavLink()

// ===== MAGNETIC BUTTONS =====
const magneticBtns = document.querySelectorAll(".btn-magnetic")

magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  })

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)"
  })
})

// ===== TEXT REVEAL ANIMATION =====
const revealText = document.querySelectorAll(".reveal-text")

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  { threshold: 0.1 },
)

revealText.forEach((text) => textObserver.observe(text))

// ===== SCROLL TOP BUTTON =====
const scrollTopBtn = document.getElementById("scroll-top")

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== IMAGE TILT EFFECT =====
const tiltElements = document.querySelectorAll(".tilt-effect")

tiltElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  })

  element.addEventListener("mouseleave", () => {
    element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
  })
})

// ===== CURSOR FOLLOWER =====
const cursor = document.querySelector(".custom-cursor")

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"))
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"))
  })
}

// ===== PAGE LOAD ANIMATIONS =====
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded")

  const cards = document.querySelectorAll(".service-card, .project-card, .team-card, .blog-card, .news-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Staggered reveal for grid items
  const gridItems = document.querySelectorAll(".stagger-item")
  gridItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`
  })
})

// ===== TYPING EFFECT =====
const typingElements = document.querySelectorAll(".typing-effect")

typingElements.forEach((element) => {
  const text = element.textContent
  element.textContent = ""
  let i = 0

  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      typeWriter()
      observer.unobserve(element)
    }
  })

  observer.observe(element)
})

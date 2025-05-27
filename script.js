// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Particles.js initialization
  window.particlesJS = window.particlesJS || (() => {})
  window.particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffb400",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffb400",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })

  // Typing animation
  const typingElement = document.querySelector(".typing")
  const words = ["Informaticien", "Étudiant", ""]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingDelay = 200
  const erasingDelay = 100
  const newWordDelay = 2000

  function type() {
    const currentWord = words[wordIndex]

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1)
      charIndex--
      typingDelay = erasingDelay
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1)
      charIndex++
      typingDelay = 200
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true
      typingDelay = newWordDelay
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      wordIndex = (wordIndex + 1) % words.length
    }

    setTimeout(type, typingDelay)
  }

  // Start typing animation
  setTimeout(type, newWordDelay)

  // Mobile Navigation
  const burger = document.querySelector(".burger")
  const nav = document.querySelector(".nav-links")
  const navLinks = document.querySelectorAll(".nav-link")

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("active")

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ""
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })

    // Burger Animation
    burger.classList.toggle("nav-active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      burger.classList.remove("nav-active")
    })
  })

  // Navbar scroll effect
  const navbar = document.querySelector(".main-nav")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const level = bar.getAttribute("data-level")
      bar.style.width = level + "%"
    })
  }

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else {
          const categories = card.getAttribute("data-category").split(" ")
          if (categories.includes(filter)) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        }
      })
    })
  })

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<span>Envoi en cours...</span> <i class="fas fa-spinner fa-spin"></i>'
      submitBtn.disabled = true

      setTimeout(() => {
        alert("Message envoyé avec succès!")
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
        contactForm.reset()
      }, 2000)
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // If it's the skills section, animate the skill bars
        if (entry.target.id === "skills") {
          animateSkillBars()
        }

        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    observer.observe(section)
  })

  // Age counter animation
  const ageCounter = document.querySelector(".age-counter")
  if (ageCounter) {
    let count = 0
    const targetAge = 16 // Set your target age here
    const duration = 5000 // 5 seconds
    const interval = duration / targetAge

    const ageInterval = setInterval(() => {
      count++
      ageCounter.textContent = count

      if (count >= targetAge) {
        clearInterval(ageInterval)
      }
    }, interval)
  }
})

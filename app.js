document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Header Scroll Styling
    // ==========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 2. Mobile Menu Toggling
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and times
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });

    // ==========================================
    // 3. Testimonials Carousel/Slider
    // ==========================================
    const sliderContainer = document.getElementById('slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideTimer;

    // Create dot indicators
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots active class
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Event listeners for arrows
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Auto playing slider
    function startTimer() {
        slideTimer = setInterval(nextSlide, 6000);
    }

    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    startTimer();

    // ==========================================
    // 4. Interactive Gallery Filter & Lightbox
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');

    // Filtering logic
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'scaleIn 0.4s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox open function for gallery items
    window.openLightbox = function(imgSrc, title, description) {
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = description;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop scrolling
    };

    // Close Lightbox
    lightboxClose.addEventListener('click', closeLightboxModal);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });

    function closeLightboxModal() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // ==========================================
    // 5. Aromatherapy Catalog Lightbox
    // ==========================================
    const aromaLightbox = document.getElementById('aroma-lightbox');
    const aromaLightboxImg = document.getElementById('aroma-lightbox-img');
    const aromaLightboxClose = document.getElementById('aroma-lightbox-close');

    window.openAromaLightbox = function(index) {
        let imgSrc = '';
        if (index === 1) imgSrc = 'assets/perfume_aromaterapia_1.jpg';
        else if (index === 2) imgSrc = 'assets/perfume_ellas.jpg';
        else if (index === 3) imgSrc = 'assets/perfume_frutal.jpg';
        
        aromaLightboxImg.src = imgSrc;
        aromaLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    aromaLightboxClose.addEventListener('click', closeAromaLightbox);
    aromaLightbox.addEventListener('click', (e) => {
        if (e.target === aromaLightbox) {
            closeAromaLightbox();
        }
    });

    function closeAromaLightbox() {
        aromaLightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // ==========================================
    // 6. Interactive Booking Form & WhatsApp Redirect
    // ==========================================
    const petChips = document.getElementById('pet-chips');
    const chipButtons = petChips.querySelectorAll('.chip-btn');
    const bookingForm = document.getElementById('booking-form');
    
    const successModal = document.getElementById('success-modal');
    const successText = document.getElementById('success-text');
    const successCloseBtn = document.getElementById('success-close-btn');

    let selectedPetType = 'Perro'; // Default pet type

    // Pet type chips selector
    chipButtons.forEach(chip => {
        chip.addEventListener('click', () => {
            chipButtons.forEach(btn => btn.classList.remove('active'));
            chip.classList.add('active');
            selectedPetType = chip.getAttribute('data-pet');
        });
    });

    // Form Submission & WhatsApp Link Builder
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const petName = document.getElementById('pet-name').value.trim();
        const service = document.getElementById('pet-service').value;
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const fragrance = document.getElementById('perfume-style').value;
        const notes = document.getElementById('book-notes').value.trim();

        // Format Date beautifully in Spanish (e.g. 2026-05-22 -> 22 de Mayo de 2026)
        let formattedDate = date;
        if (date) {
            const dateObj = new Date(date + 'T00:00:00');
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            formattedDate = dateObj.toLocaleDateString('es-ES', options);
        }

        // Build Custom WhatsApp Message
        let messageText = `¡Hola Petbunny! 🐾 Me gustaría solicitar una cita para mi mascota.\n\n`;
        messageText += `🐶 *Nombre:* ${petName}\n`;
        messageText += `🐹 *Tipo de Mascota:* ${selectedPetType}\n`;
        messageText += `✨ *Servicio:* ${service}\n`;
        messageText += `📅 *Fecha:* ${formattedDate}\n`;
        messageText += `⏰ *Hora:* ${time}\n`;
        messageText += `🌸 *Fragancia/Aromaterapia:* ${fragrance}\n`;
        
        if (notes) {
            messageText += `📝 *Notas:* ${notes}\n`;
        }
        
        messageText += `\n¡Espero su confirmación! Muchas gracias. ❤️`;

        // URL encode the message
        const encodedText = encodeURIComponent(messageText);
        
        // Define Business WhatsApp number (using a mockup premium number)
        const phoneNumber = "528123456789"; // +52 81 2345 6789
        const whatsAppUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

        // Update Success Modal text
        successText.innerHTML = `Hemos preparado tu solicitud para <strong>${petName}</strong> con todos los detalles de su cita de <strong>${service}</strong>.<br><br>Al hacer clic abajo, abriremos WhatsApp para que envíes el mensaje de confirmación directo a nuestro staff de Petbunny.`;

        // Display Success Modal
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Event listener for opening WhatsApp on modal confirm
        const handleRedirect = () => {
            window.open(whatsAppUrl, '_blank');
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            bookingForm.reset();
            // Reset pet chips to default
            chipButtons.forEach(btn => btn.classList.remove('active'));
            chipButtons[0].classList.add('active');
            selectedPetType = 'Perro';
            
            // Remove listener so it doesn't double trigger later
            successCloseBtn.removeEventListener('click', handleRedirect);
        };

        successCloseBtn.addEventListener('click', handleRedirect);
    });

    // Close Success Modal if click outside or close button (without redirect)
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

});

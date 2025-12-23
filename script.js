document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('menu-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalIngredients = document.getElementById('modal-ingredients');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const menuCards = document.querySelectorAll('.menu-card');

    function openModal(name, desc, ingredients, imageSrc) {
        modalTitle.textContent = name;
        modalDesc.textContent = desc;
        modalIngredients.textContent = ingredients;

        // Show/hide image based on whether we have one
        if (imageSrc) {
            modalImage.src = imageSrc;
            modalImage.alt = name;
            modalImage.style.display = 'block';
        } else {
            modalImage.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    menuCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the menu-item within this card (could be direct child or nested)
            const menuItem = card.querySelector('.menu-item.interactive, .set-item.interactive');

            if (menuItem) {
                const name = menuItem.getAttribute('data-name') || card.getAttribute('data-name');
                const desc = menuItem.getAttribute('data-description') || card.getAttribute('data-description');
                const ingredients = menuItem.getAttribute('data-ingredients') || card.getAttribute('data-ingredients');

                // Try to find the image - look for img inside picture element or direct img
                let imageSrc = null;
                const imgElement = card.querySelector('.menu-card-image img');
                if (imgElement) {
                    imageSrc = imgElement.src;
                }

                if (name && desc) {
                    openModal(name, desc, ingredients, imageSrc);
                }
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Initialize cost calculator
    initializeCostCalculator();

    // Initialize modal functionality
    initializeModal();

    // Add scroll animations
    addScrollAnimations();
});

// Cost Calculator functionality
function initializeCostCalculator() {
    const cigarettesInput = document.getElementById('cigarettes-per-day');
    const priceInput = document.getElementById('price-per-pack');
    
    if (cigarettesInput && priceInput) {
        cigarettesInput.addEventListener('input', updateCosts);
        priceInput.addEventListener('input', updateCosts);
        
        // Initial calculation
        updateCosts();
    }
}

function updateCosts() {
    const cigarettesPerDay = parseInt(document.getElementById('cigarettes-per-day').value) || 0;
    const pricePerPack = parseInt(document.getElementById('price-per-pack').value) || 0;
    
    // Calculate costs (assuming 20 cigarettes per pack)
    const cigarettesPerPack = 20;
    const packsPerDay = cigarettesPerDay / cigarettesPerPack;
    const dailyCost = packsPerDay * pricePerPack;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = dailyCost * 365;
    
    // Update display
    document.getElementById('daily-cost').textContent = formatCurrency(dailyCost);
    document.getElementById('monthly-cost').textContent = formatCurrency(monthlyCost);
    document.getElementById('yearly-cost').textContent = formatCurrency(yearlyCost);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show quit smoking resources
function showQuitResources() {
    const content = `
        <h2><i class="fas fa-phone"></i> Hotline Berhenti Merokok</h2>
        <div class="resource-list">
            <div class="resource-item">
                <h3>Layanan Kesehatan Nasional</h3>
                <p><strong>Telepon:</strong> 0800-177-6565</p>
                <p><strong>Jam Layanan:</strong> 24/7</p>
                <p>Konseling gratis untuk berhenti merokok</p>
            </div>
            <div class="resource-item">
                <h3>Kementerian Kesehatan RI</h3>
                <p><strong>Telepon:</strong> 021-52921669</p>
                <p><strong>Email:</strong> info@kemkes.go.id</p>
                <p>Informasi program berhenti merokok</p>
            </div>
            <div class="resource-item">
                <h3>Rumah Sakit Terdekat</h3>
                <p>Kunjungi klinik berhenti merokok di rumah sakit terdekat</p>
                <p>Dapatkan bantuan medis dan terapi pengganti nikotin</p>
            </div>
        </div>
        <div class="tips-section">
            <h3>Tips Berhenti Merokok:</h3>
            <ul>
                <li>Tetapkan tanggal berhenti yang spesifik</li>
                <li>Beritahu keluarga dan teman untuk dukungan</li>
                <li>Hindari pemicu merokok</li>
                <li>Gunakan terapi pengganti nikotin jika diperlukan</li>
                <li>Olahraga teratur untuk mengurangi keinginan merokok</li>
                <li>Minum banyak air putih</li>
            </ul>
        </div>
    `;
    
    showModal(content);
}

// Show health tips
function showHealthTips() {
    const content = `
        <h2><i class="fas fa-lightbulb"></i> Tips Hidup Sehat</h2>
        <div class="tips-grid">
            <div class="tip-item">
                <i class="fas fa-apple-alt"></i>
                <h3>Pola Makan Sehat</h3>
                <ul>
                    <li>Konsumsi buah dan sayur 5 porsi sehari</li>
                    <li>Minum air putih minimal 8 gelas</li>
                    <li>Kurangi makanan berlemak dan bergula</li>
                    <li>Pilih protein rendah lemak</li>
                </ul>
            </div>
            <div class="tip-item">
                <i class="fas fa-running"></i>
                <h3>Olahraga Rutin</h3>
                <ul>
                    <li>Olahraga 30 menit setiap hari</li>
                    <li>Jalan kaki 10.000 langkah</li>
                    <li>Latihan kekuatan 2-3x seminggu</li>
                    <li>Pilih aktivitas yang menyenangkan</li>
                </ul>
            </div>
            <div class="tip-item">
                <i class="fas fa-bed"></i>
                <h3>Tidur Berkualitas</h3>
                <ul>
                    <li>Tidur 7-9 jam setiap malam</li>
                    <li>Jadwal tidur yang konsisten</li>
                    <li>Hindari gadget sebelum tidur</li>
                    <li>Kamar tidur yang nyaman dan gelap</li>
                </ul>
            </div>
            <div class="tip-item">
                <i class="fas fa-brain"></i>
                <h3>Kesehatan Mental</h3>
                <ul>
                    <li>Kelola stres dengan baik</li>
                    <li>Praktikkan mindfulness/meditasi</li>
                    <li>Jaga hubungan sosial yang positif</li>
                    <li>Luangkan waktu untuk hobi</li>
                </ul>
            </div>
        </div>
        <div class="motivation-quote">
            <blockquote>
                "Kesehatan adalah investasi terbaik yang bisa kamu lakukan untuk diri sendiri."
            </blockquote>
        </div>
    `;
    
    showModal(content);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.danger-item, .myth-fact-item, .impact-item, .social-item, .cost-calculator');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for modal content
const modalStyles = `
    <style>
        .resource-list {
            margin: 20px 0;
        }
        
        .resource-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            border-left: 4px solid #e74c3c;
        }
        
        .resource-item h3 {
            color: #e74c3c;
            margin-bottom: 10px;
        }
        
        .resource-item p {
            margin: 5px 0;
            color: #666;
        }
        
        .tips-section {
            margin-top: 30px;
        }
        
        .tips-section h3 {
            color: #e74c3c;
            margin-bottom: 15px;
        }
        
        .tips-section ul {
            list-style: none;
            padding-left: 0;
        }
        
        .tips-section li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
            color: #666;
        }
        
        .tips-section li::before {
            content: '✓';
            color: #e74c3c;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .tips-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .tip-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        
        .tip-item i {
            font-size: 2rem;
            color: #e74c3c;
            margin-bottom: 15px;
        }
        
        .tip-item h3 {
            color: #333;
            margin-bottom: 15px;
        }
        
        .tip-item ul {
            list-style: none;
            padding-left: 0;
            text-align: left;
        }
        
        .tip-item li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
            color: #666;
        }
        
        .tip-item li::before {
            content: '•';
            color: #e74c3c;
            position: absolute;
            left: 0;
        }
        
        .motivation-quote {
            margin-top: 30px;
            text-align: center;
        }
        
        .motivation-quote blockquote {
            font-style: italic;
            font-size: 1.2rem;
            color: #e74c3c;
            border-left: 4px solid #e74c3c;
            padding-left: 20px;
        }
        
        @media (max-width: 768px) {
            .tips-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;

// Inject modal styles
document.head.insertAdjacentHTML('beforeend', modalStyles);

// Add loading animation
window.addEventListener('load', function() {
    // Remove loading state
    document.body.classList.add('loaded');
    
    // Add entrance animations
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const smokeOverlay = document.querySelector('.smoke-overlay');
    
    if (hero && smokeOverlay) {
        const rate = scrolled * -0.5;
        smokeOverlay.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when section is visible
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe counter section if it exists
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    counterObserver.observe(counterSection);
}
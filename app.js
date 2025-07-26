// Web bookmark application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up page navigation
    setupPageNavigation();
    
    // Set up tab functionality
    setupTabs();
    
    // Set up quiz functionality
    setupQuiz();
    
    // Add some interactive effects
    addInteractiveEffects();
    
    // Initialize kids interactivity
    addKidsInteractivity();
}

function setupPageNavigation() {
    // Get navigation buttons
    const adultBtn = document.getElementById('adult-btn');
    const kidsBtn = document.getElementById('kids-btn');
    const backFromAdult = document.getElementById('back-from-adult');
    const backFromKids = document.getElementById('back-from-kids');
    const toKids = document.getElementById('to-kids');
    const toAdult = document.getElementById('to-adult');
    
    // Page elements
    const topPage = document.getElementById('top-page');
    const adultPage = document.getElementById('adult-page');
    const kidsPage = document.getElementById('kids-page');
    
    // Navigate to adult page
    if (adultBtn) {
        adultBtn.addEventListener('click', function() {
            showPage('adult-page');
        });
    }
    
    // Navigate to kids page
    if (kidsBtn) {
        kidsBtn.addEventListener('click', function() {
            showPage('kids-page');
        });
    }
    
    // Back to top from adult page
    if (backFromAdult) {
        backFromAdult.addEventListener('click', function() {
            showPage('top-page');
        });
    }
    
    // Back to top from kids page
    if (backFromKids) {
        backFromKids.addEventListener('click', function() {
            showPage('top-page');
        });
    }
    
    // Switch to kids page from adult page
    if (toKids) {
        toKids.addEventListener('click', function() {
            showPage('kids-page');
        });
    }
    
    // Switch to adult page from kids page
    if (toAdult) {
        toAdult.addEventListener('click', function() {
            showPage('adult-page');
        });
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function setupTabs() {
    // Setup adult tabs
    setupTabGroup('.tabs .tab-btn', '.tab-content .tab-panel');
    
    // Setup kids tabs
    setupTabGroup('.kids-tabs .tab-btn', '.kids-content .tab-panel');
}

function setupTabGroup(tabSelector, panelSelector) {
    const tabButtons = document.querySelectorAll(tabSelector);
    const tabPanels = document.querySelectorAll(panelSelector);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels in this group
            const parentContainer = this.closest('.container');
            if (parentContainer) {
                const groupTabs = parentContainer.querySelectorAll('.tab-btn');
                const groupPanels = parentContainer.querySelectorAll('.tab-panel');
                
                groupTabs.forEach(btn => btn.classList.remove('active'));
                groupPanels.forEach(panel => panel.classList.remove('active'));
            }
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function setupQuiz() {
    // Set up quiz buttons with event listeners as backup to onclick
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showAnswer(index + 1);
        });
    });
}

function showAnswer(questionNumber) {
    const answer = document.getElementById('answer' + questionNumber);
    const button = answer ? answer.previousElementSibling : null;
    
    if (answer && button) {
        if (answer.classList.contains('show')) {
            // Hide answer
            answer.classList.remove('show');
            button.textContent = '答えを見る';
        } else {
            // Show answer
            answer.classList.add('show');
            button.textContent = '答えを隠す';
            
            // Add a little celebration effect
            answer.style.transform = 'scale(1.02)';
            answer.style.transition = 'transform 0.2s ease';
            setTimeout(() => {
                answer.style.transform = 'scale(1)';
            }, 200);
            
            // Track answered questions for celebration
            checkQuizCompletion();
        }
    } else {
        console.error('Answer or button not found for question:', questionNumber);
    }
}

function checkQuizCompletion() {
    const visibleAnswers = document.querySelectorAll('.quiz-answer.show');
    const totalQuestions = document.querySelectorAll('.quiz-answer').length;
    
    if (visibleAnswers.length === totalQuestions) {
        setTimeout(showCelebration, 500);
    }
}

function addInteractiveEffects() {
    // Add hover effects to schedule items
    const scheduleItems = document.querySelectorAll('.schedule-item, .kids-schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add click effects to choice buttons
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            createRipple(e, this);
        });
    });
    
    // Add floating animation to forest icon
    const forestIcon = document.querySelector('.forest-icon');
    if (forestIcon) {
        let isFloating = true;
        setInterval(() => {
            if (isFloating) {
                forestIcon.style.transform = 'translateY(-5px)';
                forestIcon.style.transition = 'transform 2s ease-in-out';
            } else {
                forestIcon.style.transform = 'translateY(0px)';
            }
            isFloating = !isFloating;
        }, 2000);
    }
    
    // Add scroll reveal effect
    setupScrollReveal();
}

function setupScrollReveal() {
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
    
    // Observe elements for scroll reveal
    const revealElements = document.querySelectorAll('.day-schedule, .kids-day-schedule, .fun-fact-card, .quiz-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility function to create ripple effect
function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    // Remove existing ripple
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    element.appendChild(circle);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 600);
}

// Fun interactive features for kids
function addKidsInteractivity() {
    // Add sparkle effect to fun facts
    const funFactsList = document.querySelectorAll('.fun-facts-list li');
    funFactsList.forEach(item => {
        item.addEventListener('click', function() {
            const originalBackground = this.style.background;
            this.style.background = 'linear-gradient(45deg, #fff9c4, #f0f4c3)';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.background = originalBackground || 'white';
                this.style.transform = 'scale(1)';
            }, 1000);
        });
    });
}

function showCelebration() {
    // Create celebration message
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉 すべてのクイズに答えたね！きみはもう森の博士だ！ 🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ffd54f, #ffeb3b);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        color: #2d5a3d;
        animation: celebrate 3s ease-in-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add celebration animation
    if (!document.getElementById('celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebrate {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.remove();
        }
    }, 3000);
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    // ESC key to go back to top
    if (event.key === 'Escape') {
        showPage('top-page');
    }
    
    // Arrow keys for tab navigation
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            const tabContainer = activeTab.closest('.tabs, .kids-tabs');
            const tabs = Array.from(tabContainer.children);
            const currentIndex = tabs.indexOf(activeTab);
            let nextIndex;
            
            if (event.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % tabs.length;
            } else {
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
            }
            
            tabs[nextIndex].click();
            tabs[nextIndex].focus();
            event.preventDefault();
        }
    }
});

// Add touch gestures for mobile
let touchStartX = null;
let touchStartY = null;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    if (touchStartX === null || touchStartY === null) return;
    
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Detect horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            const tabContainer = activeTab.closest('.tabs, .kids-tabs');
            const tabs = Array.from(tabContainer.children);
            const currentIndex = tabs.indexOf(activeTab);
            
            if (deltaX > 0 && currentIndex > 0) {
                // Swipe right - previous tab
                tabs[currentIndex - 1].click();
            } else if (deltaX < 0 && currentIndex < tabs.length - 1) {
                // Swipe left - next tab
                tabs[currentIndex + 1].click();
            }
        }
    }
    
    touchStartX = null;
    touchStartY = null;
});

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .choice-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Console Easter egg for developers
console.log(`
🌲 Welcome to the Forest Travel Guide! 🌲
This application was built with love for a family trip to Nagano.
Made with HTML5, CSS3, and JavaScript.
Enjoy your adventure! 🎒✨
`);

// Global functions that need to be accessible from HTML
window.showAnswer = showAnswer;
window.showPage = showPage;
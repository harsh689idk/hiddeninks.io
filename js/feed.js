// Feed Page Interactions - Study Community
class FeedManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupInteractions();
    }

    bindEvents() {
        // Like buttons with animation
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleLike(e);
            });
        });

        // Answer buttons
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleAnswerInput(e);
            });
        });

        // Submit answer buttons
        document.querySelectorAll('.submit-answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleAnswerSubmit(e);
            });
        });

        // Enter key for answers
        document.querySelectorAll('.answer-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleAnswerSubmit(e);
                }
            });
        });
    }

    handleLike(e) {
        const btn = e.currentTarget;
        const svg = btn.querySelector('svg');
        const countSpan = btn.querySelector('.like-count');
        
        const isLiked = btn.classList.toggle('liked');
        const currentCount = parseInt(countSpan.textContent) || 0;
        
        // Add animation
        btn.classList.add('like-pop');
        setTimeout(() => {
            btn.classList.remove('like-pop');
        }, 400);
        
        if (isLiked) {
            countSpan.textContent = currentCount + 1;
            // Fill the heart
            svg.innerHTML = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" stroke="currentColor" stroke-width="2"/>`;
        } else {
            countSpan.textContent = currentCount - 1;
            // Outline the heart
            svg.innerHTML = `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2"/>`;
        }
    }

    toggleAnswerInput(e) {
        const btn = e.currentTarget;
        const postCard = btn.closest('.post-card');
        const answerSection = postCard.querySelector('.answer-input-section');
        
        // Toggle visibility
        answerSection.style.display = answerSection.style.display === 'none' ? 'block' : 'none';
        
        // Focus input if showing
        if (answerSection.style.display !== 'none') {
            const input = answerSection.querySelector('.answer-input');
            input.focus();
        }
    }

    handleAnswerSubmit(e) {
        const btn = e.currentTarget;
        const answerSection = btn.closest('.answer-input-section');
        const input = answerSection.querySelector('.answer-input');
        const postCard = answerSection.closest('.post-card');
        const correctAnswer = parseFloat(postCard.querySelector('.answer-value').textContent);
        const userAnswer = parseFloat(input.value);
        
        if (isNaN(userAnswer)) {
            this.showError(input, 'Please enter a valid number');
            return;
        }

        // Disable button during processing
        btn.disabled = true;
        btn.textContent = 'Checking...';

        // Simulate API call
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = 'Submit Answer';

            if (Math.abs(userAnswer - correctAnswer) < 0.01) { // Allow small floating point differences
                this.showSuccessNotification();
                input.value = '';
                answerSection.style.display = 'none';
                
                // Update points in UI (in real app, this would come from backend)
                const pointsInfo = postCard.querySelector('.points-info');
                pointsInfo.innerHTML = '<span class="points-badge">+10 pts</span> earned by you!';
                
            } else {
                this.showError(input, 'Incorrect answer. Try again!');
            }
        }, 1000);
    }

    showSuccessNotification() {
        const notification = document.getElementById('successNotification');
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    showError(input, message) {
        // Remove existing error
        this.clearError(input);
        
        // Add error styling
        input.style.borderColor = '#ef4444';
        
        // Create error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 14px;
            margin-top: 8px;
            font-weight: 500;
        `;
        
        input.parentElement.appendChild(errorElement);
        
        // Shake animation
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }

    clearError(input) {
        input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupInteractions() {
        // Add hover effects to post cards
        document.querySelectorAll('.post-card').forEach(post => {
            post.addEventListener('mouseenter', () => {
                post.style.transform = 'translateY(-4px)';
            });
            
            post.addEventListener('mouseleave', () => {
                post.style.transform = 'translateY(0)';
            });
        });

        // Initialize all answer sections as hidden
        document.querySelectorAll('.answer-input-section').forEach(section => {
            section.style.display = 'none';
        });
    }
}

// Initialize feed when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeedManager();
});
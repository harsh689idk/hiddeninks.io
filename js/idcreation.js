// ID Creation - Second Step
class IDCreationManager {
    constructor() {
        this.init();
    }

    init() {
        this.idCreationForm = document.getElementById('idCreationForm');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.userId = document.getElementById('userId');
        this.signupPassword = document.getElementById('signupPassword');
        this.confirmPassword = document.getElementById('confirmPassword');
        this.acceptTerms = document.getElementById('acceptTerms');
        this.completeButton = document.getElementById('completeButton');

        this.bindEvents();
        this.enhanceUX();
    }

    bindEvents() {
        this.idCreationForm.addEventListener('submit', (e) => this.handleCompleteSignup(e));
        
        // Real-time validation
        this.signupPassword.addEventListener('input', () => this.validatePasswordStrength());
        this.confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
        this.userId.addEventListener('input', () => this.validateUserId());
    }

    handleCompleteSignup(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.setLoadingState(true);
            this.createAccount();
        }
    }

    validateForm() {
        let isValid = true;
        this.clearAllErrors();

        // Name validation
        if (!this.firstName.value.trim()) {
            this.showError(this.firstName, 'First name is required');
            isValid = false;
        }

        if (!this.lastName.value.trim()) {
            this.showError(this.lastName, 'Last name is required');
            isValid = false;
        }

        // User ID validation
        const userId = this.userId.value.trim();
        if (!userId) {
            this.showError(this.userId, 'User ID is required');
            isValid = false;
        } else if (userId.length < 3) {
            this.showError(this.userId, 'User ID must be at least 3 characters');
            isValid = false;
        }

        // Password validation
        const password = this.signupPassword.value;
        if (!password) {
            this.showError(this.signupPassword, 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            this.showError(this.signupPassword, 'Password must be at least 8 characters');
            isValid = false;
        }

        // Confirm password
        if (password !== this.confirmPassword.value) {
            this.showError(this.confirmPassword, 'Passwords do not match');
            isValid = false;
        }

        // Terms acceptance
        if (!this.acceptTerms.checked) {
            alert('Please accept the Terms of Service and Privacy Policy');
            isValid = false;
        }

        return isValid;
    }

    validatePasswordStrength() {
        const password = this.signupPassword.value;
        if (password.length >= 8) {
            this.clearError(this.signupPassword);
        }
    }

    validatePasswordMatch() {
        if (this.signupPassword.value === this.confirmPassword.value) {
            this.clearError(this.confirmPassword);
        }
    }

    validateUserId() {
        const userId = this.userId.value.trim();
        if (userId.length >= 3) {
            this.clearError(this.userId);
        }
    }

    showError(input, message) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        input.parentElement.appendChild(errorElement);
    }

    clearError(input) {
        input.classList.remove('error');
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearAllErrors() {
        const inputs = [
            this.firstName, this.lastName, this.userId, 
            this.signupPassword, this.confirmPassword
        ];
        
        inputs.forEach(input => this.clearError(input));
    }

    setLoadingState(loading) {
        if (loading) {
            this.completeButton.classList.add('loading');
            this.completeButton.disabled = true;
        } else {
            this.completeButton.classList.remove('loading');
            this.completeButton.disabled = false;
        }
    }

    createAccount() {
        // Complete account creation
        setTimeout(() => {
            this.setLoadingState(false);
            this.showSuccessAnimation();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    }

    showSuccessAnimation() {
        this.completeButton.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
        this.completeButton.querySelector('.btn-text').textContent = 'Welcome to HiddenInk!';
        
        this.createConfetti();
    }

    createConfetti() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: #ffffff;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    animation: confettiFall 1s ease-out forwards;
                    z-index: 1000;
                    border-radius: 1px;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 1000);
            }, i * 100);
        }
    }

    enhanceUX() {
        // Auto-focus first name field
        setTimeout(() => {
            this.firstName.focus();
        }, 500);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new IDCreationManager();
});
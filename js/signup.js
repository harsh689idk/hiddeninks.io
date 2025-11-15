// Signup - Email First Step
class SignupManager {
    constructor() {
        this.init();
    }

    init() {
        this.signupForm = document.getElementById('signupForm');
        this.signupEmail = document.getElementById('signupEmail');
        this.signupButton = document.getElementById('signupButton');

        this.bindEvents();
        this.enhanceUX();
    }

    bindEvents() {
        this.signupForm.addEventListener('submit', (e) => this.handleEmailSubmit(e));
        
        // Real-time email validation
        this.signupEmail.addEventListener('input', () => this.validateEmail());
    }

    handleEmailSubmit(e) {
        e.preventDefault();
        
        if (this.validateEmail()) {
            this.setLoadingState(true);
            this.proceedToNextStep();
        }
    }

    validateEmail() {
        const email = this.signupEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        this.clearError(this.signupEmail);
        
        if (!email) {
            this.showError(this.signupEmail, 'Please enter your email address');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError(this.signupEmail, 'Please enter a valid email address');
            return false;
        }
        
        return true;
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

    setLoadingState(loading) {
        if (loading) {
            this.signupButton.classList.add('loading');
            this.signupButton.disabled = true;
        } else {
            this.signupButton.classList.remove('loading');
            this.signupButton.disabled = false;
        }
    }

    proceedToNextStep() {
        // Store email and redirect to ID creation
        setTimeout(() => {
            const email = this.signupEmail.value.trim();
            localStorage.setItem('hiddenink_signup_email', email);
            window.location.href = 'idcreation.html';
        }, 1500);
    }

    enhanceUX() {
        // Auto-focus email field
        setTimeout(() => {
            this.signupEmail.focus();
        }, 500);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new SignupManager();
});
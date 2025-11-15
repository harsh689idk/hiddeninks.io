// World's Best Login Page
class LoginManager {
    constructor() {
        this.init();
    }

    init() {
        this.loginForm = document.getElementById('loginForm');
        this.loginEmail = document.getElementById('loginEmail');
        this.loginPassword = document.getElementById('loginPassword');
        this.loginButton = document.getElementById('loginButton');
        this.rememberMe = document.getElementById('rememberMe');
        this.forgotPassword = document.getElementById('forgotPassword');

        this.bindEvents();
        this.enhanceUX();
    }

    bindEvents() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
        
        // Enhanced input interactions
        this.setupInputAnimations();
    }

    setupInputAnimations() {
        const inputs = [this.loginEmail, this.loginPassword];
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleLogin(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.setLoadingState(true);
            this.authenticateUser();
        }
    }

    validateForm() {
        const email = this.loginEmail.value.trim();
        const password = this.loginPassword.value;

        let isValid = true;

        if (!email) {
            this.showError(this.loginEmail, 'Please enter your email or student ID');
            isValid = false;
        }

        if (!password) {
            this.showError(this.loginPassword, 'Please enter your password');
            isValid = false;
        }

        return isValid;
    }

    showError(input, message) {
        const formGroup = input.parentElement;
        
        // Remove existing error
        this.clearError(input);
        
        // Add error styling
        input.classList.add('error');
        
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
        
        formGroup.appendChild(errorElement);
        
        // Shake animation
        formGroup.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            formGroup.style.animation = '';
        }, 500);
    }

    clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }

    setLoadingState(loading) {
        if (loading) {
            this.loginButton.classList.add('loading');
            this.loginButton.disabled = true;
        } else {
            this.loginButton.classList.remove('loading');
            this.loginButton.disabled = false;
        }
    }

    authenticateUser() {
        // Simulate API call with beautiful loading animation
        setTimeout(() => {
            this.setLoadingState(false);
            this.showSuccessAnimation();
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 2000);
    }

    showSuccessAnimation() {
        // Add success visual feedback
        this.loginButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        this.loginButton.querySelector('.btn-text').textContent = 'Welcome Back!';
        
        // Add micro-interaction
        this.loginButton.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.loginButton.style.transform = 'scale(1)';
        }, 150);
    }

    handleForgotPassword(e) {
        e.preventDefault();
        
        const email = prompt('Enter your email to reset your password:');
        if (email) {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(email)) {
                alert('Password reset instructions have been sent to your email.');
            } else {
                alert('Please enter a valid email address.');
            }
        }
    }

    enhanceUX() {
        // Add shake animation to CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-8px); }
                75% { transform: translateX(8px); }
            }
            
            .form-input.error {
                border-color: #ef4444;
            }
            
            .form-group.focused .form-label {
                transform: translateY(-24px) scale(0.875);
                color: #667eea;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
        
        // Auto-focus email field
        setTimeout(() => {
            this.loginEmail.focus();
        }, 500);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new LoginManager();
});
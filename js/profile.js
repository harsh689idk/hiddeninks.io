// Profile Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show target tab pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${targetTab}-tab`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // Edit Profile Modal
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editProfileForm = document.querySelector('.edit-profile-form');

    // Modal functions
    function openModal() {
        if (editProfileModal) {
            editProfileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (editProfileModal) {
            editProfileModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Add event listeners only if elements exist
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', openModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (editProfileModal) {
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                closeModal();
            }
        });
    }

    // Handle form submission
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values safely
            const usernameInput = this.querySelector('.form-input');
            const bioTextarea = this.querySelector('.form-textarea');
            const profileUsername = document.querySelector('.profile-username');
            const bioText = document.querySelector('.bio-text');
            
            if (usernameInput && profileUsername) {
                profileUsername.textContent = usernameInput.value;
            }
            
            if (bioTextarea && bioText) {
                bioText.textContent = bioTextarea.value;
            }
            
            // Show success message
            showNotification('Profile updated successfully!', 'success');
            closeModal();
        });
    }

    // Like functionality for profile posts
    const likeBtns = document.querySelectorAll('.post-action-btn');
    
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('svg');
            let countElement = this.querySelector('.like-count');
            
            // If no like-count span, use the text content
            if (!countElement) {
                const currentText = this.textContent || this.innerText;
                const countMatch = currentText.match(/\d+/);
                if (countMatch) {
                    const currentCount = parseInt(countMatch[0]);
                    const newCount = currentCount + 1;
                    this.innerHTML = this.innerHTML.replace(countMatch[0], newCount.toString());
                }
            } else {
                const currentCount = parseInt(countElement.textContent) || 0;
                countElement.textContent = currentCount + 1;
            }
            
            // Add animation
            this.classList.add('like-pop');
            setTimeout(() => {
                this.classList.remove('like-pop');
            }, 400);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Notification function
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${type === 'success' ? '✓' : '!'}</div>
                <div class="notification-text">
                    <strong>${message}</strong>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    // Initialize profile page
    function initProfile() {
        console.log('Profile page initialized successfully');
        
        // Set initial active tab if none is active
        if (tabPanes.length > 0 && !document.querySelector('.tab-pane.active')) {
            tabPanes[0].classList.add('active');
        }
        if (tabBtns.length > 0 && !document.querySelector('.tab-btn.active')) {
            tabBtns[0].classList.add('active');
        }
    }

    initProfile();
});
// Search Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter Tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    const resultsSections = document.querySelectorAll('.results-section');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding results section
            resultsSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${filterType}-results`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('mainSearchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 0) {
                // Here you would typically make an API call to search
                console.log('Searching for:', searchTerm);
                // For now, we'll just simulate search results
                simulateSearch(searchTerm);
            } else {
                // Show default content when search is empty
                showDefaultContent();
            }
        });

        // Enter key to search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // Follow/Unfollow functionality
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('following')) {
                this.classList.remove('following');
                this.textContent = 'Follow';
                // Here you would typically unfollow the user via API
                showNotification('Unfollowed user', 'info');
            } else {
                this.classList.add('following');
                this.textContent = 'Following';
                // Here you would typically follow the user via API
                showNotification('Started following user', 'success');
            }
        });
    });

    // Recent search tags
    const searchTags = document.querySelectorAll('.search-tag');
    
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.textContent;
            if (searchInput) {
                searchInput.value = searchTerm;
                performSearch(searchTerm);
            }
        });
    });

    // Answer buttons in search results
    const answerButtons = document.querySelectorAll('.answer-btn-small');
    
    answerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Redirect to answer page or open answer modal
            showNotification('Redirecting to answer page...', 'info');
            // For now, just show a message
            setTimeout(() => {
                window.location.href = 'answer.html';
            }, 1000);
        });
    });

    // Explore subject buttons
    const exploreButtons = document.querySelectorAll('.explore-btn');
    
    exploreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const subjectCard = this.closest('.subject-card');
            const subjectName = subjectCard.querySelector('h3').textContent;
            showNotification(`Exploring ${subjectName} questions...`, 'info');
            // Here you would filter questions by subject
        });
    });

    // Simulate search function
    function simulateSearch(searchTerm) {
        // This is where you would implement actual search logic
        // For now, we'll just highlight matching content
        highlightSearchResults(searchTerm);
    }

    function performSearch(term) {
        console.log('Performing search for:', term);
        showNotification(`Searching for "${term}"...`, 'info');
        
        // Simulate API call delay
        setTimeout(() => {
            showNotification(`Found results for "${term}"`, 'success');
        }, 1000);
    }

    function highlightSearchResults(term) {
        // Simple text highlighting simulation
        const allTextElements = document.querySelectorAll('.username, .user-bio, .question-content h3, .question-preview');
        
        allTextElements.forEach(element => {
            const text = element.textContent;
            if (text.toLowerCase().includes(term.toLowerCase())) {
                element.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                element.style.padding = '2px 4px';
                element.style.borderRadius = '4px';
            } else {
                element.style.backgroundColor = '';
                element.style.padding = '';
            }
        });
    }

    function showDefaultContent() {
        // Remove highlighting
        const allTextElements = document.querySelectorAll('.username, .user-bio, .question-content h3, .question-preview');
        allTextElements.forEach(element => {
            element.style.backgroundColor = '';
            element.style.padding = '';
        });
    }

    // Notification function
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '!' : 'i'}</div>
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

    // Initialize search page
    function initSearch() {
        console.log('Search page initialized');
        
        // Focus search input on page load
        if (searchInput) {
            searchInput.focus();
        }
    }

    initSearch();
});
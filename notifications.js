// Notifications Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    const notificationItems = document.querySelectorAll('.notification-item');
    const followBackBtns = document.querySelectorAll('.follow-back-btn');
    const notificationActionBtns = document.querySelectorAll('.notification-action-btn');
    const emptyNotifications = document.querySelector('.empty-notifications');

    // Initialize
    function initNotifications() {
        setupEventListeners();
        updateEmptyState();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Mark all as read
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', markAllAsRead);
        }

        // Individual notification actions
        notificationActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const notificationItem = this.closest('.notification-item');
                markAsRead(notificationItem);
            });
        });

        // Follow back buttons
        followBackBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleFollowBack(this);
            });
        });

        // Notification item click (mark as read)
        notificationItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Don't mark as read if clicking action buttons
                if (!e.target.closest('.notification-actions')) {
                    markAsRead(this);
                }
            });
        });
    }

    // Mark all notifications as read
    function markAllAsRead() {
        notificationItems.forEach(item => {
            markAsRead(item);
        });
        
        showNotification('All notifications marked as read', 'success');
    }

    // Mark single notification as read
    function markAsRead(notificationItem) {
        if (notificationItem && notificationItem.classList.contains('unread')) {
            notificationItem.classList.remove('unread');
            
            // Update notification count in sidebar (simulated)
            updateNotificationCount(-1);
            
            // Show visual feedback
            notificationItem.style.background = 'rgba(16, 16, 16, 0.8)';
            notificationItem.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            
            // Update empty state
            updateEmptyState();
        }
    }

    // Toggle follow back button
    function toggleFollowBack(button) {
        if (button.classList.contains('following')) {
            button.classList.remove('following');
            button.textContent = 'Follow back';
            showNotification('Unfollowed user', 'info');
        } else {
            button.classList.add('following');
            button.textContent = 'Following';
            showNotification('Started following user', 'success');
        }
    }

    // Update notification count in sidebar (simulated)
    function updateNotificationCount(change) {
        // In a real app, this would update the actual notification count
        console.log(`Notification count updated by: ${change}`);
        
        // Update the notification badge in sidebar if it exists
        const notificationBadge = document.querySelector('.nav-item[href="notifications.html"] .unread-count');
        if (notificationBadge) {
            const currentCount = parseInt(notificationBadge.textContent) || 0;
            const newCount = Math.max(0, currentCount + change);
            
            if (newCount > 0) {
                notificationBadge.textContent = newCount;
                notificationBadge.style.display = 'flex';
            } else {
                notificationBadge.style.display = 'none';
            }
        }
    }

    // Update empty state visibility
    function updateEmptyState() {
        const unreadNotifications = document.querySelectorAll('.notification-item.unread').length;
        const allNotifications = notificationItems.length;
        
        if (allNotifications === 0) {
            if (emptyNotifications) emptyNotifications.style.display = 'block';
            document.querySelectorAll('.notifications-section').forEach(section => {
                section.style.display = 'none';
            });
        } else {
            if (emptyNotifications) emptyNotifications.style.display = 'none';
            document.querySelectorAll('.notifications-section').forEach(section => {
                section.style.display = 'block';
            });
        }
    }

    // Simulate new notification (for demo purposes)
    function simulateNewNotification() {
        const todaySection = document.querySelector('.notifications-section:first-child .notifications-list');
        if (!todaySection) return;
        
        const newNotification = document.createElement('div');
        
        newNotification.className = 'notification-item unread';
        newNotification.setAttribute('data-id', Date.now());
        newNotification.innerHTML = `
            <div class="notification-avatar points">
                <div class="notification-icon">⚡</div>
            </div>
            <div class="notification-content">
                <div class="notification-text">
                    <strong>+10 points earned!</strong> Correct answer on "New Calculus Problem"
                </div>
                <div class="notification-time">Just now</div>
            </div>
            <div class="notification-actions">
                <button class="notification-action-btn" title="Mark as read">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to top of today's section
        todaySection.insertBefore(newNotification, todaySection.firstChild);
        
        // Add event listeners to new notification
        const actionBtn = newNotification.querySelector('.notification-action-btn');
        actionBtn.addEventListener('click', function() {
            markAsRead(newNotification);
        });
        
        newNotification.addEventListener('click', function(e) {
            if (!e.target.closest('.notification-actions')) {
                markAsRead(newNotification);
            }
        });
        
        // Update notification count
        updateNotificationCount(1);
        updateEmptyState();
        
        showNotification('New notification received!', 'info');
    }

    // Notification function
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });

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
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    // Demo: Simulate receiving a new notification every 30 seconds
    setInterval(() => {
        // Only simulate if user is on notifications page
        if (window.location.pathname.includes('notifications.html')) {
            simulateNewNotification();
        }
    }, 30000);

    // Initialize
    initNotifications();
});
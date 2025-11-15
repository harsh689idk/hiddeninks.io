// Enhanced Chat Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const conversationItems = document.querySelectorAll('.conversation-item');
    const noChatSelected = document.getElementById('noChatSelected');
    const activeChat = document.getElementById('activeChat');
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const newChatBtn = document.getElementById('newChatBtn');
    const startChatBtn = document.getElementById('startChatBtn');
    const newChatModal = document.getElementById('newChatModal');
    const closeNewChatModal = document.getElementById('closeNewChatModal');
    const userSearchInput = document.getElementById('userSearchInput');
    const usersList = document.getElementById('usersList');
    const conversationSearch = document.getElementById('conversationSearch');
    
    // New elements for enhanced features
    const chatDropdownToggle = document.getElementById('chatDropdownToggle');
    const chatDropdownMenu = document.getElementById('chatDropdownMenu');
    const blockUserBtn = document.getElementById('blockUserBtn');
    const deleteChatBtn = document.getElementById('deleteChatBtn');
    const muteChatBtn = document.getElementById('muteChatBtn');
    const voiceRecordBtn = document.getElementById('voiceRecordBtn');
    const voiceRecordContainer = document.getElementById('voiceRecordContainer');
    const voiceRecordTimer = document.getElementById('voiceRecordTimer');
    const recordStopBtn = document.getElementById('recordStopBtn');
    const recordCancelBtn = document.getElementById('recordCancelBtn');

    // State variables
    let currentChat = null;
    let isRecording = false;
    let recordingTimer = null;
    let recordingSeconds = 0;
    let isMuted = false;

    // Sample messages data with voice messages
    const sampleMessages = {
        math_pro: [
            { text: "Hey! I saw your question about integration by parts", time: "10:30 AM", sender: "received" },
            { text: "Yeah, I'm really stuck on that one", time: "10:31 AM", sender: "sent" },
            { type: "voice", duration: "0:15", time: "10:32 AM", sender: "received" },
            { text: "That explanation was really helpful!", time: "10:33 AM", sender: "sent" },
            { type: "voice", duration: "0:08", time: "10:34 AM", sender: "sent" }
        ],
        physics_wizard: [
            { text: "Hi! About that quantum mechanics problem...", time: "1h ago", sender: "received" },
            { text: "Can you explain the uncertainty principle in simpler terms?", time: "1h ago", sender: "sent" }
        ],
        code_master: [
            { text: "I found the solution to that algorithm problem we discussed", time: "3h ago", sender: "received" },
            { text: "The time complexity is actually O(n log n) with a heap", time: "3h ago", sender: "received" }
        ],
        chem_geek: [
            { text: "Let me know if you need help with organic chemistry", time: "1d ago", sender: "received" }
        ],
        bio_expert: [
            { text: "The biology study group is meeting tomorrow", time: "2d ago", sender: "received" }
        ]
    };

    // Initialize chat
    function initChat() {
        loadSampleUsers();
        setupEventListeners();
        setupEnhancedFeatures();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Conversation selection
        conversationItems.forEach(item => {
            item.addEventListener('click', function() {
                const chatId = this.getAttribute('data-chat');
                selectConversation(chatId, this);
            });
        });

        // Send message
        sendMessageBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // New chat modal
        if (newChatBtn) newChatBtn.addEventListener('click', openNewChatModal);
        if (startChatBtn) startChatBtn.addEventListener('click', openNewChatModal);
        if (closeNewChatModal) closeNewChatModal.addEventListener('click', closeModal);

        // User search in new chat modal
        if (userSearchInput) userSearchInput.addEventListener('input', filterUsers);

        // Conversation search
        if (conversationSearch) conversationSearch.addEventListener('input', filterConversations);

        // Close modal when clicking outside
        if (newChatModal) {
            newChatModal.addEventListener('click', function(e) {
                if (e.target === newChatModal) {
                    closeModal();
                }
            });
        }
    }

    // Setup enhanced features
    function setupEnhancedFeatures() {
        // Chat dropdown menu
        if (chatDropdownToggle) {
            chatDropdownToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                chatDropdownMenu.classList.toggle('show');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            if (chatDropdownMenu) chatDropdownMenu.classList.remove('show');
        });

        // Dropdown actions
        if (blockUserBtn) blockUserBtn.addEventListener('click', blockUser);
        if (deleteChatBtn) deleteChatBtn.addEventListener('click', deleteChat);
        if (muteChatBtn) muteChatBtn.addEventListener('click', toggleMute);

        // Voice recording
        if (voiceRecordBtn) voiceRecordBtn.addEventListener('click', startVoiceRecording);
        if (recordStopBtn) recordStopBtn.addEventListener('click', stopVoiceRecording);
        if (recordCancelBtn) recordCancelBtn.addEventListener('click', cancelVoiceRecording);
    }

    // Select conversation
    function selectConversation(chatId, conversationElement) {
        currentChat = chatId;
        
        // Update active conversation
        conversationItems.forEach(item => item.classList.remove('active'));
        if (conversationElement) conversationElement.classList.add('active');

        // Show active chat
        if (noChatSelected) noChatSelected.style.display = 'none';
        if (activeChat) activeChat.style.display = 'flex';

        // Update chat header
        const chatUserName = document.getElementById('chatUserName');
        if (chatUserName) chatUserName.textContent = chatId;
        
        // Load messages
        loadMessages(chatId);

        // Clear unread count
        if (conversationElement) {
            const unreadCount = conversationElement.querySelector('.unread-count');
            if (unreadCount) {
                unreadCount.style.display = 'none';
            }
        }

        // Focus message input
        if (messageInput) messageInput.focus();
        
        // Close dropdown
        if (chatDropdownMenu) chatDropdownMenu.classList.remove('show');
    }

    // Load messages for a conversation
    function loadMessages(chatId) {
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        const messages = sampleMessages[chatId] || [];

        messages.forEach(message => {
            const messageElement = message.type === 'voice' 
                ? createVoiceMessageElement(message)
                : createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });

        // Scroll to bottom
        setTimeout(scrollToBottom, 100);
    }

    // Create text message element
    function createMessageElement(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}`;
        
        messageDiv.innerHTML = `
            <div class="message-text">${message.text}</div>
            <div class="message-time">${message.time}</div>
        `;

        return messageDiv;
    }

    // Create voice message element
    function createVoiceMessageElement(message) {
        const voiceDiv = document.createElement('div');
        voiceDiv.className = `voice-message-container voice-message ${message.sender}`;
        
        voiceDiv.innerHTML = `
            <button class="voice-play-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                </svg>
            </button>
            <div class="voice-waveform"></div>
            <div class="voice-duration">${message.duration}</div>
            <div class="voice-message-time">${message.time}</div>
        `;

        // Add play functionality
        const playBtn = voiceDiv.querySelector('.voice-play-btn');
        const waveform = voiceDiv.querySelector('.voice-waveform');
        
        if (playBtn && waveform) {
            playBtn.addEventListener('click', function() {
                this.classList.toggle('playing');
                waveform.classList.toggle('playing');
                
                // Simulate voice playback
                if (this.classList.contains('playing')) {
                    // In a real app, this would play actual audio
                    console.log('Playing voice message...');
                } else {
                    console.log('Pausing voice message...');
                }
            });
        }

        return voiceDiv;
    }

    // Send message
    function sendMessage() {
        const messageText = messageInput.value.trim();
        
        if (messageText && messagesContainer) {
            const newMessage = {
                text: messageText,
                time: getCurrentTime(),
                sender: 'sent'
            };

            const messageElement = createMessageElement(newMessage);
            messagesContainer.appendChild(messageElement);
            
            // Clear input
            messageInput.value = '';
            
            // Scroll to bottom with a slight delay to ensure DOM is updated
            setTimeout(scrollToBottom, 50);

            // Simulate reply after 1-3 seconds
            setTimeout(() => {
                simulateReply();
                // Scroll again after reply
                setTimeout(scrollToBottom, 50);
            }, 1000 + Math.random() * 2000);
        }
    }

    // Start voice recording
    function startVoiceRecording() {
        if (isRecording) return;
        
        isRecording = true;
        recordingSeconds = 0;
        
        // Show recording UI
        if (voiceRecordBtn) voiceRecordBtn.classList.add('recording');
        if (voiceRecordContainer) voiceRecordContainer.classList.add('show');
        if (messageInput) messageInput.style.display = 'none';
        
        // Start timer
        recordingTimer = setInterval(updateRecordingTimer, 1000);
        
        // In a real app, this would start actual audio recording
        console.log('Started voice recording...');
    }

    // Stop voice recording
    function stopVoiceRecording() {
        if (!isRecording) return;
        
        isRecording = false;
        if (recordingTimer) clearInterval(recordingTimer);
        
        // Hide recording UI
        if (voiceRecordBtn) voiceRecordBtn.classList.remove('recording');
        if (voiceRecordContainer) voiceRecordContainer.classList.remove('show');
        if (messageInput) messageInput.style.display = 'block';
        
        // Create voice message
        if (recordingSeconds >= 1 && messagesContainer) { // Minimum 1 second
            const voiceMessage = {
                type: 'voice',
                duration: formatTime(recordingSeconds),
                time: getCurrentTime(),
                sender: 'sent'
            };
            
            const voiceElement = createVoiceMessageElement(voiceMessage);
            messagesContainer.appendChild(voiceElement);
            
            // Scroll to bottom after voice message
            setTimeout(scrollToBottom, 50);
            
            // Simulate voice reply
            setTimeout(simulateVoiceReply, 2000);
        }
        
        console.log('Stopped voice recording. Duration:', recordingSeconds + 's');
    }

    // Cancel voice recording
    function cancelVoiceRecording() {
        isRecording = false;
        if (recordingTimer) clearInterval(recordingTimer);
        
        // Hide recording UI
        if (voiceRecordBtn) voiceRecordBtn.classList.remove('recording');
        if (voiceRecordContainer) voiceRecordContainer.classList.remove('show');
        if (messageInput) messageInput.style.display = 'block';
        
        console.log('Cancelled voice recording');
    }

    // Update recording timer
    function updateRecordingTimer() {
        recordingSeconds++;
        if (voiceRecordTimer) voiceRecordTimer.textContent = formatTime(recordingSeconds);
        
        // Auto-stop after 2 minutes
        if (recordingSeconds >= 120) {
            stopVoiceRecording();
        }
    }

    // Format time as MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        if (messagesContainer) {
            // Use requestAnimationFrame for smooth scrolling
            requestAnimationFrame(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            });
        }
    }

    // Simulate AI reply
    function simulateReply() {
        if (!messagesContainer) return;
        
        const replies = [
            "That's a great point!",
            "I see what you mean.",
            "Let me think about that...",
            "Interesting perspective!",
            "I agree with you on that.",
            "Could you explain that further?",
            "That makes sense to me.",
            "I hadn't thought about it that way."
        ];

        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyMessage = {
            text: randomReply,
            time: getCurrentTime(),
            sender: 'received'
        };

        const messageElement = createMessageElement(replyMessage);
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom after reply
        setTimeout(scrollToBottom, 50);
    }

    // Simulate voice reply
    function simulateVoiceReply() {
        if (!messagesContainer) return;
        
        const voiceDurations = ["0:12", "0:18", "0:25", "0:08", "0:15"];
        const randomDuration = voiceDurations[Math.floor(Math.random() * voiceDurations.length)];
        
        const voiceMessage = {
            type: 'voice',
            duration: randomDuration,
            time: getCurrentTime(),
            sender: 'received'
        };
        
        const voiceElement = createVoiceMessageElement(voiceMessage);
        messagesContainer.appendChild(voiceElement);
        
        // Scroll to bottom after voice reply
        setTimeout(scrollToBottom, 50);
    }

    // Chat dropdown actions
    function blockUser() {
        if (!currentChat) return;
        
        if (confirm(`Are you sure you want to block ${currentChat}?`)) {
            showNotification(`${currentChat} has been blocked`, 'success');
            // In a real app, this would call an API to block the user
            if (chatDropdownMenu) chatDropdownMenu.classList.remove('show');
        }
    }

    function deleteChat() {
        if (!currentChat) return;
        
        if (confirm(`Are you sure you want to delete this conversation with ${currentChat}?`)) {
            showNotification('Conversation deleted', 'success');
            // In a real app, this would call an API to delete the chat
            if (noChatSelected) noChatSelected.style.display = 'flex';
            if (activeChat) activeChat.style.display = 'none';
            if (chatDropdownMenu) chatDropdownMenu.classList.remove('show');
        }
    }

    function toggleMute() {
        if (!currentChat) return;
        
        isMuted = !isMuted;
        const action = isMuted ? 'muted' : 'unmuted';
        
        showNotification(`Conversation ${action}`, 'success');
        
        if (muteChatBtn) {
            muteChatBtn.innerHTML = isMuted ? 
                `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6L12 18M9 9L9 15M15 9L15 15M5 3L19 21" stroke="currentColor" stroke-width="2"/>
                </svg>
                Unmute Messages` :
                `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6L12 18M9 9L9 15M15 9L15 15M5 3L19 21" stroke="currentColor" stroke-width="2"/>
                </svg>
                Mute Messages`;
        }
        
        if (chatDropdownMenu) chatDropdownMenu.classList.remove('show');
    }

    // Get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    // Open new chat modal
    function openNewChatModal() {
        if (newChatModal) {
            newChatModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            if (userSearchInput) userSearchInput.focus();
        }
    }

    // Close modal
    function closeModal() {
        if (newChatModal) {
            newChatModal.classList.remove('active');
            document.body.style.overflow = '';
            if (userSearchInput) userSearchInput.value = '';
            filterUsers(); // Reset user list
        }
    }

    // Load sample users for new chat
    function loadSampleUsers() {
        if (!usersList) return;
        
        const sampleUsers = [
            { name: "math_pro", bio: "Mathematics Expert • 450 points" },
            { name: "physics_wizard", bio: "Physics Tutor • 320 points" },
            { name: "code_master", bio: "CS Student • 280 points" },
            { name: "chem_geek", bio: "Chemistry Lover • 190 points" },
            { name: "bio_expert", bio: "Biology Specialist • 210 points" },
            { name: "history_buff", bio: "History Enthusiast • 150 points" }
        ];

        usersList.innerHTML = sampleUsers.map(user => `
            <div class="user-list-item" data-user="${user.name}">
                <div class="user-avatar-small"></div>
                <div class="user-list-info">
                    <div class="user-list-name">${user.name}</div>
                    <div class="user-list-bio">${user.bio}</div>
                </div>
            </div>
        `).join('');

        // Add click event to user list items
        document.querySelectorAll('.user-list-item').forEach(item => {
            item.addEventListener('click', function() {
                const userName = this.getAttribute('data-user');
                startNewChat(userName);
            });
        });
    }

    // Filter users in new chat modal
    function filterUsers() {
        if (!userSearchInput) return;
        
        const searchTerm = userSearchInput.value.toLowerCase();
        const userItems = document.querySelectorAll('.user-list-item');

        userItems.forEach(item => {
            const userName = item.getAttribute('data-user').toLowerCase();
            if (userName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Filter conversations
    function filterConversations() {
        if (!conversationSearch) return;
        
        const searchTerm = conversationSearch.value.toLowerCase();
        const conversationItems = document.querySelectorAll('.conversation-item');

        conversationItems.forEach(item => {
            const conversationName = item.querySelector('.conversation-name').textContent.toLowerCase();
            if (conversationName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Start new chat with user
    function startNewChat(userName) {
        // Close modal
        closeModal();

        // Create new conversation item if it doesn't exist
        let conversationItem = document.querySelector(`[data-chat="${userName}"]`);
        if (!conversationItem) {
            conversationItem = createNewConversationItem(userName);
        }

        // Select the conversation
        selectConversation(userName, conversationItem);

        // Show notification
        showNotification(`Started conversation with ${userName}`, 'success');
    }

    // Create new conversation item
    function createNewConversationItem(userName) {
        const conversationsList = document.querySelector('.conversations-list');
        if (!conversationsList) return null;
        
        const newConversation = document.createElement('div');
        newConversation.className = 'conversation-item';
        newConversation.setAttribute('data-chat', userName);
        
        newConversation.innerHTML = `
            <div class="conversation-avatar">
                <div class="user-avatar-small"></div>
                <div class="online-indicator"></div>
            </div>
            <div class="conversation-info">
                <div class="conversation-header">
                    <span class="conversation-name">${userName}</span>
                    <span class="conversation-time">now</span>
                </div>
                <div class="conversation-preview">
                    <p>Say hello!</p>
                </div>
            </div>
        `;

        conversationsList.insertBefore(newConversation, conversationsList.firstChild);
        
        // Add click event
        newConversation.addEventListener('click', function() {
            selectConversation(userName, this);
        });

        return newConversation;
    }

    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${type === 'success' ? '✓' : 'i'}</div>
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

    // Initialize chat when page loads
    initChat();
});
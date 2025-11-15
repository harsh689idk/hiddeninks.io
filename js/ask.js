// Ask Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const postBtn = document.getElementById('postBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const imageUpload = document.getElementById('imageUpload');
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const removeImage = document.getElementById('removeImage');
    const questionTitle = document.getElementById('questionTitle');
    const questionDescription = document.getElementById('questionDescription');
    const titleCount = document.getElementById('titleCount');
    const descCount = document.getElementById('descCount');
    const correctAnswer = document.getElementById('correctAnswer');
    const successModal = document.getElementById('successModal');
    const viewQuestionBtn = document.getElementById('viewQuestionBtn');
    const postAnotherBtn = document.getElementById('postAnotherBtn');

    // State
    let currentStep = 1;
    let uploadedImage = null;

    // Initialize
    function initAsk() {
        setupEventListeners();
        updateStepNavigation();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Step navigation
        prevBtn.addEventListener('click', goToPreviousStep);
        nextBtn.addEventListener('click', goToNextStep);
        postBtn.addEventListener('click', postQuestion);

        // Image upload
        uploadBtn.addEventListener('click', () => imageUpload.click());
        imageUpload.addEventListener('change', handleImageUpload);
        removeImage.addEventListener('click', removeUploadedImage);

        // Drag and drop
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);

        // Character counters
        questionTitle.addEventListener('input', updateTitleCount);
        questionDescription.addEventListener('input', updateDescCount);

        // Success modal
        viewQuestionBtn.addEventListener('click', viewQuestion);
        postAnotherBtn.addEventListener('click', resetForm);

        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    // Step navigation
    function goToNextStep() {
        if (!validateCurrentStep()) return;

        if (currentStep < 3) {
            // Hide current step
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
            document.getElementById(`step${currentStep}`).classList.remove('active');

            // Show next step
            currentStep++;
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
            document.getElementById(`step${currentStep}`).classList.add('active');

            updateStepNavigation();
        }
    }

    function goToPreviousStep() {
        if (currentStep > 1) {
            // Hide current step
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
            document.getElementById(`step${currentStep}`).classList.remove('active');

            // Show previous step
            currentStep--;
            document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
            document.getElementById(`step${currentStep}`).classList.add('active');

            updateStepNavigation();
        }
    }

    function updateStepNavigation() {
        // Update button visibility
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
        nextBtn.style.display = currentStep < 3 ? 'block' : 'none';
        postBtn.style.display = currentStep === 3 ? 'block' : 'none';

        // Update next button text
        if (currentStep === 1 && !uploadedImage) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }

        // Update post button state
        if (currentStep === 3) {
            postBtn.disabled = !validateStep3();
        }
    }

    // Step validation
    function validateCurrentStep() {
        switch (currentStep) {
            case 1:
                return validateStep1();
            case 2:
                return validateStep2();
            case 3:
                return validateStep3();
            default:
                return true;
        }
    }

    function validateStep1() {
        if (!uploadedImage) {
            showNotification('Please upload an image of the problem', 'error');
            return false;
        }
        return true;
    }

    function validateStep2() {
        const title = questionTitle.value.trim();
        const subject = document.getElementById('subjectSelect').value;

        if (!title) {
            showNotification('Please enter a question title', 'error');
            questionTitle.focus();
            return false;
        }

        if (!subject) {
            showNotification('Please select a subject', 'error');
            return false;
        }

        return true;
    }

    function validateStep3() {
        const answer = correctAnswer.value.trim();
        return answer !== '' && !isNaN(parseFloat(answer));
    }

    // Image handling
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            processImageFile(file);
        } else {
            showNotification('Please select a valid image file', 'error');
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    }

    function handleDrop(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processImageFile(file);
        } else {
            showNotification('Please drop a valid image file', 'error');
        }
    }

    function processImageFile(file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            uploadedImage = {
                file: file,
                dataUrl: e.target.result
            };
            
            previewImage.src = uploadedImage.dataUrl;
            uploadArea.style.display = 'none';
            imagePreview.style.display = 'block';
            
            updateStepNavigation();
            showNotification('Image uploaded successfully!', 'success');
        };
        
        reader.readAsDataURL(file);
    }

    function removeUploadedImage() {
        uploadedImage = null;
        imageUpload.value = '';
        uploadArea.style.display = 'block';
        imagePreview.style.display = 'none';
        updateStepNavigation();
    }

    // Character counters
    function updateTitleCount() {
        const count = questionTitle.value.length;
        titleCount.textContent = count;
        
        if (count > 80) {
            titleCount.style.color = '#ef4444';
        } else if (count > 60) {
            titleCount.style.color = '#f59e0b';
        } else {
            titleCount.style.color = '#10b981';
        }
    }

    function updateDescCount() {
        const count = questionDescription.value.length;
        descCount.textContent = count;
        
        if (count > 400) {
            descCount.style.color = '#ef4444';
        } else if (count > 300) {
            descCount.style.color = '#f59e0b';
        } else {
            descCount.style.color = '#10b981';
        }
    }

    // Form submission
    function postQuestion() {
        if (!validateStep3()) {
            showNotification('Please enter a valid numeric answer', 'error');
            return;
        }

        // Simulate API call
        showNotification('Posting your question...', 'info');
        
        setTimeout(() => {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 1500);
    }

    function viewQuestion() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
        window.location.href = 'index.html';
    }

    function resetForm() {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset to step 1
        currentStep = 1;
        steps.forEach(step => step.classList.remove('active'));
        stepContents.forEach(content => content.classList.remove('active'));
        
        document.querySelector('.step[data-step="1"]').classList.add('active');
        document.getElementById('step1').classList.add('active');
        
        // Reset form data
        uploadedImage = null;
        imageUpload.value = '';
        uploadArea.style.display = 'block';
        imagePreview.style.display = 'none';
        questionTitle.value = '';
        questionDescription.value = '';
        document.getElementById('subjectSelect').value = '';
        document.getElementById('difficultySelect').value = 'medium';
        correctAnswer.value = '';
        
        updateStepNavigation();
        updateTitleCount();
        updateDescCount();
        
        showNotification('Form reset. Ready to post another question!', 'success');
    }

    // Real-time validation for step 3
    correctAnswer.addEventListener('input', function() {
        postBtn.disabled = !validateStep3();
        
        if (this.value && !isNaN(parseFloat(this.value))) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });

    // Notification function
    function showNotification(message, type = 'info') {
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

    // Initialize
    initAsk();
});
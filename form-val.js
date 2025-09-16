document.addEventListener('DOMContentLoaded', function() {
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Find all forms or inputs with data-blocked-emails attribute
    const fields = document.querySelectorAll('[data-blocked-emails]');
    fields.forEach(field => {
        // Get the form containing the field (field could be input or form itself)
        const form = field.tagName === 'FORM' ? field : field.closest('form');
        if (!form) return;

        // Get the email input (either the field itself or within the form)
        const emailInput = field.tagName === 'INPUT' && field.type === 'email' ? field : form.querySelector('input[type="email"]');
        if (!emailInput) return;

        // Get the blocked domains list
        const blockedStr = field.getAttribute('data-blocked-emails');
        const blocked = blockedStr ? blockedStr.split(',').map(d => d.trim().toLowerCase()) : [];

        // Get the error element (use ms-code-require-error for compatibility, or data-error-element)
        const errorElement = document.querySelector(`[ms-code-require-error="${emailInput.getAttribute('ms-code-require') || emailInput.name}"]`) ||
                            document.querySelector(`[data-error-element="${emailInput.name}"]`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        // Get the custom error message or use default
        const errorMsg = field.getAttribute('data-error-message') || 'Please use a company email address.';

        // Get the submit button
        const submitButton = form.querySelector(`[ms-code-submit-button="${emailInput.getAttribute('ms-code-require') || emailInput.name}"]`) ||
                            form.querySelector('button[type="submit"]');

        // Validate function
        function validateField() {
            const email = emailInput.value.trim();
            let isValid = true;
            if (email) {
                const domain = email.split('@')[1]?.toLowerCase();
                if (domain && blocked.includes(domain)) {
                    isValid = false;
                    emailInput.setCustomValidity(errorMsg);
                } else {
                    emailInput.setCustomValidity('');
                }
            } else {
                emailInput.setCustomValidity('');
            }
            emailInput.reportValidity();
            if (errorElement) {
                errorElement.style.display = isValid ? 'none' : 'block';
            }
            if (submitButton) {
                submitButton.style.opacity = isValid ? '1' : '0.5';
                submitButton.style.pointerEvents = isValid ? 'auto' : 'none';
            }
            return isValid;
        }

        // Debounced validate function
        const debouncedValidate = debounce(validateField, 500);

        // Add event listeners
        emailInput.addEventListener('blur', validateField);
        emailInput.addEventListener('input', debouncedValidate);

        // Handle form submission
        form.addEventListener('submit', function(event) {
            if (!validateField()) {
                event.preventDefault();
                emailInput.focus();
            }
        });
    });
});

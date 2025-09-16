/*
Required attributes for blank field validation in Webflow form:
- ms-code-require: On required <input>, unique ID (e.g., "field1")
- ms-code-require-error: On error element (e.g., <p>), matches ms-code-require (e.g., "field1")
- ms-code-submit-button: On submit <button>, matches ms-code-require (e.g., "field1")
- data-error-message (optional): On required <input>, custom error text (e.g., "This field is required")
*/

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

    // Find all fields with ms-code-require attribute
    const fields = document.querySelectorAll('[ms-code-require]');
    fields.forEach(field => {
        // Get the form containing the field
        const form = field.closest('form');
        if (!form) return;

        // Get the error element
        const errorElement = document.querySelector(`[ms-code-require-error="${field.getAttribute('ms-code-require')}"]`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        // Get the custom error message or use default
        const errorMsg = field.getAttribute('data-error-message') || 'This field is required.';

        // Get the submit button
        const submitButton = form.querySelector(`[ms-code-submit-button="${field.getAttribute('ms-code-require')}"]`) ||
                            form.querySelector('button[type="submit"]');

        // Validate function
        function validateField() {
            const value = field.value.trim();
            const isValid = value !== '';
            field.setCustomValidity(isValid ? '' : errorMsg);
            field.reportValidity();
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
        field.addEventListener('blur', validateField);
        field.addEventListener('input', debouncedValidate);

        // Handle form submission
        form.addEventListener('submit', function(event) {
            if (!validateField()) {
                event.preventDefault();
                field.focus();
            }
        });
    });
});

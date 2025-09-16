
<!-- 💙 MEMBERSCRIPT #127 v0.1 💙 - TEXT INPUT VALIDATION -->

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
        // Get the error element for this field
        const errorElement = document.querySelector(`[ms-code-require-error="${field.getAttribute('ms-code-require')}"]`);
        // Hide error message initially
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        // Get the form containing the field
        const form = field.closest('form');
        // Get the submit button
        const submitButton = form ? form.querySelector(`[ms-code-submit-button="${field.getAttribute('ms-code-require')}"]`) : null;
        // Get the require-list attribute value
        const requireList = field.getAttribute('ms-code-require-list');
        if (requireList) {
            // Convert the require-list to an array of regex patterns
            const patterns = requireList.split(',').map(pattern => {
                return pattern.replace(/\{([^}]+)\}/g, (match, p1) => {
                    return p1.split('').map(char => {
                        switch(char) {
                            case '0': return '\\d';
                            case 'A': return '[A-Z]';
                            case 'a': return '[a-z]';
                            default: return char;
                        }
                    }).join('');
                });
            });
            // Validate function
            function validateField() {
                const value = field.value;
                const isValid = patterns.some(pattern => new RegExp(`^${pattern}$`).test(value));
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
            // Add blur event listener
            field.addEventListener('blur', validateField);
            // Add input event listener for debounced validation
            field.addEventListener('input', debouncedValidate);
            // Handle form submission
            if (form) {
                form.addEventListener('submit', function(event) {
                    if (!validateField() && submitButton) {
                        event.preventDefault();
                        field.focus();
                    }
                });
            }
        }
    });
});

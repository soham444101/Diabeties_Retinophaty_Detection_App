document.addEventListener('DOMContentLoaded', () => {
    // Navbar burger menu
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }

    // Close notifications
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        $delete.addEventListener('click', () => {
            $delete.parentElement.remove();
        });
    });

    // Form validation
    const forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.parentElement.classList.add('has-error');
                } else {
                    input.parentElement.classList.remove('has-error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                form.classList.add('was-validated');
            }
        });
    });
});
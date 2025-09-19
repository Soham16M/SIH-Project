document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeRoleSelection();
});

function initializeRoleSelection() {
    const roleOptionsContainer = document.getElementById('role-options');
    if (!roleOptionsContainer) return;

    const roleButtons = roleOptionsContainer.querySelectorAll('.role-button');
    const continueButton = document.getElementById('continue-button');

    let selectedRole = null;


    continueButton.disabled = true;

    roleButtons.forEach(button => {
        button.addEventListener('click', () => {

            selectedRole = button.dataset.role;


            roleButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');


            continueButton.disabled = false;
        });
    });

    continueButton.addEventListener('click', () => {
        if (selectedRole) {
            console.log(`Continue button clicked. Selected role: ${selectedRole}`);



            const roleSelectionStep = document.getElementById('role-selection-step');
            const formPlaceholder = document.getElementById('form-steps-placeholder');

            roleSelectionStep.classList.add('hidden');
            formPlaceholder.classList.remove('hidden');
            formPlaceholder.innerHTML = `<p class="text-center text-lg font-medium text-gray-700">Sign up as <span class="font-bold text-indigo-600">${selectedRole}</span></p>
            <p class="text-center text-gray-500 mt-2">Next steps for the registration form would load here.</p>`;


            continueButton.textContent = 'Proceeding...';
            continueButton.disabled = true;
        }
    });
}

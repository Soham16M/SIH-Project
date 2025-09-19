const RoleSelectionStep = ({ selectedRole, onRoleSelect, onContinue }) => {
    const roles = [
        { name: 'Student', icon: 'user' },
        { name: 'Alumni', icon: 'graduation-cap' },
        { name: 'Admin', icon: 'shield' }
    ];

    return (
        <div>
            <div id="role-selection-step">
                <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">I am a...</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="role-options">
                    {roles.map(role => (
                        <button
                            key={role.name}
                            data-role={role.name}
                            onClick={() => onRoleSelect(role.name)}
                            className={`role-button flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-50 ${selectedRole === role.name ? 'selected' : 'border-gray-200'}`}
                        >
                            <i data-lucide={role.icon} className="w-8 h-8 mb-2 text-gray-500"></i>
                            <span className="font-medium text-gray-700">{role.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <button
                    id="continue-button"
                    onClick={onContinue}
                    disabled={!selectedRole}
                    className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

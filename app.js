const { useState, useEffect } = React;

const SuccessMessage = ({ name, role }) => {
    useEffect(() => {
        lucide.createIcons();

        // Redirect after 3 seconds
        const timer = setTimeout(() => {
            if (role === "Alumni") {
                window.location.href = "aluminimain.html";   // alumni page
            } else if (role === "Student") {
                window.location.href = "studentmain.html";   // student page
            } else {
                window.location.href = "index.html";         // fallback
            }
        }, 2000);

        // Cleanup if component unmounts before timeout
        return () => clearTimeout(timer);
    }, [role]);

    return (
        <div className="text-center py-8 animate-fade-in">
            <i data-lucide="check-circle" className="h-16 w-16 text-green-500 mx-auto mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800">
                {role === "Alumni" ? "Alumni Registration Successful!" : "Student Registration Successful!"}
            </h2>
            <p className="text-gray-600 mt-2">
                Welcome, {name}! {role === "Alumni" ? "Redirecting you to the alumni panel." : "Your account has been created."}
            </p>
            <p className="text-sm text-gray-500 mt-4">
                {role === "Alumni" ? "Please wait while we prepare your alumni dashboard..." : "We’re excited to have you join us."}
            </p>
            <p className="text-xs text-gray-400 mt-6">
                Redirecting you to your dashboard...
            </p>
        </div>
    );
};


const StepIndicator = ({ currentStep, isSubmitted }) => {
    const steps = ['Select Role', 'Enter Details', 'Confirmation'];
    const activeIndex = isSubmitted ? 2 : currentStep - 1;

    useEffect(() => {
        lucide.createIcons();
    }, [activeIndex]);

    return (
        <div className="flex items-start w-full mb-10">
            {steps.map((step, index) => {
                const isActive = index === activeIndex;
                const isCompleted = index < activeIndex;

                return (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center w-24">
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-semibold transition-all duration-300 ${
                                isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 
                                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {isCompleted ? <i data-lucide="check" className="w-6 h-6"></i> : index + 1}
                            </div>
                            <p className={`text-xs mt-2 text-center font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                                {step}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mt-5 mx-2 rounded-full transition-colors duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};


const App = () => {
    const [step, setStep] = useState(1);
    const [selectedRole, setSelectedRole] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        lucide.createIcons();
    }, [step, isSubmitted]);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleContinue = () => {
        if (selectedRole) {
            setStep(2);
        }
    };

    const handleFormSubmit = (formData) => {
        setUserName(formData.fullName);
        setIsSubmitted(true);
    };
    
    const renderStepContent = () => {
        if (isSubmitted) {
            return <SuccessMessage name={userName} role={selectedRole}/>;
        }

        switch (step) {
            case 1:
                return (
                    <RoleSelectionStep
                        selectedRole={selectedRole}
                        onRoleSelect={handleRoleSelect}
                        onContinue={handleContinue}
                    />
                );
            case 2:
                const formProps = { selectedRole, onFormSubmit: handleFormSubmit };
                switch (selectedRole) {
                    case 'Admin':
                        return <AdminSignUpForm {...formProps} />;
                    case 'Student':
                        return <StudentSignUpForm {...formProps} />;
                    case 'Alumni':
                         return <AlumniSignUpForm {...formProps} />;
                    default:
                        setStep(1); 
                        return null;
                }
            default:
                setStep(1);
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <main className="bg-white w-full max-w-3xl p-8 md:p-12 rounded-2xl shadow-xl transition-all duration-300 flex flex-col items-center">
                { !isSubmitted &&
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Join Our Alumni Network</h1>
                        <p className="text-gray-500 mt-2">
                            {step === 1 ? 'Begin your journey by selecting your role.' : `Complete your registration as a ${selectedRole}.`}
                        </p>
                    </div>
                }
                
                <div className="w-full max-w-md">
                  <StepIndicator currentStep={step} isSubmitted={isSubmitted} />
                </div>
                
                <div className="w-full">
                  {renderStepContent()}
                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);




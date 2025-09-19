const AdminSignUpForm = ({ onFormSubmit }) => {
    const { useState, useEffect } = React;
    const formInputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        lucide.createIcons();
    }, [showPassword, showConfirmPassword, isSubmitting]);
    
    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$').test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (!formData.phone) newErrors.phone = 'Phone Number is required.';
        
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: null}));
        }
        if ((name === 'password' || name === 'confirmPassword') && errors.confirmPassword) {
             setErrors(prev => ({...prev, confirmPassword: null}));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            console.log("Admin form submitted:", formData);
            onFormSubmit(formData);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className={formInputClass} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Official Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={formInputClass} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={formInputClass} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div className="relative">
                <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={formData.password} onChange={handleChange} className={formInputClass} />
                <span onClick={() => setShowPassword(!showPassword)} className="password-toggle-icon">
                    <i data-lucide={showPassword ? 'eye-off' : 'eye'}></i>
                </span>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="relative">
                <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={formInputClass} />
                 <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="password-toggle-icon">
                    <i data-lucide={showConfirmPassword ? 'eye-off' : 'eye'}></i>
                </span>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <div className="pt-2">
                <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center justify-center">
                    {isSubmitting && <i data-lucide="loader-2" className="animate-spin mr-2 h-5 w-5"></i>}
                    {isSubmitting ? 'Submitting...' : 'Create Admin Account'}
                </button>
            </div>
        </form>
    );
};

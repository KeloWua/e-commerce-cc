import { Mail, Phone, MapPin, Send, Users, Target, Rocket } from 'lucide-react';
import { useState } from 'react';
import { sendContactForm } from '../../services/contact.service';


const AboutUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await sendContactForm(formData); // <-- formData, no form
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative py-20 bg-gray-900 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                        About <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Vad.er</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are more than just a store. We are a team dedicated to providing the best products and experience for our customers worldwide.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-indigo-500/10 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all group">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            To simplify shopping by providing a curated selection of everything you need in one place, with unmatched quality and service.
                        </p>
                    </div>

                    <div className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-indigo-500/10 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all group">
                        <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Users size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Customer First</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Our customers are at the heart of everything we do. We strive to exceed expectations with every single order.
                        </p>
                    </div>

                    <div className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-indigo-500/10 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all group">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <Rocket size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Innovation</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Continuously evolving our platform and services to stay ahead in the dynamic world of global e-commerce.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Get in Touch</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Email Us</h4>
                                        <p className="text-gray-500 dark:text-gray-400">support@vader.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Call Us</h4>
                                        <p className="text-gray-500 dark:text-gray-400">+1 (555) 000-0000</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Visit Us</h4>
                                        <p className="text-gray-500 dark:text-gray-400">123 Commerce St, Digital City, DC 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-indigo-500/10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white dark:placeholder-gray-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white dark:placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all dark:text-white dark:placeholder-gray-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none dark:text-white dark:placeholder-gray-500"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-gray-900 dark:bg-indigo-600 text-white font-black rounded-xl hover:bg-black dark:hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>

                                {status === 'success' && (
                                    <p className="text-green-600 text-sm text-center font-medium">
                                        ✓ Message sent! We'll get back to you soon.
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm text-center font-medium">
                                        Something went wrong. Please try again.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;

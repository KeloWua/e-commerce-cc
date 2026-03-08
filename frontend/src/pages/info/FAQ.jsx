import { HelpCircle, ChevronDown, Package, CreditCard, User, Truck } from 'lucide-react';
import { useState } from 'react';

const FAQItem = ({ question, answer, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Icon size={20} />
                    </div>
                    <span className="font-bold text-gray-900">{question}</span>
                </div>
                <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>
            <div
                className={`px-6 overflow-hidden transition-all duration-300 ${isOpen ? 'pb-6 max-h-40' : 'max-h-0'}`}
            >
                <p className="text-gray-500 text-sm leading-relaxed font-medium pl-14">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = () => {
    const categories = [
        {
            title: "Shopping & Orders",
            items: [
                {
                    question: "How do I place an order?",
                    answer: "Simply browse our products, add your favorites to the cart, and proceed to checkout with your secure account.",
                    icon: Package
                },
                {
                    question: "Can I cancel my order?",
                    answer: "Orders can be modified or cancelled within 2 hours of placement. Contact our support immediately.",
                    icon: HelpCircle
                }
            ]
        },
        {
            title: "Shipping & Delivery",
            items: [
                {
                    question: "Where do you ship?",
                    answer: "We ship worldwide with express carriers to ensure fast and safe delivery of your premium items.",
                    icon: Truck
                },
                {
                    question: "How can I track my package?",
                    answer: "Once shipped, you'll receive an email with a tracking number to follow your order in real-time.",
                    icon: Package
                }
            ]
        },
        {
            title: "Payments & Security",
            items: [
                {
                    question: "Which payment methods are accepted?",
                    answer: "We accept all major credit cards and secure payments through Stripe for your peace of mind.",
                    icon: CreditCard
                },
                {
                    question: "Is my data safe?",
                    answer: "Absolutly. We use advanced encryption and never store your full payment information on our servers.",
                    icon: User
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Got Questions? <span className="text-indigo-600">We Got Answers.</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">
                        Everything you need to know about shopping at Vad.er
                    </p>
                </div>

                <div className="space-y-12">
                    {categories.map((cat, idx) => (
                        <div key={idx}>
                            <h2 className="text-xs font-black text-indigo-500 uppercase tracking-[4px] mb-6 pl-2">
                                {cat.title}
                            </h2>
                            <div className="space-y-4">
                                {cat.items.map((item, i) => (
                                    <FAQItem key={i} {...item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-gray-900 rounded-[2rem] text-center text-white">
                    <h3 className="text-xl font-black mb-2">Still need help?</h3>
                    <p className="text-gray-400 text-sm mb-6">Our support team is available 24/7 for any inquiry.</p>
                    <a
                        href="mailto:support@vader.com"
                        className="inline-block px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FAQ;

import { RotateCcw, ShieldCheck, Mail, Send, Calendar, CheckSquare } from 'lucide-react';

const Returns = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header section with big bold text */}
                <div className="text-center mb-24">
                    <div className="inline-block p-4 bg-indigo-50 rounded-[2rem] text-indigo-600 mb-8 transform -rotate-3 hover:rotate-3 transition-all duration-300">
                        <RotateCcw size={48} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-8 leading-none">
                        Worry-Free <br /> <span className="text-indigo-600 stroke-indigo-600">Shopping.</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-gray-500 text-lg font-medium leading-relaxed">
                        If you are not 100% satisfied with your purchase, we will make it right. No questions asked.
                    </p>
                </div>

                {/* Returns Policy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-32">

                    {/* Policy Card 1 */}
                    <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 border border-white">
                        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4 group hover:text-indigo-600 transition-colors">
                            <Calendar className="text-indigo-600" />
                            30-Day Window
                        </h2>
                        <ul className="space-y-6">
                            {[
                                "Full refund within 30 days of purchase.",
                                "Exchange for different sizes or colors.",
                                "Items must be in original condition.",
                                "Original packaging is required."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="mt-1 w-5 h-5 bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckSquare size={12} className="text-indigo-600" />
                                    </div>
                                    <span className="text-gray-500 font-bold leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Step-by-Step Card */}
                    <div className="bg-gray-900 p-12 rounded-[4rem] text-white shadow-2xl shadow-indigo-500/20">
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                            <Send className="text-pink-500" />
                            How to Return
                        </h2>
                        <div className="space-y-10 relative">
                            {/* Connector line for steps */}
                            <div className="absolute left-7 top-10 bottom-10 w-px bg-white/10 hidden sm:block"></div>

                            {[
                                { title: "Contact Support", desc: "Email our team with your order number and the item you wish to return.", icon: Mail },
                                { title: "Get Your Label", desc: "We will send you a pre-paid shipping label to print and attach to your package.", icon: Send },
                                { title: "Ship It Back", desc: "Drop off your package at any authorized shipping location.", icon: ShieldCheck },
                                { title: "Receive Refund", desc: "Once we verify the item, your refund is processed in 3-5 business days.", icon: CheckSquare }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 relative group">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all transform group-hover:scale-110 z-10">
                                        <step.icon className="text-pink-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-xl mb-1">{step.title}</h4>
                                        <p className="text-gray-400 font-medium text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="text-center bg-indigo-600 p-16 rounded-[4rem] text-white shadow-2xl shadow-indigo-500/30 overflow-hidden relative group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>

                    <h2 className="text-4xl font-black mb-6 relative">Need to start a return?</h2>
                    <p className="text-indigo-100 font-medium text-lg mb-10 relative max-w-lg mx-auto leading-relaxed">
                        Our dedicated team is ready to help you with the process. Your satisfaction is our priority.
                    </p>
                    <a
                        href="mailto:support@vader.com"
                        className="inline-block px-12 py-5 bg-white text-indigo-600 font-black rounded-3xl hover:bg-gray-50 transition-all hover:scale-105 relative shadow-xl"
                    >
                        Email Support Team
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Returns;

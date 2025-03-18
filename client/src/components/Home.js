import React from "react";
import Navbar from "./Navbar";
import {
  MessageSquare,
  Shield,
  Users,
  Star,
  ChevronRight,
  Linkedin,
  Twitter,
  Facebook,
  Search,
  UserPlus,
  Mail,
} from "lucide-react";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/background1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1
            className="font-bold mb-6 animate-fade-in-up"
            style={{ fontSize: "4rem" }}
          >
            Connect with Expert Mentors & Unlock Your Potential!
          </h1>

          <p
            className="text-2xl mb-16 max-w-3xl mx-auto animate-fade-in-up"
            style={{ fontSize: "1.5rem" }}
          >
            MentorLink is a platform that connects mentors and mentees for
            personalized guidance, career advice, and learning opportunities.
          </p>
          <div className="flex justify-center animate-fade-in-up">
            <button
              onClick={() =>
                document
                  .getElementById("benefits")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "Personalized Guidance",
                desc: "Connect with experts in various fields for tailored mentorship.",
              },
              {
                icon: MessageSquare,
                title: "Real-time Chat & Discussions",
                desc: "Chat instantly with your mentor and get quick responses.",
              },
              {
                icon: Shield,
                title: "Verified Mentors",
                desc: "All mentors are thoroughly vetted and approved by our team.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in-up">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 duration-300">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Mentors */}
      {/* Featured Mentors Section */}
      <div id="featured-mentors" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up opacity-0">
            Featured Mentors
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Daksh Borda",
                role: "Software Development, AI",
                logo: "/images/avatar1.jpg", // Avatar image path from public folder
                rating: 4.9,
                bio: "10+ years of experience in AI and full-stack development.",
              },
              {
                name: "Jay Andani",
                role: "Product Management",
                logo: "/images/avatar1.jpg", // Avatar image path from public folder
                rating: 4.8,
                bio: "Former PM at Google, helping others break into tech.",
              },
              {
                name: "Nand Banugariya",
                role: "Data Science",
                logo: "/images/avatar1.jpg", // Avatar image path from public folder
                rating: 5.0,
                bio: "Data scientist with expertise in ML and analytics.",
              },
            ].map((mentor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up opacity-0 transition-transform duration-300 hover:scale-105"
              >
                {/* Replace image with logo */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <img
                    src={mentor.logo}
                    alt={mentor.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                  <p className="text-blue-600 mb-2">{mentor.role}</p>
                  <p className="text-gray-600 mb-4">{mentor.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">
                        {mentor.rating}/5.0
                      </span>
                    </div>
                    <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 animate-fade-in-up opacity-0">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              View All Mentors
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="work" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up opacity-0">
            How It Works ?
          </h2>
          <div className="grid md:grid-cols-4 gap-8 stagger">
            {[
              { icon: Mail, title: "Sign Up & Verify Email" },
              { icon: Search, title: "Find a Mentor" },
              { icon: Shield, title: "Get Verified" },
              { icon: MessageSquare, title: "Start Chatting" },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up opacity-0"
              >
                <div className="relative">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110 duration-300">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-blue-200" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div id="qna" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Who can use this website?",
                answer:
                  "This platform is designed for students and professionals in technical fields such as software development, data science, AI, and product management.",
              },
              {
                question: "How do I find a mentor?",
                answer:
                  "You can browse our list of verified mentors, filter by expertise, and connect with them directly through the platform.",
              },
              {
                question: "What if I need help in a specific area?",
                answer:
                  "You can search for mentors with expertise in your specific area of interest and schedule a session with them.",
              },
              {
                question: "How do I become a mentor?",
                answer:
                  "If you have expertise in a technical field and would like to mentor others, you can apply to become a mentor on our platform.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-sm animate-fade-in-up"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MentorLink</h3>
              <p className="text-gray-400">
                Connecting mentors and mentees for a brighter future.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-gray-400 hover:text-white"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#work" className="text-gray-400 hover:text-white">
                    How It Works ?
                  </a>
                </li>
                <li>
                  <a
                    href="#featured"
                    className="text-gray-400 hover:text-white"
                  >
                    Mentors
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#privacy-policy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms-of-service"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#cookie-policy"
                    className="text-gray-400 hover:text-white"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MentorLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

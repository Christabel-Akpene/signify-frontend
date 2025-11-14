import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const Help = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I get started with learning sign language?",
      answer:
        "Start by exploring the Lessons section where you'll find structured courses designed for beginners. Each lesson includes video demonstrations, practice exercises, and quizzes to test your knowledge. We recommend starting with basic greetings and the alphabet.",
    },
    {
      question: "Can I practice signs using my camera?",
      answer:
        "Yes! Our app includes a hand gesture recognition feature that uses your device's camera to detect and evaluate your sign language gestures. Go to the Practice section and allow camera access to get real-time feedback on your signs.",
    },
    {
      question: "How do teachers add students to their class?",
      answer:
        "Teachers can add students by sharing a unique class code. Go to the Students section, click 'Add Student', and share the generated code. Students can then join using this code during their signup process.",
    },
    {
      question: "How can I track my learning progress?",
      answer:
        "Your dashboard displays your overall progress, including completed lessons, quiz scores, and practice statistics. You can view detailed analytics for each lesson and track your improvement over time.",
    },
    {
      question: "What should I do if the camera is not detecting my signs?",
      answer:
        "Ensure you have good lighting and a clear background. Position your hands within the camera frame and make sure camera permissions are enabled. Try adjusting your distance from the camera - about arm's length works best.",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Absolutely! All lessons are self-paced, allowing you to learn when it's convenient for you. You can repeat lessons, practice as much as you need, and progress to advanced topics when you feel ready.",
    },
    {
      question: "How do I change my password?",
      answer:
        "Go to your Profile page, click on 'Account Settings', then select 'Change Password'. You'll need to enter your current password and choose a new one. For security, we recommend using a strong, unique password.",
    },
    {
      question: "Is my progress saved if I switch devices?",
      answer:
        "Yes! Your progress is synced to your account, so you can access your learning history and continue from where you left off on any device. Just log in with your credentials.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <button
              onClick={() => window.history.back()}
              className="hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="text-muted-foreground w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h2 className="text-lg md:text-xl font-semibold">Help & Support</h2>
            <div className="w-5 md:w-6" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-6 md:py-8">
          {/* Introduction */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              How can we help you?
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Find answers to common questions or get in touch with our support
              team.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 md:mb-12">
            <Card className="p-4 md:p-5 hover:shadow-md transition-shadow cursor-pointer border-border">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">
                    Email Us
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    support@hestia-signify.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-5 hover:shadow-md transition-shadow cursor-pointer border-border">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">
                    Call Us
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    +233 59534940
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-5 hover:shadow-md transition-shadow cursor-pointer border-border">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base mb-1">
                    Live Chat
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Available 24/7
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-border transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                  >
                    <span className="font-medium text-sm md:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedIndex === index && (
                    <div className="px-4 md:px-6 pb-4 md:pb-5 pt-0">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <Card className="p-6 md:p-8 bg-primary/5 border-primary/20 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Still need help?
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-5">
              Our support team is ready to assist you with any questions or
              issues you may have.
            </p>
            <Button className="w-full md:w-auto px-6 md:px-8 py-5 md:py-6">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;

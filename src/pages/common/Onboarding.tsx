import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Check } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-bgColor flex flex-col lg:flex-row">
      {/* Left Content Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-16 py-12 lg:py-8">
        <div className="w-full max-w-xl space-y-8 lg:space-y-12">
          {/* Logo/Brand */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-textColor">
              Hestia <span className="text-primary">Signify</span>
            </h1>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textColor leading-tight">
              Empower Every Voice
            </h2>
            <p className="text-lg sm:text-xl text-secondarytext font-medium">
              AI-powered assistive technology for teachers supporting learners
              with non-standard speech patterns and speech difficulties
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="text-secondarytext">
                Tools for teachers in deaf schools and special education
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="text-secondarytext">
                Support learners with speech difficulties using AI
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <p className="text-secondarytext">
                Bridge communication gaps effectively
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => navigate("/roles")}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-12 py-6 rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-linear-to-br from-primary/10 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img
            src="/images/bg_image.png"
            alt="Teachers supporting deaf learners"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* Mobile Image Preview */}
      <div className="lg:hidden w-full px-6 pb-8">
        <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/images/bg_image.png"
            alt="Teachers supporting deaf learners"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

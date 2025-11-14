import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const Terms = () => {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy">("terms");

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
            <h2 className="text-lg md:text-xl font-semibold">
              Terms & Privacy
            </h2>
            <div className="w-5 md:w-6" /> {/* Spacer for alignment */}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("terms")}
              className={`flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors relative ${
                activeTab === "terms"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Terms of Service
              {activeTab === "terms" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors relative ${
                activeTab === "privacy"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Privacy Policy
              {activeTab === "privacy" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-6 md:py-8 pb-16">
          {activeTab === "terms" ? (
            <div className="space-y-6 md:space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Terms of Service
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last updated: November 14, 2025
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  1. Acceptance of Terms
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  By accessing and using Signify, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  2. Use License
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Permission is granted to temporarily access and use Signify
                  for personal, non-commercial educational purposes. This is the
                  grant of a license, not a transfer of title, and under this
                  license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>Modify or copy the materials</li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    Attempt to decompile or reverse engineer any software
                    contained in Signify
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials
                  </li>
                  <li>
                    Transfer the materials to another person or "mirror" the
                    materials on any other server
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  3. User Accounts
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  When you create an account with us, you must provide accurate,
                  complete, and current information. Failure to do so
                  constitutes a breach of the Terms. You are responsible for
                  safeguarding the password and for all activities that occur
                  under your account.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  4. Educational Content
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Signify provides sign language learning materials for
                  educational purposes. While we strive for accuracy, we make no
                  warranties or representations about the completeness or
                  accuracy of the content. The content should not be used as a
                  substitute for professional sign language instruction.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  5. Camera and Device Access
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Our hand gesture recognition features require access to your
                  device's camera. By using these features, you grant permission
                  for the app to access your camera. Video and images are
                  processed locally on your device and are not stored or
                  transmitted to our servers unless you explicitly choose to
                  share them.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  6. Teacher and Student Roles
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Teachers using Signify are responsible for the appropriate use
                  of the platform with their students. Teachers must comply with
                  all applicable laws and regulations regarding student data and
                  educational privacy, including but not limited to FERPA and
                  COPPA where applicable.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  7. Prohibited Activities
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>Use the service for any illegal purpose</li>
                  <li>Harass, abuse, or harm another person</li>
                  <li>
                    Share false or misleading information through the service
                  </li>
                  <li>
                    Attempt to gain unauthorized access to other users' accounts
                  </li>
                  <li>
                    Interfere with or disrupt the service or servers or networks
                    connected to the service
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  8. Termination
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account and bar access to the
                  service immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of the
                  Terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  9. Limitation of Liability
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  In no event shall Signify, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  10. Changes to Terms
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these Terms at any
                  time. We will provide notice of any significant changes by
                  posting the new Terms on this page and updating the "Last
                  updated" date. Your continued use of the service after any
                  changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  11. Contact Us
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us
                  at support@signify.com.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Privacy Policy
                </h1>
                <p className="text-sm text-muted-foreground">
                  Last updated: November 14, 2025
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  1. Information We Collect
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We collect information that you provide directly to us,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>
                    Account information (name, email address, password, role)
                  </li>
                  <li>Profile information and preferences</li>
                  <li>
                    Learning progress data (lessons completed, quiz scores,
                    practice statistics)
                  </li>
                  <li>
                    Communication data (support requests, feedback, messages)
                  </li>
                  <li>
                    Teacher-student relationship data (class codes, progress
                    tracking)
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  2. Camera and Sensor Data
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  When you use our hand gesture recognition features, we access
                  your device's camera to capture and process hand movements.
                  This processing happens locally on your device using machine
                  learning models. The video feed and captured images are not
                  stored on our servers unless you explicitly choose to save or
                  share them. We only store metadata about your practice
                  sessions, such as accuracy scores and completion status.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  3. How We Use Your Information
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Create and manage your account and learning progress</li>
                  <li>
                    Enable teachers to track student progress and provide
                    guidance
                  </li>
                  <li>Send you technical notices and support messages</li>
                  <li>
                    Respond to your comments, questions, and customer service
                    requests
                  </li>
                  <li>Personalize your learning experience</li>
                  <li>
                    Monitor and analyze trends, usage, and activities in
                    connection with our services
                  </li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  4. Information Sharing and Disclosure
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share your
                  information in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>
                    With teachers: Students' learning progress and performance
                    data is shared with their assigned teachers
                  </li>
                  <li>
                    With your consent: We may share your information with third
                    parties when you give us explicit consent
                  </li>
                  <li>
                    For legal reasons: We may disclose information if required
                    by law or in response to valid requests by public
                    authorities
                  </li>
                  <li>
                    To protect rights: We may disclose information to protect
                    the rights, property, or safety of Signify, our users, or
                    others
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  5. Data Security
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We take reasonable measures to help protect your personal
                  information from loss, theft, misuse, unauthorized access,
                  disclosure, alteration, and destruction. We use Firebase
                  Authentication for secure account management and Cloud
                  Firestore for encrypted data storage. However, no internet or
                  electronic storage system is 100% secure, so we cannot
                  guarantee absolute security.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  6. Data Retention
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary
                  to provide you with our services and as described in this
                  Privacy Policy. We will retain and use your information to the
                  extent necessary to comply with our legal obligations, resolve
                  disputes, and enforce our agreements. You may request deletion
                  of your account and associated data at any time.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  7. Children's Privacy
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Our service is intended for use by students under the
                  supervision of teachers and parents. For users under 13, we
                  require parental or teacher consent. We do not knowingly
                  collect personal information from children under 13 without
                  such consent. If we become aware that we have collected
                  personal information from a child under 13 without proper
                  consent, we will take steps to delete that information.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  8. Your Rights and Choices
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground ml-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct your information</li>
                  <li>Request deletion of your account and data</li>
                  <li>
                    Opt out of promotional communications (while still receiving
                    service-related messages)
                  </li>
                  <li>
                    Disable camera access at any time through your device
                    settings
                  </li>
                  <li>Export your learning data</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  9. Cookies and Tracking
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track
                  activity on our service and hold certain information. Cookies
                  are files with a small amount of data that are stored on your
                  device. You can instruct your browser to refuse all cookies or
                  to indicate when a cookie is being sent. However, if you do
                  not accept cookies, you may not be able to use some portions
                  of our service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  10. Changes to This Privacy Policy
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold">
                  11. Contact Us
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please
                  contact us at privacy@signify.com or support@signify.com.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;

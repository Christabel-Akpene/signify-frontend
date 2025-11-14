import { useAuthActions } from "@/hooks/useAuthActions";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Lock,
  Bell,
  HelpCircle,
  Gavel,
  LogOut,
  Pencil,
  ArrowLeft,
} from "lucide-react";

const TeacherProfile = () => {
  const { handleLogout } = useAuthActions();
  const { userData } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <button className="hover:opacity-70 transition-opacity">
              <ArrowLeft className="text-muted-foreground w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h2 className="text-lg md:text-xl font-semibold">Profile</h2>
            <div className="w-5 md:w-6" /> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-8 md:mt-12 px-4">
          <div className="relative">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-lg md:text-2xl">
                {userData?.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "AM"}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 md:bottom-1 md:right-1 bg-primary hover:bg-primary/90 p-2 md:p-2.5 rounded-full transition-colors shadow-lg">
              <Pencil className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary-foreground" />
            </button>
          </div>
          <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-semibold">
            {userData?.fullName || "Adwoa Mensah"}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            {userData?.email || "adwoa.mensah@email.com"}
          </p>

          <Button className="mt-6 px-8 md:px-10 py-5 md:py-6 text-sm md:text-base">
            Edit Profile
          </Button>
        </div>

        {/* Account Settings */}
        <div className="w-full mt-10 md:mt-16 px-4 md:px-6">
          <p className="text-muted-foreground text-xs md:text-sm font-semibold mb-3 tracking-wider">
            ACCOUNT SETTINGS
          </p>

          <div className="bg-card rounded-lg md:rounded-xl overflow-hidden border border-border shadow-sm">
            <button className="flex items-center justify-between w-full px-4 md:px-6 py-4 md:py-5 border-b border-border text-left hover:bg-accent transition-colors group">
              <div className="flex items-center space-x-3 md:space-x-4">
                <Lock className="text-primary w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">
                  Change Password
                </span>
              </div>
              <ChevronRight className="text-muted-foreground w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center justify-between w-full px-4 md:px-6 py-4 md:py-5 hover:bg-accent transition-colors">
              <div className="flex items-center space-x-3 md:space-x-4">
                <Bell className="text-primary w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">
                  Push Notifications
                </span>
              </div>
              <div className="w-11 h-6 bg-muted rounded-full flex items-center justify-end p-1 transition-colors">
                <div className="w-4 h-4 bg-background rounded-full shadow-sm"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Application Section */}
        <div className="w-full mt-8 md:mt-10 px-4 md:px-6">
          <p className="text-muted-foreground text-xs md:text-sm font-semibold mb-3 tracking-wider">
            APPLICATION
          </p>

          <div className="bg-card rounded-lg md:rounded-xl overflow-hidden border border-border shadow-sm">
            <button className="flex items-center justify-between w-full px-4 md:px-6 py-4 md:py-5 border-b border-border hover:bg-accent transition-colors group">
              <div className="flex items-center space-x-3 md:space-x-4">
                <HelpCircle className="text-primary w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">
                  Help & Support
                </span>
              </div>
              <ChevronRight className="text-muted-foreground w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="flex items-center justify-between w-full px-4 md:px-6 py-4 md:py-5 hover:bg-accent transition-colors group">
              <div className="flex items-center space-x-3 md:space-x-4">
                <Gavel className="text-primary w-5 h-5 md:w-6 md:h-6" />
                <span className="text-sm md:text-base font-medium">
                  Terms & Privacy
                </span>
              </div>
              <ChevronRight className="text-muted-foreground w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="w-full mt-10 md:mt-12 px-4 md:px-6 pb-10 md:pb-16">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full font-semibold py-6 md:py-7 text-sm md:text-base rounded-lg md:rounded-xl"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;

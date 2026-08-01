import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl="/?welcome=1"
        appearance={{
          variables: {
            colorPrimary: "#22D3EE",
            colorBackground: "rgba(15, 23, 42, 0.7)",
            colorInputBackground: "rgba(255, 255, 255, 0.05)",
            colorInputText: "#E2E8F0",
            colorText: "#E2E8F0",
            colorTextSecondary: "#94A3B8",
            colorDanger: "#FCA5A5",
            borderRadius: "1rem",
            fontFamily: "Inter, sans-serif",
          },
          elements: {
            card: "glass-strong backdrop-blur-xl shadow-2xl",
            headerTitle: "font-display text-white",
            headerSubtitle: "text-slate-400",
            socialButtonsBlockButton: "border border-white/10 hover:bg-white/5",
            dividerLine: "bg-white/10",
            dividerText: "text-slate-500",
            formFieldLabel: "text-slate-300",
            formButtonPrimary: "bg-cyan-400 hover:bg-cyan-300 text-slate-900",
            footerActionText: "text-slate-400",
            footerActionLink: "text-cyan-400 hover:text-cyan-300",
            identityPreviewText: "text-slate-300",
            formFieldInput: "text-slate-100",
          },
        }}
      />
    </div>
  );
}

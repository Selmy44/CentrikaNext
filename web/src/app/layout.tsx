import ParticlesJSBackground from "@/components/ParticlesJSBackground";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Root layout wraps the app to host fixed background utilities
  return (
    <>
      <ParticlesJSBackground />
      <div id="bg-grid-overlay" />
      {children as React.ReactElement}
    </>
  );
}

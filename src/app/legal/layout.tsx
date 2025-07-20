export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen-grid container mx-auto p-4">{children}</div>;
}

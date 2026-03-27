export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { background: #111113 !important; }`}</style>
      {children}
    </>
  );
}

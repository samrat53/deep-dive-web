export default function ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="border-b text-center">20% offs on all purchases</div>
      {children}
    </>
  );
}

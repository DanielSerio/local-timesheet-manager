export function PageTitle({ text }: { text: string }) {
  return (
    <div className="py-6 text-center md:text-left">
      <h1 className="text-2xl font-normal">{text}</h1>
    </div>
  );
}

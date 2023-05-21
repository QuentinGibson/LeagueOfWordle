export default function Stat({ children }: { children: any }) {
  return (
    <div className="flex flex-col items-center gap-2 w-[50px]">
      {children}
    </div>
  );
};
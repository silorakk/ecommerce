interface Props {
  children: React.ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: Props) {
  return (
    <div className="group relative w-max z-[100]">
      {children}
      <span className="pointer-events-none absolute -top-12 p-2 left-0 w-max opacity-0 bg-green-600 text-white transition-opacity group-hover:opacity-100 border rounded-xl tex-sm ">
        {text}
      </span>
    </div>
  );
}

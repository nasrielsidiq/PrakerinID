export default function Loading({
  width = 32, // px
  height = 32, // px
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div className="flex justify-center w-full mt-4">
      <span
        className="animate-spin rounded-full border-x-accent border-y-accent/50"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderWidth: `${Math.floor(width / 8)}px`, // atur ketebalan border proporsional
        }}
      ></span>
    </div>
  );
}

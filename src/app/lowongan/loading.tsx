export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
// This component can be used to show a loading spinner while data is being fetched or processed.
// It uses Tailwind CSS for styling and creates a simple spinning animation to indicate loading state.
// You can customize the size and color of the spinner by changing the classes applied to the div.
// For example, you can change `w-10 h-10` to `w-16 h-16` for a larger spinner or change `border-blue-500` to another color class like `border-red-500` for a different color.
// This component is useful in applications where you want to provide visual feedback to users that something is happening in the background, such as fetching data from an API or processing a form submission.
// 
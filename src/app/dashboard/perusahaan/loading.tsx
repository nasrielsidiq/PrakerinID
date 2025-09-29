export default function Loading() {
  return (
    <div className="fixed flex justify-center w-full mt-4 border ">
      <span className="animate-spin rounded-full h-8 w-8 border-5 border-t-4 border-b-4 border-x-accent border-y-accent/50"></span>
    </div>
  );
}
// This component can be used to show a loading spinner while data is being fetched or processed.
// It uses Tailwind CSS for styling and creates a simple spinning animation to indicate loading state.
// You can customize the size and color of the spinner by changing the classes applied to the div.
// For example, you can change `w-10 h-10` to `w-16 h-16` for a larger spinner or change `border-blue-500` to another color class like `border-red-500` for a different color.
// This component is useful in applications where you want to provide visual feedback to users that something is happening in the background, such as fetching data from an API or processing a form submission.
//

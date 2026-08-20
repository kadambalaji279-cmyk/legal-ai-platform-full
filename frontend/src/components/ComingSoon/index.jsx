import Navbar from "../Navbar";

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-navy">{title}</h1>
        <p className="mt-2 text-slate-500">This screen is coming up next.</p>
      </div>
    </div>
  );
}

export default ComingSoon;

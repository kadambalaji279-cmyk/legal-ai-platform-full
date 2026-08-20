import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, FileText } from "lucide-react";
import Navbar from "../../components/Navbar";
import FileUpload from "../../components/FileUpload";
import Badge from "../../components/Badge";

const GUIDELINES = [
  "Maximum file size 20MB",
  "Ensure text is not blurred",
  "One agreement per upload",
  "Scanned copies auto-corrected via OCR",
];

const FORMATS = ["PDF", "JPG", "PNG", "Scanned Documents"];

const RECENT_UPLOADS = [
  { name: "Flat_Purchase_Pune.pdf", meta: "2.4 MB · Processed", status: "High Risk" },
];

function Upload() {
  const navigate = useNavigate();

  function handleFileSelected(file) {
    navigate("/processing", { state: { fileName: file.name } });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <h1 className="text-2xl font-bold text-navy">Upload a document</h1>
        <p className="mt-1 text-slate-500">
          PDF, image or scanned agreement — we'll handle the rest
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FileUpload onFileSelected={handleFileSelected} />
            <div className="mt-4 flex flex-wrap gap-2">
              {FORMATS.map((f) => (
                <span key={f} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-navy">Upload Guidelines</h2>
              <ul className="mt-4 space-y-3">
                {GUIDELINES.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brandgreen" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-teal" />
                <h2 className="font-semibold">Your data is private</h2>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Documents are processed in a sandboxed environment and never
                shared with third parties.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-semibold text-navy">Recent Uploads</h2>
          <div className="mt-4 space-y-3">
            {RECENT_UPLOADS.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
                    <FileText size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-navy">{doc.name}</p>
                    <p className="text-xs text-slate-400">{doc.meta}</p>
                  </div>
                </div>
                <Badge variant="high">{doc.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;

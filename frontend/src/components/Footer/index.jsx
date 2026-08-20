import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-navy">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 text-center sm:grid-cols-3">
          <div>
            <p className="text-3xl font-bold text-white">48,120+</p>
            <p className="mt-1 text-sm text-slate-400">Documents Analysed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">9,340</p>
            <p className="mt-1 text-sm text-slate-400">Risk Alerts Generated</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">3</p>
            <p className="mt-1 text-sm text-slate-400">Languages Supported</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-base font-bold text-white">NyayaSetu</p>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              AI-Powered Legal Intelligence &amp; Citizen Assistance
              Platform — making legal documents understandable for every
              citizen.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link to="/upload" className="hover:text-white">Upload</Link></li>
              <li><Link to="/analysis" className="hover:text-white">Analysis</Link></li>
              <li><Link to="/qa" className="hover:text-white">Q&amp;A</Link></li>
              <li><Link to="/compare" className="hover:text-white">Compare</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Languages
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>English</li>
              <li>हिंदी</li>
              <li>मराठी</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li className="cursor-pointer hover:text-white">Privacy</li>
              <li className="cursor-pointer hover:text-white">Terms</li>
              <li className="cursor-pointer hover:text-white">Disclaimer</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} NyayaSetu. Final Year AI Research Platform.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

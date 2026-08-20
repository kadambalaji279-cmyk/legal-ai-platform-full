import { useEffect, useRef, useState } from "react";
import { Send, MessageSquare, FileText, Sparkles } from "lucide-react";
import Navbar from "../../components/Navbar";
import EmptyState from "../../components/EmptyState";
import Loader from "../../components/Loader";

const DOCUMENTS = [
  { id: "flat", name: "Flat_Purchase_Pune.pdf" },
  { id: "loan", name: "HDFC_Loan_Contract.pdf" },
];

const SUGGESTIONS = [
  "What is the notice period?",
  "Can I lose my deposit?",
  "Who can terminate this agreement?",
];

function mockAnswer() {
  return {
    text: 'Yes. According to Clause 3, if you delay payment beyond 30 days, the Vendor may apply a 5% monthly penalty, and Clause 2 permits termination with forfeiture of the deposit already paid.',
    sources: ["Clause 2", "Clause 3"],
  };
}

function Chat() {
  const [activeDocId, setActiveDocId] = useState(DOCUMENTS[0].id);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  const activeDoc = DOCUMENTS.find((d) => d.id === activeDocId);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  function sendMessage(text) {
    const question = text.trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const { text: answer, sources } = mockAnswer();
      setMessages((prev) => [...prev, { role: "assistant", text: answer, sources }]);
      setIsThinking(false);
    }, 1100);
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 overflow-hidden px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[220px_1fr_260px] lg:gap-6 lg:py-6">
        <div className="shrink-0 lg:overflow-y-auto">
          <h2 className="hidden text-sm font-semibold text-navy lg:block">Uploaded Documents</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:mt-3 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
            {DOCUMENTS.map((doc) => {
              const active = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => { setActiveDocId(doc.id); setMessages([]); }}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors lg:w-full ${active ? "border-royal/30 bg-royal/5 text-royal" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                >
                  <FileText size={14} className="shrink-0" />
                  <span className="truncate font-medium">{doc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
            <MessageSquare size={16} className="text-royal" />
            <h2 className="font-semibold text-navy">Legal Q&amp;A</h2>
            <span className="ml-auto truncate text-xs text-slate-400">{activeDoc?.name}</span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.length === 0 && !isThinking ? (
              <EmptyState
                icon={Sparkles}
                title="Ask anything about this document"
                description={`Answers are grounded in ${activeDoc?.name} — every reply cites the exact clause it came from.`}
              />
            ) : (
              messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-royal px-4 py-2.5 text-sm text-white">{m.text}</div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-royal/10 text-xs font-bold text-royal">AI</span>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <p>{m.text}</p>
                      {m.sources?.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {m.sources.map((s) => (
                            <span key={s} className="rounded-full bg-royal/10 px-2.5 py-0.5 text-xs font-semibold text-royal">Source: {s}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )
            )}

            {isThinking && (
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-royal/10 text-xs font-bold text-royal">AI</span>
                <div className="flex items-center rounded-2xl rounded-tl-sm bg-slate-50 px-4 py-3">
                  <Loader label="AI is thinking" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex items-center gap-2 border-t border-slate-100 p-4"
          >
            <label htmlFor="qa-input" className="sr-only">Ask a question about this document</label>
            <input
              id="qa-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about this document..."
              className="flex-1 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-royal focus:ring-2 focus:ring-royal/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal text-white transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        <div className="shrink-0 lg:overflow-y-auto">
          <h2 className="hidden text-sm font-semibold text-navy lg:block">Try asking</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:mt-3 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="shrink-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-sm text-slate-600 transition-colors hover:border-royal/30 hover:text-royal lg:w-full"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

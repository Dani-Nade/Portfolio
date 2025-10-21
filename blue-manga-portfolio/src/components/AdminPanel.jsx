// src/components/AdminPanel.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db, auth, loginWithGoogle, logout, serverTimestamp } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-5 px-4 py-2 rounded-lg border bg-white/10 border-white/15 backdrop-blur text-slate-50 shadow-lg z-[1000]">
      {msg}
    </div>
  );
}

const box = "border rounded-2xl p-4 bg-white/5 border-white/10";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [toast, setToast] = useState("");

  const [draft, setDraft] = useState({
    id: null,
    title: "",
    subtitle: "",
    imageUrl: "",
    href: "",
    tags: "",
  });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));
    const unsubData = onSnapshot(collection(db, "projects"), (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
    });
    return () => {
      unsubAuth();
      unsubData();
    };
  }, []);

  const isEditing = useMemo(() => Boolean(draft.id), [draft.id]);

  async function submit(e) {
    e.preventDefault();
    const payload = {
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim(),
      imageUrl: draft.imageUrl.trim(),
      href: draft.href.trim(),
      tags: draft.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    if (!payload.title) return setToast("Title is required.");

    if (isEditing) {
      await updateDoc(doc(db, "projects", draft.id), payload);
      setToast("Project updated.");
    } else {
      await addDoc(collection(db, "projects"), {
        ...payload,
        createdAt: serverTimestamp(),
        by: user ? user.uid : null,
      });
      setToast("Project added.");
    }

    setDraft({ id: null, title: "", subtitle: "", imageUrl: "", href: "", tags: "" });
  }

  function startEdit(p) {
    setDraft({
      id: p.id,
      title: p.title || "",
      subtitle: p.subtitle || "",
      imageUrl: p.imageUrl || "",
      href: p.href || "",
      tags: (p.tags || []).join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id) {
    if (!window.confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", id));
    setToast("Project deleted.");
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sky-300 mb-4 text-lg">
          Sign in to manage your portfolio
        </p>
        <button
          onClick={loginWithGoogle}
          className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 transition font-semibold"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <>
      {toast && <Toast msg={toast} onDone={() => setToast("")} />}

      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title m-0">Admin</h2>
        <button onClick={logout} className="chip">Sign Out ({user.displayName || user.email})</button>
      </div>

      <form onSubmit={submit} className={`${box} grid md:grid-cols-2 gap-3`}>
        <input
          className="input"
          placeholder="Title*"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Subtitle"
          value={draft.subtitle}
          onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
        />
        <input
          className="input"
          placeholder="Image URL"
          value={draft.imageUrl}
          onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
        />
        <input
          className="input"
          placeholder="Project Link"
          value={draft.href}
          onChange={(e) => setDraft({ ...draft, href: e.target.value })}
        />
        <input
          className="input md:col-span-2"
          placeholder="Tags (comma-separated)"
          value={draft.tags}
          onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
        />

        {/* Preview */}
        {draft.imageUrl && (
          <div className="md:col-span-2">
            <div className="text-sm mb-1 text-slate-300/80">Preview</div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img src={draft.imageUrl} alt="preview" className="w-full h-56 object-cover" />
            </div>
          </div>
        )}

        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="btn">
            {isEditing ? "Update Project" : "Add Project"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn subtle"
              onClick={() => setDraft({ id: null, title: "", subtitle: "", imageUrl: "", href: "", tags: "" })}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 grid gap-3">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center gap-3 border border-white/10 rounded-xl p-3 bg-white/5">
            <div className="w-24 h-16 overflow-hidden rounded-lg border border-white/10 bg-white/10 shrink-0">
              {p.imageUrl ? (
                <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-xs text-slate-300/70">No image</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{p.title}</div>
              <div className="text-sky-300/80 text-xs truncate">{p.href || "(no link)"}</div>
            </div>
            <div className="flex gap-2">
              <button className="chip" onClick={() => startEdit(p)}>Edit</button>
              <button className="chip" onClick={() => remove(p.id)}>Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-slate-300/80">(No items yet)</div>
        )}
      </div>
    </>
  );
}

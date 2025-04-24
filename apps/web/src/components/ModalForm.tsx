import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
};

export default function ModalForm({ onClose }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category: "Development",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted bookmark:", formData);
    onClose();
  };

  useEffect(() => {
    const handleClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text.startsWith("http")) {
          setFormData((prev) => ({ ...prev, url: text }));
        }
      } catch (err) {
        console.warn("Clipboard error", err);
      }
    };

    const el = document.getElementById("bookmarkUrl");
    el?.addEventListener("click", handleClipboard);
    return () => el?.removeEventListener("click", handleClipboard);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-600 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ❌
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">Add Bookmark</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="bookmarkUrl"
            type="url"
            required
            placeholder="Paste URL..."
            className="w-full bg-gray-700 p-2 rounded text-white border border-gray-600"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
          <input
            type="text"
            required
            placeholder="Title"
            className="w-full bg-gray-700 p-2 rounded text-white border border-gray-600"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            rows={3}
            className="w-full bg-gray-700 p-2 rounded text-white border border-gray-600"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <select
            className="w-full bg-gray-700 p-2 rounded text-white border border-gray-600"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option>Development</option>
            <option>Design</option>
            <option>AI/ML</option>
            <option>Tools</option>
          </select>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
          >
            Save Bookmark
          </button>
        </form>
      </div>
    </div>
  );
}

type HeaderProps = {
  onAdd: () => void;
};

export default function Header({ onAdd }: HeaderProps) {
  return (
    <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-2">
        <svg
          className="h-9 w-9 text-purple-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5 3a2 2 0 00-2 2v14l7-4 7 4V5a2 2 0 00-2-2H5z" />
        </svg>
        <h1 className="text-2xl text-white font-semibold">Bookmark Manager</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          title="Add Bookmark"
          className="w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
        >
          +
        </button>
        <button
          title="Export Bookmarks"
          className="w-9 h-9 border border-gray-600 hover:border-purple-500 text-white rounded-full"
        >
          ⬇
        </button>
        <img
          src="https://i.pravatar.cc/36"
          alt="Profile"
          className="w-9 h-9 rounded-full border border-gray-600"
        />
      </div>
    </header>
  );
}

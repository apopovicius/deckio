import { Bookmark } from "@/types/bookmark";

export default function BookmarkCard({
  title,
  url,
  description,
  category,
  createdAt,
}: Bookmark) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex gap-4">
      <div className="w-12 flex-shrink-0">
        <img
          src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
          alt="Favicon"
          className="w-10 h-10"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-semibold">{title}</h3>
        <a
          href={url}
          target="_blank"
          className="text-sm text-purple-400 underline"
        >
          {url}
        </a>
        <p className="text-sm text-gray-300 mt-2">{description}</p>
        <span className="inline-block bg-purple-700 text-white text-xs px-2 py-1 rounded-full mt-2">
          {category}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end w-36 text-sm text-gray-300">
        <div className="space-y-2 w-full">
          <button className="bg-gray-700 hover:bg-purple-600 px-3 py-1 rounded w-full">
            ✏️ Change
          </button>
          <button className="bg-gray-700 hover:bg-purple-600 px-3 py-1 rounded w-full">
            🗑️ Remove
          </button>
          <button className="bg-gray-700 hover:bg-purple-600 px-3 py-1 rounded w-full">
            🔗 Copy
          </button>
        </div>
        <div className="text-xs text-gray-400 pt-4 text-right">
          Created: {createdAt}
        </div>
      </div>
    </div>
  );
}

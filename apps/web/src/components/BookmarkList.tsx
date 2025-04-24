"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Bookmark } from "@/types/bookmark";
import BookmarkCard from "./BookmarkCard";

type Props = {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
};

export default function BookmarkList({ bookmarks, setBookmarks }: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sorted = [...bookmarks].sort((a, b) => b.score - a.score);
    const oldIndex = sorted.findIndex((b) => b.id === active.id);
    const newIndex = sorted.findIndex((b) => b.id === over.id);
    const reordered = arrayMove(sorted, oldIndex, newIndex);

    const before = reordered[newIndex - 1];
    const after = reordered[newIndex + 1];

    let newScore: number;
    if (!before && after) newScore = after.score + 1000;
    else if (before && !after) newScore = before.score - 1000;
    else if (before && after) newScore = (before.score + after.score) / 2;
    else newScore = Date.now();

    const dragged = bookmarks.find((b) => b.id === active.id);
    if (!dragged) return;

    const updated = bookmarks.map((b) =>
      b.id === dragged.id ? { ...b, score: newScore } : b
    );

    setBookmarks(updated);

    fetch(`http://localhost:3001/bookmarks/${dragged.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: newScore }),
    }).catch(console.error);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={[...bookmarks]
          .sort((a, b) => b.score - a.score)
          .map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        {[...bookmarks]
          .sort((a, b) => b.score - a.score)
          .map((bookmark) => (
            <SortableBookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableBookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: bookmark.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <BookmarkCard {...bookmark} />
    </div>
  );
}

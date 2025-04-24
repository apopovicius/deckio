"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ModalForm from "./ModalForm";
import BookmarkList from "./BookmarkList";
import { Bookmark } from "@/types/bookmark";

export default function BookmarkManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/bookmarks")
      .then((res) => res.json())
      .then(setBookmarks)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 font-sans min-h-screen">
      <Header onAdd={() => setIsModalOpen(true)} />
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col lg:flex-row gap-6">
        <Sidebar />
        <section className="flex-1 space-y-6">
          <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
        </section>
      </div>
      {isModalOpen && <ModalForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

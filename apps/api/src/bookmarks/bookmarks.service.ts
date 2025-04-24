import { Injectable } from '@nestjs/common';
import { Bookmark } from './entities/bookmark.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as bookmarksData from './data/bookmarks.json';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  private dataFilePath = path.join(__dirname, 'data', 'bookmarks.json');
  private bookmarks: Bookmark[] = (bookmarksData as Bookmark[]).sort(
    (a, b) => b.score - a.score,
  );

  findAll(): Bookmark[] {
    return this.bookmarks.sort((a, b) => b.score - a.score);
  }

  update(id: string, updateDto: UpdateBookmarkDto): Bookmark | undefined {
    const index = this.bookmarks.findIndex((b) => b.id === id);
    if (index === -1) return;

    this.bookmarks[index] = { ...this.bookmarks[index], ...updateDto };
    fs.writeFileSync(
      this.dataFilePath,
      JSON.stringify(this.bookmarks, null, 2),
    );
    return this.bookmarks[index];
  }

  create(dto: CreateBookmarkDto): Bookmark {
    const newBookmark: Bookmark = {
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      score: Date.now(),
      ...dto,
    };

    this.bookmarks.push(newBookmark);
    fs.writeFileSync(
      this.dataFilePath,
      JSON.stringify(this.bookmarks, null, 2),
    );
    return newBookmark;
  }

  findOne(id: string) {
    return `This action returns a #${id} bookmark`;
  }

  remove(id: string) {
    return `This action removes a #${id} bookmark`;
  }
}

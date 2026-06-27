import { injectable } from 'tsyringe';
import { open, type DB } from '@op-engineering/op-sqlite';
import { Note, NoteSortOption } from '../../domain/model/Note';

const DATABASE_NAME = 'app.db';

const CREATE_NOTE_TABLE = `
  CREATE TABLE IF NOT EXISTS Note (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt INTEGER NOT NULL
  );
`;

@injectable()
export class DatabaseClient {
  private db: DB;

  constructor() {
    this.db = open({ name: DATABASE_NAME });
    this.db.executeSync(CREATE_NOTE_TABLE);
  }

  queryNotes(query: string, sortOption: NoteSortOption): Note[] {
    const orderBy = this.getOrderBy(sortOption);

    if (query.trim().length === 0) {
      const result = this.db.executeSync(
        `SELECT * FROM Note ORDER BY ${orderBy}`,
      );
      return this.mapRows(result.rows ?? []);
    }

    const searchPattern = `%${query}%`;
    const result = this.db.executeSync(
      `SELECT * FROM Note WHERE title LIKE ? OR content LIKE ? ORDER BY ${orderBy}`,
      [searchPattern, searchPattern],
    );
    return this.mapRows(result.rows ?? []);
  }

  insert(title: string, content: string, createdAt: number): void {
    this.db.executeSync(
      'INSERT INTO Note (title, content, createdAt) VALUES (?, ?, ?)',
      [title, content, createdAt],
    );
  }

  update(id: number, title: string, content: string): void {
    this.db.executeSync(
      'UPDATE Note SET title = ?, content = ? WHERE id = ?',
      [title, content, id],
    );
  }

  deleteById(id: number): void {
    this.db.executeSync('DELETE FROM Note WHERE id = ?', [id]);
  }

  deleteAll(): void {
    this.db.executeSync('DELETE FROM Note');
  }

  private getOrderBy(sortOption: NoteSortOption): string {
    switch (sortOption) {
      case NoteSortOption.DATE_DESC: return 'createdAt DESC';
      case NoteSortOption.DATE_ASC: return 'createdAt ASC';
      case NoteSortOption.TITLE_ASC: return 'title ASC';
      case NoteSortOption.TITLE_DESC: return 'title DESC';
    }
  }

  private mapRows(rows: Record<string, unknown>[]): Note[] {
    return rows.map(row => ({
      id: row.id as number,
      title: row.title as string,
      content: row.content as string,
      createdAt: row.createdAt as number,
    }));
  }
}

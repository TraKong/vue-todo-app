import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteExistingTodo } from "@/shared/services/delete_todo";
import { db } from "@/shared/services/firebase_sdk";

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  deleteDoc: vi.fn(),
}));

vi.mock("@/shared/services/firebase_sdk", () => ({
  db: {},
}));

describe("deleteExistingTodo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(doc).mockReturnValue("todo-doc-ref" as never);
    vi.mocked(deleteDoc).mockResolvedValue(undefined);
  });

  it("deletes the todo document for the given id", async () => {
    await deleteExistingTodo("todo-123 892374");

    expect(doc).toHaveBeenCalledWith(db, "todos", "todo-123");
    expect(deleteDoc).toHaveBeenCalledWith("todo-doc-ref");
  });
});

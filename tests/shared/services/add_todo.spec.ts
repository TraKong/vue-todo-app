import { beforeEach, describe, expect, it, vi } from "vitest";
import { addDoc, collection } from "firebase/firestore";
import { addNewTodo } from "@/shared/services/add_todo";
import { db } from "@/shared/services/firebase_sdk";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
}));

vi.mock("@/shared/services/firebase_sdk", () => ({
  db: {},
}));

describe("addNewTodo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(collection).mockReturnValue("todos-collection" as never);
    vi.mocked(addDoc).mockResolvedValue({ id: "new-todo-id" } as never);
  });

  it("adds a document to the todos collection with the given title", async () => {
    await addNewTodo("Buy groceries tes");

    expect(collection).toHaveBeenCalledWith(db, "todos");
    expect(addDoc).toHaveBeenCalledWith("todos-collection", {
      title: "Buy groceries",
      isFav: false,
      isCompleted: false,
    });
  });

  it("defaults isFav and isCompleted to false", async () => {
    await addNewTodo("Walk the dog");

    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isFav: false,
        isCompleted: false,
      })
    );
  });
});

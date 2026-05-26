import { beforeEach, describe, expect, it, vi } from "vitest";
import { doc, updateDoc } from "firebase/firestore";
import {
  updateCompleted,
  updateFav,
  updateTitle,
} from "@/shared/services/update_todo";
import { db } from "@/shared/services/firebase_sdk";

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  updateDoc: vi.fn(),
}));

vi.mock("@/shared/services/firebase_sdk", () => ({
  db: {},
}));

describe("update_todo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(doc).mockReturnValue("todo-doc-ref" as never);
    vi.mocked(updateDoc).mockResolvedValue(undefined);
  });

  it("updateFav updates isFav on the todo document", async () => {
    await updateFav("todo-1", true);

    expect(doc).toHaveBeenCalledWith(db, "todos", "todo-1");
    expect(updateDoc).toHaveBeenCalledWith("todo-doc-ref", { isFav: true });
  });

  it("updateCompleted updates isCompleted on the todo document", async () => {
    await updateCompleted("todo-2", true);

    expect(doc).toHaveBeenCalledWith(db, "todos", "todo-2");
    expect(updateDoc).toHaveBeenCalledWith("todo-doc-ref", {
      isCompleted: true,
    });
  });

  it("updateTitle updates title on the todo document", async () => {
    await updateTitle("todo-3", "Updated title");

    expect(doc).toHaveBeenCalledWith(db, "todos", "todo-3");
    expect(updateDoc).toHaveBeenCalledWith("todo-doc-ref", {
      title: "Updated title",
    });
  });
});

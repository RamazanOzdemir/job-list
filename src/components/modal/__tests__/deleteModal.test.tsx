import { EVENT } from "@/constants";
import { DeleteModal } from "../deleteModal";
import { render, screen, act } from "@testing-library/react";

describe("Delete Modal tests", () => {
  test("except modal empty when delete event didn't fire", () => {
    render(<DeleteModal />);
    expect(screen.queryByText(/Are you sure want to delete it/i)).toBeNull();
  });

  test("except modal rendered when delete event fired", () => {
    const deleteEvent = new CustomEvent(EVENT.deleteJob, {
      detail: { id: "1" },
    });
    render(<DeleteModal />);

    act(() => {
      document.dispatchEvent(deleteEvent);
    });

    expect(
      screen.queryByText(/Are you sure want to delete it/i)
    ).not.toBeNull();
  });
});

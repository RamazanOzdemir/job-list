import { EVENT, IJob, IJobPriority } from "@/constants";
import { UpdateModal } from "../updateModal";
import { render, screen, act } from "@testing-library/react";
import { JobContext } from "@/contexts";

describe("Update Modal tests", () => {
  test("except modal empty when update event didn't fire", () => {
    render(<UpdateModal />);
    expect(screen.queryByText(/Job Edit/i)).toBeNull();
  });

  test("except modal rendered when update event fired", () => {
    const mockState = {
      priorities: [
        {
          id: "1",
          name: "Urgent",
        },
      ] as IJobPriority[],
      setPriorities: () => {},
    };
    const deleteEvent = new CustomEvent(EVENT.updateJob, {
      detail: { id: "1", name: "Test", priority: "1" } as IJob,
    });
    render(
      <JobContext.Provider value={mockState}>
        <UpdateModal />
      </JobContext.Provider>
    );

    act(() => {
      document.dispatchEvent(deleteEvent);
    });

    expect(screen.queryByText(/Job Edit/i)).not.toBeNull();
  });
});

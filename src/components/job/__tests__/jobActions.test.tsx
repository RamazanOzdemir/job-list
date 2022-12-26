import renderer from "react-test-renderer";
import { JobActions } from "../jobActions";
import { fireEvent, render, screen } from "@testing-library/react";
import { EVENT } from "@/constants";

describe("Job Action tests", () => {
  afterAll(() => {
    document.removeEventListener(EVENT.deleteJob, () => {});
    document.removeEventListener(EVENT.updateJob, () => {});
  });
  test("expect snapshot test", () => {
    const component = renderer.create(
      <JobActions jobId="1" jobName="test" jobPriority="1" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("expect delete fired action when delete button clicked", () => {
    const deleteFnc = jest.fn();
    document.addEventListener(EVENT.deleteJob, deleteFnc);

    render(<JobActions jobId="1" jobName="test" jobPriority="1" />);

    fireEvent.click(screen.getByLabelText("delete"));

    expect(deleteFnc).toBeCalledTimes(1);
  });

  test("expect update fired action when edit button clicked", () => {
    const updateFnc = jest.fn();
    document.addEventListener(EVENT.updateJob, updateFnc);

    render(<JobActions jobId="1" jobName="test" jobPriority="1" />);

    fireEvent.click(screen.getByLabelText("edit"));

    expect(updateFnc).toBeCalledTimes(1);
  });
});

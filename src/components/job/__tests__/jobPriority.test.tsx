import renderer from "react-test-renderer";
import { JobPriority } from "../jobPriority";
import { render } from "@testing-library/react";

describe("Job Priority tests", () => {
  test("expect snapshot test", () => {
    const component = renderer.create(<JobPriority priority="1" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("expect variant is error  when priority is 1", () => {
    const { container } = render(<JobPriority priority="1" />);
    expect(container.querySelector("[variant='error']")).not.toBeNull();
  });

  test("expect variant is warning when priority is 2", () => {
    const { container } = render(<JobPriority priority="2" />);
    expect(container.querySelector("[variant='warning']")).not.toBeNull();
  });

  test("expect variant is success when priority is 3", () => {
    const { container } = render(<JobPriority priority="3" />);
    expect(container.querySelector("[variant='success']")).not.toBeNull();
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ClaimValidators } from "./ClaimValidators";

const decoded = {
  header: {},
  payload: {},
  signature: "",
  raw: {
    header: "",
    payload: "",
    signature: "",
  },
};

describe("ClaimValidators accessible labels", () => {
  afterEach(cleanup);

  it("connects each visible label to its input", () => {
    render(<ClaimValidators decoded={decoded} />);

    expect(
      screen.getByLabelText("Expected iss")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Expected aud")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Clock leeway")
    ).toHaveAttribute("type", "number");
  });

  it("gives inputs unique ids across component instances", () => {
    render(
      <>
        <ClaimValidators decoded={decoded} />
        <ClaimValidators decoded={decoded} />
      </>
    );

    const inputs = [
      ...screen.getAllByLabelText("Expected iss"),
      ...screen.getAllByLabelText("Expected aud"),
      ...screen.getAllByLabelText("Clock leeway"),
    ];

    expect(inputs).toHaveLength(6);
    expect(inputs.every((input) => input.id !== "")).toBe(true);
    expect(new Set(inputs.map((input) => input.id)).size).toBe(6);
  });
});
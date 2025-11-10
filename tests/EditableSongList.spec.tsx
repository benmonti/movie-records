import { fireEvent } from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";
import { render, screen } from "@testing-library/react";

describe("EditableSongList", () => {
    it("calls setSongs when Add Song is clicked", () => {
        const setSongs = jest.fn();
        render(<EditableSongList songs={["A"]} setSongs={setSongs} />);
        const addButton = screen.getByRole("button", { name: /add song/i });
        fireEvent.click(addButton);

        expect(setSongs).toHaveBeenCalledWith(["A", ""]);
    });

    it("calls setSongs with the new edited song", () => {
        const setSongs = jest.fn();
        render(<EditableSongList songs={["A"]} setSongs={setSongs} />);
        const input = screen.getByDisplayValue("A");
        fireEvent.change(input, { target: { value: "New Song" } });

        expect(setSongs).toHaveBeenCalledWith(["New Song"]);
    });

    it("calls setSongs without the deleted song", () => {
        const setSongs = jest.fn();
        render(<EditableSongList songs={["A"]} setSongs={setSongs} />);

        const deleteButton = screen.getByRole("button", { name: /❌/i });
        fireEvent.click(deleteButton);

        expect(setSongs).toHaveBeenCalledWith([]);
    });
});

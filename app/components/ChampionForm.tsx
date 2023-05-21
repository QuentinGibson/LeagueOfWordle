import { Champion } from "@prisma/client";
import { Form } from "@remix-run/react";

export default function ChampionForm({ champion }: { champion: any }) {

  return (
    <div>
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input type="text" name="avatar" id="avatat" />
        </div>
        <div>
          <label htmlFor="health">Health</label>
          <input type="text" name="health" id="health" />
        </div>
        <div>
          <label htmlFor="healthRate">Health Rate</label>
          <input type="text" name="healthrate" id="healthrate" />
        </div>
        <div>
          <label htmlFor="attack">Attack</label>
          <input type="text" name="attack" id="attack" />
        </div>
        <div>
          <label htmlFor="attackRate">Attack Rate</label>
          <input type="text" name="attackRate" id="attackRate" />
        </div>
        <div>
          <label htmlFor="attackSpeed">Attack Speed</label>
          <input type="text" name="attackSpeed" id="attackSpeed" />
        </div>
        <div>
          <label htmlFor="movementSpeed">Movement Speed</label>
          <input type="text" name="movementSpeed" id="movementSpeed" />
        </div>
        <div className="flex">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  );
};
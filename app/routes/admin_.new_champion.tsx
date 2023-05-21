import { Form } from "@remix-run/react";

export default function NewChampionRoute() {
  return (
    <main>
      <h1>New Champion Form</h1>
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input type="text" name="avatar" id="avatar" />
        </div>
        <div>
          <label htmlFor="health">Health</label>
          <input type="text" name="health" id="health" />
        </div>
        <div>
          <label htmlFor="healthRate">Health Rate</label>
          <input type="text" name="healthRate" id="healthRate" />
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
          <label htmlFor="moveSpeed">Move Speed</label>
          <input type="text" name="moveSpeed" id="moveSpeed" />
        </div>
        <div className="flex">
          <button className="px-4 py-2 bg-blue-400" type="submit">Submit</button>
        </div>
      </Form>
    </main>
  );
};
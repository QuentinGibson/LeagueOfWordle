import { Form } from "@remix-run/react";

export default function NewRole() {
  return (
    <main className="px-4 py-8">
      <h1 className="font-bold text-5xl mb-8">New Role</h1>
      <Form method="POST" className="flex flex-col gap-4" action="/api/newRole" >
        <div className="flex gap-2">
          <label className="font-bold" htmlFor="name">Name</label>
          <input required className="border border-slate-800 rounded-lg text-black px-2" type="text" name="name" id="name" />
        </div>
        <div className="flex">
          <button className="px-4 py-2 bg-blue-400 rounded-lg" type="submit">Submit</button>
        </div>
      </Form>
    </main>
  );
};
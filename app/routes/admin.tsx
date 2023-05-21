import { Link } from "@remix-run/react";

export default function Admin() {
  return (
    <main>
      <h1>Admin</h1>
      <ul>
        <li>
          <Link to="/admin/new_champion">New Champion</Link>
        </li>
        <li>
          <Link to="/admin/champions">List Champions</Link>
        </li>
        <li>
          <Link to="/admin/new_champion">New Role</Link>
        </li>
        <li>
          <Link to="/admin/roles">List Roles</Link>
        </li>
      </ul>
    </main>
  );
};
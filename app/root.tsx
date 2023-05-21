import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getSession, getUser, sessionStorage } from "~/session.server";
import stylesheet from "~/tailwind.css";
import themeStylesheet from "~/theme.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: themeStylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  const session = await getSession(request);
  const message = session.get("globalMessage")
  return json({ user: await getUser(request), message },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
};

export default function App() {
  const { message } = useLoaderData<typeof loader>()
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-indigo-950 text-white">
        {message ? (
          <div className="absolute px-4 py-2 font-bold bg-indigo-800 border border-blue-950 flex justify-center"><p>{message}</p></div>
        ) : null}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

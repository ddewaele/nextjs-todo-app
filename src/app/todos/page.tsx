import Link from "next/link";

export default function Todos() {
  return (

    <div>
      <h1>Todos</h1>
      <ul>
      <li><Link  href="/todos/1">Link to Todo 1</Link></li>
      <li><Link  href="/todos/2">Link to Todo 2</Link></li>
      </ul>
      <p>
      <Link  href="/">Back</Link>
      </p>
    </div>
  );
}

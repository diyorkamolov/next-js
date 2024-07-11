import Link from "next/link";

export async function getStaticProps() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    return { props: { posts } };
  } catch (e) {
    throw e;
    console.log(e);
  }
}

export default function PostsPage({ posts }) {
  return (
    <>
      <header style={{ background: "#fff", color: "#000", display: "flex", justifyContent: "center", }}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href={"/courses"}>Courses</Link>
      </header>
      {posts.map((i) => (
        <ul key={i.id} style={{textDecoration: 'none'}}>
          <Link href={`/posts/${i.id}`}>
            <li>{i.title}</li>
          </Link>
        </ul>
      ))}
    </>
  );
}

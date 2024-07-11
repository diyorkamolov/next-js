import { useRouter } from "next/router";
import Link from "next/link";

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: `${post.id}` },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();
  return {
    props: { post },
  };
}

export default function Post({ post }) {
  const router = useRouter();

  // If the data is not yet loaded
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header style={{ background: "#fff", color: "#000", display: "flex", justifyContent: "center" }}>
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/courses">Courses</Link>
      </header>
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </>
  );
}

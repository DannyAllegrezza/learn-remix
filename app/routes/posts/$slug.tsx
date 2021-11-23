import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost, Post } from "~/post";
import invariant from "tiny-invariant";

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");

  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<Post>();

  return (
    <div>
      <h1>{post.title}</h1>
      <code>{post.body}</code>
    </div>
  );
}

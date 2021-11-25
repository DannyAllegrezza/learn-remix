import type { ActionFunction, LoaderFunction } from "remix";
import { Form, redirect, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import type { NewPost } from "~/post";
import { createPost, getPost } from "~/post";

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  let title = formData.get("title");
  let slug = formData.get("slug");
  let markdown = formData.get("markdown");

  let errors: Record<string, boolean> = {};

  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");

  await createPost({ title, slug, markdown });

  console.log("redirecting to /admin");
  return redirect("/admin");
};

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");

  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData<NewPost>();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title:
          <input type="text" name="title" defaultValue={post.title} />
        </label>
      </p>
      <p>
        <label>
          Post Slug:
          <input type="text" name="slug" defaultValue={post.slug} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label> <br />
        <textarea rows={20} name="markdown" defaultValue={post.markdown} />
      </p>
      <p>
        <button type="submit">
          Update Post
          {/* {transition.submission ? "Creating..." : "Create Post"} */}
        </button>
      </p>
    </Form>
  );
}

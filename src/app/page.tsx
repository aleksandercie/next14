export const dynamic = 'force-dynamic';

import { getPosts, Post } from '@/utils';

export default async function Home() {
  const posts = await getPosts();
  const filtredPosts = posts.filter((post: Post) => post.published);

  return (
    <div className="">
      <main className="text-xl">
        <div className="flex flex-col gap-8">
          <h1>Homepage</h1>
          <ul className="flex flex-col gap-2">
            {filtredPosts.length > 0 ? (
              filtredPosts.map((post: Post) => (
                <li key={post.id}>
                  <div className="flex flex-col mr-8 w-72">
                    <p>title: {post.title}</p>
                    <p className="text-gray-500">
                      description: {post.description}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p>No posts published</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

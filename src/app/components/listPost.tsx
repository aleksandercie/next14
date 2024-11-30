import { getPosts, Post } from '@/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ActionsButtons } from './actionsButtons';
import { ScrollArea } from '@/components/ui/scroll-area';

export async function ListPost() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const posts = await getPosts();

  return (
    <ScrollArea className="h-[400px] rounded-md border p-2">
      <ul className="flex flex-col gap-4 ">
        {posts
          .filter((post: Post) => post.kindeAuthId === user.id)
          .map((post: Post) => (
            <li
              key={post.id}
              className="flex gap-8 items-center border-b-2 p-4 justify-between"
            >
              <div className="flex flex-col mr-8 w-72">
                <p>title: {post.title}</p>
                <p className="text-gray-500">description: {post.description}</p>
              </div>
              <ActionsButtons post={post} />
            </li>
          ))}
      </ul>
    </ScrollArea>
  );
}

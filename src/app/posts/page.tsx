export const dynamic = 'force-dynamic';

import { FormCreatePost } from '../components/formCreatePost';
import { ListPost } from '../components/listPost';

export default function Posts() {
  return (
    <div className="">
      <main className="text-xl">
        <div className="flex flex-col gap-8">
          <h1>Your posts</h1>
          <FormCreatePost />
          <ListPost />
        </div>
      </main>
    </div>
  );
}

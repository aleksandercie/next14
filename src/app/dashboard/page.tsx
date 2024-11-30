export const dynamic = 'force-dynamic';

import { ListPost } from '../components/listPost';
import { Payment } from '../components/payment';

export default async function Dashboard() {
  return (
    <div className="">
      <main className="text-xl">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center">
            <h1>Dashboard</h1>
          </div>
          <ListPost />
          <Payment />
        </div>
      </main>
    </div>
  );
}

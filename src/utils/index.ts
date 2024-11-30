export type Post = {
  id: string;
  title: string;
  description: string;
  kindeAuthId: string;
  published: boolean;
  createdAt: string;
};

export async function getPosts(): Promise<Post[] | []> {
  const res = await fetch(`${process.env.BASE_URL}/api/posts`);
  if (!res.ok) {
    console.log(res);
    return [];
  }
  return res.json();
}

export const convertToSubcurrency = (amount: number) => {
  return Math.round(amount * 100);
};

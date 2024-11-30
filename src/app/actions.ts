'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Invalid title'
    })
    .min(1)
    .max(100, 'Title must be at most 100 characters long'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Invalid description'
    })
    .min(1)
    .max(400, 'Description must be at most 400 characters long'),
  published: z.boolean()
});

export const createPost = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const title = formData.get('title');
    const description = formData.get('description');
    const published = formData.get('published') === 'on';

    const validatedFields = schema.safeParse({
      title,
      description,
      published
    });

    if (!validatedFields.success) {
      const error = validatedFields.error.flatten().fieldErrors;

      return {
        status: 400,
        error: `${Object.keys(error)[0]}: ${Object.values(error)[0]}`
      };
    }

    const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        published,
        kindeAuthId: user.id
      })
    });
    if (!res.ok) {
      return { error: 'Error creating post', status: res.status };
    }
    revalidatePath('/');
    return res.json();
  } else {
    return { error: 'Unauthorized user', status: 401 };
  }
};

export const publishPost = async (id: string, published: boolean) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        published
      })
    });
    if (!res.ok) {
      return { error: 'Error publishing post', status: res.status };
    }
    revalidatePath('/');
    return res.json();
  } else {
    return { error: 'Unauthorized user', status: 401 };
  }
};

export const deletePost = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    });
    if (!res.ok) {
      return { error: 'Error deleting post', status: res.status };
    }
    revalidatePath('/');
    return res.json();
  } else {
    return { error: 'Unauthorized user', status: 401 };
  }
};

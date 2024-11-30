'use client';

import { Button } from '@/components/ui/button';
import { createPost } from '../actions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

export function FormCreatePost({ isModalForm }: { isModalForm?: boolean }) {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    try {
      const result = await createPost(formData);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: result.error,
          duration: 1000
        });
      } else {
        toast({
          title: 'Post created successfully!',
          duration: 1000
        });

        if (formRef.current) {
          formRef.current.reset();
        }

        if (isModalForm) {
          setTimeout(() => {
            router.back();
          }, 500);
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Failed to create the post. Please try again later.',
        duration: 1000
      });
    }
  };

  return (
    <form action={handleAction} className="flex flex-col gap-4" ref={formRef}>
      <Input
        type="text"
        name="title"
        className="text-black"
        placeholder="title"
        required
      />
      <Textarea
        name="description"
        className="text-black"
        placeholder="description"
        required
      />
      <div className="flex items-center space-x-2">
        <Checkbox id="published" name="published" />
        <Label htmlFor="published">Published post</Label>
      </div>
      <Button type="submit">Create post</Button>
    </form>
  );
}

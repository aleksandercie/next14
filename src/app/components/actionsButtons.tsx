'use client';

import { Post } from '@/utils';
import { deletePost, publishPost } from '../actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function ActionsButtons({ post }: { post: Post }) {
  const { toast } = useToast();
  const { published, id, title } = post;

  const handlePublish = async () => {
    try {
      const result = await publishPost(id, !published);
      if (result.error) {
        console.error('Failed to update post:', result.error);
        toast({
          variant: 'destructive',
          title: !published
            ? `Post ${title} published unsuccessfully!`
            : `Post ${title} unpublished unsuccessfully!`,
          duration: 1000
        });
      } else {
        toast({
          title: !published
            ? `Post ${title} published successfully!`
            : `Post ${title} unpublished successfully!`,
          duration: 1000
        });
      }
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deletePost(id);
      if (result.error) {
        console.error('Failed to delete post:', result.error);
        toast({
          variant: 'destructive',
          title: `Post ${title} deleted unsuccessfully!`,
          duration: 1000
        });
      } else {
        toast({
          title: `Post ${title} deleted successfully!`,
          duration: 1000
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="flex gap-2 w-[182px] justify-end">
      <Button onClick={handlePublish} className="w-[100px]">
        {published ? 'Unpublish' : 'Publish'}
      </Button>
      <Button onClick={handleDelete} variant="destructive">
        Delete
      </Button>
    </div>
  );
}

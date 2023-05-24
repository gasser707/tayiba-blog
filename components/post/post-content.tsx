import { getDictionary } from "@/lib/getDictionary";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { Post } from "@/types/collection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
  locale: string;
}
const PostContent = async ({
  post,
  isPostPage = false,
  locale,
}: PostContentProps) => {
  const dictionary = await getDictionary(locale);
  const categoryLinks = post.categories.map((c) => {
    return (
      <span key={c.slug} className={`font-medium ${"text-emerald-600"} px-1`}>
        <Link href={`/${locale}/${c.slug}/`} className="cursor-pointer hover:underline">
          {c.title}
        </Link>
      </span>
    );
  });
  return (
    <div className="space-y-2">
      {/* Tags */}
      {categoryLinks}

      <div
        className={`flex items-center flex-wrap gap-2  text-neutral-400 ${
          isPostPage ? "text-sm" : "text-xs @md:text-sm"
        }`}
      >
        <div>{getReadingTime(post.body, locale)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getRelativeDate(post.date_created, locale)}</div>
      </div>
      {/* Title */}
      <h2
        className={`${
          isPostPage
            ? "text-2xl md:text-3xl lg:text-4xl font-bold"
            : "@lg:text-3xl text-xl @md:text-2xl font-medium"
        } `}
      >
        {post.title}
      </h2>
      {/* Description */}
      <p className="text-base @lg:text-lg leading-snug text-neutral-600">
        {post.description}
      </p>
      {/* Read More */}
      {!isPostPage && (
        <div className="flex items-center gap-2 pt-3">
          <Link href={`/${locale}/post/${post.slug}`} className="cursor-pointer hover:underline">
            {dictionary.buttons.readMore}
          </Link>
          <ArrowRight size="14" />
        </div>
      )}
    </div>
  );
};

export default PostContent;

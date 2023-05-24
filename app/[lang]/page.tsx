import CTACard from "@/components/elements/cta-card";
import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const locale = params.lang;

  const getAllPosts = async () => {
    try {
      const query = await directus.query(
        `
        {
          post(
            filter: { translations: { languages_code: { code: { _eq: "${locale}" } } } }
          ) {
            image{
              id
            }
            translations(filter: { languages_code: { code: { _eq: "${locale}" } } }) {
              title
              description
              body
              slug
              date_updated
            }
            categories{
              category_id{
                translations(filter: { languages_code: { code: { _eq: "${locale}" } } }){
                  title
                  slug
                }
              }
            }
          }
        }
        
        `
      );
        return query.post.map((p)=> {
          return {
            title: p.translations[0].title,
            description: p.translations[0].description,
            body: p.translations[0].body,
            slug:  p.translations[0].slug,
            image: p.image.id,
            date_created: p.translations[0].date_updated,
            categories: p.categories.map((c)=> {
              return {
              title: c.category_id.translations[0].title,
              slug:  c.category_id.translations[0].slug
              }
            })
          }
        })
      } catch (error) {
      console.log(error);
      // throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  if (posts.length === 0 ) {
    notFound();
  }

  /* Get Dictionary */
  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      <main className="space-y-10">
        <PostCard locale={locale} post={posts[0]} />
        <PostList
          locale={locale}
          posts={posts.filter((_post, index) => index > 0)}
        />
        {/* ---@ts-expect-error Async Server Component */}
        {/* <CTACard dictionary={dictionary} /> */}
        {/* <PostCard locale={locale} reverse post={posts[1]} />
        <PostList
          locale={locale}
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        /> */}
      </main>
    </PaddingContainer>
  );
}

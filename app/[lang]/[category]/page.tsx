import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-lists";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { cache } from "react";

// Get Category Data
export const getCategoryData = cache(
  async (categorySlug: string, locale: string) => {
    try {
      const query = await directus.query(
        `
        {
          category(
            filter: {
              translations: { 
                languages_code: { code: { _eq: "${locale}" } }
                slug:{_eq:"${categorySlug}"}
              }             
            }
          ) {
            translations(filter: { languages_code: { code: { _eq: "${locale}" } } }) {
              title
              description
            }
            posts{
              post_id{
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

                image{
                  id
                }
              }
            }
          }
        }
        
        `
      );
      const resultArray = [];

      query.category.forEach((category) => {
        const categoryObject = {
          title: category.translations[0].title,
          description: category.translations[0].description,
          posts: category.posts.map((post) => {
            const postId = post.post_id.translations[0];
            const categories = post.post_id.categories.map((c)=> {
              return {
              title: c.category_id.translations[0].title,
              slug:  c.category_id.translations[0].slug
              }
            })
            return {
              ...postId,
              categories,
              image: post.post_id.image.id,
            };
          }),
        };
        resultArray.push(categoryObject);
      });

      return resultArray[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching category");
    }
  }
);

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // Get Data from Directus
  const categoryData = await getCategoryData(category, lang);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      /* images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ], */
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
      },
    },
  };
};

// Generate Static Params Function
export const generateStaticParams = async () => {
  /* return DUMMY_POSTS.map((post) => {
    return {
      slug: post.slug,
    };
  }); */
  try {
    const query = await directus.query(
      `
      {
        category {
          translations{
            languages_code{
              name
            }
            slug
          }
        }
      }
      
      `
    );

    const resultArray = [];

    query.category.forEach((c) => {
      c.translations.forEach((translation) => {
        const lang = translation.languages_code.name;
        const slug = translation.slug || "404";
        resultArray.push({ lang, slug });
      });
    });

    // Concat Localised and Regular Params
    const allParams = resultArray;

    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // This is for DUMMY
  /* const category = DUMMY_CATEGORIES.find(
    (category) => category.slug === params.category
  );
  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLocaleLowerCase() === params.category
  ); */

  const locale = params.lang;
  const categorySlug = params.category;

  const category = await getCategoryData(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList locale={locale} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};

export default Page;

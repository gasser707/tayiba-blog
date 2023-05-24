import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import SocialLink from "../elements/social-link";
import PaddingContainer from "../layout/padding-container";

const Footer = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);
  return (
    <div className="py-8 mt-10 border-t">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="mt-2 text-lg text-neutral-700 font-semibold">
            {dictionary.footer.description}
          </p>
          <p>
            {dictionary.footer.body}
          </p>
        </div>
        {/* Social and Currently At */}
        <div className="flex flex-wrap justify-between gap-4 mt-6">
          <div>
            <div className="flex items-center gap-3 mt-2 text-neutral-600">
              <SocialLink
                platform="twitter"
                link={siteConfig.socialLinks.twitter}
              />
              <SocialLink
                platform="instagram"
                link={siteConfig.socialLinks.instagram}
              />
              <SocialLink
                platform="youtube"
                link={siteConfig.socialLinks.youtube}
              />
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 mt-16 border-t">
          <div className="text-sm text-neutral-400">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            {dictionary.footer.creatorText}
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Footer;

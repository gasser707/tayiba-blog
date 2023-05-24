export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "EastLens",
  description:
    "A Clear View on Middle Eastern Realities!",
  currentlyAt: "Budapest",
  socialLinks: {
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
    instagram: "https://instagram.com",
  },
};

export default siteConfig;

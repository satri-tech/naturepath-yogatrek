export type SitePageType = {
  id?: string;
  title: string;
  slug: string;
  sections: Section[];
  image: string;
};

type Section = {
  id?: string;
  title: string;
  description: string;
};

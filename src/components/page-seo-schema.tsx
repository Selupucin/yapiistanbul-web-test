type SchemaCrumb = {
  name: string;
  path: string;
};

type PageSeoSchemaProps = {
  title: string;
  description: string;
  path: string;
  breadcrumbs: SchemaCrumb[];
};

export function PageSeoSchema({ title, description, path, breadcrumbs }: PageSeoSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yapiistanbul.com";
  const pageUrl = `${baseUrl}${path}`;

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      url: baseUrl,
      name: "Yapi Istanbul",
      publisher: {
        "@id": `${baseUrl}#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}#organization`,
      name: "Yapi Istanbul",
      url: baseUrl,
      logo: `${baseUrl}/favicon.ico`,
      email: "info@yapiistanbul.com",
      telephone: "+90 212 000 00 00",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: {
        "@id": `${baseUrl}#website`,
      },
      about: {
        "@id": `${baseUrl}#organization`,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${item.path}`,
      })),
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

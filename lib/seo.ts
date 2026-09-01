import type { Metadata } from "next";
import { BRAND, SEO } from "@/constants/brand";

type BuildMetadataArgs = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  /** Set true to skip the "| Brand" title template (e.g. the homepage). */
  absolute?: boolean;
};

/**
 * Builds a complete, consistent Metadata object for a given page.
 * Title template is provided by the root layout ("%s | Institute of AI"),
 * so page titles here are short, keyword-rich strings.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = SEO.keywords,
  type = "website",
  absolute = false,
}: BuildMetadataArgs): Metadata {
  const url = `${BRAND.url}${path === "/" ? "" : path}`;
  const imageUrl = new URL(SEO.ogImage, BRAND.url).toString();

  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      url,
      siteName: BRAND.name,
      locale: "en_US",
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SEO.twitterSite,
      title,
      description,
      images: [imageUrl],
    },
  };
}

/** ItemList schema for the catalog of programs. */
export function programListSchema(
  programs: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    level: string;
    price: number;
    learningOutcomes: string[];
  }>
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Programs and Bootcamps",
    itemListElement: programs.map((program, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: program.title,
        description: program.description,
        url: `${BRAND.url}/programs/${program.id}`,
        provider: {
          "@type": "CollegeOrUniversity",
          name: BRAND.name,
          url: BRAND.url,
        },
        educationalLevel: program.level,
        timeRequired: program.duration,
        offers: {
          "@type": "Offer",
          price: program.price,
          priceCurrency: "INR",
          category: "Paid",
        },
        teaches: program.learningOutcomes,
      },
    })),
  };
}

export type JsonLdObject = Record<string, unknown>;

/** EducationalOrganization (CollegeOrUniversity) schema, linked to every page. */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${BRAND.url}/#organization`,
    name: BRAND.name,
    url: BRAND.url,
    logo: `${BRAND.url}/logo/logo.png`,
    email: BRAND.email,
    telephone: BRAND.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address,
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: Object.values(BRAND.socialLinks),
    makesOffer: [
      {
        "@type": "Offer",
        category: "AI courses and programs",
        url: `${BRAND.url}/courses`,
      },
      {
        "@type": "Offer",
        category: "Corporate training",
        url: `${BRAND.url}/corporate-training`,
      },
    ],
  };
}

/** WebSite schema with SearchAction, linked to the Organization @id. */
export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BRAND.url}/#website`,
    url: BRAND.url,
    name: BRAND.name,
    description: SEO.description,
    publisher: { "@id": `${BRAND.url}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BRAND.url}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** FAQPage schema built from the site's FAQ data. */
export function faqSchema(
  faqs: { question: string; answer: string }[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** ItemList schema for the catalog of courses. */
export function courseListSchema(
  courses: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
    level: string;
    rating: number;
    students: number;
    instructor: string;
  }>
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Courses",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.description,
        url: `${BRAND.url}/courses/${course.id}`,
        provider: {
          "@type": "CollegeOrUniversity",
          name: BRAND.name,
          url: BRAND.url,
        },
        timeRequired: course.duration,
        inLanguage: "en",
        offers: {
          "@type": "Offer",
          price: course.price,
          priceCurrency: "INR",
          category: "Paid",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
          courseWorkload: course.duration,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: course.rating,
          ratingCount: course.students,
          bestRating: 5,
        },
      },
    })),
  };
}

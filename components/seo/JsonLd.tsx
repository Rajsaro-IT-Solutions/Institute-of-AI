import type { JsonLdObject } from "@/lib/seo";

/**
 * Renders a JSON-LD structured data block in the server-rendered HTML.
 * Place inside the layout/segments where the schema should appear.
 */
export default function JsonLd({ data }: Readonly<{ data: JsonLdObject }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

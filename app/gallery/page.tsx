import type { Metadata } from "next";
import SectionTitle from "../components/SectionTitle";
import GalleryGrid from "../components/GalleryGrid";
import { getGallery, galleryCategories } from "../lib/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Hall of fame, awards and memories.",
};

export default function GalleryPage() {
  const items = getGallery();
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <SectionTitle kicker="Gallery" as="h1">
        Hall of fame &amp; memories
      </SectionTitle>
      <p className="-mt-6 mb-10 max-w-2xl text-lg leading-relaxed">
        Moments from awards, stages, classrooms and communities I&apos;m proud to be part of.
      </p>
      {items.length === 0 ? (
        <p className="border-2 border-dashed border-foreground p-10 text-center text-muted">
          Photos coming soon.
        </p>
      ) : (
        <GalleryGrid items={items} categories={[...galleryCategories]} />
      )}
    </main>
  );
}

export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || "2024-10-03";

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY_STUDIO_DATASET"
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
);

export const token = assertValue(
  process.env.SANITY_STUDIO_BLOG_TOKEN,
  "Missing environment variable: SANITY_STUDIO_BLOG_TOKEN"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

//# Linking up Sanity to the site
export const client = sanityClient({
    projectId: 'l1bir64f',
    dataset: 'production',
    apiVersion: '2022-09-03',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

//# to generate imaged from sanity db
const builder = ImageUrlBuilder(client);

//# to fetch the generated image for the given source
export const urlFor = (source) => builder.image(source);
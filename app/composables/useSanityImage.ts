// composables/useSanityImage.ts
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',
})

export const useSanityImage = (source: any) => {
    return builder.image(source)
}
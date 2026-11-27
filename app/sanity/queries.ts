import { defineQuery } from "groq";

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0] {
  title,
  description,
  favIcon { asset-> { url } },
  ogImage { asset-> { url } }
}`);

export const homepageQuery = `*[_type == "homepage"][0]{
  subtitle,
  bioSubheading,
  paragraph,
  bioIllustration{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  seedPackets[]{
    title,
    image{
      ...,
      asset->{
        _id,
        url,
        metadata{ dimensions, lqip }
      }
    },
    caption
  },
  seedText,
 gallery[]{
      image{
        ...,
        asset->{
          _id,
          _type,
          url,
          metadata{ dimensions, lqip }
        }
      }
    },
  testimonials[]{
    test,
    testName
  }
}`


export const aboutQuery = `*[_type == "about"][0]{
  title,
  biographyText,

  bioImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  firstPara,
  firstGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
secondPara,
  secondGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  thirdPara,
  thirdGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
fourthPara,
  fourthGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  }
}`

export const servicesQuery = `*[_type == "services"][0]{
  title,
  servicesText,
    servicesImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  services[]{
    title,
    description,
    colour,
    illustration{
      ...,
      asset->{
        _id,
        _type,
        url,
        metadata{ dimensions, lqip }
      }
    },
    beforeImage{
      ...,
      asset->{
        _id,
        _type,
        url,
        metadata{ dimensions, lqip }
      }
    },
    afterImage{
      ...,
      asset->{
        _id,
        _type,
        url,
        metadata{ dimensions, lqip }
      }
    },
  }
}`

export const faqsQuery = `*[_type == "faqs"][0]{
  title,
  faqsIllustration{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  qanda[]{
    question,
    illustration{
      ...,
      asset->{
        _id,
        _type,
        url,
        metadata{ dimensions, lqip }
      }
    },
    answer[]{
    answer,
    tick
  }
  }
}`

export const galleryQuery = `*[_type == "gallery"][0]{
  images[]{
    image{
      ...,
      asset->{
        _id,
        _type,
        url,
        metadata{ dimensions, lqip }
      }
    },
    title,
    caption
  }
}`

export const contactQuery = `*[_type == "contact"][0]{
title,
contactText,
}`
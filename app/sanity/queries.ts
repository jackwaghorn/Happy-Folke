import { defineQuery } from "groq";

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0] {
  title,
  description,
  favIcon { asset-> { url } },
  ogImage { asset-> { url } }
}`);

export const homepageQuery = `*[_type == "homepage"][0]{
  subtitle,
  bioIntro,
  bioLeftImageOne{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
    bioLeftIllustration{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
      bioRightIllustration{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  bioLeftImageTwo{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  paraLeft,
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
  gardenerTitle,
  leftIllustration{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  questions[]{
    theQuestion
  },
  questionBottomCaption,
  rightIllustration{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },
  bottomText,
  testTitle,
  testText,
  testimonials[]{
    test,
    testName
  },
  "gallery": *[_type == "gallery"][0]{
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

  secondGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },

  secondPara,

  thirdGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },

  fourthGardenImage{
    ...,
    asset->{
      _id,
      url,
      metadata{ dimensions, lqip }
    }
  },

  thirdPara,

  fithGardenImage{
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

  services[]{
    title,
    description,

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
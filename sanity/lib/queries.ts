export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    publishedAt,
    coverImage
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    category,
    readTime,
    publishedAt,
    coverImage,
    body
  }
`;

export const workshopsQuery = `
  *[_type == "workshop"] | order(startDate asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    body,
    category,
    coverImage,
    startDate,
    duration,
    sessions,
    price,
    capacity,
    remainingSeats,
    featured
  }
`;

export const featuredWorkshopsQuery = `
  *[_type == "workshop" && featured == true] | order(startDate asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    coverImage,
    startDate,
    duration,
    sessions,
    price,
    capacity,
    remainingSeats,
    featured
  }
`;

export const workshopBySlugQuery = `
  *[_type == "workshop" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    body,
    category,
    coverImage,
    startDate,
    duration,
    sessions,
    price,
    capacity,
    remainingSeats,
    featured
  }
`;

export const workshopsBySlugsQuery = `
  *[_type == "workshop" && slug.current in $slugs] | order(startDate asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    startDate,
    duration,
    sessions,
    price,
    capacity,
    remainingSeats,
    coverImage
  }
`;
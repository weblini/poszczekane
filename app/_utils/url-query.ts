
export function getTagParams(tags: string[]) {
  const searchParams = new URLSearchParams();

  tags.forEach(tag => {
    searchParams.append("tag", tag);
  })
  
  return searchParams
}

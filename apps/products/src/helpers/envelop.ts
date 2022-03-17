export const envelope = (objectData: any) => {
  if (Array.isArray(objectData)) {
    return { data: objectData }
  }
  return { data: { ...objectData } }
}

function extractFirstClassesAndIds(savedElementsObject: any) {
  // Parse the JSON string to an array of objects
  const elements = JSON.parse(savedElementsObject.savedElements)
  // Return the first element's classes and id
  if (elements.length > 0) {
    return {
      classes: elements[0].classes,
      id: elements[0].id
    }
  }
  return null
}

export { extractFirstClassesAndIds }

const generateSlug = (name: string) => name.toLowerCase().replace(/\s/g, '-')

export default generateSlug

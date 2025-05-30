export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special chars with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -
}

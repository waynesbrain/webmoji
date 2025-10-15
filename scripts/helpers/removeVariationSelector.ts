/** Removes variation selectors from emoji strings. */
export function removeVariationSelector(value: string): string {
  return value.replace("\u{FE0E}", "").replace("\u{FE0F}", "");
}

/**
 * The function `getPagingPropertyFromURLQueryString` extracts and validates paging properties from a
 * URL query string.
 * @param {Key} key - The `key` parameter specifies the property we want to extract from the URL query
 * string. It can be either 'limit' or 'offset'.
 * @param {string} [value] - The `value` parameter in the `getPagingPropertyFromURLQueryString`
 * function represents the value associated with the specified key in the URL query string. It is a
 * string that should ideally represent a numeric value for the 'limit' and 'offset' keys.
 * @returns the parsed integer value of the input string if it is a valid number and greater than or
 * equal to the minimum value allowed for the specified key ('limit' or 'offset'). If the input value
 * is not a valid number or less than the minimum value, it will return the fallback value for that
 * key.
 */
export function getPagingPropertyFromURLQueryString<Key extends 'limit' | 'offset'>(key: Key, value?: string) {
  const fallback = key === 'limit' ? 25 : 0;
  const min = key === 'limit' ? 1 : 0;

  if (value === undefined || value === '' || isNaN(+value)) {
    return fallback;
  }

  const int = ~~+value;

  if (int < min) {
    return min;
  }

  return int;
}
/**
 * Define a dynamic URL schema
 *
 * @param {string} urlSchema
 * @returns {Function}
 */
const URLParser = (urlSchema) => {
  const result = urlSchema
    .split("/")
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith(":")) {
        return chunk.slice(1);
      }

      return null;
    });

  const convertToNumber = (datum) => (!isNaN(datum) && !isNaN(parseFloat(datum)) ? Number(datum) : datum);

  /**
   * URL parser based on path schema
   * @param {string} url
   */
  return (url) => {
    const [path, query] = url.split("?");
    const parts = path.split("/").filter(Boolean);

    if (parts.length !== result.length) {
      return Error("Path incompatible with defined URL schema");
    }

    const pathParts = parts.reduce((acum, value, index) => {
      if (!result[index]) return acum;

      return { ...acum, [result[index]]: convertToNumber(value) };
    }, {});

    const queryParts =
      query &&
      query
        .split("&")
        .filter(Boolean)
        .reduce((acum, curr) => {
          const [key, value] = curr.split("=");

          if (!key) return acum;

          return {
            ...acum,
            [key]: convertToNumber(value),
          };
        }, {});

    return {
      ...pathParts,
      ...queryParts,
    };
  };
};

// define your URL path variables
const parser = URLParser("/:version/api/:collection/:id");

// parse a URL
console.log(parser("/6/api/listings/3?sort=desc&limit=10")); // { version: 6, collection: 'listings', id: 3, sort: 'desc', limit: 10 }
console.log(parser("/6/api/listings/3")); // { version: 6, collection: 'listings', id: 3 }
console.log(parser("/6/api/listings/3?sort=desc&version=10")); // { version: 10, collection: 'listings', id: 3, sort: 'desc' }
console.log(parser("/6/api/listings/3?=desc&version")); // { version: undefined, collection: 'listings', id: 3 }

console.log(parser("//api/listings/3?sort=desc&version=10")); // ERROR Path incompatible with defined URL schema
console.log(parser("/1/2/3/api/listings/3?sort=desc&version=10")); // ERROR Path incompatible with defined URL schema

function MinWindowSubstring(strArr) {
  const [source, target] = strArr;
  let result = "";
  const counter = [...target].reduce((acum, curr) => {
    if (acum[curr] == null) {
      return { ...acum, [curr]: 1 };
    }

    acum[curr]++;
    return acum;
  }, {});

  for (let i = 0; i < source.length - target.length; i++) {
    for (let j = source.length - 1; j >= i; j--) {
      if (j - i <= target.length) break;

      const substring = source.slice(i, j);

      if (result && result.length < substring.length) continue;

      if (
        Object.entries(counter).every(([char, count]) => {
          return count <= [...substring].filter((curr) => char === curr).length;
        })
      ) {
        result = substring;
      }
    }
  }

  return result;
}

const test1 = MinWindowSubstring(["ahffaksfajeeubsne", "jefaa"]);
const test2 = MinWindowSubstring(["aaffhkksemckelloe", "fhea"]);

console.table([
  { result: test1, expected: "aksfaje", assert: test1 === "aksfaje" },
  {
    result: test2,
    expected: "affhkkse",
    assert: test2 === "affhkkse",
  },
]);

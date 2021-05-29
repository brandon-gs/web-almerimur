module.exports = {
  node: { fs: "empty" },
  externals: [{ "./cptable": "var cptable" }, { "./jszip": "jszip" }],
};

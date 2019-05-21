const d3 = require('d3');
require('../../node_modules/markmap/lib/d3-flextree');
const markmap = require('../../node_modules/markmap/lib/view.mindmap');
const parse = require('../../node_modules/markmap/lib/parse.markdown');
const transform = require('../../node_modules/markmap/lib/transform.headings');

d3.text("../../saves/buffer.md", function(error, text) {
  if (error) throw error;
  const data = transform(parse(text));

  markmap('svg#mindmap', data, {
    preset: 'colorful', // or default
    linkShape: 'diagonal' // or bracket
  });
});

import fs from 'fs-extra';
import p from 'path';

const maxDepth = 25;

export const getExamples = (examples, path, depth = 0) => {
  const files = fs.readdirSync(p.resolve(path));
  if (depth > maxDepth || path.includes('archived') || path.includes('3.24')) {
    return;
  }

    for(let file of files) {
      const fileInfo = fs.statSync(p.resolve(path, file));
      if (fileInfo.isDirectory() && file[0] !== '_') {
        getExamples(examples, path + '/' + file, depth + 1);
      } else if (p.extname(file) === '.js' && file[0] !== '_' && file[0] !== '.') {
        examples.push({
          url: path + '/' +  file,
          path: p.resolve(path, file),
        });
      }
    }
}

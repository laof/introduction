const fs = require('fs');
const archiver = require('archiver');

// create a file to stream archive data to.
var output = fs.createWriteStream('dist.zip');
const archive = archiver('zip', {
    zlib: { level: 9 } // 设置压缩级别
})

archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();
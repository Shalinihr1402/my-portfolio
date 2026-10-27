const fs = require('fs');

const buf = fs.readFileSync('d:/my-portfolio/public/models/anime_girl.glb');
const chunk0Length = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + chunk0Length).toString('utf8'));

const binOffset = 20 + chunk0Length;
const binLength = buf.readUInt32LE(binOffset);
const binData = buf.subarray(binOffset + 8, binOffset + 8 + binLength);

// Update materials to MASK mode with alphaCutoff = 0.2
gltf.materials.forEach((mat) => {
  mat.alphaMode = 'MASK';
  mat.alphaCutoff = 0.2;
  mat.doubleSided = true;
});

let newJsonStr = JSON.stringify(gltf);
while (newJsonStr.length % 4 !== 0) {
  newJsonStr += ' ';
}
const newJsonBuf = Buffer.from(newJsonStr, 'utf8');

const newTotalLength = 12 + 8 + newJsonBuf.length + 8 + binData.length;
const outBuf = Buffer.alloc(newTotalLength);

outBuf.writeUInt32LE(0x46546C67, 0); // 'glTF'
outBuf.writeUInt32LE(2, 4);
outBuf.writeUInt32LE(newTotalLength, 8);

outBuf.writeUInt32LE(newJsonBuf.length, 12);
outBuf.writeUInt32LE(0x4E4F534A, 16); // 'JSON'
newJsonBuf.copy(outBuf, 20);

const newBinOffset = 20 + newJsonBuf.length;
outBuf.writeUInt32LE(binData.length, newBinOffset);
outBuf.writeUInt32LE(0x004E4942, newBinOffset + 4); // 'BIN\0'
binData.copy(outBuf, newBinOffset + 8);

fs.writeFileSync('d:/my-portfolio/public/models/anime_girl.glb', outBuf);
console.log('Successfully set alphaMode to MASK with alphaCutoff 0.2 in anime_girl.glb!');

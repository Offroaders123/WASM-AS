export function read(data: Uint8Array): void {
  for (let i = 0; i < data.byteLength; i++){
    console.log(`${data[i]}`);
  }
}
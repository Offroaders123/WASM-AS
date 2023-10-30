export function read(data: Uint8Array): void {
  new NBTReader(data);
}

const enum TAG {
  END = 0,
  BYTE,
  SHORT,
  INT,
  LONG,
  FLOAT,
  DOUBLE,
  STRING,
  BYTE_ARRAY,
  LIST,
  COMPOUND,
  INT_ARRAY,
  LONG_ARRAY
}

type Tag = ByteTag | ShortTag | IntTag | LongTag | FloatTag | DoubleTag | StringTag | ByteArrayTag | ListTag<Tag> | CompoundTag | IntArrayTag | LongArrayTag;

type ByteTag = i8;
type ShortTag = i16;
type IntTag = i32;
type LongTag = i64;
type FloatTag = f32;
type DoubleTag = f64;
type StringTag = string;
type ByteArrayTag = Int8Array;
class ListTag<T extends Tag> extends Array<T> {}
class CompoundTag extends Map<string,Tag> {}
type IntArrayTag = Int32Array;
type LongArrayTag = Int64Array;

class NBTReader {
  private byteOffset: i32;
  private data: Uint8Array;
  private view: DataView;

  constructor(data: Uint8Array) {
    this.byteOffset = 0;
    this.data = data;
    this.view = new DataView(data.buffer,data.byteOffset,data.byteLength);

    const type: TAG = this.readTagType();
    console.log(`root type: ${type}\n`);

    const name: string = this.readString();
    const value: Tag = this.readTag(type);
  }

  private readTag(type: TAG): Tag {
    switch (type){
      case TAG.END: {
        const remaining = this.data.byteLength - this.byteOffset;
        throw new Error(`Encountered unexpected End tag at byte offset ${this.byteOffset}, ${remaining} unread bytes remaining`);
      }
      case TAG.BYTE: return this.readByte();
      case TAG.SHORT: return this.readShort();
      case TAG.INT: return this.readInt();
      case TAG.LONG: return this.readLong();
      case TAG.FLOAT: return this.readFloat();
      case TAG.DOUBLE: return this.readDouble();
      case TAG.BYTE_ARRAY: return this.readByteArray();
      case TAG.STRING: return this.readString();
      case TAG.LIST: return this.readList();
      case TAG.COMPOUND: return this.readCompound();
      case TAG.INT_ARRAY: return this.readIntArray();
      case TAG.LONG_ARRAY: return this.readLongArray();
      default: throw new Error(`Encountered unsupported tag type '${type}' at byte offset ${this.byteOffset}`);
    }
  }

  private readTagType(): TAG {
    return this.readUnsignedByte() as TAG;
  }

  private readUnsignedByte(): u8 {
    return this.view.getUint8((this.byteOffset += 1) - 1);
  }

  private readByte(): ByteTag {
    return this.view.getInt8((this.byteOffset += 1) - 1);
  }

  private readUnsignedShort(): u16 {
    return this.view.getUint16((this.byteOffset += 2) - 2);
  }

  private readShort(): ShortTag {
    return this.view.getInt16((this.byteOffset += 2) - 2);
  }

  private readInt(): IntTag {
    return this.view.getInt32((this.byteOffset += 4) - 2);
  }

  private readLong(): LongTag {
    return this.view.getInt64((this.byteOffset += 8) - 8);
  }

  private readFloat(): FloatTag {
    return this.view.getFloat32((this.byteOffset += 4) - 4);
  }

  private readDouble(): DoubleTag {
    return this.view.getFloat64((this.byteOffset += 8) - 8);
  }

  private readByteArray(): ByteArrayTag {
    const length: i32 = this.readInt();
    return this.data.subarray(this.byteOffset,this.byteOffset += length);
  }

  private readString(): StringTag {
    const length: u16 = this.readUnsignedShort();
    console.log(`string length: ${length}`);

    const buffer: Uint8Array = this.data.subarray(this.byteOffset,this.byteOffset += length);
    const array: Array<i32> = new Array(buffer.length);
    for (let i = 0; i < buffer.length; i++){
      array[i] = buffer[i] as u8;
    }

    const string: string = String.fromCharCodes(array);
    console.log(`${string}\n`);

    return string;
  }

  private readList(): ListTag<Tag> {
    const type: TAG = this.readTagType();
    const length: i32 = this.readInt();
    const value: ListTag<Tag> = new Array(length);
    for (let i = 0; i < length; i++){
      const entry: Tag = this.readTag(type);
      value[i] = entry;
    }
    return value;
  }

  private readCompound(): CompoundTag {
    const value: CompoundTag = new Map<string,Tag>();
  }

  private readIntArray(): IntArrayTag {}

  private readLongArray(): LongArrayTag {}
}
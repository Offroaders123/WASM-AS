// @ts-check

import { read } from "../dist/index.js";
import { readFile } from "node:fs/promises";

const HELLO_WORLD = new URL("./hello_world.nbt",import.meta.url);

const data = await readFile(HELLO_WORLD);
console.log(data,"\n");

read(data);
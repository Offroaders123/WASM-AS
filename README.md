# WASM-AS

Learning how to use WASM with AssemblyScript!

It's actually really easy to set up, which is awesome! I really like that it all works at the `npm install` level too, unlike needing to use `brew install emscripten` when compiling C to WASM. All of the tooling is local to the project.

The build output of the WASM looks a lot smaller too, which is great. The output JS wrapper file is much more debuggable/easy to understand too, there's less boilerplate there. The out of the box support for ESM is awesome too, as well as the automatic TypeScript support (hence being build with TS, but that's besides the point. I mean the build output having pre-defined types too.)

I was going to try debug setting up my own workspace from scratch, but then I realized I should probably start from their template initially, since it's organizes things for you. I think it's definitely possible to configure things to work nicely on your own though. Going to try doing that next.

[Getting started | The AssemblyScript Book](https://www.assemblyscript.org/getting-started.html#setting-up-a-new-project)

I'm not sure what happens when you try to import things from existing JS modules, which aren't AssemblyScript. That's one thing that I kind of don't like/am not sure about AssemblyScript yet, that it kind of blurs the line as to what it is exactly. I hope that at the TS level it can show errors for trying to import from things like that. Same with importing from Node modules, or npm packages. Can you have a package-named AssemblyScript project? Like, could you 'require' other AssemblyScript projects, to which you encorporate them into the build of your project? I'd imagine it would work the same way right? And I also wonder if you can run plain WASM builds in the terminal, maybe using Node as the implementation to run it on? Like, if you were to `chmod +x` a `.wasm` file, could you somehow tell Bash to run it with Node or something? Seems kind of interesting. And what about opening files from the file system and such? Can you 'require' native modules also? I think WASM is mostly meant for the browser, but it would have to manage the same kinds of things there anyways, in that it has to virtualize a file system to read and write from, say if the program you build needs to work with files directly, like ffmpeg.

So could you release an npm package which is fully implemented in WASM, and import it like a regular TS project? (Yes, I think? The wrapper JS/TS types handles all of that anyways I'm almost fairly certain?) I don't think that would be any different than like how `leveldb-zlib` works, in that it's using native code combined with the JS API implementation. The backend of the project's implementation doesn't really matter, it's just whether it has the ability to have a JS API, and whether it's also feasable to be interfaced with JS in the first place.
if(!args[0] || !args[1]) return "expected at least 2 arguments"
const n = `/cmd/${args.shift()}`;

if(await FS.exists(n+".sh") || await FS.exists(n + ".exe")) {
  return "path already exists";
}
await FS.addFile(n + ".sh", args.join(" "));

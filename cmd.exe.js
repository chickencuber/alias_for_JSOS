if (flags.includes("r")) {
    if(!args[0]) return "expected an argument";
    const n = `/cmd/${args[0]}.sh`;
    if(! await FS.exists(n)) {
        return "path doesn't exist"
    }
    await FS.delete(n);
    const arr = (await FS.getFromPath("/user/alias/alias.sh")).split("\n");
    let o = -1;
    for(let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if(item.startsWith(`alias -i ${args[0]}`)) {
           o = i; 
        }
    }
    if(o === -1) {
        return "Not an alias";
    }
    arr.splice(o, 1);
    await FS.addFile("/user/alias/alias.sh", arr.join("\n"));
} else {
    if(!args[0] || !args[1]) return "expected at least 2 arguments"
    const a0 = args[0]
    const n = `/cmd/${args.shift()}`;

    if(await FS.exists(n+".sh") || await FS.exists(n + ".exe")) {
        return "path already exists";
    }
    await FS.addFile(n + ".sh", args.join(" "));
    if(!flags.includes("i"))
        await FS.addFile("/user/alias/alias.sh", await FS.getFromPath("/user/alias/alias.sh") + `\nalias -i ${a0} ${args.join(" ")}`)
}

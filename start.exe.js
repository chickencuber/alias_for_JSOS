if(!await FS.exists("/user/alias/alias.sh")) await FS.addFile("/user/alias/alias.sh"); 
Shell.run("/user/alias/alias.sh")

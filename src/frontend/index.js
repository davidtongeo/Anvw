(async () => {
    let files = await fetch("/API/files");
    files = await files.json();
    console.log(files);
    for await (let item of files) {
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.textContent = item.absPath;
        a.href = "/watch?path=" + item.absPath;
        div.style.margin = "2rem";
        div.append(a);
        document.body.append(div);
    }
})();

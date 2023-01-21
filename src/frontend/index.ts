(async () => {
    const fetched = await fetch("/API/files");
    const files = await fetched.json();
    console.log(files);
    for await (let item of files) {
        const div = document.createElement("div");
        const a = document.createElement("a");
        const button = document.createElement("button");
        button.textContent = "DELETE";
        button.style.marginLeft = "2rem";
        a.textContent = item.absPath;
        a.href = "/watch?path=" + item.absPath;
        div.style.margin = "2rem";
        div.id = item.id;
        button.addEventListener("click", async () => {
            document.getElementById(div.id)?.remove();
            await fetch(`/API/delete?url=${div.id}`, { method: "DELETE" });
        });
        div.append(a);
        div.append(button);
        document.body.append(div);
    }
})();

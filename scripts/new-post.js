import fs from "fs";
import path from "path";

const title = process.argv.slice(2).join(" ");

if (!title) {
  console.log("用法: pnpm new-post 文章标题");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^\w\u4e00-\u9fa5-]/g, "");

const date = new Date()
  .toLocaleString("sv-SE", { timeZone: "Asia/Taipei" })
  .replace(" ", "T") + "+08:00";

const content = `---
author: Shane
pubDatetime: ${date}
title: ${title}
featured: false
draft: false
tags:
  - 
category: 
description: 
---

# ${title}
`;

const dir = "src/content/posts";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const file = path.join(dir, `${slug}.md`);

fs.writeFileSync(file, content);

console.log(`创建成功: ${file}`);
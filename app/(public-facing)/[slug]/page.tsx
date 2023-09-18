import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Markdown from 'markdown-to-jsx';
import React from "react";
import { notFound } from "next/navigation";


interface FrontMatter {
    title: string
    subtitle?: string
    lastUpdated?: string
}

const contentDirectory = 'app/_content/'

export async function generateStaticParams() {
    // get all mk files
    const files = fs.readdirSync(contentDirectory, 'utf8');
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    // return the slugs (filenames)
    return markdownFiles.map(fileName => fileName.replace(".md", ""))
  }


export default async function Page({params}: {params: {slug: string}}) {

    const fileContents = tryToLoadFile(params.slug)

    if(fileContents === null) {
        notFound()
    }

    // Use gray-matter to parse the markdown file
    const matterResult = matter(fileContents);

    const frontMatter = matterResult.data as FrontMatter
    
    return (
        <main className="prose formal">
            <h1>
                {frontMatter.title}
                {frontMatter.subtitle && <span>{frontMatter.subtitle}</span>}
            </h1>
            {frontMatter.lastUpdated && <p>Ostatnia aktualizacja: {frontMatter.lastUpdated}</p>}
            <Markdown options={{ wrapper: React.Fragment }}>{matterResult.content}</Markdown>
        </main>
    )
}

function tryToLoadFile(slug: string): string | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        return fs.readFileSync(fullPath, 'utf8');
    } catch {
        return null
    }
}
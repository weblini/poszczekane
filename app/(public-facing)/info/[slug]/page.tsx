import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { metaTitle } from "@/app/_utils/metadata";

type FrontMatter = {
    title: string;
    shortTitle?: string;
    subtitle?: string;
    lastUpdated?: string;
    classes?: string;
};

type Props = {
    params: Promise<{ slug: string }>;
};

const contentDirectory = "./app/_content/";

export async function generateStaticParams(): Promise<Array<{slug: string}>> {
    // get all (and only those) .md files
    const files = fs.readdirSync(contentDirectory, "utf8");
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    return markdownFiles.map((fileName) => ({ slug: fileName.replace(".md", "")}) );
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const params = await props.params;
    const fileContents = tryToLoadFile(params.slug);

    if (fileContents === null) {
        return {};
    }

    const matterResult = matter(fileContents);
    const frontMatter = matterResult.data as FrontMatter;

    if (!frontMatter.shortTitle) {
        return {};
    }

    return {
        title: metaTitle(frontMatter.shortTitle),
    };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const fileContents = tryToLoadFile(params.slug);

    if (fileContents === null) {
        notFound();
    }

    // Use gray-matter to parse the markdown file
    const matterResult = matter(fileContents);

    const frontMatter = matterResult.data as FrontMatter;

    return (
        <main
            className={`prose py-10 pb-14 lg:py-20 lg:pb-28 ${
                frontMatter.classes || ""
            }`}
        >
            <h1>
                {frontMatter.title}
                {frontMatter.subtitle && <span>{frontMatter.subtitle}</span>}
            </h1>
            {frontMatter.lastUpdated && (
                <p>Ostatnia aktualizacja: {frontMatter.lastUpdated}</p>
            )}
            <Markdown options={{ wrapper: React.Fragment }}>
                {matterResult.content}
            </Markdown>
        </main>
    );
}

function tryToLoadFile(slug: string): string | null {
    // try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        return fs.readFileSync(fullPath, "utf8");
    // } catch {
    //     return null;
    // }
}

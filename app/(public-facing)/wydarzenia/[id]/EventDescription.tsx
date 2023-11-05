import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import React from "react";

type Props = {
    text: string;
};

export default function EventDescription({ text }: Props) {
    const matterResult = matter(text);

    return (
        <div className="prose w-full max-w-none">
            <Markdown options={{ wrapper: React.Fragment }}>
                {matterResult.content}
            </Markdown>
        </div>
    );
}

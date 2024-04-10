'use client';

export default function TagCheckbox({ currentTag, tags, setTags }: { currentTag: { name: string, title: string }, tags: string[], setTags: Function }) {

    return (
        <div className="flex items-center"><input type="checkbox" checked={tags.includes(currentTag.name)} onChange={() => setTags((prevTags: string[]) =>  !prevTags.includes(currentTag.name) ? [...prevTags, currentTag.name] : prevTags.filter(tag => tag != currentTag.name))} className="w-[20px] h-[20px] mr-2" /><p>{currentTag.title}</p></div>
    )
}

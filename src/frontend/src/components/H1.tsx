export interface H1Props {
	title: string
}

export default function H1({title}: H1Props) {
	return <h1 className={"mb-6 text-3xl lg:text-6xl font-garton text-green"}>{title}</h1>
}
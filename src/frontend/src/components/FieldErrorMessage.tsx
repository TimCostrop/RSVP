export default function FieldErrorMessage(props: {
	text?: string
}) {
	return <div className="pt-0.5 text-red text-sm">{props.text}</div>
}
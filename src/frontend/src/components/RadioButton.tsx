import {useFormikContext} from "formik";
import {RadioButton} from "primereact/radiobutton";
import {RSVP} from "../App.tsx";

export interface CustomRadioButtonProps {
	id: string,
	value: string | boolean,
	inputId: string,
	labelText: string
}

export default function CustomRadioButtons(props: {
	name: keyof RSVP,
	buttons: CustomRadioButtonProps[]
}) {
	const formik = useFormikContext<RSVP>();

	return props.buttons.map(btn =>
		<div key={btn.inputId} className={'flex align-items-center gap-5'}>
			<RadioButton
				id={btn.id}
				inputId={btn.inputId}
				value={btn.value}
				required
				name={props.name}
				checked={formik.values[props.name] === btn.value}
				onChange={(e) => {
					void formik.setFieldValue(props.name, e.value);
				}}
			/>
			<label
				htmlFor={btn.inputId} className={'cursor-pointer'}
				onClick={() => void formik.setFieldValue(props.name, btn.value)}>
				{btn.labelText}
			</label>
		</div>)
}
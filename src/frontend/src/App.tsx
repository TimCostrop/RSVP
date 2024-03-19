import {Form, FormikProvider, useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import CustomRadioButtons from "./components/RadioButton.tsx";
import {Button} from "primereact/button";
import FieldErrorMessage from "./components/FieldErrorMessage.tsx";
import axios from "axios";
import H1 from "./components/H1.tsx";
import {useNavigate} from "react-router-dom";

export interface RSVP {
	who?: string,
	present?: boolean,
	amount?: number,
	dietaryRestriction?: 'VEGAN' | 'VEGETARIAN' | 'NONE' | 'OTHER',
	otherDietaryRestriction?: string,
}

interface RSVPErrors {
	who?: string
	present?: string
	amount?: string
	dietaryRestriction?: string
	otherDietaryRestriction?: string
}

function App() {
	const navigate = useNavigate();
	const formik = useFormik<RSVP>({
		initialValues: {},
		validateOnBlur: false,
		validateOnChange: false,
		validate: (values) => {
			const required = 'Gelieve dit veld in te vullen.';
			const errors: RSVPErrors = {};
			if (values.present === undefined) {
				errors.present = required;
			}
			if (values.who === undefined || values.who.trim() === '') {
				errors.who = required;
			}
			if (!values.present) {
				return errors;
			}
			if (values.amount === undefined || values.amount <= 0) {
				errors.amount = required;
			}
			if (values.dietaryRestriction === undefined) {
				errors.dietaryRestriction = required;
			}
			if (values.dietaryRestriction === 'OTHER' && values.otherDietaryRestriction === undefined) {
				errors.otherDietaryRestriction = required;
			}
			return errors;
		},
		onSubmit: (values) => {
			axios.post<void>('/api/rsvp', values)
				.then(() => navigate("/submitted"))
		}
	});

	return (
		<FormikProvider value={formik}>
			<Form className={"grow flex flex-col gap-5 w-full"}>
				<H1 title={'Wij trouwen! Kom jij ook?'}/>
				<div className={'flex flex-col gap-5'}>
					<label htmlFor={"who"}>Ik ben, wij zijn...</label>
					<InputText
						required
						value={formik.values.who}
						onChange={(e) =>
							formik.setFieldValue('who', e.target.value)}
					/>
					{formik.errors.who && <FieldErrorMessage text={formik.errors.who}/>}
				</div>
				<div className={'flex flex-col gap-5'}>
					<label>en...</label>
					<CustomRadioButtons name={'present'} buttons={[
						{
							id: 'present',
							value: true,
							inputId: 'present',
							labelText: 'ik ben / wij zijn graag van de partij!'
						},
						{
							id: 'absent',
							value: false,
							inputId: 'absent',
							labelText: 'kunnen er helaas niet bij zijn :('
						}
					]}/>
					{formik.errors.present && <FieldErrorMessage text={formik.errors.present}/>}
				</div>
				{formik.values.present && <>
					<div className={'flex flex-col gap-5'}>
						<label htmlFor={"amount"}>Ik kom / wij komen met ...</label>
						<InputNumber
							placeholder={'x aantal personen'}
							required={formik.values.present}
							value={formik.values.amount}
							onChange={(e) =>
								formik.setFieldValue('amount', e.value)}
						/>
						{formik.errors.amount && <FieldErrorMessage text={formik.errors.amount}/>}
					</div>
					<div className={'flex flex-col gap-5'}>
						<CustomRadioButtons name={'dietaryRestriction'} buttons={[
							{
								id: 'none',
								value: 'NONE',
								inputId: 'none',
								labelText: 'ik eet / wij eten alles!'
							},
							{
								id: 'vegetarian',
								value: 'VEGETARIAN',
								inputId: 'vegetarian',
								labelText: 'geen vlees of vis a.u.b.'
							},
							{
								id: 'vegan',
								value: 'VEGAN',
								inputId: 'vegan',
								labelText: 'vegan!'
							},
							{
								id: 'allergies',
								value: 'OTHER',
								inputId: 'allergies',
								labelText: 'ik ben allergisch aan...'
							}
						]}/>
						{formik.errors.dietaryRestriction &&
							<FieldErrorMessage text={formik.errors.dietaryRestriction}/>}
					</div>
					{formik.values.dietaryRestriction === 'OTHER' && <>
						<div className={'flex flex-col gap-5'}>
							<InputText
								required
								placeholder={'melk en eieren?'}
								value={formik.values.otherDietaryRestriction}
								onChange={(e) =>
									formik.setFieldValue('otherDietaryRestriction', e.target.value)}
							/>
							{formik.errors.otherDietaryRestriction &&
								<FieldErrorMessage text={formik.errors.otherDietaryRestriction}/>}
						</div>
					</>}
				</>}

				<Button
					className={'w-[15rem] self-end'}
					type={"submit"}
					label={'Versturen'}
					loading={formik.isSubmitting}
				/>
			</Form>
		</FormikProvider>
	);
}

export default App;

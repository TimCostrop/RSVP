import {Form, FormikProvider, useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import CustomRadioButtons from "./components/RadioButton.tsx";
import {Button} from "primereact/button";
import FieldErrorMessage from "./components/FieldErrorMessage.tsx";
import axios from "axios";
import H1 from "./components/H1.tsx";
import {useNavigate} from "react-router-dom";
import {InputTextarea} from "primereact/inputtextarea";

export interface RSVP {
	firstName?: string,
	lastName?: string,
	present?: boolean,
	dietaryRestriction?: 'VEGAN' | 'VEGETARIAN' | 'NONE' | 'OTHER',
	otherDietaryRestriction?: string,
	extra?: string
}

interface RSVPErrors {
	firstName?: string,
	lastName?: string,
	present?: string
	amount?: string
	dietaryRestriction?: string
	otherDietaryRestriction?: string,
}

export default function App() {
	const navigate = useNavigate();

	const formik = useFormik<RSVP>({
		initialValues: {
			firstName: '',
			lastName: '',
			otherDietaryRestriction: '',
			extra: ''
		},
		validateOnBlur: false,
		validateOnChange: false,
		validate: (values) => {
			const required = 'Gelieve dit veld in te vullen.';
			const errors: RSVPErrors = {};
			if (values.present === undefined) {
				errors.present = required;
			}
			if (values.firstName === undefined || values.firstName.trim() === '') {
				errors.firstName = required;
			}
			if (values.lastName === undefined || values.lastName.trim() === '') {
				errors.lastName = required;
			}
			if (!values.present) {
				return errors;
			}
			if (values.dietaryRestriction === undefined) {
				errors.dietaryRestriction = required;
			}
			if (values.dietaryRestriction === 'OTHER' && values.otherDietaryRestriction === undefined) {
				errors.otherDietaryRestriction = required;
			}
			return errors;
		},
		onSubmit: (values) => void axios.post<void>('/api/rsvp', values)
				.then(() => navigate("/submitted"))
	});

	return (
		<FormikProvider value={formik}>
			<Form className={"grow flex flex-col gap-5 w-full"}>
				<H1 title={'Wij trouwen! Kom jij ook?'}/>
				<div className={'flex flex-col gap-3'}>
					<label htmlFor={"firstName"}>Ik ben</label>
					<div className={"flex md:flex-row flex-col gap-5"}>
						<div className={"flex flex-col gap-1 grow"}>
							<InputText
								name={'firstName'}
								placeholder={'voornaam'}
								required
								value={formik.values.firstName}
								onChange={(e) =>
									void formik.setFieldValue('firstName', e.target.value)}
							/>
							{formik.errors.firstName && <FieldErrorMessage text={formik.errors.firstName}/>}
						</div>
						<div className={"flex flex-col gap-1 grow"}>
							<InputText
								name={'lastName'}
								required
								placeholder={'achternaam'}
								value={formik.values.lastName}
								onChange={(e) =>
									void formik.setFieldValue('lastName', e.target.value)}
							/>
							{formik.errors.lastName && <FieldErrorMessage text={formik.errors.lastName}/>}
						</div>
					</div>
				</div>
				<div className={'flex flex-col gap-5'}>
					<label>en...</label>
					<CustomRadioButtons name={'present'} buttons={[
						{
							id: 'present',
							value: true,
							inputId: 'present',
							labelText: 'ik ben graag van de partij!'
						},
						{
							id: 'absent',
							value: false,
							inputId: 'absent',
							labelText: 'ik kan er helaas niet bij zijn :('
						}
					]}/>
					{formik.errors.present && <FieldErrorMessage text={formik.errors.present}/>}
				</div>
				{formik.values.present && <>
					<div className={'flex flex-col gap-5'}>
						<label htmlFor={"dietaryRestriction"}>en ...</label>
						<CustomRadioButtons name={'dietaryRestriction'} buttons={[
							{
								id: 'none',
								value: 'NONE',
								inputId: 'none',
								labelText: 'ik eet / wij eten alles'
							},
							{
								id: 'vegetarian',
								value: 'VEGETARIAN',
								inputId: 'vegetarian',
								labelText: 'vegetarisch'
							},
							{
								id: 'vegan',
								value: 'VEGAN',
								inputId: 'vegan',
								labelText: 'vegan'
							},
							{
								id: 'allergies',
								value: 'OTHER',
								inputId: 'allergies',
								labelText: 'ik ben allergisch/intolerant aan...'
							}
						]}/>
						{formik.errors.dietaryRestriction &&
							<FieldErrorMessage text={formik.errors.dietaryRestriction}/>}
					</div>
					{formik.values.dietaryRestriction === 'OTHER' && <>
						<div className={'flex flex-col gap-5'}>
							<InputText
								required
								value={formik.values.otherDietaryRestriction}
								onChange={(e) =>
									void formik.setFieldValue('otherDietaryRestriction', e.target.value)}
							/>
							{formik.errors.otherDietaryRestriction &&
								<FieldErrorMessage text={formik.errors.otherDietaryRestriction}/>}
						</div>
					</>}
				</>}
				<div className={'flex flex-col gap-5 mt-[3rem]'}>
					<label htmlFor={"extra"}>Dit wil ik ook nog kwijt ...</label>
					<InputTextarea
						name={"extra"}
						value={formik.values.extra}
						onChange={(e) =>
							void formik.setFieldValue('extra', e.target.value)}
					/>

				</div>

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
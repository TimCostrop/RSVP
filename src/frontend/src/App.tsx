import {Form, FormikProvider, useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import CustomRadioButtons from "./components/RadioButton.tsx";
import {Button} from "primereact/button";
import FieldErrorMessage from "./components/FieldErrorMessage.tsx";
import axios from "axios";

export interface RSVP {
	who?: string,
	present?: boolean,
	amount?: number,
	dietaryRestrictions?: 'VEGAN' | 'VEGETARIAN' | 'NONE' | 'OTHER',
	otherDietaryRestriction?: string,
}

interface RSVPErrors {
	who?: string
	present?: string
	amount?: string
	dietaryRestrictions?: string
	otherDietaryRestriction?: string
}

function App() {

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
			if(values.who === undefined || values.who.trim() === '') {
				errors.who = required;
			}
			if (!values.present) {
				return errors;
			}
			if(values.amount === undefined || values.amount <= 0) {
				errors.amount = required;
			}
			if(values.dietaryRestrictions === undefined) {
				errors.dietaryRestrictions = required;
			}
			if(values.dietaryRestrictions === 'OTHER' && values.otherDietaryRestriction === undefined) {
				errors.otherDietaryRestriction = required;
			}
			return errors;
		},
		onSubmit: (values) => {
			axios.post<void>(window.REACT_APP_API_ENDPOINT + '/api/rsvp', values)
				.then(() => console.log('I really should know what to do next.'))
		}
	});

	return (
		<div className={"min-h-screen bg-[#ededed] "}>
			<main className={"flex flex-col w-[1587px] mx-auto bg-repeat bg-texture shadow-md "}>
				<FormikProvider value={formik}>
					<Form
						className={"grow flex flex-col gap-5 bg-header bg-no-repeat min-h-full pt-[32rem] pl-[5rem] pr-[25rem] pb-[5rem]"}>
						<h1 className={"mb-6 text-6xl font-garton text-green"}>Wij trouwen! Kom jij ook?</h1>
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
								<CustomRadioButtons name={'dietaryRestrictions'} buttons={[
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
								{formik.errors.dietaryRestrictions &&
									<FieldErrorMessage text={formik.errors.dietaryRestrictions}/>}
							</div>
							{formik.values.dietaryRestrictions === 'OTHER' && <>
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
							label={'Versturen'}/>
					</Form>
				</FormikProvider>
			</main>
		</div>
	);
}

export default App;

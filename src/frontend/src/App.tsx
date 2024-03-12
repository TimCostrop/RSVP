import {Form, FormikProvider, useFormik} from "formik";
import {RadioButton} from "primereact/radiobutton";
import {InputText} from "primereact/inputtext";

interface Submission {
	who?: string,
	present?: boolean,
	amount?: number,
	dietaryRestrictions?: 'VEGAN'|'VEGETARIAN'|'NONE'|'OTHER',
	otherDietaryRestriction?: string,
}

function App() {

	const formik= useFormik<Submission>({
		initialValues: {},
		onSubmit: () => {
			// todo
		}
	});

	const presentRadioOptions = [
		{
			id: 'present',
			name: 'present',
			value: true,
			inputId: 'present',
			labelText: 'ik ben / wij zijn graag van de partij!'
		},
		{
			id: 'absent',
			name: 'present',
			value: false,
			inputId: 'absent',
			labelText: 'kunnen er helaas niet bij zijn :('
		}

	]

	return (
		<div className={"min-h-screen bg-[#ededed] "}>
			<main className={"flex flex-col w-[1587px] mx-auto bg-repeat bg-texture shadow-md "}>
				<FormikProvider value={formik} >
					<Form className={"grow flex flex-col gap-5 bg-header bg-no-repeat min-h-full pt-[32rem] pl-[5rem] pr-[25rem] pb-[5rem]"}>
						<h1 className={"mb-6 text-6xl font-garton text-green"}>Wij trouwen! Kom jij ook?</h1>
						<div className={'flex flex-col gap-5'}>
							<label htmlFor={"who"}>Ik ben, wij zijn...</label>
							<InputText
								required={true}
								value={formik.values.who}
								onChange={(e) =>
									formik.setFieldValue('who', e.target.value)}
							/>
						</div>
						<div className={'flex flex-col gap-5'}>
							<label>en...</label>
							{presentRadioOptions.map((btn) => {
								return (
									<div key={btn.inputId} className={'flex align-items-center gap-5'}>
										<RadioButton
											{...btn}
											required={true}
											checked={formik.values.present === btn.value}
											onChange={(e) => {
												formik.setFieldValue('present', e.value);
											}}
										/>
										<label htmlFor={btn.inputId} className={'cursor-pointer'}
											   onClick={() => formik.setFieldValue('present', btn.value)}>
											{btn.labelText}
										</label>
									</div>
								)
							})}
						</div>
						{/*{formik.values.present && }*/}
					</Form>
				</FormikProvider>
			</main>
		</div>
	);
}

export default App;

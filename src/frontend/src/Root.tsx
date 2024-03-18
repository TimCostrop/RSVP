import {Outlet} from "react-router-dom";

export default function Root() {
	return <>
		<div className={"min-h-screen bg-[#ededed]"}>
			<main className={"min-h-screen flex flex-col lg:w-[1587px] mx-auto bg-repeat bg-texture shadow-md "}>
				<div className={"grow flex flex-col gap-5 " +
					"bg-header bg-no-repeat bg-contain lg:bg-auto " +
					"min-h-full " +
					"pt-[15rem] md:pt-[20rem] lg:pt-[32rem] " +
					"pl-[1rem] lg:pl-[5rem] " +
					"pr-[1rem] sm:pr-[10rem] md:pr-[15rem] lg:pr-[25rem] " +
					"pb-[5rem]"}>
					<Outlet/>
				</div>
			</main>
		</div>
	</>;
}
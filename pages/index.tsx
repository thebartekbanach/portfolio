import Counter from "../containers/counter";
import { HelloWorldComponent } from "../components/helloWorld";

export default () => (
	<>
		<HelloWorldComponent />
		<Counter />
	</>
);

// TODO: trzeba skonfigurować ludzkie typowanie dla reduxa/saga
//		 znajdź jakiś graphql consumer dla squidexa, albo ich oficjalne api też może być?
//		 a co powiesz na i18n + backend translations
//		 a co myślisz o debugger for firefox + chrome żeby skonfigurować pod projekt?
//			miałbyś znacznie łatwiej zdebugować taki szajs jak przed chwilą miałeś.

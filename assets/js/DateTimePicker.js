import { TempusDominus, DateTime } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class DateTimePicker {
	lang = document.documentElement.lang.substring(0, 2) || 'en';

	constructor(options) {
		this.input = options.input;
		this.container = options.container;

		if (!this.input || !this.container) return;

		this.init();
	}

	init() {
		const id = 'datetimepicker1Input';
		this.input.setAttribute('id', id);
		this.input.setAttribute('data-td-target', `#${id}`);

		this.container.setAttribute('data-td-target-input', `nearest`);
		this.container.setAttribute('data-td-target-toggle', `nearest`);

		new TempusDominus(this.input, {
			container: this.container,
			localization: {
				locale: this.lang,
			},
			restrictions: {
				minDate: new DateTime().manipulate(1, 'date'),
			},
			display: {
				buttons: {
					today: true,
					clear: true,
					close: true,
				},
			},
		});
	}
}

export default DateTimePicker;

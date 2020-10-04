import React from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { addDays, addWeeks, addMonths, lastDayOfQuarter, lastDayOfWeek, lastDayOfMonth, getYear } from 'date-fns'
import cs from 'date-fns/locale/cs';
import "react-datepicker/dist/react-datepicker.css";

class App extends React.Component {
	constructor(){
		super()
		registerLocale('cs', cs)	//localization for date format
		setDefaultLocale('cs')
		this.state = {	//initialization of app state
			startDate: new Date(),
			endPeriod: new Date(),
			period: "mesic",
			periodNum: 2,
			repeats: 3
		}

		// binding handle functions
		this.handleDateChange = this.handleDateChange.bind(this)
		this.handlePeriodChange = this.handlePeriodChange.bind(this)
		this.handlePeriodNumChange = this.handlePeriodNumChange.bind(this)
		this.handleRepeatChange = this.handleRepeatChange.bind(this)
	}

	componentDidMount() {
		this.recalculate()	//initial calculation
	}

	recalculate(){	// recalculates the answer with recent variables
		var endDate = new Date()
		switch(this.state.period){
			case "tyden":
				endDate = addWeeks(this.state.startDate, this.state.repeats*this.state.periodNum)
				endDate = lastDayOfWeek(endDate, {locale: "cs", weekStartsOn: 1})
				break;
			case "mesic":
				endDate = addMonths(this.state.startDate, this.state.repeats*this.state.periodNum)
				endDate = lastDayOfMonth(endDate)
				break;
			case "kvartal":
				endDate = addMonths(this.state.startDate, this.state.repeats*this.state.periodNum*3)
				endDate = lastDayOfQuarter(endDate)
				break;
			default:
				endDate = addDays(this.state.startDate, this.state.repeats*this.state.periodNum)
				break;
		}
		this.setState({
			endPeriod: endDate
		})
	}

	// handler functions
	handleDateChange = (date) => {
		this.setState({startDate: date},() => {
			this.recalculate()
		})
	}
	handlePeriodChange = (event) => {
		this.setState({period: event.target.value},() => {
			this.recalculate()
		})
	}
	handlePeriodNumChange = (event) => {
		this.setState({periodNum: event.target.value},() => {
			this.recalculate()
		})
	}
	handleRepeatChange = (event) => {
		this.setState({repeats: event.target.value},() => {
			this.recalculate()
		})
	}

	render() {	//App render function
		return (    		
			<div className="App">
					<h2><b>Výpočet data</b></h2>
					<hr/>

					Vstupní datum
					<DatePicker 
						className="DatePicker" 
						locale="cs" 
						dateFormat='dd/MM/yyyy' 
						selected={this.state.startDate}
						onChange={date => this.handleDateChange(date)} />
					<hr/>
					
					Perioda
					<select value={this.state.period} onChange={this.handlePeriodChange}>
							<option value="den">Den</option>
							<option value="tyden">Týden</option>
							<option value="mesic">Měsíc</option>
							<option value="kvartal">Kvartál</option>
					</select>
					<hr/>

					Velikost periody
					<input
						className="numInput"
						name="numberOfPeriods"
						type="number"
						min="0"
						value={this.state.periodNum}
						onChange={this.handlePeriodNumChange} />
					<hr/>

					Počet opakování
					<input
						className="numInput"
						name="numberOfPeriods"
						type="number"
						min="0"
						value={this.state.repeats}
						onChange={this.handleRepeatChange} />
					<hr/>

					Výsledek
					<h3><b>{this.state.endPeriod.toLocaleDateString("cs")}</b></h3>
					<br/><br/><br/>

					{getYear(this.state.startDate) !== getYear(this.state.endPeriod) &&
						<div className="warning">
							<hr/>
							*Výsledek je v jiném roce nežli zadané datum.
						</div>
					}
			</div>
		)
	}
}

export default App;

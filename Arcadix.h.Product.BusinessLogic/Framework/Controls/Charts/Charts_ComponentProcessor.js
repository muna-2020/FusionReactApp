//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Components used.
import D3Chart from '@root/Framework/Controls/Charts/D3Chart/D3Chart';
import BarChart from '@root/Framework/Controls/Charts/BarChart/BarChart';

/**
* @name Charts_ComponentProcessor
* @summary Class for Charts component display.
*/
class Charts_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name GetChart
     * @param {any} objContext objContext
     * @summary Creates and returns charts based on ChartType passed in Meta
     */
	GetChart (objContext) {
		let objChart = {};
		let objProps = {
			Data: objContext.props.Data,
			Meta: objContext.props.Meta,
			Text: objContext.props.Text
		}
		switch (objContext.props.Meta.ChartType) {
			case "D3Chart":
				objChart = new D3Chart(objContext.refContainer.current, objProps, objContext.props.Events.onClickHandler);
				break;
			case "BarChart":
				objChart = new BarChart(objContext.refContainer.current, objProps, objContext.props.Events.onClickHandler);
				break;
		}
		return objChart;
	}
}

export default Charts_ComponentProcessor;
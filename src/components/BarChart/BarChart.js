import {CChart} from "@coreui/react-chartjs";

export default function ({labels, values, label = 'Surveys popularity'}) {
    return (<CChart
        height={75}
        type="bar"
        data={{
            labels: labels, datasets: [{
                label: label, backgroundColor: '#f87979', data: values,
            },],
        }}
        labels="answers"
    />);
}

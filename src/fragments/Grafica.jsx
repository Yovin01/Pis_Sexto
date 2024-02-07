import React, { Component } from "react";
import Chart from "react-apexcharts";

class Grafica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "Horas del dia"
                },
                xaxis: {
                    categories: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00']
                }
            },
            series: [
                {
                    name: "Horas",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }

    render() {
        return (
            <div className="appGary">
            <div className="center-chartGary">
              <div className="mixed-chart">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="line"
                  width="100%"
                  height="400"
                />
              </div>
            </div>
          </div>
        );
    }
}

export default Grafica;
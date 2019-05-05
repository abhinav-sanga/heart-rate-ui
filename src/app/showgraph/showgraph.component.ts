import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min.js'
import { FetchdataService } from '../fetchdata.service';


@Component({
	selector: 'app-showgraph',
	templateUrl: './showgraph.component.html',
	styleUrls: ['./showgraph.component.css']
})
export class ShowgraphComponent implements OnInit {

	constructor(private fetchDataService: FetchdataService) { }

	currentNumber = 0;
	dataPoints = [];
	sevenDB = [];
	chart;
	sessStopped = true;
	isSeven = false;
	xval = 0;
	yval = 0;

	ngOnInit() {
		this.chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Heart-rate vs Time"		
			},
			axisY:{
				title:"heart-rate",
				includeZero: false
			},
			axisX:{
				title:"time",
			},
			data: [{
				type: "line",
				dataPoints: this.dataPoints
			}]
		});	
		this.fetchDataPoints();
		this.chart.render();
	}

	ngOnDestroy() {
		this.stopSession();
	}

	fetchDataPoints(){
		this.fetchDataService.getDataPoints().subscribe((data) => {
			if(data >=0 ){
				this.sessStopped = false;
				this.currentNumber = data;
				if(data == 7){
					this.isSeven = true;
					var timenow = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
					this.sevenDB.push(timenow);
					this.dataPoints.push({ x: this.xval, y: data, markerColor: "red", markerType: "circle" });
					this.xval = this.xval + 2;
				}else{
					this.dataPoints.push({ x: this.xval, y: data});
					this.xval = this.xval + 2;
				}
			}
			this.chart.render();
		});
	}

	stopSession(){
		this.sessStopped = true;
		this.fetchDataService.stopSession();
	}

	goTop(event: any) {
		event.preventDefault();
    	window.scrollTo({
    		top: 0,
    		behavior: 'smooth'
    	});
  	}

}
